# AI Teaser Generator: Quick Start Guide

Welcome! This guide walks you through setting up and running the God-level AI teaser generator for your OTT platform.

## ⏱️ 5-Minute Setup

### Step 1: Install System Dependencies

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

**Windows (Chocolatey):**
```bash
choco install ffmpeg
```

**Windows (Manual):**
Download from https://ffmpeg.org/download.html and add to PATH.

### Step 2: Set Up Python Environment

```bash
# Navigate to project directory
cd /path/to/shortfundly-OTT

# Create virtual environment
python3 -m venv teaser_env

# Activate it
source teaser_env/bin/activate  # macOS/Linux
# OR
teaser_env\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements_teaser.txt
```

### Step 3: Configure API Keys

```bash
# Copy example environment file
cp .env.teaser.example .env.teaser

# Edit with your API keys
nano .env.teaser  # or your favorite editor
```

**Get your API keys:**

1. **OpenAI**: https://platform.openai.com/api-keys
   - Sign up → Copy secret key → Add to `.env.teaser`

2. **ElevenLabs**: https://elevenlabs.io/app/subscription
   - Sign up → API Keys → Copy → Add to `.env.teaser`

3. **Segmind**: https://segmind.com/dashboard
   - Sign up → API Keys → Copy → Add to `.env.teaser`

### Step 4: Test Installation

```bash
# Verify FFmpeg
ffmpeg -version

# Verify Python packages
python3 -c "import openai, requests; print('✓ All packages installed')"

# Verify teaser generator module
python3 -c "from teaser_generator import create_teaser; print('✓ Module ready')"
```

---

## 🚀 Generate Your First Teaser

### Option A: CLI (Simplest)

```bash
python3 generate_teaser_cli.py \
  --title "My Movie Title" \
  --genre thriller \
  --language en \
  --duration 45 \
  --mood "tense, mysterious" \
  --voice-style "dramatic, slow" \
  --clips sample_clips/clip1.mp4 sample_clips/clip2.mp4 \
  --music sample_music/bg.mp3 \
  --output ./my_first_teaser.mp4
```

### Option B: JSON Config File

1. **Copy example config:**
   ```bash
   cp teaser_config.example.json my_teaser_config.json
   ```

2. **Edit with your details:**
   ```json
   {
     "title": "Your Movie Name",
     "genre": "action",
     "language": "en",
     "duration": 45,
     "mood": "explosive, intense",
     "voice_style": "dramatic",
     "clips": ["path/to/clip1.mp4", "path/to/clip2.mp4"],
     "music": "path/to/music.mp3",
     "output": "./output/teaser.mp4"
   }
   ```

3. **Run:**
   ```bash
   python3 generate_teaser_cli.py --config my_teaser_config.json
   ```

### Option C: Dry-Run (Validate First)

Before spending API credits:

```bash
python3 generate_teaser_cli.py \
  --title "Test" \
  --genre drama \
  --language en \
  --clips test.mp4 \
  --dry-run
```

---

## 📊 Monitoring Generation Progress

The generator logs all steps. Watch for:

```
[INFO] Generating script for 'My Title' (thriller, 45s)
[INFO] Script generated: 5 lines, 4 shots
[INFO] Generating voice-over for 5 lines (language: en)
[INFO] Voice-over saved: ./teaser_output/voiceover_...mp3
[INFO] Generating 4 cinematic shots
[INFO] Shot 1/4: Close-up of face, rain drops...
...
[INFO] Assembling teaser (45s)
[INFO] Concatenating 5 video segments
✓ TEASER GENERATION COMPLETE
```

**Typical timeline:**
- Script generation: ~10 seconds
- Voice-over: ~20 seconds
- Shot generation: ~3-5 minutes (depends on T2V API)
- Clip trimming: ~30 seconds
- Final assembly: ~5 minutes
- **Total: ~9-12 minutes per teaser**

---

## 💰 Cost Breakdown (Per Teaser)

| Component | Cost | Notes |
|-----------|------|-------|
| **Script (OpenAI)** | $0.001-0.002 | ~400 tokens, gpt-4o-mini |
| **Voice-Over (ElevenLabs)** | $0.03-0.06 | ~700 chars, varies by voice |
| **Shot Generation (Segmind)** | ~1-2 credits | Most expensive, varies by T2V model |
| **FFmpeg (Local)** | Free | CPU time only |
| **Total Per Teaser** | ~$0.05-0.10 | Plus fees/credits from your plan |

**Budget estimate for 100 teasers:** ~$10-20 (without credits overhead)

---

## 🔧 Common Configurations

### Thriller/Suspense
```bash
--mood "mysterious, tense, dark"
--voice-style "whispered, dramatic, slow"
--duration 45
```

### Action/Adventure
```bash
--mood "explosive, intense, fast-paced"
--voice-style "excited, fast, commanding"
--duration 45
```

### Drama/Romance
```bash
--mood "emotional, intimate, heartfelt"
--voice-style "warm, slow, gentle"
--duration 50
```

