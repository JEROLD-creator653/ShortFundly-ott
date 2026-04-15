"""
God-level AI Teaser Generator for OTT Platform.

High-level flow:
1. Generate a 30-60 second teaser script with shot descriptions (LLM).
2. Generate voice-over audio from script lines (TTS).
3. Generate cinematic shots from shot prompts (Text-to-Video).
4. Select and trim key moments from original clips.
5. Assemble final teaser video with FFmpeg (video + audio + color grading).
6. Upload to CDN and update metadata.

Dependencies:
    - openai: For LLM-based script generation.
    - requests: For API calls (TTS, T2V).
    - ffmpeg-python or subprocess: For video assembly.
    - python-dotenv: For environment variable management.

Install:
    pip install openai requests python-dotenv
    apt-get install ffmpeg (or brew install ffmpeg on macOS)
"""

import json
import os
import subprocess
import logging
import platform
from typing import Optional, List, Dict, Any
from pathlib import Path
from datetime import datetime
import time

import requests
from dotenv import load_dotenv

# ============================================================================
# CONFIGURATION & SETUP
# ============================================================================

load_dotenv(os.getenv("TEASER_ENV_FILE") or ".env", override=True)

# API Keys and Endpoints
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE", "https://api.openai.com/v1")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_API_BASE = os.getenv("OPENROUTER_API_BASE", "https://openrouter.ai/api/v1")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "openrouter/auto")
OPENAI_TTS_MODEL = os.getenv("OPENAI_TTS_MODEL", "gpt-4o-mini-tts")
OPENAI_TTS_VOICE = os.getenv("OPENAI_TTS_VOICE", "alloy")
VOICEOVER_PROVIDER = os.getenv("VOICEOVER_PROVIDER", "local").strip().lower()
LOCAL_TTS_RATE = int(os.getenv("LOCAL_TTS_RATE", "0"))
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
ELEVENLABS_API_BASE = os.getenv("ELEVENLABS_API_BASE", "https://api.elevenlabs.io/v1")
SEGMIND_API_KEY = os.getenv("SEGMIND_API_KEY")
SEGMIND_API_BASE = os.getenv("SEGMIND_API_BASE", "https://api.segmind.com/v1")

VOICE_STYLE_TO_OPENAI_VOICE = {
    "deep-male": "onyx",
    "cinematic-female": "nova",
    "energetic": "alloy",
    "suspense": "echo"
}

# Output directories
OUTPUT_DIR = Path(os.getenv("TEASER_OUTPUT_DIR", "./teaser_output"))
TEMP_DIR = OUTPUT_DIR / "temp"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)

# Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

# FFmpeg binary (adjust if not in PATH)
FFMPEG_BIN = os.getenv("FFMPEG_BIN", "ffmpeg")
FFPROBE_BIN = os.getenv("FFPROBE_BIN", "ffprobe")


def fallbackScript(teaser_input: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "narration": f"In a {teaser_input['mood']} {teaser_input['genre']} journey, {teaser_input['title']} redefines suspense and emotion. The stakes rise, truths unfold, and destiny collides in one unforgettable moment.",
        "lines": [
            {"text": f"{teaser_input['title']}. This is where it begins.", "seconds": 4},
            {"text": "Every choice pulls them deeper into danger.", "seconds": 5},
            {"text": "The truth changes everything.", "seconds": 4},
            {"text": f"Witness {teaser_input['title']}. Streaming soon.", "seconds": 4}
        ],
        "shots": [
            {"prompt": f"close-up, tense, cinematic, 4K. {teaser_input['title']} opening tension", "duration": 4},
            {"prompt": f"wide cinematic reveal, moody atmosphere, {teaser_input['mood']}, dramatic shadows", "duration": 5},
            {"prompt": f"intense confrontation, emotional stakes, {teaser_input['genre']} film look, shallow depth of field", "duration": 5},
            {"prompt": "final hero shot, explosive reveal, premium OTT trailer aesthetic, subtle motion", "duration": 4}
        ]
    }


def parseJsonPayload(text: str) -> Dict[str, Any]:
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.strip("`")
        if cleaned.lower().startswith("json"):
            cleaned = cleaned[4:].strip()
    return json.loads(cleaned)


