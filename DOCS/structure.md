# Shortfundly OTT — Project Structure

## Repository Context
This workspace contains **HAR/website capture analysis** of `web.shortfundly.com`, not the original source code. Files are organized as captured network responses, mirroring the domain/path structure of each request made during a browser session.

Two captures exist side-by-side:
- `web.shortfundly.com_1/` — Guest homepage session (599 files, 31.56 MB)
- `web.shortfundly.com_2/` — Auth + ad-heavy session (2,121 files, 48.11 MB)

Both share the same Next.js build ID (`O_dvVCSShe7fEGj2glwTC`) — same deployment, different sessions.

---

## Capture Folder Layout

Each capture folder mirrors the network request origin:

```
web.shortfundly.com_N/
├── web.shortfundly.com/          # The actual app files
│   ├── index.html                # Main HTML entry point
│   ├── manifest.webmanifest      # PWA manifest
│   ├── assets/
│   │   ├── images/               # Static images (whatsapp.png, sf_circle_logo.svg)
│   │   └── fonts/                # Self-hosted fonts (DM Sans woff2) [_2 only]
│   ├── auth/
│   │   └── signin/               # Auth page RSC responses [_2 only]
│   └── _next/
│       └── static/
│           └── chunks/           # All JS bundles + single CSS file
├── cdn.onesignal.com/            # OneSignal SDK source (160 files each)
├── pubads.g.doubleclick.net/     # Google Publisher Ads responses
├── pagead2.googlesyndication.com/# Google AdSense responses
├── cdn-1.upremium.asia/          # Video HLS/m3u8 segments
├── player.upremium.asia/         # Upremium player JS
├── imasdk.googleapis.com/        # Google IMA SDK (video ads)
├── cdn.jwplayer.com/             # JWPlayer media metadata
├── cdn.izooto.com/               # iZooto push SDK
├── connect.facebook.net/         # Facebook SDK
├── www.googletagmanager.com/     # GTM script
├── static.hotjar.com/            # Hotjar script
├── static.cloudflareinsights.com/# Cloudflare beacon
├── csi.gstatic.com/              # Google CSI (607 files in _2 — heavy ad session)
├── mpc2-prod-26-is5qnl632q-uc.a.run.app/ # Shortfundly Cloud Run backend [_1 only]
└── _DataURI/                     # Inline data URIs saved as .txt files
```

### _2-only domains (ad-heavy session)
```
ad-events.flashtalking.com/   cdn.flashtalking.com/   d9.flashtalking.com/
secure.flashtalking.com/      servedby.flashtalking.com/
dsp-ap.eskimi.com/            dsp-trk.eskimi.com/     dsp-media.eskimi.com/
gumi.criteo.com/              static.criteo.net/
c.ba.contentsquare.net/       t.contentsquare.net/
eu1.clevertap-prod.com/       tags.crwdcntrl.net/
secure-gl.imrworldwide.com/   *.darnuid.imrworldwide.com/
static.addtoany.com/          fonts.gstatic.com/
```

---

## App File Structure (inside `web.shortfundly.com/`)

### Next.js Chunks (`_next/static/chunks/`)
All chunks are content-hashed. Key ones:

| File | Purpose |
|---|---|
| `249261e921aeebba.js` | Main app bundle |
| `057799b3a2dd977f.js` | Core components |
| `1116af657944a004.js` | Auth + CryptoJS AES |
| `a39527c0d60e0d9e.js` | Films Service API module [_2 only] |
| `4ac967680cca6761.js` | UI components |
| `9303c6473dc8ab2d.css` | Global stylesheet (single file) |
| `turbopack-e0da089665c4e140.js` | Turbopack runtime |

### Auth Pages (`auth/signin/`) — _2 only
Six RSC response files representing the full signin page render:
- `signin.html` — RSC metadata shell
- `signin (1).html` — Full RSC payload with Navbar, ToastProvider, BottomNavigation
- `signin (5).html` — Complete signin UI with all form components

---

## Key Conventions

- **File naming**: Captured responses use the original URL path. Hash-suffixed `.html` files (e.g. `csi-039668a1ea483.html`) represent unique parameterized requests to the same endpoint.
- **Data URIs**: Inline data URIs are saved as `.txt` files under `_DataURI/` with content-hashed names.
- **Session differences**: When comparing _1 vs _2, differences reflect session state (guest vs auth/ad-targeted), not code versions.
- **No source maps**: Chunks are minified production builds — no source maps present in captures.
- **Single CSS file**: All styles are bundled into one CSS chunk (no CSS modules or separate per-page stylesheets visible in output).
- **RSC pattern**: Auth and page routes return multiple RSC fragment files per route (numbered suffixes indicate streaming chunks).