### Comedy
```bash
--mood "playful, light, humorous"
--voice-style "upbeat, fast, witty"
--duration 30
```

---

## 🐛 Troubleshooting

### Error: "FFmpeg not found"
```bash
# Check if installed
which ffmpeg  # macOS/Linux
where ffmpeg  # Windows

# If missing, install it (see Step 1 above)
```

### Error: "OPENAI_API_KEY not set"
```bash
# Verify .env.teaser is loaded
python3 -c "import os; from dotenv import load_dotenv; load_dotenv('.env.teaser'); print(os.getenv('OPENAI_API_KEY')[:20])"

# If empty, check .env.teaser has correct format (no quotes around value)
# OPENAI_API_KEY=sk-proj-xxx  ✓
# OPENAI_API_KEY="sk-proj-xxx"  ✗
```

### Error: "Segmind API rate limit"
```python
# Edit teaser_generator.py, add retry logic:
import time
time.sleep(5)  # Wait before retry
```

### Error: "No shots generated"
- Check Segmind API quota
- Try simpler prompts without technical jargon
- Fall back to using original clips only (no AI shots)

### Video quality issues
- Increase bitrate in `teaser_generator.py`:
  ```python
  "-crf", "18"  # Lower = higher quality (default: 20-23)
  ```
- Increase encode preset to "medium" or "slow" (faster → better quality)

---

## 📁 Output Structure

After successful generation:

```
teaser_output/
├── teaser_20260415_153045.mp4        # Final teaser
├── metadata.json                     # Generation metadata
└── temp/
    ├── voiceover_*.mp3               # Voice-over audio
    ├── shots/
    │   ├── shot_00.mp4
    │   ├── shot_01.mp4
    │   └── ...
    ├── trimmed_clips/
    │   ├── clip_00_trim.mp4
    │   ├── clip_01_trim.mp4
    │   └── ...
    └── concat_*.txt                  # FFmpeg concat lists
```

**Note:** Temp files use ~500MB-1GB disk space. Delete temp/ folder after successful generation to save space.

---

## 📤 Next: Integrate with Your Platform

### Upload to CDN

```bash
# After teaser generation:
aws s3 cp ./teaser_output/teaser_*.mp4 \
  s3://shortfundly-cdn/teasers/my_title/teaser.mp4 \
  --acl public-read

# Or use another CDN (Cloudflare, Bunny, etc.)
```

### Update Database

```python
# MongoDB example
from pymongo import MongoClient

client = MongoClient("mongodb+...")
db = client.shortfundly
titles = db.titles

titles.update_one(
    {"slug": "my-title"},
    {
        "$set": {
            "teaser_url": "https://cdn.shortfundly.com/teasers/my-title/teaser.mp4",
            "teaser_ai_version": "2.0",
            "teaser_created_at": datetime.now(),
        }
    }
)
```

### Display in Your App

```typescript
// Next.js example
<video 
  src="https://cdn.shortfundly.com/teasers/my-title/teaser.mp4"
  controls
  width="100%"
/>
```

---

## ⚙️ Advanced: Custom API Integration

### Use Runware Instead of Segmind

```python
# In teaser_generator.py, replace generate_cinematic_shots():

def generate_cinematic_shots(shot_prompts):
    # Change API endpoint
    endpoint = "https://api.runware.ai/v1"
    
    # Use Runware's API instead
    for shot in shot_prompts:
        response = requests.post(
            endpoint,
            headers={"Authorization": f"Bearer {RUNWARE_API_KEY}"},
            json={
                "input": [{"taskType": "imageInference", ...}]
            }
        )
```

### Parallel API Calls (Speed Up)

```python
import asyncio

async def generate_components_parallel():
    vo, shots = await asyncio.gather(
        generate_voiceover_async(...),
        generate_cinematic_shots_async(...)
    )
```

### Custom Color Grading

Edit the FFmpeg filter in `assemble_teaser()`:

```python
# More aggressive color grading
filters.append("colorbalance=rs=0.1:gs=-0.05:bs=0.15")  # Warm tones
filters.append("brightness=0.1")  # +10% brightness
filters.append("contrast=1.3")     # More punch
```

---

## 📞 Support & Resources

- **OpenAI Docs**: https://platform.openai.com/docs/
- **ElevenLabs Docs**: https://elevenlabs.io/docs/
- **Segmind Docs**: https://docs.segmind.com/
- **FFmpeg Wiki**: https://trac.ffmpeg.org/wiki

---

## 🎬 What's Next?

1. ✅ Generate your first teaser
2. ✅ Integrate with your admin panel
3. ✅ Set up automated batch generation
4. ✅ Monitor quality and costs
5. ✅ A/B test different moods/styles
6. ✅ Scale to hundreds of titles

---

**Ready?** Run your first teaser:

```bash
python3 generate_teaser_cli.py \
  --title "My Awesome Title" \
  --genre thriller \
  --language en \
  --clips sample_clips/clip1.mp4 \
  --mood "tense, mysterious" \
  --voice-style "dramatic"
```

Enjoy! 🎬✨