def _extract_video_url(payload: Any) -> Optional[str]:
    if isinstance(payload, str) and payload.startswith("http"):
        return payload

    if isinstance(payload, dict):
        direct = payload.get("output") or payload.get("video_url") or payload.get("url")
        if isinstance(direct, str) and direct.startswith("http"):
            return direct

        if isinstance(direct, list):
            for item in direct:
                if isinstance(item, str) and item.startswith("http"):
                    return item
                if isinstance(item, dict):
                    nested = item.get("url") or item.get("video_url")
                    if isinstance(nested, str) and nested.startswith("http"):
                        return nested

        data = payload.get("data")
        if isinstance(data, list):
            for item in data:
                if isinstance(item, dict):
                    nested = item.get("url") or item.get("video_url") or item.get("output")
                    if isinstance(nested, str) and nested.startswith("http"):
                        return nested

    if isinstance(payload, list):
        for item in payload:
            maybe = _extract_video_url(item)
            if maybe:
                return maybe

    return None


def _local_windows_tts_to_mp3(text: str, output_path: Path) -> bool:
    if platform.system().lower() != "windows":
        return False

    txt_path = output_path.with_suffix(".txt")
    wav_path = output_path.with_suffix(".wav")
    txt_path.write_text(text, encoding="utf-8")

    txt_ps = str(txt_path).replace("'", "''")
    wav_ps = str(wav_path).replace("'", "''")

    ps_script = (
        "Add-Type -AssemblyName System.Speech;"
        "$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer;"
        f"$synth.Rate = {LOCAL_TTS_RATE};"
        f"$text = Get-Content -Raw '{txt_ps}';"
        f"$synth.SetOutputToWaveFile('{wav_ps}');"
        "$synth.Speak($text);"
        "$synth.Dispose();"
    )

    subprocess.run(["powershell", "-NoProfile", "-Command", ps_script], check=True, capture_output=True)
    subprocess.run(
        [FFMPEG_BIN, "-y", "-i", str(wav_path), "-codec:a", "libmp3lame", "-q:a", "4", str(output_path)],
        check=True,
        capture_output=True
    )

    try:
        txt_path.unlink(missing_ok=True)
        wav_path.unlink(missing_ok=True)
    except Exception:
        pass

    return output_path.exists() and output_path.stat().st_size > 0


# ============================================================================
# 1. SCRIPT GENERATION (LLM)
# ============================================================================

