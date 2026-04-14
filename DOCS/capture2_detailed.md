# web.shortfundly.com_2 — Detailed Steering Rules

## What This Capture Is
`web.shortfundly.com_2` is a HAR-based website capture of `https://web.shortfundly.com` recorded during an **authenticated, ad-heavy browsing session**. It contains 2,121 files across 61 third-party domains totalling ~48.11 MB.

- Build ID: `O_dvVCSShe7fEGj2glwTC` (same deployment as _1)
- Session type: Homepage browse + `/auth/signin` flow + full ad targeting active
- App version: `v1.0.1`
- Company: Sm Smartygen Media Networks Private Limited (CIN: U72900TN2015PTC102200)
- HQ: Chennai, Tamil Nadu, India
- Founded: September 2015

---

## Top-Level Folder Map (by file count)

| Domain Folder | Files | Role |
|---|---|---|
| `csi.gstatic.com/` | 607 | Google CSI instrumentation (ad session telemetry) |
| `pubads.g.doubleclick.net/` | 575 | Google Publisher Ads — primary ad server |
| `cdn.onesignal.com/` | 160 | OneSignal push notification SDK (full source) |
| `pagead2.googlesyndication.com/` | 132 | Google AdSense / Ad Manager |
| `web.shortfundly.com/` | 97 | The actual app (HTML, JS, CSS, assets) |
| `cdn-1.upremium.asia/` | 72 | HLS video segments (m3u8 + .ts chunks) |
| `googleads.g.doubleclick.net/` | 50 | Google Ads DoubleClick creatives |
| `dsp-ap.eskimi.com/` | 14 | Eskimi DSP — Asia-Pacific ad targeting |
| `ade.googlesyndication.com/` | 11 | Additional Google ad syndication |
| `_DataURI/` | 10 | Inline data URIs saved as .txt |
| `partners.fastriver.eu/` | 8 | FastRiver EU ad partner |
| `dsp-trk.eskimi.com/` | 8 | Eskimi conversion tracking |
| `data.ad-score.com/` | 7 | Ad fraud/quality scoring |
| `www.googletagmanager.com/` | 7 | GTM (container: GTM-M9HDWD) |
| `ad-events.flashtalking.com/` | 6 | Flashtalking ad event tracking |

---

## App Files (`web.shortfundly.com/`)

### Entry Points
```
web.shortfundly.com/
├── index.html                          # 917.7 KB — minified SSR HTML shell
├── manifest.webmanifest                # PWA manifest
├── assets/
│   ├── fonts/
│   │   └── dm-sans-v17-latin-regular.woff2   # Self-hosted DM Sans font
│   └── images/
│       ├── sf_circle_logo.svg          # Favicon + apple-touch-icon
│       └── whatsapp.png               # WhatsApp share icon
├── auth/
│   ├── signin.html                    # RSC metadata shell (2.8 KB)
│   ├── signin (1).html                # Full RSC layout payload (42.5 KB)
│   ├── signin (2).html                # Minimal RSC fragment (0.4 KB)
│   ├── signin (3).html                # Minimal RSC fragment (0.4 KB)
│   ├── signin (4).html                # Partial RSC payload (1.0 KB)
│   └── signin (5).html                # Complete signin UI (117.8 KB)
├── _/mss/boq-content-ads-contributor/ # Google Ads contributor JS (served via app domain)
└── _next/
    ├── image*.html                    # 69 Next.js image optimization responses
    └── static/chunks/                 # All JS bundles + CSS
```

### JS/CSS Chunks (all content-hashed)

| File | Size | Role |
|---|---|---|
| `249261e921aeebba.js` | 431.6 KB | Main app bundle — routing, state, core logic |
| `057799b3a2dd977f.js` | 334.5 KB | Core components — Navbar, Footer, shared UI |
| `4ac967680cca6761.js` | 201.2 KB | UI components — cards, modals, player wrappers |
| `1116af657944a004.js` | 145.5 KB | Auth module + full CryptoJS AES library |
| `9303c6473dc8ab2d.css` | 113.1 KB | Global stylesheet (single file, Tailwind-based) |
| `248d4616a56365e3.js` | 60.8 KB | Page-level components |
| `a39527c0d60e0d9e.js` | 52.1 KB | Films Service — all 23 content API functions |
| `dce2e0dacc1e9464.js` | 51.7 KB | Shared module (refactored in _2) |
| `7340adf74ff47ec0.js` | 49.0 KB | Module (unchanged between _1 and _2) |
| `20f89aef8bdb518d.js` | 48.9 KB | Runtime / polyfills |
| `9e86e114e92f1e45.js` | 48.0 KB | Utility / helper module |
| `2f7f0388fa50b277.js` | 47.4 KB | Module |
| `8788a59c818c88c8.js` | 43.4 KB | Feature module |
| `e30e9a83fb3f6238.js` | 18.7 KB | Shared utilities |
| `turbopack-e0da089665c4e140.js` | 17.9 KB | Turbopack runtime |
| `7a0a31b0bb154d05.js` | 4.2 KB | Small utility |
| `ff1a16fafef87110.js` | 0.4 KB | Minimal entry / stub |

