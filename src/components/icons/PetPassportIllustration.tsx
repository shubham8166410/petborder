export function PetPassportIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 240"
      className={className}
      aria-label="Illustration of a dog with a passport document"
      role="img"
    >
      {/* Background circle */}
      <circle cx="160" cy="120" r="110" fill="#EBF5FB" opacity="0.6" />

      {/* ── Passport document ─────────────────────────────────── */}
      <rect x="60" y="80" width="90" height="120" rx="6" fill="#1B4F72" />
      <rect x="68" y="88" width="74" height="104" rx="4" fill="#D6EAF8" />
      {/* Passport emblem */}
      <circle cx="105" cy="116" r="14" fill="#1B4F72" opacity="0.25" />
      <circle cx="105" cy="116" r="8"  fill="#1B4F72" opacity="0.4" />
      {/* Text lines */}
      <rect x="76" y="138" width="58" height="4" rx="2" fill="#1B4F72" opacity="0.3" />
      <rect x="76" y="148" width="44" height="4" rx="2" fill="#1B4F72" opacity="0.2" />
      <rect x="76" y="158" width="50" height="4" rx="2" fill="#1B4F72" opacity="0.2" />
      <rect x="76" y="168" width="36" height="4" rx="2" fill="#1B4F72" opacity="0.2" />
      {/* Passport stamp circle */}
      <circle cx="134" cy="158" r="18" fill="#E67E22" opacity="0.15" />
      <circle cx="134" cy="158" r="14" fill="none" stroke="#E67E22" strokeWidth="2" opacity="0.4" />
      <text x="134" y="163" textAnchor="middle" fill="#E67E22" fontSize="10" fontWeight="700" opacity="0.7">AU</text>

      {/* ── Dog silhouette ────────────────────────────────────── */}
      {/* Body */}
      <ellipse cx="200" cy="155" rx="52" ry="40" fill="#1B4F72" opacity="0.85" />
      {/* Neck */}
      <ellipse cx="185" cy="122" rx="20" ry="18" fill="#1B4F72" opacity="0.85" />
      {/* Head */}
      <circle cx="185" cy="100" r="28" fill="#1B4F72" opacity="0.9" />
      {/* Ear left */}
      <ellipse cx="168" cy="82" rx="10" ry="16" fill="#154360" transform="rotate(-15 168 82)" />
      {/* Ear right */}
      <ellipse cx="202" cy="82" rx="10" ry="16" fill="#154360" transform="rotate(15 202 82)" />
      {/* Snout */}
      <ellipse cx="185" cy="112" rx="14" ry="10" fill="#154360" />
      {/* Nose */}
      <ellipse cx="185" cy="108" rx="6" ry="4" fill="#0E2D42" />
      {/* Eyes */}
      <circle cx="175" cy="97" r="4" fill="white" />
      <circle cx="175" cy="97" r="2" fill="#0E2D42" />
      <circle cx="195" cy="97" r="4" fill="white" />
      <circle cx="195" cy="97" r="2" fill="#0E2D42" />
      {/* Eye glints */}
      <circle cx="176" cy="96" r="1" fill="white" />
      <circle cx="196" cy="96" r="1" fill="white" />
      {/* Front legs */}
      <rect x="162" y="185" width="16" height="28" rx="8" fill="#154360" />
      <rect x="188" y="185" width="16" height="28" rx="8" fill="#154360" />
      {/* Paws */}
      <ellipse cx="170" cy="213" rx="10" ry="5" fill="#0E2D42" />
      <ellipse cx="196" cy="213" rx="10" ry="5" fill="#0E2D42" />
      {/* Tail */}
      <path d="M248 150 Q275 120 265 95 Q260 82 250 88 Q255 105 240 130 Z" fill="#154360" />

      {/* ── Decorative paw prints ──────────────────────────────── */}
      <g opacity="0.3" fill="#E67E22">
        <ellipse cx="38" cy="55" rx="6" ry="5" />
        <circle cx="28" cy="44" r="3.5" />
        <circle cx="36" cy="40" r="3" />
        <circle cx="44" cy="40" r="3" />
        <circle cx="52" cy="44" r="3.5" />
      </g>
      <g opacity="0.2" fill="#E67E22">
        <ellipse cx="285" cy="200" rx="6" ry="5" />
        <circle cx="275" cy="189" r="3.5" />
        <circle cx="283" cy="185" r="3" />
        <circle cx="291" cy="185" r="3" />
        <circle cx="299" cy="189" r="3.5" />
      </g>
      <g opacity="0.15" fill="#1B4F72">
        <ellipse cx="20" cy="180" rx="5" ry="4" />
        <circle cx="11" cy="171" r="3" />
        <circle cx="18" cy="167" r="2.5" />
        <circle cx="26" cy="167" r="2.5" />
        <circle cx="33" cy="171" r="3" />
      </g>
    </svg>
  );
}
