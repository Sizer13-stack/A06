export default function Spinner({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted">
      <span className="h-8 w-8 rounded-full border-2 border-border border-t-accent animate-spin-slow" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