---

## RSC Component Tree (from `signin (1).html`)

The layout shell loaded on every page (including auth) renders these components in order:

```
html[lang="en"]
└── body.bg-black.text-white
    ├── <a href="#main-content"> (skip-to-content, sr-only)
    ├── <noscript> GTM iframe
    ├── <noscript> Facebook Pixel img
    ├── <div id="fb-root">
    ├── FilmPageLoaderProvider         # chunk: dce2e0dacc1e9464 + 248d4616a56365e3 + 1116af657944a004 + 057799b3a2dd977f
    │   └── ToastProvider
    │       ├── Navbar                 # exported from 057799b3a2dd977f.js
    │       ├── <main id="main-content" className="min-h-screen pb-16 lg:pb-0">
    │       │   └── [page slot / children]
    │       ├── GlobalOutstreamAdExceptHome
    │       ├── BottomNavigation       # mobile bottom nav
    │       ├── FloatingButtons
    │       ├── ThirdPartyScripts      # GTM, GA, FB Pixel, Hotjar, iZooto, OneSignal
    │       └── GoogleAnalytics
└── Footer (contentinfo)
    ├── Connect With Us (social links)
    ├── Download Now (app store links)
    ├── Footer nav columns: Company | Resources | Legal | Community | Help & Support
    ├── Our Products (sub-domain links)
    ├── Payment Options section
    ├── Member Of: TiE Chennai, FICCI, DPCGC
    ├── Supported By: Zoho, Microsoft, Startup India
    └── Copyright © 2026 | Incubated: Vel Tech TBI | Funded: StartupTN / STPI
```

### 404 Page (inline in RSC payload)
- `className="min-h-screen bg-black flex items-center justify-center px-4 py-20"`
- Shows "404" in `text-primary` (orange `#FB5A32`)
- Two CTAs: "Go back home" → `/` and "Contact support" → `/contactus`

---

## Auth System (`/auth/signin`)

### Page Metadata
| Property | Value |
|---|---|
| Title | `Sign In \| Shortfundly` |
| Description | `Sign in to your Shortfundly account for premium experience` |
| Author | `Shortfundly Media Labs Pvt Ltd` |
| Robots | `noindex, nofollow` |
| Canonical | `https://web.shortfundly.com/auth/signin` |
| OG Image | `https://web.shortfundly.com/og.jpg` (1200×630) |
| Twitter Card | `summary_large_image` |

### Auth Methods
- Email + Password
- Phone / Mobile + OTP (`getOTP`, `verifyOTP`)
- Google OAuth
- Facebook OAuth
- Apple OAuth
- Register / Sign Up
- Forgot Password / Reset Password
- Email Confirmation

### Session Storage (localStorage)
| Key | Content |
|---|---|
| `SF_TOKEN` | Raw auth token string |
| `SF_VERIFICATION` | Verification token |
| `SF_USER` | AES-encrypted JSON user object (CryptoJS, key hardcoded in `1116af657944a004.js`) |

### Auth API Functions (from `1116af657944a004.js`)
`login`, `logout`, `register`, `getOTP`, `verifyOTP`, `forgotPassword`, `resetPassword`, `confirmEmail`

---

## Films Service API (`a39527c0d60e0d9e.js`)

All functions use `apiClientClient` (axios-based HTTP client). API constants are resolved via `r.API.<CONSTANT>.replace(r.API.BASE_URL, "")` pattern — BASE_URL is stripped and relative path is used.

### Content Fetch Functions

