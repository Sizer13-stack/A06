// Shared server-side cache for the upstream FitLog API, used by both
// app/api/fitlog/route.js and app/api/fitlog/[id]/route.js.
//
// Strategy: cache the full list for 60s. If the upstream call fails for any
// reason (429 rate limit, network error, 5xx), serve the last known-good
// cached copy instead of erroring out — even if that copy is older than 60s.
// Only return an error if we have never successfully fetched anything yet.
// This means once the site has loaded successfully once, a rate-limited or
// flaky upstream never breaks the page for users after that.

const UPSTREAM = "https://api.api-store.workers.dev/api/fitlog";
const FRESH_MS = 60_000;

let cache = { data: null, fetchedAt: 0 };
let inFlight = null;

async function fetchFresh() {
  const res = await fetch(UPSTREAM, { cache: "no-store" });
  if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
  const data = await res.json();
  cache = { data, fetchedAt: Date.now() };
  return data;
}

export async function getFitlogList() {
  const isFresh = cache.data && Date.now() - cache.fetchedAt < FRESH_MS;
  if (isFresh) return cache.data;

  // Coalesce concurrent requests into a single upstream call.
  if (!inFlight) {
    inFlight = fetchFresh().finally(() => {
      inFlight = null;
    });
  }

  try {
    return await inFlight;
  } catch (err) {
    if (cache.data) return cache.data; // serve stale data over erroring out
    throw err;
  }
}