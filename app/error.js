"use client";

export default function GlobalError({ reset }) {
  return (
    <div className="container-page py-24 text-center flex flex-col items-center">
      <h1 className="font-display text-2xl font-bold uppercase mb-3">
        Something went wrong
      </h1>
      <p className="text-muted mb-8 max-w-sm">
        An unexpected error occurred while rendering this page.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground"
      >
        Try again
      </button>
    </div>
  );
}