| Function | HTTP | API Constant | Params |
|---|---|---|---|
| `getFilms` | GET | `GET_FILMS` | `page`, `limit`, `sort` (createdAt/popular/oldest) |
| `getFilmDetails` | GET | `GET_MEDIA_FILMS` | film ID |
| `getFilmDetailsBySlug` | GET | `GET_FILM_BY_SLUG` | slug string |
| `getBannerFilms` | GET | `BANNER_FILMS` | none |
| `getPremiumFilms` | GET | `PREMIUM_FILMS` | `page`, `limit`, sort params |
| `getTopRatedFilms` | GET | `TOPRATED` | `page`, `limit` |
| `getLanguageFilms` | GET | `FOR_YOU` | language ID |
| `getUpcomingFilms` | GET | `UPCOMING_FILMS` | `page`, `limit` |
| `getAwardedFilms` | GET | `AWARD_FILMS` | `page`, `limit` |
| `getMovies` | GET | `GET_MOVIES` | `page`, `limit` |
| `getWebSeries` | GET | `WEB_SERIES` | `page`, `limit` |
| `getFreeFilms` | GET | `GET_FREE_MOVIES` | `page`, `limit` |
| `getFilmsByFilter` | GET | `GET_FILMS` | filter params via URLSearchParams |
| `getFilmsByFilterOld` | GET | `GET_FILMS` | legacy filter |
| `getMoviesByFilter` | GET | `GET_MOVIES` | filter params |
| `getRelatedFilms` | GET | `RELATED` | `page=1`, `limit=7`, film ID, language |

### User Content Functions

| Function | HTTP | API Constant | Notes |
|---|---|---|---|
| `getContinueWatchByEmail` | GET | `GET_CONT_WATCH` | email as path param |
| `getWatchlist` | GET | `GET_WATCHLIST` | `page`, `limit=12` |
| `addToWatchlist` | POST | `LIKE` | body: item data |
| `removeFromWatchlist` | POST | `LIKE` | body: item data |
| `deleteWatchlist` | DELETE | `DELETE_WATCHLIST` | item ID |
| `addToFavorites` | POST | `FAV_ADD` | film ID + body |
| `toggleLike` | POST | `TOGGLE_LIKE` | film ID |

### Media Type Filtering (client-side)
- Movies: `media === 1`
- Web Series: `media === 3`
- These are filtered from `getFilms` results when dedicated endpoints are unavailable

### Error Handling Pattern
```js
if (!r.API.GET_FREE_MOVIES) return { success: false, status: false, error: { code: "ENDPOINT_NOT_FOUND", message: "..." } }
if (!r.API.GET_MOVIES) return { success: false, status: false, error: { code: "NO_ENDPOINT" } }
```

---

## UI / Styling Conventions (from RSC payloads)

### Tailwind Class Patterns
- Dark background: `bg-black`, `bg-[#0a0a0a]`
- Primary color (orange): `text-primary`, `bg-primary`, `hover:text-red-500` — maps to `#FB5A32`
- Borders: `border-white/[0.06]`, `border-white/[0.08]`
- Cards/surfaces: `bg-white/[0.04]`, `bg-white/[0.05]`
- Hover states: `hover:bg-white/[0.07]`, `hover:border-white/[0.16]`
- Transitions: `transition-colors duration-200`, `transition-opacity`
- Rounded: `rounded-lg`, `rounded-2xl`, `rounded-full`
- Mobile padding: `pb-16 lg:pb-0` (space for bottom nav on mobile)

### Layout Breakpoints
- Mobile-first with `sm:`, `md:`, `lg:` breakpoints
- Footer grid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`
- Responsive text: `text-3xl sm:text-4xl md:text-5xl`

### Accessibility Patterns
- Skip-to-content link: `href="#main-content"` with `sr-only focus:not-sr-only`
- `<main id="main-content">` landmark
- `aria-label` on all icon-only links (social, app store buttons)
- `role="contentinfo"` on footer
- `role="presentation"` on tracking pixels

### Image Usage
- All images use Next.js `<Image>` component (chunk `85437` in `057799b3a2dd977f.js`)
- Lazy loading: `loading="lazy"` on non-critical images
- Social icons: 22×22px, `h-5 w-5 object-contain`
- App store badges: 100×34px, `h-8 w-auto object-contain`
- Payment icons: 24×24px in 32×32px containers

---

## Head / DNS Prefetch Configuration (from RSC)

### preconnect
- `https://connect.facebook.net`
- `https://image-resizer-cloud-api.akamaized.net`

### dns-prefetch
- `https://apis.google.com`
- `https://js.stripe.com`
- `https://gstatic.com`
- `https://www.googletagmanager.com`
- `https://www.google-analytics.com`
- `https://connect.facebook.net`
- `https://static.hotjar.com`
- `https://cdn.izooto.com`
- `https://cdn.onesignal.com`
- `https://pagead2.googlesyndication.com`
- `https://securepubads.g.doubleclick.net`
- `https://static.addtoany.com`
- `https://content.jwplatform.com`
- `https://checkout.razorpay.com`
- `https://mercury.phonepe.com`
- `https://accounts.google.com`

