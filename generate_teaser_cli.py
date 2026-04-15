#!/usr/bin/env python3
"""
CLI Runner for AI Teaser Generator

Usage:
    python3 generate_teaser_cli.py \
        --title "My Movie" \
        --genre thriller \
        --language en \
        --duration 45 \
        --mood "tense, mysterious" \
        --voice-style "dramatic, slow" \
        --clips clip1.mp4 clip2.mp4 clip3.mp4 \
        --music background.mp3 \
        --output ./my_teaser.mp4

Or with a JSON config file:
    python3 generate_teaser_cli.py --config teaser_config.json
"""

import json
import sys
import argparse
import logging
import os
from pathlib import Path
from typing import Optional, List
from dotenv import load_dotenv

# Import the teaser generator module
from teaser_generator import create_teaser, logger as tg_logger

# ============================================================================
# SETUP
# ============================================================================

# Load environment from the configured teaser env file, then fall back to local defaults.
load_dotenv(os.getenv("TEASER_ENV_FILE") or ".env.teaser", override=True)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)


# ============================================================================
# CLI ARGUMENT PARSER
# ============================================================================

def create_parser() -> argparse.ArgumentParser:
    """Create CLI argument parser."""
    parser = argparse.ArgumentParser(
        description="Generate professional AI teasers for OTT content",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Direct arguments
  python3 generate_teaser_cli.py \\
    --title "The Silent Night" \\
    --genre drama \\
    --language en \\
    --duration 45 \\
    --mood "haunting, mysterious" \\
    --voice-style "whispered, slow" \\
    --clips clip1.mp4 clip2.mp4 \\
    --music cinematic_bg.mp3 \\
    --output ./output/teaser.mp4

  # From JSON config file
  python3 generate_teaser_cli.py --config config.json

  # Minimal mode (uses defaults for optional fields)
  python3 generate_teaser_cli.py \\
    --title "My Title" \\
    --genre action \\
    --language en \\
    --clips clip.mp4
        """
    )

    # Config file option (alternative to direct arguments)
    parser.add_argument(
        "--config",
        type=str,
        help="Path to JSON config file with teaser parameters"
    )

    # Direct arguments
    parser.add_argument(
        "--title",
        type=str,
        required=False,
        help="Movie/content title"
    )

    parser.add_argument(
        "--genre",
        type=str,
        default="drama",
        help="Content genre (e.g., thriller, action, comedy, drama)"
    )

    parser.add_argument(
        "--language",
        type=str,
        default="en",
        help="Language code (e.g., en, hi, ta, te)"
    )

    parser.add_argument(
        "--duration",
        type=int,
        default=45,
        help="Target teaser duration in seconds (30-60)"
    )

    parser.add_argument(
        "--mood",
        type=str,
        default="intriguing",
        help="Mood descriptor (e.g., tense, mysterious, inspirational)"
    )

    parser.add_argument(
        "--voice-style",
        type=str,
        default="dramatic",
        help="Voice-over style (e.g., whispered, dramatic, slow, excited)"
    )

    parser.add_argument(
        "--clips",
        nargs="+",
        required=True,
        help="One or more clip file paths"
    )

    parser.add_argument(
        "--music",
        type=str,
        help="Path to background music file (optional)"
    )

    parser.add_argument(
        "--poster",
        type=str,
        help="URL to poster image (optional)"
    )

    parser.add_argument(
        "--output",
        type=str,
        help="Output path for final teaser (optional; auto-generated if not specified)"
    )

    parser.add_argument(
        "--no-color-grade",
        action="store_true",
        help="Skip cinematic color grading"
    )

    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Validate config without running generation"
    )

    return parser


# ============================================================================
# CONFIG LOADING & VALIDATION
# ============================================================================

def load_config_from_file(config_path: str) -> dict:
    """Load configuration from JSON file."""
    try:
        with open(config_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: Config file not found: {config_path}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in config file: {e}")
        sys.exit(1)


def validate_clips(clips: List[str]) -> None:
    """Validate that all clip files exist."""
    for clip in clips:
        if not Path(clip).exists():
            print(f"Error: Clip file not found: {clip}")
            sys.exit(1)


def validate_optional_files(music: Optional[str] = None) -> None:
    """Validate optional audio/image files."""
    if music and not Path(music).exists():
        print(f"Error: Music file not found: {music}")
        sys.exit(1)


def validate_parameters(
    title: str,
    genre: str,
    language: str,
    duration: int,
    clips: List[str],
) -> None:
    """Validate all required parameters."""
    if not title or not title.strip():
        print("Error: Title is required")
        sys.exit(1)

    if duration < 30 or duration > 60:
        print("Error: Duration must be between 30-60 seconds")
        sys.exit(1)

    if not clips or not all(clips):
        print("Error: At least one clip is required")
        sys.exit(1)

    validate_clips(clips)


# ============================================================================
# MAIN CLI WORKFLOW
# ============================================================================

def main():
    """Main CLI entry point."""
    parser = create_parser()
    args = parser.parse_args()

    # Load from config file if provided
    if args.config:
        config = load_config_from_file(args.config)
        # Merge config file values with CLI args (CLI takes precedence)
        title = args.title or config.get("title")
        genre = args.genre or config.get("genre", "drama")
        language = args.language or config.get("language", "en")
        duration = args.duration or config.get("duration", 45)
        mood = args.mood or config.get("mood", "intriguing")
        voice_style = args.voice_style or config.get("voice_style", "dramatic")
        clips = args.clips or config.get("clips", [])
        music = args.music or config.get("music")
        poster = args.poster or config.get("poster")
        output = args.output or config.get("output")
    else:
        # Use direct CLI arguments
        title = args.title
        genre = args.genre
        language = args.language
        duration = args.duration
        mood = args.mood
        voice_style = args.voice_style
        clips = args.clips
        music = args.music
        poster = args.poster
        output = args.output

    # Validate required parameters
    validate_parameters(title, genre, language, duration, clips)
    validate_optional_files(music)

    print("\n" + "="*80)
    print("AI TEASER GENERATOR")
    print("="*80)
    print(f"Title:        {title}")
    print(f"Genre:        {genre}")
    print(f"Language:     {language}")
    print(f"Duration:     {duration}s")
    print(f"Mood:         {mood}")
    print(f"Voice Style:  {voice_style}")
    print(f"Clips:        {len(clips)} file(s)")
    print(f"Music:        {'Yes' if music else 'No'}")
    print(f"Output:       {output or 'auto-generated'}")
    print("="*80 + "\n")

    # Dry-run mode
    if args.dry_run:
        print("[OK] Configuration valid. Run without --dry-run to generate teaser.")
        sys.exit(0)

    # Generate teaser
    try:
        result = create_teaser(
            title=title,
            genre=genre,
            language=language,
            duration_seconds=duration,
            mood=mood,
            vo_style=voice_style,
            clip_paths=clips,
            music_path=music,
            poster_image_url=poster,
            output_path=output,
        )

        print("\n" + "="*80)
        print("[OK] TEASER GENERATION COMPLETE")
        print("="*80)
        print(f"Final Teaser:    {result['teaser_path']}")
        print(f"Voice-Over:      {result['voiceover_path']}")
        print(f"Generated Shots: {len(result['generated_shots'])} clips")
        print(f"Trimmed Clips:   {len(result['trimmed_clips'])} segments")
        print("="*80 + "\n")

        # Save metadata summary
        metadata_path = Path(result["teaser_path"]).parent / "metadata.json"
        with open(metadata_path, "w") as f:
            json.dump(result, f, indent=2, default=str)
        print(f"Metadata saved: {metadata_path}\n")

        # Print script for reference
        print("Generated Script:")
        print("-" * 80)
        for line in result["script"]["lines"]:
            print(f"  [{line['seconds']}s] {line['text']}")
        print("-" * 80 + "\n")

        sys.exit(0)

    except KeyboardInterrupt:
        print("\n[ERROR] Generation cancelled by user")
        sys.exit(130)
    except Exception as e:
        print(f"\n[ERROR] Generation failed: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


# ============================================================================
# EXAMPLE CONFIG FILE GENERATOR
# ============================================================================

def generate_example_config(output_path: str = "teaser_config.example.json"):
    """Generate an example JSON config file."""
    example = {
        "title": "Echoes of Our Voices",
        "genre": "thriller",
        "language": "en",
        "duration": 45,
        "mood": "mysterious, tense",
        "voice_style": "whispered, dramatic",
        "clips": [
            "./clips/scene_1.mp4",
            "./clips/scene_2.mp4",
            "./clips/scene_3.mp4",
        ],
        "music": "./music/cinematic_bg.mp3",
        "poster": "https://example.com/poster.jpg",
        "output": "./output/echoes_teaser.mp4"
    }

    with open(output_path, "w") as f:
        json.dump(example, f, indent=2)

    print(f"Example config saved: {output_path}")


# ============================================================================
# Entry Point
# ============================================================================

if __name__ == "__main__":
    main()
