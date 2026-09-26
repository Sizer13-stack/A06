import Image from "next/image";

export default function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="container-page grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-14 md:py-20">
        <div>
          <p className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-4">
            Workout Library
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[1.05] mb-5">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-md mb-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:brightness-95 transition"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            Browse Workouts
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl bg-surface border border-border overflow-hidden">
            <Image
              src="/banner.png"
              alt="Workout illustration"
              fill
              className="object-contain p-4"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