### Inline Head Scripts
1. `window.dataLayer = window.dataLayer || []` — queues analytics before GTM loads
2. `window.gtag = window.gtag || function() { window.dataLayer.push(arguments) }`
3. `window.googletag = window.googletag || {cmd: []}` — GPT ad library init
4. GPT script: `<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js">`

### SEO / Structured Data
- `google-site-verification` meta tag present (value: `your_code_here` — placeholder not yet set)
- OpenSearch: `/opensearch.xml`
- JSON-LD: `Organization` schema + `WebSite` schema with `SearchAction`
  - Search URL pattern: `https://web.shortfundly.com/search?q={query}`
  - Organization email: `support@shortfundly.com`
  - sameAs: Facebook, Twitter/X, Instagram, LinkedIn, YouTube

---

## Payment Options (from Footer RSC)

### UPI
Google Pay, PhonePe, BHIM UPI

### Net Banking
SBI, HDFC, ICICI, Axis Bank

### Cards
Visa, Mastercard, American Express, Rupay

### Wallets
Amazon Pay, Mobikwik, PhonePe Wallet, Airtel Payments Bank

> Payment icons are served from `storage.googleapis.com/ticket9-prod.appspot.com/imagesDetails/...`

---

## Sub-Domain Product Ecosystem (from Footer)

| Sub-domain | Product |
|---|---|
| `https://ott.shortfundly.com/` | OTT SaaS |
| `https://hub.shortfundly.com/` | Hub |
| `https://festival.shortfundly.com/` | Festival |
| `https://ticket.shortfundly.com/` | Ticket |
| `https://connect.shortfundly.com/` | Connect |
| `https://rent.shortfundly.com/` | Rent |
| `https://play.shortfundly.com/` | Play |
| `https://distribution.shortfundly.com/` | Distribution |
| `https://shortsott.shortfundly.com/` | Shorts OTT |
| `https://tools.shortfundly.com/` | Tools |

---

## Footer Navigation Routes

### Company
`/about`, `/our-story`, `/how-it-works`, `/browse-festivals`, `/culture`, `/become-affiliate`, `/testimonials`, `/contactus`
External: Careers (wellfound.com), Advertise with us (blog.shortfundly.com)

### Resources
`/awards-recognition`, `/get-the-app/auto`, `/faq`
External: Blogs, Press, Newsroom (blog.shortfundly.com)

### Legal
`/terms-and-conditions`, `/privacy-policy`, `/grievances-redressal`, `/refund-policy`, `/shipping-policy`

### Community
WhatsApp Community, Telegram Community (`t.me/panindiafilmmakers`), Facebook Community (`/groups/shortfilmpromo`), Threads, LinkedIn, YouTube

### Help & Support
Both links → WhatsApp: `https://api.whatsapp.com/send/?phone=9361223155`

---

## Third-Party Ad Stack (full detail)

### Google Ad Infrastructure
| Domain | Path | Role |
|---|---|---|
| `pubads.g.doubleclick.net/` | `/gampad/`, `/pagead/` | Primary publisher ad server (575 files) |
| `pagead2.googlesyndication.com/` | `/pagead/js/`, `/pagead/managed/js/activeview/`, `/pagead/managed/js/adsense/`, `/omsdk/releases/live/`, `/pcs/` | AdSense + OMSDK (132 files) |
| `googleads.g.doubleclick.net/` | `/pagead/html/r20260408/`, `/pagead/interaction/`, `/xbbe/` | Ad creatives + interaction tracking (50 files) |
| `googleads4.g.doubleclick.net/` | `/pcs/` | Additional DoubleClick endpoint |
| `ade.googlesyndication.com/` | `/ddm/activity/` | DDM activity tracking (11 files) |
| `securepubads.g.doubleclick.net/` | `/pagead/managed/js/gpt/`, `/tag/js/` | Secure GPT tag (2 files) |
| `cm.g.doubleclick.net/` | `/partnerpixels` | Cookie matching |
| `s0.2mdn.net/` | `/instream/video/` | DoubleClick media CDN |
| `csi.gstatic.com/` | `/csi` | Client-side instrumentation (607 files) |
| `ep2.adtrafficquality.google/` | `/sodar/` | Ad traffic quality |
| `www.googleadservices.com/` | `/pagead/managed/js/activeview/` | Active view measurement |
| `www.googletagservices.com/` | `/activeview/js/current/` | Legacy tag services |
| `imasdk.googleapis.com/` | `/js/core/`, `/js/sdkloader/`, `/pal/sdkloader/`, `/formats/wta/` | IMA SDK for video ads |

