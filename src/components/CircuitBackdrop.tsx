import { cn } from "@/lib/cn";

export function CircuitBackdrop({ className }: { className?: string }) {
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1200 700"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(242,180,0,0.18)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.06)" />
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="0.35" />
        </filter>
      </defs>

      <g opacity="0.85" filter="url(#blur)">
        <path
          d="M980 120h120v120h-90v80h-90v90"
          stroke="url(#g)"
          strokeWidth="2"
        />
        <circle cx="980" cy="120" r="5" fill="rgba(242,180,0,0.8)" />
        <circle cx="1100" cy="240" r="4" fill="rgba(255,255,255,0.28)" />
        <circle cx="920" cy="410" r="4" fill="rgba(242,180,0,0.55)" />

        <path
          d="M220 80H80v160h140v80H120v120"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="2"
        />
        <circle cx="220" cy="80" r="5" fill="rgba(242,180,0,0.55)" />
        <circle cx="80" cy="240" r="4" fill="rgba(255,255,255,0.22)" />
        <circle cx="120" cy="440" r="4" fill="rgba(242,180,0,0.40)" />

        <path
          d="M560 150h90v110h160v70h120"
          stroke="rgba(242,180,0,0.14)"
          strokeWidth="2"
        />
        <circle cx="560" cy="150" r="4" fill="rgba(255,255,255,0.18)" />
        <circle cx="650" cy="260" r="4" fill="rgba(242,180,0,0.45)" />
        <circle cx="930" cy="330" r="4" fill="rgba(255,255,255,0.20)" />

        <path
          d="M520 560h-160v-80H220v-70H90"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />
        <circle cx="520" cy="560" r="4" fill="rgba(242,180,0,0.40)" />
        <circle cx="360" cy="480" r="4" fill="rgba(255,255,255,0.18)" />
        <circle cx="90" cy="410" r="4" fill="rgba(242,180,0,0.33)" />
      </g>
    </svg>
  );
}




