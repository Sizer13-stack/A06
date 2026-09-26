"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchWorkoutById } from "@/lib/api";
import { usePlan, PLAN_CAP } from "@/lib/PlanContext";
import { useToast } from "@/lib/ToastContext";
import Spinner from "@/components/Spinner";

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function BookmarkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

const specRows = (w) => [
  ["Equipment", w.equipment.join(", ")],
  ["Difficulty", w.difficulty],
  ["Sets", w.sets],
  ["Reps", w.reps],
  ["Duration", `${w.duration} min`],
  ["Calories", `${w.calories} kcal`],
  ["Rating", w.rating],
];

export default function WorkoutDetailPage({ params }) {
  const { id } = use(params);
  const [workout, setWorkout] = useState(null);
  const [status, setStatus] = useState("loading");
  const { addToPlan, addToSaved, isPlanFull } = usePlan();
  const { showToast } = useToast();

  useEffect(() => {
    let cancelled = false;
    fetchWorkoutById(id)
      .then((data) => {
        if (cancelled) return;
        if (!data) setStatus("notfound");
        else {
          setWorkout(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") return <Spinner label="Loading workout…" />;

  if (status === "notfound") {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-2xl font-bold uppercase mb-3">
          Workout not found
        </h1>
        <p className="text-muted mb-6">
          This lift doesn&apos;t exist in the library.
        </p>
        <Link href="/" className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase text-accent-foreground">
          Back to workouts
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container-page py-24 text-center text-muted">
        Couldn&apos;t load this workout right now. Please try again.
      </div>
    );
  }

  const handleAddToPlan = () => {
    if (isPlanFull) {
      showToast("Today's plan is full (5 max)");
      return;
    }
    const added = addToPlan(workout);
    showToast(added ? "Added to today's plan" : "Already in today's plan");
  };

  const handleSave = () => {
    const added = addToSaved(workout);
    showToast(added ? "Saved for later" : "Already saved");
  };

  return (
    <div className="container-page py-10 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
        <div className="relative aspect-square rounded-2xl bg-surface border border-border overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-contain p-8"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase mb-3">
            {workout.name}
          </h1>
          <p className="text-muted mb-4">{workout.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {workout.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-surface-2 border border-border px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-surface divide-y divide-border mb-8">
            {specRows(workout).map(([label, value]) => (
              <div key={label} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-muted uppercase tracking-wide text-xs font-bold">
                  {label}
                </span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>

          <h2 className="font-display font-bold uppercase text-lg mb-3">
            Instructions
          </h2>
          <ol className="space-y-3 mb-8">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-muted">{step}</span>
              </li>
            ))}
          </ol>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToPlan}
              disabled={isPlanFull}
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-95 transition"
            >
              <PlusIcon />
              {isPlanFull ? `Plan full (${PLAN_CAP}/${PLAN_CAP})` : "Add to today's plan"}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold uppercase tracking-wide hover:border-accent transition"
            >
              <BookmarkIcon />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
