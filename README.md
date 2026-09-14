# ArtistStudio AI Video

Starter MVP for an AI video website with three workflows:

- Image → Video
- Text → Video
- Script → Video

## Current state

The UI and `/api/generate` backend route are wired and deployable. The backend currently runs in mock mode so no paid API calls happen yet.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Next build stage

1. Connect one real AI video provider.
2. Add upload storage and generation polling.
3. Display generated MP4/video URLs in the preview panel.
4. Add accounts + generation history.
5. Add credit ledger and Stripe subscriptions.
6. Add script scene splitting + narration.

## Environment

Copy `.env.example` to `.env.local` and add the selected provider's key when we connect generation.
