import Link from "next/link";
import Image from "next/image";

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
function FlameIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-2 0 2-1 2-1 0 0-3-2-4-4-5z" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9 12 2" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function PlanItem({ workout, isDone, showMarkDone, onMarkDone, onRemove }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-border bg-surface p-4">
      <div className="relative h-16 w-16 shrink-0 rounded-lg bg-surface-2 overflow-hidden">
        <Image src={workout.image} alt={workout.name} fill className="object-contain p-2" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`font-display font-bold uppercase text-sm truncate ${isDone ? "line-through text-muted" : ""}`}>
          {workout.name}
        </h3>
        <p className="text-xs text-muted truncate">{workout.equipment.join(", ")}</p>
        <div className="flex items-center gap-3 text-xs text-muted mt-1">
          <span className="flex items-center gap-1"><ClockIcon /> {workout.duration} min</span>
          <span className="flex items-center gap-1"><FlameIcon /> {workout.calories} kcal</span>
          <span className="flex items-center gap-1 text-accent"><StarIcon /> {workout.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-bold uppercase hover:border-accent transition"
        >
          View Details
        </Link>
        {showMarkDone && (
          <button
            onClick={onMarkDone}
            disabled={isDone}
            title="Mark as Done"
            className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-accent-foreground disabled:opacity-40"
          >
            <CheckIcon />
          </button>
        )}
        <button
          onClick={onRemove}
          title="Remove"
          className="flex items-center justify-center h-8 w-8 rounded-full border border-border hover:border-red-400 hover:text-red-400 transition"
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
}
