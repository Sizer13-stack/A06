# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of lifts, lock them into today's plan, save others for later, and watch your minutes and calories add up as you go.

## Description

FitLog lets you browse a library of workouts pulled from a live API, view full details for each lift (equipment, difficulty, sets/reps, step-by-step instructions), and build out a daily training plan capped at five exercises. Your plan and saved list persist in the browser via `localStorage`, so your progress survives a page reload.

## Technologies Used

- **Next.js (App Router)** — routing, layouts, client/server components
- **React** — UI and state management (Context API)
- **Tailwind CSS v4** — styling, theming, and responsive layout
- **Google Fonts** (`next/font`) — Oswald (display) + Inter (body)
- **Browser `localStorage`** — persisting the plan/saved/done state across reloads

## Key Features

1. **Live workout library** — fetches all workouts from the FitLog API and renders them as a responsive 3-column grid (collapses to 2 and 1 columns on tablet/mobile), with a loading state and a graceful error state.
2. **Sort by Duration / Calories / Rating** — a dropdown on the library re-sorts the current list client-side without a page reload.
3. **Workout detail pages** — dynamic `/workout/[id]` route with a two-column layout: media on the left, specs table, category tags, and numbered instructions on the right.
4. **Plan & Saved workflow** — "Add to today's plan" and "Save for later" buttons update `localStorage`-backed state, fire toast notifications, and instantly update the Navbar's Plan/Saved badge counts. The plan is capped at 5 lifts, matching the brief.
5. **My Plan dashboard** — live Exercises/Minutes/Calories metrics, tabbed Today's Plan / Saved views, Mark as Done and Remove actions per card, and a friendly empty state with a CTA back to the library.
6. **Resilient routing** — a custom 404 page for unknown routes and a global error boundary so a data hiccup never shows a blank crash screen; reloading any route works cleanly since routing is handled by the Next.js App Router.
7. **Fully responsive** — navbar, hero, grids, and the My Plan dashboard all adapt cleanly across mobile, tablet, and desktop breakpoints.

## Project Structure

```
app/
  page.js                 → Home (Navbar + Hero + Library grid)
  workout/[id]/page.js    → Workout detail page
  my-plan/page.js         → My Plan dashboard
  not-found.js            → Custom 404
  error.js                → Global error boundary
  layout.js               → Root layout, fonts, providers
components/                → Navbar, Footer, Hero, WorkoutCard, PlanItem, SortDropdown, Spinner
lib/
  api.js                  → FitLog API fetch + response normalization
  PlanContext.js          → Plan/Saved/Done state + localStorage persistence
  ToastContext.js         → Toast notification system
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note on the API:** `lib/api.js` normalizes several common field-name spellings (e.g. `duration`/`durationMinutes`, `image`/`thumbnail`) since the exact response shape should be double-checked against the live API. If a field doesn't map correctly, adjust the `pick(...)` calls in that file — it's the single place all API parsing happens.

## Deployment

Deploy on Vercel, Netlify, Cloudflare Pages, or any Next.js-compatible host. No environment variables are required.

## Submission

- Live Link:
- GitHub Repository Link:
