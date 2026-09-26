"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/lib/PlanContext";
import { useToast } from "@/lib/ToastContext";
import PlanItem from "@/components/PlanItem";
import Spinner from "@/components/Spinner";

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 text-center">
      <p className="font-display text-3xl font-bold text-accent">{value}</p>
      <p className="text-xs text-muted uppercase tracking-wide mt-1">{label}</p>
    </div>
  );
}

export default function MyPlanPage() {
  const { plan, saved, done, hydrated, removeFromPlan, removeFromSaved, markDone } =
    usePlan();
  const { showToast } = useToast();
  const [tab, setTab] = useState("today");

  const list = tab === "today" ? plan : saved;

  const metrics = useMemo(() => {
    return plan.reduce(
      (acc, w) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + Number(w.duration || 0),
        calories: acc.calories + Number(w.calories || 0),
      }),
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [plan]);

  const handleMarkDone = (id) => {
    markDone(id);
    showToast("Marked as done");
  };

  const handleRemove = (id) => {
    if (tab === "today") removeFromPlan(id);
    else removeFromSaved(id);
    showToast("Removed");
  };

  return (
    <div className="container-page py-10 md:py-16">
      <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase mb-2">
        My Plan
      </h1>
      <p className="text-muted mb-8">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <StatCard label="Exercises" value={metrics.exercises} />
        <StatCard label="Minutes" value={metrics.minutes} />
        <StatCard label="Calories" value={metrics.calories} />
      </div>

      <div className="flex gap-2 mb-6">
        {[
          { key: "today", label: "Today's Plan" },
          { key: "saved", label: "Saved" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
              tab === t.key
                ? "bg-accent text-accent-foreground"
                : "border border-border text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {!hydrated && <Spinner label="Loading workouts…" />}

      {hydrated && list.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface py-20 text-center px-6">
          <h2 className="font-display text-xl font-bold uppercase mb-2">
            Nothing here yet
          </h2>
          <p className="text-muted text-sm mb-6 max-w-sm">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase text-accent-foreground"
          >
            Go to workouts
          </Link>
        </div>
      )}

      {hydrated && list.length > 0 && (
        <div className="flex flex-col gap-3">
          {list.map((workout) => (
            <PlanItem
              key={workout.id}
              workout={workout}
              isDone={done.includes(workout.id)}
              showMarkDone={tab === "today"}
              onMarkDone={() => handleMarkDone(workout.id)}
              onRemove={() => handleRemove(workout.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