def generate_script(
    title: str,
    genre: str,
    language: str,
    duration: int,
    mood: str,
    vo_style: str,
    max_retries: int = 2
) -> Dict[str, Any]:
    """
    Generate a 30-60 second teaser script using LLM.

    Args:
        title: Movie/content title.
        genre: Content genre (e.g., "thriller", "comedy").
        language: Language code (e.g., "en", "hi").
        duration: Target duration in seconds (30-60).
        mood: Mood descriptor (e.g., "tense", "inspirational", "mysterious").
        vo_style: Voice-over delivery style (e.g., "whispered", "dramatic", "slow").
        max_retries: Number of retries on API failure.

    Returns:
        JSON object with "lines" and "shots" arrays:
        {
            "lines": [
                {"text": "...", "seconds": 3},
                ...
            ],
            "shots": [
                {"prompt": "...", "duration": 4},
                ...
            ]
        }
    """
    logger.info(f"Generating script for '{title}' ({genre}, {duration}s)")

    prompt = f"""You are a world-class film editor and screenwriter. Generate a compelling {duration}-second teaser script for a {language} {genre} OTT title:

Title: {title}
Genre: {genre}
Mood: {mood}
Voice-Over Style: {vo_style}
Target Duration: {duration} seconds

Output a JSON object with exactly this shape:
{{
  "lines": [
    {{"text": "<voice-over line>", "seconds": <duration of this line>}},
    ...
  ],
  "shots": [
    {{"prompt": "<cinematic shot description for AI generation>", "duration": <duration>}},
    ...
  ]
}}

Rules:
- Each line duration must be realistic (2-5 seconds typical).
- Sum of all line durations should be ~{int(duration * 0.6)} seconds (leaving room for clips + silence).
- Shots are cinematic directions for AI text-to-video.
- Shots should match the mood ({mood}) and genre ({genre}).
- Use vivid, specific language for shot prompts (e.g., "close-up of face, rain drops, cinematic, 4K, tense").
- Include 4-6 shots total.
- Voice-over style is "{vo_style}" — reflect this in tone/pacing of lines.
- Return ONLY valid JSON, no markdown, no extra text.
"""

    fallback_input = {"title": title, "genre": genre, "language": language, "duration": duration, "mood": mood, "vo_style": vo_style}

    if OPENROUTER_API_KEY:
        try:
            logger.info("Attempting script generation via OpenRouter")
            response = requests.post(
                f"{OPENROUTER_API_BASE}/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://shortfundly.com",
                    "X-Title": "Shortfundly Teaser Generator"
                },
                json={
                    "model": OPENROUTER_MODEL,
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.7,
                    "max_tokens": 1500
                },
                timeout=90
            )
            response.raise_for_status()

            content = response.json()["choices"][0]["message"]["content"]
            script = parseJsonPayload(content)
            if isinstance(script.get("lines"), list) and isinstance(script.get("shots"), list):
                if not script.get("narration"):
                    script["narration"] = " ".join(
                        str(item.get("text", "")).strip()
                        for item in script.get("lines", [])
                        if isinstance(item, dict) and str(item.get("text", "")).strip()
                    ).strip()
                logger.info(f"Script generated via OpenRouter: {len(script['lines'])} lines, {len(script['shots'])} shots")
                return script
            logger.warning("OpenRouter response missing required keys; using fallback")
        except Exception as e:
            logger.warning(f"OpenRouter script generation failed: {e}")

    if not OPENAI_API_KEY:
        logger.warning("OPENAI_API_KEY is missing; using local fallback teaser script.")
        return fallbackScript(fallback_input)

    for attempt in range(max_retries):
        try:
            response = requests.post(
                f"{OPENAI_API_BASE}/chat/completions",
                headers={"Authorization": f"Bearer {OPENAI_API_KEY}"},
                json={
                    "model": "gpt-4o-mini",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.8,
                    "max_tokens": 1500,
                }
            )
            response.raise_for_status()

            content = response.json()["choices"][0]["message"]["content"]
            script = parseJsonPayload(content)
            if not script.get("narration") and isinstance(script.get("lines"), list):
                script["narration"] = " ".join(
                    str(item.get("text", "")).strip()
                    for item in script.get("lines", [])
                    if isinstance(item, dict) and str(item.get("text", "")).strip()
                ).strip()

            logger.info(f"Script generated: {len(script['lines'])} lines, {len(script['shots'])} shots")
            return script

        except Exception as e:
            logger.warning(f"Script generation attempt {attempt + 1} failed: {e}")
            message = str(e).lower()
            if "401" in message or "unauthorized" in message or "invalid_api_key" in message:
                logger.warning("OpenAI authorization failed; using local fallback teaser script.")
                return fallbackScript(fallback_input)
            if attempt == max_retries - 1:
                logger.warning("Falling back to local teaser script after repeated script generation failures.")
                return fallbackScript(fallback_input)
            time.sleep(2 ** attempt)  # Exponential backoff

    return fallbackScript(fallback_input)


# ============================================================================
# 2. VOICE-OVER GENERATION (TTS)
# ============================================================================

