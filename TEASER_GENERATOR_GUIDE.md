# AI Teaser Generator Integration Guide

## Overview

This Python module implements a complete, production-ready AI teaser generation pipeline for OTT platforms. It orchestrates multiple AI services (LLM, TTS, Text-to-Video) to create professional 30-60 second teasers from metadata and clips.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Input                               │
│  title, genre, language, mood, clips[], music, poster_url   │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
    ┌─────────────┐          ┌──────────────┐
    │ LLM Script  │          │ Clip Trimming│
    │ Generation  │          │   & Setup    │
    └──────┬──────┘          └──────┬───────┘
           │                        │
           ├────────┬──────────┬────┤
           ▼        ▼          ▼    ▼
       ┌────────┐┌──────┐ ┌─────────────┐
       │  TTS   ││ T2V  │ │ Trimmed     │
       │Voice   ││Shots │ │ Clips       │
       └────┬───┘└───┬──┘ └──────┬──────┘
            │        │           │
            └────────┴───────────┤
                     ▼
            ┌──────────────────┐
            │ FFmpeg Assembly  │
            │ (mux, mix audio) │
            └────────┬─────────┘
                     ▼
            ┌──────────────────┐
            │ Final Teaser MP4 │
            │ + Metadata       │
            └──────────────────┘
```

## Setup

### Prerequisites

1. **System Requirements**
   ```bash
   # macOS
   brew install ffmpeg

   # Ubuntu/Debian
   sudo apt-get install ffmpeg

   # Windows (via chocolatey)
   choco install ffmpeg
   ```

2. **Python Environment** (Python 3.9+)
   ```bash
   python3 -m venv teaser_env
   source teaser_env/bin/activate  # On Windows: teaser_env\Scripts\activate

   pip install -r requirements_teaser.txt
   ```

### Environment Configuration

Create a `.env.teaser` file in the project root:

```env
# ============================================================================
# OpenAI (Script Generation)
# ============================================================================
OPENAI_API_KEY=sk-proj-your-key-here
OPENAI_API_BASE=https://api.openai.com/v1

# ============================================================================
# ElevenLabs (TTS Voice-Over)
# ============================================================================
ELEVENLABS_API_KEY=your-elevenlabs-key
ELEVENLABS_API_BASE=https://api.elevenlabs.io/v1
# Voice IDs: 21m00Tcm4TlvDq8ikWAM (Rachel), etc.

# ============================================================================
# Segmind / Text-to-Video (Cinematic Shots)
# ============================================================================
SEGMIND_API_KEY=your-segmind-key
SEGMIND_API_BASE=https://api.segmind.com/v1

# ============================================================================
# FFmpeg Binary Path (if not in system PATH)
# ============================================================================
FFMPEG_BIN=ffmpeg

# ============================================================================
# Output Directory
# ============================================================================
TEASER_OUTPUT_DIR=./teaser_output
```

Then load in your Python script:
```python
from dotenv import load_dotenv
load_dotenv(".env.teaser")
```

## Usage

### Basic Example

```python
from teaser_generator import create_teaser

result = create_teaser(
    title="Echoes of Our Voices",
    genre="thriller",
    language="en",
    duration_seconds=45,
    mood="mysterious, tense",
    vo_style="whispered, dramatic",
    clip_paths=[
        "/films/echoes/clip_1.mp4",
        "/films/echoes/clip_2.mp4",
        "/films/echoes/clip_3.mp4",
    ],
    music_path="/music/cinematic_bg.mp3",
    poster_image_url="https://cdn.shortfundly.com/posters/echoes.jpg",
    output_path="./output/echoes_teaser_v1.mp4",
)

print(f"Teaser created: {result['teaser_path']}")
print(f"Voice-over: {result['voiceover_path']}")
print(f"Script:\n{json.dumps(result['script'], indent=2)}")
```

### Advanced: Integrate with Node.js Backend

Create a Node.js endpoint that spawns the Python script:

```javascript
// app/api/teasers/generate-ai/route.ts (Next.js)

