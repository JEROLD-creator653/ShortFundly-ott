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

## Notes

- This is a clean source app created from specs and recovered output, not the original private repository.
- Payment, authentication, ad serving, and push backends are represented as integration-ready placeholders.
