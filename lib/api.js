// lib/api.js
// Thin data layer around the FitLog API.
//
// NOTE: The exact field names returned by https://api.abcz.workers.dev/api/fitlog
// were not confirmed at build time (network to that host isn't reachable from
// the dev sandbox this project was generated in). `normalizeWorkout()` below
// defensively checks a handful of common key spellings (camelCase, snake_case,
// short forms) for each field. If your real API uses different keys, this is
// the ONLY place you should need to edit — add your field name to the
// matching `pick(...)` call.

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

function pick(obj, keys, fallback) {
  for (const k of keys) {
    if (obj?.[k] !== undefined && obj[k] !== null && obj[k] !== "") return obj[k];
  }
  return fallback;
}

function toArray(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === "string" && val.length) return val.split(",").map((s) => s.trim());
  return [];
}

export function normalizeWorkout(raw, index = 0) {
  const id = pick(raw, ["id", "_id", "workoutId", "slug"], String(index + 1));
  const name = pick(raw, ["name", "title", "workoutName"], "Untitled Workout");
  const categories = toArray(pick(raw, ["categories", "category", "tags", "muscleGroups"], []));
  const equipment = toArray(pick(raw, ["equipment", "equipments", "gear"], []));
  const image = pick(raw, ["image", "img", "thumbnail", "photo", "illustration"], "/banner.png");
  const duration = pick(raw, ["duration", "durationMinutes", "time"], 20);
  const calories = pick(raw, ["calories", "kcal", "cal"], 150);
  const rating = pick(raw, ["rating", "score"], 4.5);
  const difficulty = pick(raw, ["difficulty", "level"], "Intermediate");
  const sets = pick(raw, ["sets"], 3);
  const reps = pick(raw, ["reps", "repRange"], "8-12");
  const description = pick(
    raw,
    ["description", "desc", "subtitle", "summary"],
    "A focused movement to build strength and control."
  );
  const instructions = toArray(
    pick(raw, ["instructions", "steps", "howTo"], [
      "Set up in a stable, controlled starting position.",
      "Engage your core and move through the full range of motion.",
      "Control the movement on the way back to the start.",
      "Repeat for the prescribed number of reps.",
    ])
  );

  return {
    id: String(id),
    name,
    categories: categories.length ? categories : ["General"],
    equipment: equipment.length ? equipment : ["Bodyweight"],
    image,
    duration: Number(duration) || 20,
    calories: Number(calories) || 150,
    rating: Number(rating) || 4.5,
    difficulty,
    sets,
    reps,
    description,
    instructions: instructions.length ? instructions : ["Perform the movement with good form."],
  };
}

export async function fetchWorkouts() {
  const res = await fetch(API_BASE, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load workouts (${res.status})`);
  const data = await res.json();
  const list = Array.isArray(data) ? data : data?.data || data?.results || [];
  return list.map((w, i) => normalizeWorkout(w, i));
}

export async function fetchWorkoutById(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      const raw = data?.data || data;
      if (raw && !Array.isArray(raw)) return normalizeWorkout(raw);
    }
  } catch {
    // fall through to list lookup below
  }
  // Fallback: some APIs only support the list endpoint reliably.
  const all = await fetchWorkouts();
  return all.find((w) => String(w.id) === String(id)) || null;
}