import { spawn } from "child_process";
import { promisify } from "util";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, genre, language, duration, mood, voiceStyle, clipPaths, musicPath } = body;

  return new Promise((resolve, reject) => {
    const python = spawn("python3", ["./teaser_generator.py"], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        TEASER_TITLE: title,
        TEASER_GENRE: genre,
        TEASER_LANGUAGE: language,
        TEASER_DURATION: String(duration),
        TEASER_MOOD: mood,
        TEASER_VO_STYLE: voiceStyle,
        TEASER_CLIPS: JSON.stringify(clipPaths),
        TEASER_MUSIC: musicPath,
      },
    });

    let output = "";
    let errorOutput = "";

    python.stdout?.on("data", (data) => {
      output += data.toString();
    });

    python.stderr?.on("data", (data) => {
      errorOutput += data.toString();
    });

    python.on("close", (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(output);
          resolve(
            new Response(JSON.stringify(result), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            })
          );
        } catch (e) {
          reject(e);
        }
      } else {
        resolve(
          new Response(JSON.stringify({ error: errorOutput }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          })
        );
      }
    });
  });
}
```

### Modular Usage: Per-Component

If you want to use individual components separately:

```python
from teaser_generator import (
    generate_script,
    generate_voiceover,
    generate_cinematic_shots,
    select_and_trim_clips,
    assemble_teaser
)

# 1. Just generate a script
script = generate_script(
    title="The Silent Night",
    genre="drama",
    language="hi",
    duration=45,
    mood="haunting",
    vo_style="slow, measured"
)

print(json.dumps(script, indent=2))

# 2. Generate VO separately
vo_path = generate_voiceover(
    lines=script["lines"],
    language="hi",
    voice_id="custom_voice_id"
)

# 3. Generate shots
shots = generate_cinematic_shots(script["shots"])

# 4. Trim clips
trimmed = select_and_trim_clips([...clip_paths...], target_duration=45)

# 5. Assemble all together
final_teaser = assemble_teaser(
    clip_paths=trimmed,
    shot_paths=shots,
    vo_path=vo_path,
    music_path="./music.mp3",
    output_path="./final_teaser.mp4"
)
```

## API Integrations

### 1. Script Generation (OpenAI)

The module uses OpenAI's Chat API (gpt-4o-mini) to generate:
- Voice-over narration lines (2-5 sentences each)
- Shot descriptions for AI video generation
- Optimized for mood, duration, and language

**Example response:**

```json
{
  "lines": [
    {
      "text": "In the shadows, secrets fester.",
      "seconds": 3
    },
    {
      "text": "One woman discovers the truth.",
      "seconds": 4
    }
  ],
  "shots": [
    {
      "prompt": "Close-up of eyes widening, raining, cinematic, 4K, tense",
      "duration": 4
    },
    {
      "prompt": "Wide shot of city at night, neon signs reflecting on wet streets, cinematic dolly-in",
      "duration": 5
    }
  ]
}
```

### 2. Voice-Over (ElevenLabs)

Uses ElevenLabs API for professional TTS:
- Supports 30+ languages
- Configurable voice IDs and emotional delivery
- Can adjust stability/similarity for consistent voice

**Available voice IDs:**
- `21m00Tcm4TlvDq8ikWAM` (Rachel - clear, professional)
- `EXAVITQu4vr4xnSDxMaL` (Bella - warm, intimate)
- `ThT5KcBeYPX3keUQqHPh` (Antoni - dramatic, male)
- (See ElevenLabs docs for full list)

### 3. Text-to-Video (Segmind)

Generates cinematic video segments from text prompts:
- Model: `segmind/text-to-video-ms-1b` (customizable)
- Outputs 1920x1080 MP4 at 24fps
- Supports negative prompts for quality control

**Example request:**

```json
{
  "prompt": "4K, cinematic, film-like, shallow depth of field. Close-up of face, rain drops, tense",
  "negative_prompt": "low quality, blurry, pixelated, poor lighting",
  "num_frames": 96,
  "height": 1080,
  "width": 1920,
  "num_inference_steps": 30,
  "guidance_scale": 7.5
}
```

### 4. Video Assembly (FFmpeg)

Handles:
- **Concatenation**: Joins multiple MP4s without re-encoding when possible
- **Scaling/Padding**: Ensures consistent 1920x1080 aspect ratio
- **Color Grading**: Brightness, contrast, saturation adjustments + subtle film grain
- **Audio Mixing**: Voice-over (100% volume) + background music (40% volume)
- **Encoding**: H.264 codec, optimized quality/speed tradeoff

## Configuration Best Practices

### API Quotas & Costs

1. **OpenAI (Script)**
   - ~400-600 tokens per script
   - ~$0.001-0.002 per teaser (gpt-4o-mini rates)
   - Tip: Cache the API response for repeated title variations

2. **ElevenLabs (TTS)**
   - ~500-1000 characters per script
   - Pricing: ~$0.03-0.06 per teaser (varies by subscription)
   - Caching VO audio by script hash saves costs

3. **Segmind (T2V)**
   - 1 credit per generation (varies by model)
   - Most expensive component; consider image-to-video alternatives

4. **FFmpeg (Local)**
   - Free; CPU-bound (~5-10 minutes per teaser on good hardware)

### Performance Optimization

1. **Parallel API Calls**
   ```python
   # Future enhancement: use asyncio to parallelize VO + T2V generation
   import asyncio
   
   async def generate_components_parallel(...):
       results = await asyncio.gather(
           generate_voiceover_async(...),
           generate_cinematic_shots_async(...),
       )
   ```

2. **Caching**
   - Cache scripts by content hash
   - Reuse VO for repeated title/mood combos
   - Pre-render common shot templates

3. **CDN Upload**
   ```python
   import boto3
   
   s3 = boto3.client('s3')
   s3.upload_file(
       final_teaser_path,
       bucket='shortfundly-cdn',
       key=f'teasers/{title_slug}/teaser.mp4',
       ExtraArgs={'ContentType': 'video/mp4'}
   )
   ```

## Troubleshooting

### FFmpeg Not Found
```bash
# Verify installation
which ffmpeg  # Linux/Mac
where ffmpeg  # Windows