def generate_voiceover(
    lines: List[Dict[str, Any]],
    language: str,
    voice_id: str = "21m00Tcm4TlvDq8ikWAM",
    output_path: Optional[str] = None
) -> str:
    """
    Generate voice-over audio from script lines using TTS.

    Args:
        lines: List of {"text": "...", "seconds": N} from script.
        language: Language code (e.g., "en", "hi").
        voice_id: ElevenLabs voice ID (default: Rachel).
        output_path: Path to save MP3. If None, generates in OUTPUT_DIR.

    Returns:
        Path to the generated MP3 file.
    """
    logger.info(f"Generating voice-over for {len(lines)} lines (language: {language})")

    output_path = Path(output_path or OUTPUT_DIR / f"voiceover_{datetime.now().strftime('%Y%m%d_%H%M%S')}.mp3")
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Combine all lines into a single narration
    full_text = " ".join([line["text"] for line in lines])
    selected_voice = VOICE_STYLE_TO_OPENAI_VOICE.get(voice_id, voice_id)
    if selected_voice not in {"alloy", "echo", "fable", "onyx", "nova", "shimmer"}:
        selected_voice = OPENAI_TTS_VOICE

    try:
        # Free/local path: synthesize with Windows TTS first when configured.
        if VOICEOVER_PROVIDER in {"local", "windows", "auto"}:
            try:
                if _local_windows_tts_to_mp3(full_text, output_path):
                    logger.info(f"Voice-over saved via local Windows TTS: {output_path}")
                    return str(output_path)
            except Exception as local_error:
                logger.warning(f"Local Windows TTS failed, trying network providers: {local_error}")

        # If explicitly local-only, skip paid APIs.
        if VOICEOVER_PROVIDER == "local":
            raise RuntimeError("Local voice-over unavailable; generating silent fallback audio")

        # Prefer OpenAI TTS because the workspace already has an OpenAI key.
        # If voice_id matches a supported OpenAI voice name, use it; otherwise fall back to alloy.
        response = requests.post(
            f"{OPENAI_API_BASE}/audio/speech",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": OPENAI_TTS_MODEL,
                "input": full_text,
                "voice": selected_voice,
                "response_format": "mp3"
            },
            timeout=180
        )

        if not response.ok:
            openai_error = response.text[:500]
            if ELEVENLABS_API_KEY:
                logger.warning(f"OpenAI TTS failed, trying ElevenLabs fallback: {openai_error}")
                response = requests.post(
                    f"{ELEVENLABS_API_BASE}/text-to-speech/{selected_voice}",
                    headers={"xi-api-key": ELEVENLABS_API_KEY},
                    json={
                        "text": full_text,
                        "model_id": "eleven_monolingual_v1",
                        "voice_settings": {
                            "stability": 0.5,
                            "similarity_boost": 0.75,
                        }
                    },
                    timeout=180
                )
                response.raise_for_status()
            else:
                raise RuntimeError(f"OpenAI TTS request failed: {response.status_code} {openai_error}")

        with open(output_path, "wb") as f:
            f.write(response.content)

        logger.info(f"Voice-over saved: {output_path}")
        return str(output_path)

    except Exception as e:
        logger.warning(f"Voice-over generation failed; generating silent fallback audio instead: {e}")
        fallback_seconds = max(4, min(60, int(sum(float(line.get("seconds", 3)) for line in lines) or 12)))

        silent_cmd = [
            FFMPEG_BIN,
            "-y",
            "-f", "lavfi",
            "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
            "-t", str(fallback_seconds),
            "-c:a", "libmp3lame",
            str(output_path)
        ]
        subprocess.run(silent_cmd, check=True, capture_output=True)
        logger.info(f"Silent fallback voice-over saved: {output_path}")
        return str(output_path)


# ============================================================================
# 3. CINEMATIC SHOT GENERATION (TEXT-TO-VIDEO)
# ============================================================================

