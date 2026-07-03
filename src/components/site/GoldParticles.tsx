import { useMemo } from "react";

export function GoldParticles({ count = 22 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 18,
        size: 2 + Math.random() * 4,
        dur: 14 + Math.random() * 10,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full animate-float-up"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            background: "radial-gradient(circle, oklch(0.88 0.12 85), transparent 70%)",
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}
