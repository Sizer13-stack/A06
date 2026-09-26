"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import Spinner from "@/components/Spinner";
import { fetchWorkouts } from "@/lib/api";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    let cancelled = false;
    fetchWorkouts()
      .then((data) => {
        if (!cancelled) {
          setWorkouts(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const sorted = useMemo(() => {
    const copy = [...workouts];
    copy.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "calories") return a.calories - b.calories;
      return a.duration - b.duration;
    });
    return copy;
  }, [workouts, sortBy]);

  return (
    <>
      <Hero />

      <section id="library" className="container-page py-14 md:py-20 scroll-mt-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase mb-2">
              The Library
            </h2>
            <p className="text-muted text-sm sm:text-base">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          {status === "ready" && workouts.length > 0 && (
            <SortDropdown value={sortBy} onChange={setSortBy} />
          )}
        </div>

        {status === "loading" && <Spinner label="Loading workouts…" />}

        {status === "error" && (
          <div className="rounded-xl border border-border bg-surface p-8 text-center text-muted">
            Couldn&apos;t load workouts right now. Please refresh to try again.
          </div>
        )}

        {status === "ready" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