### Flashtalking (5 domains)
| Domain | Path | Role |
|---|---|---|
| `ad-events.flashtalking.com/` | — | Event tracking (6 files) |
| `cdn.flashtalking.com/` | `/229487/`, `/oba/icon/` | Creative CDN + OBA icon |
| `d9.flashtalking.com/` | `/img/` | Image delivery |
| `secure.flashtalking.com/` | `/oba/icon/` | Secure OBA endpoint |
| `servedby.flashtalking.com/` | `/imp/1/297960;10446430;201;gif/`, `/imp/7/297960;10446430;208;xml/`, `/state/10446430;5897881;...` | Ad serving + state tracking |

> Flashtalking campaign ID: `297960`, placement: `10446430`

### Eskimi DSP (5 domains)
| Domain | Path | Role |
|---|---|---|
| `dsp-ap.eskimi.com/` | `/event/`, `/tracking/` | Asia-Pacific events + tracking (14 files) |
| `dsp-trk.eskimi.com/` | — | Conversion tracking (8 files) |
| `dsp-media.eskimi.com/` | `/assets/js/e/`, `/upload/` | Media assets + JS (3 files) |
| `dspmedia.eskimi.com/` | — | Media CDN (2 files) |
| `win.eskimi.com/` | — | RTB win notification (2 files) |

### Retargeting & Audience
| Domain | Path | Role |
|---|---|---|
| `gumi.criteo.com/` | — | Criteo retargeting engine |
| `static.criteo.net/` | `/js/ld/` | Criteo JS library |
| `tags.crwdcntrl.net/` | `/lt/c/16589/` | Lotame DMP (audience segment ID: 16589) |
| `secure-gl.imrworldwide.com/` | `/cgi-bin/` | Nielsen/IMR audience measurement |
| `4haxvqoo8zaku6pszk60hpmiwplhw1776178437.darnuid.imrworldwide.com/` | — | Nielsen unique device ID |
| `l28ndjjb3qggrupki7uimtiahcqel1776178327.darnuid.imrworldwide.com/` | — | Nielsen unique device ID |
| `invstatic101.creativecdn.com/` | `/encrypted-signals/` | RTB House encrypted signals |
| `ads.pubmatic.com/` | `/AdServer/js/` | PubMatic ad exchange JS |
| `oa.openxcdn.net/` | — | OpenX ad CDN |
| `cdn.yld.is/` | `/ow/` | YLD.is content/ad platform |
| `partners.fastriver.eu/` | `/r/yw281Ysk97USKnReR4Wp3_G2G8WoxjVh.../` | FastRiver EU (8 files, hashed path) |
| `data.ad-score.com/` | — | Ad fraud/quality scoring (7 files) |
| `d2r1yp2w7bby2u.cloudfront.net/` | `/js/` | AWS CloudFront CDN (ad/media assets) |

### Analytics & Behavioral
| Domain | Path | Role |
|---|---|---|
| `c.ba.contentsquare.net/` | `/v2/` | ContentSquare session recording (2 files) |
| `t.contentsquare.net/` | `/uxa/smb/` | ContentSquare event tracking |
| `eu1.clevertap-prod.com/` | — | CleverTap push + engagement (4 files) |
| `static.hotjar.com/` | `/c/` | Hotjar heatmaps |
| `static.cloudflareinsights.com/` | `/beacon.min.js/` | Cloudflare Web Analytics |

---

## Video Infrastructure

### JWPlayer
| Domain | Path | Content |
|---|---|---|
| `cdn.jwplayer.com/v2/media/` | `3NjdYZLf/`, `9Q6C35Yr/`, `EUpGXQwL/`, `gJgkZJ9h/`, `nnxfkdrk/` | 5 media metadata endpoints |
| `assets-jpcust.jwpsrv.com/thumbnails/` | `JS0hvli9-720.jpg`, `tgXcorMw-720.jpg`, `XixDiNft-720.jpg` | Custom thumbnails (720px) |
| `img.jwplayer.com/v1/images/` | — | JWPlayer image assets |