# If not found, update path in .env.teaser
FFMPEG_BIN=/usr/local/bin/ffmpeg  # or C:\ffmpeg\bin\ffmpeg.exe
```

### API Key Issues
```python
# Verify keys are loaded
import os
from dotenv import load_dotenv
load_dotenv(".env.teaser")
print(os.getenv("OPENAI_API_KEY")[:10] + "...")  # Check if loaded
```

### T2V API Rate Limits
```python
# Add exponential backoff
import time
for attempt in range(3):
    try:
        # API call
        break
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 429:
            time.sleep(2 ** attempt)  # 1s, 2s, 4s...
        else:
            raise
```

### Video Encoding Issues
```bash
# Test FFmpeg with a sample video
ffmpeg -i input.mp4 -c:v libx264 -preset fast -crf 23 output.mp4

# Check if codec is available
ffmpeg -codecs | grep h264
```

## Next Steps

1. **Integrate with your teaser management system**: Store generated metadata in MongoDB
2. **Add webhook support**: Notify frontend when teaser is ready
3. **Implement quality checks**: ML-based review of generated content
4. **Scale with queues**: Use Celery/RQ for background processing
5. **Cost monitoring**: Track API usage and spending per title

## Example: Full Integration with Next.js Admin Panel

See `./shortfundly-app/components/admin/cinematic-teaser-studio.tsx` for the existing teaser UI.

To integrate this Python module:

1. **Add Python process management** to your Next.js server
2. **Create API endpoint** that triggers teaser generation
3. **Update admin UI** to show generation progress
4. **Store metadata** in MongoDB for tracking and replay

Example endpoint:

```typescript
// app/api/teasers/generate-ai/route.ts

import { execChildProcess } from "@/lib/exec-utils";

export async function POST(req: Request) {
  const { title, genre, language, duration, mood, voiceStyle, clips, music } = await req.json();

  const result = await execChildProcess("python3", ["./teaser_generator.py"], {
    TEASER_CONFIG: JSON.stringify({
      title, genre, language, duration, mood, voiceStyle, clips, music
    }),
  });

  return Response.json(JSON.parse(result));
}
```

---

**Questions?** Check the inline code comments in `teaser_generator.py` for detailed function documentation.
