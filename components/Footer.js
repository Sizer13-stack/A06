import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={22} height={22} />
          <span className="font-display font-bold uppercase tracking-wide text-sm">
            FitLog
          </span>
        </div>
        <p className="text-xs text-muted text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
