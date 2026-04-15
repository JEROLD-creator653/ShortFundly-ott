# Shortfundly Web App

This is a full Next.js (App Router) frontend implementation rebuilt from the recovered platform spec.

## Features implemented

- OTT-style homepage with cinematic dark theme (`#000000`) and primary accent (`#FB5A32`)
- Explore, watch, festival, and submit routes
- Continue Watching via local storage
- Social sharing (WhatsApp, Facebook, X)
- SEO metadata with Open Graph and Twitter cards
- Robots and sitemap routes
- OpenSearch support at `/opensearch.xml`
- PWA manifest
- GTM/dataLayer initialization in the document head
- Mobile-first Tailwind layout
- Integration-ready API routes: `/api/catalog`, `/api/checkout`, `/api/submit`
- Push bootstrap hooks for OneSignal and Izooto (env-driven)
- Gemini-powered customer support widget with chat persistence in MongoDB
- Admin support chat dashboard at `/admin/support-chats`
- AI poster generator (styles + title overlay) at `/admin/posters`
- Cinematic AI teaser studio with Shotstack render orchestration at `/admin/teasers`

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and populate the values you need:

- `NEXT_PUBLIC_CONTENT_API_BASE_URL` for a real catalog backend
- `NEXT_PUBLIC_ONESIGNAL_APP_ID` for OneSignal web push
- `NEXT_PUBLIC_IZOOTO_APP_ID` for iZooto push
- `NEXT_PUBLIC_GTM_ID` for Google Tag Manager
- `MONGODB_URI` and `MONGODB_DB_NAME` for chat/poster/teaser persistence
- `GEMINI_API_KEY` for AI customer support replies
- `ADMIN_DASHBOARD_TOKEN` for admin support dashboard access control
- `OPENAI_API_KEY` and `POSTER_IMAGE_MODEL` for poster generation
- `SHOTSTACK_API_KEY` and `SHOTSTACK_HOST` for teaser rendering
- `PUBLIC_ASSET_BASE_URL` (or `NEXT_PUBLIC_APP_URL`) to expose uploaded teaser assets for Shotstack

## Notes

- This is a clean source app created from specs and recovered output, not the original private repository.
- Payment, authentication, ad serving, and push backends are represented as integration-ready placeholders.