### Upremium
| Domain | Path | Content |
|---|---|---|
| `cdn-1.upremium.asia/uploads/tvcs/m3u8/1732790101_video_new_281124/` | — | HLS video segments (72 files) |
| `delivery.upremium.asia/api/publishers/log/` | — | Publisher delivery logs (3 files) |
| `player.upremium.asia/dist/ucp/v3.1.409/` | — | Upremium player v3.1.409 |
| `player.upremium.asia/player/hls.js/dist/` | — | hls.js library |
| `player.upremium.asia/demo/3rdpartycookiecheck/` | — | 3rd-party cookie check |

> Video content ID in capture: `1732790101_video_new_281124` (timestamp-based naming)

---

## Push Notifications

### OneSignal
| Domain | Path | Content |
|---|---|---|
| `cdn.onesignal.com/sdks/web/v16/` | — | Production SDK bundles |
| `cdn.onesignal.com/sdks/src/` | `core/`, `entries/`, `onesignal/`, `page/`, `shared/`, `sw/` | Full TypeScript source (160 files) |
| `cdn.onesignal.com/sdks/node_modules/pnpm/` | `jsonp@...` | jsonp dependency |
| `onesignal.com/sdks/web/v16/` | — | Root domain SDK mirror |
| `api.onesignal.com/sync/aed95679-b18c-47c8-8dc0-206a1ed17b7d/web` | — | Sync endpoint (App ID: `aed95679-b18c-47c8-8dc0-206a1ed17b7d`) |
| `img.onesignal.com/permanent/7bbb274a-9aa2-434e-87a4-b655.../` | — | Notification images |

> OneSignal App ID: `aed95679-b18c-47c8-8dc0-206a1ed17b7d`

### iZooto
| Domain | Path | Content |
|---|---|---|
| `cdn.izooto.com/scripts/sdk/` | `izooto.js`, `izextf.js` | iZooto push SDK |
| `cdn.izooto.com/scripts/sak/` | — | SAK scripts |

---

## Social & Sharing

### Facebook
| Domain | Path | Role |
|---|---|---|
| `connect.facebook.net/en_US/` | `sdk.js`, `fbevents.js`, `bundle/sdk.js/` | Facebook SDK + Pixel |
| `connect.facebook.net/signals/config/` | `2030911494325643.html` | Pixel config (ID: `2030911494325643`) |
| `www.facebook.com/tr/` | — | Pixel tracking endpoint |
| `www.facebook.com/privacy_sandbox/pixel/register/trigger/` | — | Privacy Sandbox pixel |

### AddToAny
| Domain | Path | Role |
|---|---|---|
| `static.addtoany.com/menu/modules/` | — | Social sharing widget modules (3 files) |

---

## Google Fonts (self-hosted + CDN)

| Domain | Content |
|---|---|
| `fonts.googleapis.com/` | CSS font definitions (2 files) |
| `fonts.gstatic.com/s/googlesans/v67/` | Google Sans font files (2 files) — used in ad creatives |

> DM Sans is self-hosted at `assets/fonts/dm-sans-v17-latin-regular.woff2`. Google Sans appears only in ad creative iframes.

---

## reCAPTCHA
- `www.google.com/recaptcha/api2/` — used on auth/signin form

---

## Key Conventions for Working with This Capture

1. **Read-only analysis** — this is a captured snapshot, not a live codebase. No files should be modified for deployment purposes.
2. **Chunk names are content-hashed** — do not assume chunk filenames are stable across builds. Always reference by role, not filename.
3. **RSC format** — `.html` files under `auth/` are React Server Component wire format (not standard HTML). Parse as RSC payload, not DOM.
4. **Numbered HTML files** — `signin (1).html` through `signin (5).html` are streaming RSC chunks for a single route, delivered in order.
5. **`_next/image*.html` files** — these are Next.js Image Optimization API responses, not pages. Each represents one optimized image request.
6. **Ad domain files** — the 607 `csi.gstatic.com` and 575 `pubads.g.doubleclick.net` files are ad telemetry/creative responses, not app code.
7. **`_DataURI/` files** — `.txt` files containing raw base64 data URIs extracted from inline responses.
8. **API pattern** — all Films Service calls strip `BASE_URL` from constants and use relative paths. The HTTP client is `apiClientClient` (likely axios instance).
9. **Auth security note** — `SF_USER` AES encryption key is hardcoded in the bundle. This is a known security concern in the codebase.
10. **CSS is Tailwind** — the single `9303c6473dc8ab2d.css` file is a compiled Tailwind output. Custom color `text-primary` = `#FB5A32`.