def generate_cinematic_shots(
    shot_prompts: List[Dict[str, Any]],
    model: str = "segmind/text-to-video-ms-1b",
    output_dir: Optional[str] = None
) -> List[str]:
    """
    Generate cinematic shots from text prompts using text-to-video API.

    Args:
        shot_prompts: List of {"prompt": "...", "duration": N} from script.
        model: T2V model name (e.g., Segmind Wan 2.6).
        output_dir: Directory to save generated videos. If None, uses TEMP_DIR.

    Returns:
        List of paths to generated MP4 files.
    """
    logger.info(f"Generating {len(shot_prompts)} cinematic shots")

    output_dir = Path(output_dir or TEMP_DIR / "shots")
    output_dir.mkdir(parents=True, exist_ok=True)

    generated_paths = []

    for idx, shot in enumerate(shot_prompts):
        prompt = shot["prompt"]
        duration = shot.get("duration", 4)

        logger.info(f"Shot {idx + 1}/{len(shot_prompts)}: {prompt[:80]}...")

        try:
            # Call Segmind (or similar) T2V API
            response = requests.post(
                f"{SEGMIND_API_BASE}/segmind/text-to-video-ms-1b",
                headers={"x-api-key": SEGMIND_API_KEY},
                json={
                    "prompt": f"4K, cinematic, film-like, shallow depth of field. {prompt}",
                    "negative_prompt": "low quality, blurry, pixelated, poor lighting",
                    "num_frames": int(duration * 24),  # Assume 24fps
                    "height": 1080,
                    "width": 1920,
                    "num_inference_steps": 30,
                    "guidance_scale": 7.5,
                }
                ,timeout=300
            )
            response.raise_for_status()

            content_type = response.headers.get("content-type", "")
            if "video/" in content_type or "application/octet-stream" in content_type:
                output_path = output_dir / f"shot_{idx:02d}.mp4"
                with open(output_path, "wb") as f:
                    f.write(response.content)
                generated_paths.append(str(output_path))
                logger.info(f"Shot {idx + 1} saved (binary): {generated_paths[-1]}")
                continue

            # Handle JSON response (URL wrapper)
            result = response.json()
            video_url = _extract_video_url(result)

            if isinstance(video_url, str) and video_url.startswith("http"):
                # Download the generated video
                video_data = requests.get(video_url, timeout=180).content
                output_path = output_dir / f"shot_{idx:02d}.mp4"
                with open(output_path, "wb") as f:
                    f.write(video_data)
                generated_paths.append(str(output_path))
            else:
                logger.warning(f"Shot {idx + 1} returned no usable video URL")
                continue

            logger.info(f"Shot {idx + 1} saved: {generated_paths[-1]}")

        except Exception as e:
            logger.error(f"Failed to generate shot {idx}: {e}")
            # Continue with remaining shots rather than failing entirely
            continue

    if not generated_paths:
        logger.warning("No shots generated successfully. Continuing with original clips only.")
        return []

    return generated_paths


# ============================================================================
# 4. CLIP SELECTION & TRIMMING
# ============================================================================

