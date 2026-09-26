import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 md:py-32 text-center flex flex-col items-center">
      <p className="font-display text-7xl sm:text-8xl font-bold text-accent mb-4">
        404
      </p>
      <h1 className="font-display text-2xl font-bold uppercase mb-3">
        Page not found
      </h1>
      <p className="text-muted mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground"
      >
        Back to Home
      </Link>
    </div>
  );
}
