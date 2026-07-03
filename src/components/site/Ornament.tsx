export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-[color:var(--gold)] ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[color:var(--gold)]/70" />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2c1.5 3 4 4.5 7 5-3 .5-5.5 2-7 5-1.5-3-4-4.5-7-5 3-.5 5.5-2 7-5z"
          fill="currentColor"
          opacity=".9"
        />
        <circle cx="12" cy="20" r="1.3" fill="currentColor" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[color:var(--gold)]/70" />
    </div>
  );
}
