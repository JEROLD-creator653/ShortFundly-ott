# 🎬 God-Level AI Teaser Generator for Shortfundly

A production-ready Python module that automates professional 30-60 second teaser generation for OTT platforms. Combines LLM-driven script writing, text-to-speech voice-over, AI video generation, and cinematic assembly into a single, modular pipeline.

---

## 📋 Quick Links

| Document | Purpose |
|----------|---------|
| **[QUICKSTART.md](QUICKSTART.md)** | 5-minute setup + first teaser |
| **[TEASER_GENERATOR_GUIDE.md](TEASER_GENERATOR_GUIDE.md)** | Complete architecture & integration docs |
| **[teaser_generator.py](teaser_generator.py)** | Core module (production code) |
| **[generate_teaser_cli.py](generate_teaser_cli.py)** | CLI runner for manual/batch teaser generation |
| **[.env.teaser.example](.env.teaser.example)** | Environment configuration template |
| **[teaser_config.example.json](teaser_config.example.json)** | JSON config file example |
| **[requirements_teaser.txt](requirements_teaser.txt)** | Python dependencies |

---

## 🎯 Features

✅ **LLM-Powered Script Generation**
- GPT-4o-mini generates contextual, mood-aware teaser narration
- Outputs structured JSON with shot descriptions + voice-over timing
- Supports multi-language scripts

✅ **Professional Voice-Over (TTS)**
- ElevenLabs integration for natural-sounding narration
- 30+ voice options + emotional delivery styles
- Adjustable stability/similarity for consistent voice across clips

✅ **Cinematic AI Shots**
- Text-to-video generation (Segmind Wan 2.6 or similar)
- Customizable shot prompts + visual parameters
- 4-6 AI-generated video segments per teaser

✅ **Smart Clip Trimming**
- Analyzes original clips for key moments
- Extracts 5-8 second segments for optimal pacing
- Balances AI shots with authentic footage

✅ **Professional Assembly**
- FFmpeg-based video concatenation + encoding
- Cinematic color grading (brightness, contrast, saturation)
- Subtle film grain for premium look
- Audio mixdown (voice-over + background music)

✅ **Modular & Extensible**
- Use individual functions (script, VO, shots, trim, assemble)
- Swap T2V APIs (Runware, Pika, Runway) with minimal code change
- Supports custom FFmpeg filters and presets
- Clean logging + error handling

---

## 🏗️ Architecture Overview

```
Input
  │
  ├─→ [LLM Script] → Script JSON (lines + shots)
  │        │
  │        ├─→ [TTS Voice-Over] → VO Audio
  │        └─→ [T2V Shots] → Generated Videos
  │
  ├─→ [Clip Trimming] → Trimmed Segments (5-8s each)
  │
  └─→ [FFmpeg Assembly]
          │
          ├─ Video: Concat + Scale → Color Grade
          ├─ Audio: Mix VO + Music
          └─ Output: Final MP4

Result: Teaser MP4 + Metadata JSON
```

**Processing time per teaser:** ~9-12 minutes
- Script: 10-20s
- Voice-over: 15-30s  
- Shots: 3-5 min (T2V model time)
- Clips: 30-45s
- Assembly: 5-7 min

---

## 💾 Installation

### 1. System Dependencies

```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt-get install ffmpeg

# Windows: Download from https://ffmpeg.org/download.html
```

### 2. Python Setup

```bash
# Create environment
python3 -m venv teaser_env
source teaser_env/bin/activate  # macOS/Linux
# OR: teaser_env\Scripts\activate (Windows)

# Install packages
pip install -r requirements_teaser.txt
```

### 3. API Configuration

```bash
# Copy example config
cp .env.teaser.example .env.teaser

# Edit with your API keys
nano .env.teaser
```

**Get API keys:**
- **OpenAI**: https://platform.openai.com/api-keys
- **ElevenLabs**: https://elevenlabs.io/app/subscription
- **Segmind**: https://segmind.com/dashboard

