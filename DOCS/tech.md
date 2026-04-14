# Shortfundly OTT — Tech Stack

## Framework & Build
- **Next.js** with **Turbopack** (build runtime: `turbopack-e0da089665c4e140.js`)
- Build ID: `O_dvVCSShe7fEGj2glwTC` (content-hashed, changes per deployment)
- Rendering: RSC (React Server Components) + SSR
- Output: Minified, code-split JS chunks under `/_next/static/chunks/`

## Frontend
- React (via Next.js)
- CSS: Single global stylesheet (`9303c6473dc8ab2d.css`, ~113 KB)
- Fonts: Self-hosted DM Sans (`assets/fonts/dm-sans-v17-latin-regular.woff2`) + Google Fonts fallback
- PWA: `manifest.webmanifest` with standalone display mode

## Authentication
- Multi-method auth: Email/Password, Phone+OTP, Google, Facebook, Apple OAuth
- Session storage keys in `localStorage`: `SF_TOKEN`, `SF_VERIFICATION`, `SF_USER`
- `SF_USER` is AES-encrypted using **CryptoJS** before storage
- Auth module chunk: `1116af657944a004.js`

## Backend / API
- Backend: Google Cloud Run (`mpc2-prod-26-is5qnl632q-uc.a.run.app`)
- Content API: REST-based Films Service (chunk `a39527c0d60e0d9e.js`)
- API constants pattern: named exports like `GET_FILMS`, `GET_MEDIA_FILMS`, `BANNER_FILMS`, etc.

## Video
- Player: **JWPlayer** (CDN: `cdn.jwplayer.com`, thumbnails: `assets-jpcust.jwpsrv.com`)
- Video CDN: **Upremium** (`cdn-1.upremium.asia`, `delivery.upremium.asia`, `player.upremium.asia`)
- Ad-supported video: Google IMA SDK (`imasdk.googleapis.com`)
- Streaming format: HLS / m3u8

## Analytics & Monitoring
- Google Tag Manager (GTM-M9HDWD)
- Google Analytics 4 + Legacy UA
- Facebook Pixel (ID: 2030911494325643)
- Hotjar (heatmaps/session recording)
- Cloudflare Web Analytics
- ContentSquare (session analytics — ad-heavy sessions)
- CleverTap (push & engagement)
- Nielsen/IMR (audience measurement)

## Advertising
- Google Ad Manager / DoubleClick (pubads, securepubads, pagead2, googleads)
- Flashtalking (full stack: 5 domains)
- Eskimi DSP (Asia-Pacific)
- Criteo (retargeting)
- PubMatic, OpenX, RTB House, YLD.is, FastRiver
- Prebid.js (header bidding)

## Push Notifications
- **OneSignal** (`cdn.onesignal.com`, `api.onesignal.com`)
- **iZooto** (`cdn.izooto.com`)

## Payments (dns-prefetched)
- Razorpay, PhonePe, Stripe

## Key JS Chunks (reference)
| Chunk | Role |
|---|---|
| `249261e921aeebba.js` | Main app logic (~431 KB) |
| `057799b3a2dd977f.js` | Core components (~334 KB) |
| `1116af657944a004.js` | Auth module + CryptoJS AES |
| `a39527c0d60e0d9e.js` | Films Service — all content API calls |
| `4ac967680cca6761.js` | UI components |
| `9e86e114e92f1e45.js` | Utility/helper module |
| `20f89aef8bdb518d.js` | Runtime/polyfills |
| `turbopack-e0da089665c4e140.js` | Turbopack runtime |
