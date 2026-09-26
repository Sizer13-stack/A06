import Link from "next/link";
import Image from "next/image";

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
function FlameIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-2 0 2-1 2-1 0 0-3-2-4-4-5z" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9 12 2" />
    </svg>
  );
}

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col rounded-xl border border-border bg-surface overflow-hidden hover:border-accent/60 transition-colors"
    >
      <div className="relative aspect-[4/3] bg-surface-2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-surface-2 border border-border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent"
            >
              {cat}
            </span>
          ))}
        </div>
        <h3 className="font-display font-bold uppercase text-sm leading-tight line-clamp-2">
          {workout.name}
        </h3>
        <p className="text-xs text-muted line-clamp-2">
          {workout.equipment.join(", ")}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted pt-1 mt-auto">
          <span className="flex items-center gap-1">
            <ClockIcon /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <FlameIcon /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1 text-accent">
            <StarIcon /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