---

## 🚀 Usage

### Command Line (Simplest)

```bash
python3 generate_teaser_cli.py \
  --title "My Movie Title" \
  --genre thriller \
  --language en \
  --duration 45 \
  --mood "tense, mysterious" \
  --voice-style "dramatic, slow" \
  --clips clip1.mp4 clip2.mp4 clip3.mp4 \
  --music background_music.mp3 \
  --output ./my_teaser.mp4
```

### Using JSON Config

```bash
python3 generate_teaser_cli.py --config teaser_config.json
```

### Programmatic (Python)

```python
from teaser_generator import create_teaser

result = create_teaser(
    title="Echoes of Our Voices",
    genre="thriller",
    language="en",
    duration_seconds=45,
    mood="mysterious, tense",
    vo_style="whispered, dramatic",
    clip_paths=["clip1.mp4", "clip2.mp4"],
    music_path="bg_music.mp3",
)

print(f"Teaser: {result['teaser_path']}")
print(f"Script: {result['script']}")
```

### Validate Without Running

```bash
python3 generate_teaser_cli.py --config teaser_config.json --dry-run
```

---

## 🛠️ API Integrations

### LLM: OpenAI (Script)
- **Model**: `gpt-4o-mini` (fast, cost-effective)
- **Input**: Title, genre, language, duration, mood, voice style
- **Output**: JSON with narration lines + shot descriptions
- **Cost**: ~$0.001-0.002 per script

### TTS: ElevenLabs (Voice-Over)
- **Voices**: 30+ options (Rachel, Bella, Antoni, etc.)
- **Languages**: 30+ supported
- **Output**: MP3 audio track
- **Cost**: ~$0.03-0.06 per teaser

### T2V: Segmind (Cinematic Shots)
- **Model**: `segmind/text-to-video-ms-1b`
- **Output**: 1920x1080 MP4 @ 24fps
- **Customizable**: Guidance scale, inference steps, negative prompts
- **Cost**: ~1-2 credits per generation

### Video Assembly: FFmpeg (Local)
- **Free**: Runs on your infrastructure
- **Features**: Concat, scale, color grade, audio mix
- **Output**: H.264 MP4 (optimized quality/speed)

---

## 📊 Cost Analysis

| Component | Per Teaser | For 100 Teasers |
|-----------|-----------|-----------------|
| Script (OpenAI) | $0.001 | $0.10 |
| Voice-Over (ElevenLabs) | $0.04 | $4.00 |
| Shots (Segmind) | $0.02-0.05* | $2-5 |
| **Total** | **~$0.06-0.09** | **~$6-9** |

*Varies by T2V API pricing model (credits, tokens, etc.)

**Recommendation**: Start with free tier / trial credits to test quality before committing budget.

---

## 🔌 Integration with Shortfundly

### Add to Teaser Admin Panel

```typescript
// app/api/teasers/generate-ai/route.ts
import { exec } from "child_process";

export async function POST(req: Request) {
  const { title, genre, language, duration, mood, voiceStyle, clips, music } = await req.json();

  const result = await new Promise((resolve, reject) => {
    exec(
      `python3 ./teaser_generator.py --title "${title}" --genre ${genre} ...`,
      (error, stdout, stderr) => {
        if (error) reject(error);
        resolve(JSON.parse(stdout));
      }
    );
  });

  return Response.json(result);
}
```

### Update Database

```typescript
// Store teaser metadata in MongoDB
await db.titles.updateOne(
  { _id: filmId },
  {
    $set: {
      teaser_url: "https://cdn.shortfundly.com/teasers/my_title.mp4",
      teaser_ai_version: "2.0",
      teaser_script: result.script,
      teaser_created_at: new Date(),
    }
  }
);
```

### Display in UI

```jsx
// Hero video component
<video 
  src="https://cdn.shortfundly.com/teasers/my-title.mp4"
  autoPlay
  muted
  loop
/>
```

---

## 🎨 Customization Examples