def select_and_trim_clips(
    clip_paths: List[str],
    target_duration: int = 45,
    segment_length: int = 6,
    output_dir: Optional[str] = None
) -> List[str]:
    """
    Select and trim key moments from original clips.

    Approach:
    - Analyze clips to find high-motion or high-contrast moments.
    - Trim 3-5 segments of ~6 seconds each.
    - Total trimmed duration should be ~20-25 seconds (balanced with VO + shots).

    Args:
        clip_paths: List of input video file paths.
        target_duration: Total teaser duration target (seconds).
        segment_length: Length of each trimmed segment (seconds).
        output_dir: Directory to save trimmed clips. If None, uses TEMP_DIR.

    Returns:
        List of paths to trimmed clip files.
    """
    logger.info(f"Trimming clips (target segments: ~{segment_length}s each)")

    output_dir = Path(output_dir or TEMP_DIR / "trimmed_clips")
    output_dir.mkdir(parents=True, exist_ok=True)

    trimmed_paths = []
    max_segments = max(1, (target_duration - 15) // segment_length)  # Leave room for VO + shots

    for clip_idx, clip_path in enumerate(clip_paths[:max_segments]):
        if not Path(clip_path).exists():
            logger.warning(f"Clip not found: {clip_path}")
            continue

        try:
            # Get clip duration
            probe_cmd = [
                FFPROBE_BIN, "-v", "error",
                "-show_entries", "format=duration",
                "-of", "default=noprint_wrappers=1:nokey=1",
                clip_path
            ]
            duration_str = subprocess.check_output(probe_cmd).decode().strip()
            clip_duration = float(duration_str)

            # Select a random segment (or heuristic-based high-motion segment)
            # For now, simple approach: take middle 6 seconds
            start_time = max(0, (clip_duration - segment_length) / 2)
            start_time = min(start_time, clip_duration - segment_length)

            output_path = output_dir / f"clip_{clip_idx:02d}_trim.mp4"

            # Use FFmpeg to trim
            trim_cmd = [
                FFMPEG_BIN, "-i", clip_path,
                "-ss", str(start_time),
                "-t", str(segment_length),
                "-c:v", "libx264", "-preset", "fast", "-crf", "23",
                "-c:a", "aac", "-b:a", "128k",
                "-y", str(output_path)
            ]

            subprocess.run(trim_cmd, check=True, capture_output=True)
            trimmed_paths.append(str(output_path))
            logger.info(f"Trimmed clip {clip_idx}: {output_path}")

        except Exception as e:
            logger.error(f"Failed to trim clip {clip_idx}: {e}")
            continue

    if not trimmed_paths:
        logger.warning("No clips trimmed successfully. Falling back to original clips.")
        for fallback in clip_paths[:3]:
            if Path(fallback).exists():
                trimmed_paths.append(str(Path(fallback)))

    return trimmed_paths


# ============================================================================
# 5. FINAL ASSEMBLY (FFmpeg)
# ============================================================================

def assemble_teaser(
    clip_paths: List[str],
    shot_paths: List[str],
    vo_path: str,
    music_path: Optional[str] = None,
    output_path: Optional[str] = None,
    target_duration: int = 45,
    color_grade: bool = True
) -> str:
    """
    Assemble final teaser: concatenate clips + shots, mix VO + music, apply filters.

    Assembly order:
    1. Concatenate video files (clips + shots).
    2. Scale/pad to 1920x1080 if needed.
    3. Apply color grading (brightness, saturation, film grain).
    4. Mix audio (VO + background music).
    5. Trim to target duration.
    6. Encode and save.

    Args:
        clip_paths: List of original clip paths.
        shot_paths: List of generated shot paths.
        vo_path: Path to voice-over MP3.
        music_path: Path to background music (optional).
        output_path: Final output path. If None, generates in OUTPUT_DIR.
        target_duration: Target teaser duration (seconds).
        color_grade: Apply cinematic color grading.

    Returns:
        Path to final teaser MP4.
    """
    logger.info(f"Assembling teaser ({target_duration}s)")

    output_path = Path(output_path or OUTPUT_DIR / f"teaser_{datetime.now().strftime('%Y%m%d_%H%M%S')}.mp4")
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Combine all video paths (any order; typically: clips + shots)
    all_video_paths = clip_paths + shot_paths
    if not all_video_paths:
        raise ValueError("No video files to assemble.")

    # Step 1: Create concat demux file for FFmpeg
    concat_file = TEMP_DIR / "concat_list.txt"
    with open(concat_file, "w") as f:
        for vpath in all_video_paths:
            # Use absolute normalized paths so concat works reliably on Windows.
            resolved = Path(vpath).resolve().as_posix()
            safe_path = resolved.replace("'", "'\\''")
            f.write(f"file '{safe_path}'\n")

    logger.info(f"Concatenating {len(all_video_paths)} video segments")

    # Step 2: Build FFmpeg filtergraph
    filters = []

    # Video: Scale all to 1920x1080, apply color grading
    filters.append("scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black")

    if color_grade:
        # Cinematic color grading: boosted shadows, warm highlights, slight saturation
        filters.append("eq=brightness=0.05:contrast=1.1:saturation=1.2")
        # Film grain (subtle noise)
        filters.append("hqdn3d=luma_spatial=0.8:chroma_spatial=0.8")

    video_filter = ",".join(filters)

    # Step 3: FFmpeg concat + encode
    try:
        temp_concat_video = TEMP_DIR / "concat_video.mp4"
        concat_cmd = [
            FFMPEG_BIN,
            "-f", "concat", "-safe", "0", "-i", str(concat_file),
            "-vf", video_filter,
            "-c:v", "libx264", "-preset", "slow", "-crf", "20",
            "-c:a", "aac", "-b:a", "192k",
            "-y", str(temp_concat_video)
        ]
        logger.info(f"Running: {' '.join(concat_cmd)}")
        subprocess.run(concat_cmd, check=True, capture_output=True)

        # Step 4: Mix audio (VO + music) and trim to target duration
        audio_filter = []
        audio_inputs = ["-i", vo_path]

        if music_path and Path(music_path).exists():
            audio_inputs.extend(["-i", music_path])
            # Pan: VO at 100%, music at 40%
            audio_filter.append("[1:a]volume=1.0[vo];[2:a]volume=0.4[music];[vo][music]amix=inputs=2:duration=longest[a]")
            audio_map = "-map", "[a]"
        else:
            # Just VO
            audio_filter.append("[1:a]volume=1.0[a]")
            audio_map = "-map", "[a]"

        audio_filter_str = ";".join(audio_filter) if audio_filter else "[0:a]"

        # Final mux: concat video + mixed audio, trim to target duration
        final_cmd = [
            FFMPEG_BIN,
            "-i", str(temp_concat_video),
            *audio_inputs,
            "-filter_complex", audio_filter_str,
            "-map", "0:v",
            *audio_map,
            "-t", str(target_duration),
            "-c:v", "libx264", "-preset", "fast", "-crf", "21",
            "-c:a", "aac", "-b:a", "192k",
            "-movflags", "+faststart",
            "-y", str(output_path)
        ]

        logger.info(f"Running final encode: {' '.join(final_cmd)}")
        subprocess.run(final_cmd, check=True, capture_output=True)

        logger.info(f"Teaser assembled successfully: {output_path}")
        return str(output_path)

    except subprocess.CalledProcessError as e:
        logger.error(f"FFmpeg error: {e.stderr.decode('utf-8', errors='ignore')}")
        raise RuntimeError(f"Failed to assemble teaser: {e}")
    except Exception as e:
        logger.error(f"Assembly failed: {e}")
        raise


# ============================================================================
# 6. HIGH-LEVEL ORCHESTRATION
# ============================================================================

def create_teaser(
    title: str,
    genre: str,
    language: str,
    duration_seconds: int,
    mood: str,
    vo_style: str,
    clip_paths: List[str],
    music_path: Optional[str] = None,
    poster_image_url: Optional[str] = None,
    output_path: Optional[str] = None,
) -> Dict[str, str]:
    """
    End-to-end teaser generation orchestration.

    Args:
        title: Movie/content title.
        genre: Content genre.
        language: Language code.
        duration_seconds: Target teaser duration (30-60 seconds).
        mood: Mood descriptor.
        vo_style: Voice-over delivery style.
        clip_paths: List of original clip file paths.
        music_path: Path to background music track.
        poster_image_url: URL to poster image (for metadata).
        output_path: Final output path (optional).

    Returns:
        Dictionary with paths and metadata:
        {
            "teaser_path": "...",
            "script": {...},
            "voiceover_path": "...",
            "generated_shots": [...],
            "trimmed_clips": [...],
        }
    """
    logger.info(f"=== Starting teaser generation for '{title}' ===")

    try:
        # 1. Generate script
        script = generate_script(title, genre, language, duration_seconds, mood, vo_style)

        # 2. Generate voice-over
        vo_path = generate_voiceover(script["lines"], language, vo_style)

        # 3. Generate cinematic shots
        shot_paths = generate_cinematic_shots(script["shots"])

        # 4. Trim original clips
        trimmed_clip_paths = select_and_trim_clips(clip_paths, target_duration=duration_seconds)

        # 5. Assemble final teaser
        final_teaser_path = assemble_teaser(
            clip_paths=trimmed_clip_paths,
            shot_paths=shot_paths,
            vo_path=vo_path,
            music_path=music_path,
            output_path=output_path,
            target_duration=duration_seconds,
            color_grade=True
        )

        logger.info(f"=== Teaser generation complete: {final_teaser_path} ===")

        return {
            "teaser_path": final_teaser_path,
            "script": script,
            "voiceover_path": vo_path,
            "generated_shots": shot_paths,
            "trimmed_clips": trimmed_clip_paths,
            "metadata": {
                "title": title,
                "genre": genre,
                "language": language,
                "duration": duration_seconds,
                "mood": mood,
                "vo_style": vo_style,
                "created_at": datetime.now().isoformat(),
            }
        }

    except Exception as e:
        logger.error(f"Teaser generation failed: {e}")
        raise


# ============================================================================
# CLI / DEMO
# ============================================================================

if __name__ == "__main__":
    """
    Example usage / demo.
    """
    logger.info("Teaser Generator Module Loaded")

    # Example: Create a teaser
    # Uncomment and adjust paths as needed

    """
    result = create_teaser(
        title="Echoes of Our Voices",
        genre="thriller",
        language="en",
        duration_seconds=45,
        mood="mysterious",
        vo_style="whispered",
        clip_paths=[
            "./clips/clip1.mp4",
            "./clips/clip2.mp4",
            "./clips/clip3.mp4",
        ],
        music_path="./music/background.mp3",
        poster_image_url="https://example.com/poster.jpg",
    )

    print("Generated teaser metadata:")
    print(json.dumps(result["metadata"], indent=2))
    print(f"Teaser saved: {result['teaser_path']}")
    """
