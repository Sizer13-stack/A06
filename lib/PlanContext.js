"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const PLAN_CAP = 5;

function readStorage(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client only).
  useEffect(() => {
    setPlan(readStorage(PLAN_KEY));
    setSaved(readStorage(SAVED_KEY));
    setDone(readStorage("fitlog:done"));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
    } catch {}
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch {}
  }, [saved, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem("fitlog:done", JSON.stringify(done));
    } catch {}
  }, [done, hydrated]);

  const isPlanFull = plan.length >= PLAN_CAP;

  const addToPlan = (workout) => {
    let added = false;
    setPlan((prev) => {
      if (prev.some((w) => w.id === workout.id)) return prev;
      if (prev.length >= PLAN_CAP) return prev;
      added = true;
      return [...prev, workout];
    });
    return added;
  };

  const addToSaved = (workout) => {
    let added = false;
    setSaved((prev) => {
      if (prev.some((w) => w.id === workout.id)) return prev;
      added = true;
      return [...prev, workout];
    });
    return added;
  };

  const removeFromPlan = (id) => setPlan((prev) => prev.filter((w) => w.id !== id));
  const removeFromSaved = (id) => setSaved((prev) => prev.filter((w) => w.id !== id));

  const markDone = (id) => setDone((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const value = useMemo(
    () => ({
      plan,
      saved,
      done,
      isPlanFull,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markDone,
      hydrated,
    }),
    [plan, saved, done, isPlanFull, hydrated]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}

export { PLAN_CAP };