### Adjust Color Grading

Edit `assemble_teaser()` in `teaser_generator.py`:

```python
# Warmer, more saturated look
filters.append("colorbalance=rs=0.15:gs=-0.05:bs=0.1")
filters.append("saturation=1.4")
```

### Different T2V API

Replace Segmind with Runware:

```python
# In generate_cinematic_shots()
response = requests.post(
    "https://api.runware.ai/v1",
    headers={"Authorization": f"Bearer {RUNWARE_API_KEY}"},
    json={"input": [{"taskType": "imageInference", ...}]}
)
```

### Parallel API Calls

```python
import asyncio

async def generate_parallel():
    results = await asyncio.gather(
        generate_voiceover_async(...),
        generate_cinematic_shots_async(...),
    )
    return results
```

---

## 📝 Module Functions Reference

### High-Level Orchestration

```python
create_teaser(
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
) → Dict[str, Any]
```

### Individual Components

```python
generate_script(...) → Dict[str, Any]          # LLM script
generate_voiceover(...) → str                  # MP3 file path
generate_cinematic_shots(...) → List[str]      # MP4 file paths
select_and_trim_clips(...) → List[str]         # MP4 file paths
assemble_teaser(...) → str                     # Final MP4 path
```

See [teaser_generator.py](teaser_generator.py) for full docstrings and type hints.

---

## 🔧 Troubleshooting

| Error | Solution |
|-------|----------|
| `FFmpeg not found` | Install FFmpeg + verify in PATH |
| `OPENAI_API_KEY not set` | Check `.env.teaser` loaded correctly (no quotes) |
| `No shots generated` | Check Segmind quota + try simpler prompts |
| `429 API rate limit` | Add exponential backoff delay |
| `Clip not found` | Verify file paths are absolute or correct relative paths |

See [TEASER_GENERATOR_GUIDE.md](TEASER_GENERATOR_GUIDE.md#troubleshooting) for detailed debugging.

---

## 📚 Learning Resources

- **[QUICKSTART.md](QUICKSTART.md)** — Get up and running in 5 minutes
- **[TEASER_GENERATOR_GUIDE.md](TEASER_GENERATOR_GUIDE.md)** — Deep dive into architecture
- **[teaser_generator.py](teaser_generator.py)** — Inline code documentation
- **Code examples** in `/examples/` (future)

---

## 🛣️ Roadmap

- [ ] Batch mode (generate 100+ teasers in parallel)
- [ ] Quality scoring (ML-based review of generated teasers)
- [ ] Built-in CDN upload (S3, Cloudflare, Bunny)
- [ ] Webhook notifications (alert when teaser is ready)
- [ ] UI component library (React teaser preview)
- [ ] A/B testing framework (compare mood/style variants)
- [ ] Cost dashboard (track API spend per title)
- [ ] Alternative T2V APIs (Runway, Pika, etc.)

---

## 📄 License

Part of the Shortfundly OTT platform. Internal use only.

---

## 👥 Support

Questions or issues? Check:
1. **[QUICKSTART.md](QUICKSTART.md)** for setup help
2. **[TEASER_GENERATOR_GUIDE.md](TEASER_GENERATOR_GUIDE.md)** for detailed docs
3. **Inline code comments** in `teaser_generator.py`
4. **Example config files** for reference

---

## 🚀 Get Started Now

```bash
# 1. Clone/navigate to project
cd shortfundly-OTT

# 2. Install dependencies
pip install -r requirements_teaser.txt

# 3. Configure API keys
cp .env.teaser.example .env.teaser
nano .env.teaser

# 4. Generate your first teaser
python3 generate_teaser_cli.py \
  --title "Your Title" \
  --genre action \
  --language en \
  --clips sample.mp4 \
  --mood "intense" \
  --voice-style "dramatic"
```

**Result:** Professional teaser MP4 in ~10 minutes! 🎬

---

**Version**: 2.0 (AI-Enhanced)
**Last Updated**: April 2026
