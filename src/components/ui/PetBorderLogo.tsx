export interface PetBorderLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
  darkMode?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm:  { height: 36,  fontSize: 16 },
  md:  { height: 56,  fontSize: 20 },
  lg:  { height: 80,  fontSize: 26 },
  xl:  { height: 120, fontSize: 32 },
} as const;

// All keyframes + animation classes inline — zero external deps
const ANIM_CSS = `
.pb-dog { animation: pb-float 2.2s ease-in-out infinite; }
.pb-cat { animation: pb-float 2.2s ease-in-out 0.4s infinite; }

.pb-dog-tail {
  animation: pb-wag 0.65s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: 100% 100%;
}
.pb-cat-tail {
  animation: pb-swish 1.1s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: 0% 100%;
}
.pb-dog-eye {
  animation: pb-blink-dog 3.5s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: 50% 50%;
}
.pb-cat-eye {
  animation: pb-blink-cat 4s ease-in-out 1.2s infinite;
  transform-box: fill-box;
  transform-origin: 50% 50%;
}
.pb-cat-ear-l {
  animation: pb-twitch-l 4s ease-in-out 0.5s infinite;
  transform-box: fill-box;
  transform-origin: 50% 100%;
}
.pb-cat-ear-r {
  animation: pb-twitch-r 4s ease-in-out 2s infinite;
  transform-box: fill-box;
  transform-origin: 50% 100%;
}
.pb-passport {
  animation: pb-passport-bob 2.8s ease-in-out 0.2s infinite;
  transform-box: fill-box;
  transform-origin: 50% 50%;
}
.pb-heart-1 {
  animation: pb-heart-float 3.5s ease-out 0.8s infinite;
  transform-box: fill-box;
  transform-origin: 50% 100%;
}
.pb-heart-2 {
  animation: pb-heart-float 3.5s ease-out 2.3s infinite;
  transform-box: fill-box;
  transform-origin: 50% 100%;
}
.pb-stamp {
  animation: pb-stamp-in 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s both;
  transform-box: fill-box;
  transform-origin: 50% 50%;
}

@keyframes pb-float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-4px); }
}
@keyframes pb-wag {
  0%, 100% { transform: rotate(-18deg); }
  50%      { transform: rotate(18deg); }
}
@keyframes pb-swish {
  0%, 100% { transform: rotate(8deg); }
  50%      { transform: rotate(-8deg); }
}
@keyframes pb-blink-dog {
  0%, 91%, 100% { transform: scaleY(1); }
  93%, 95%      { transform: scaleY(0.08); }
}
@keyframes pb-blink-cat {
  0%, 91%, 100% { transform: scaleY(1); }
  93%           { transform: scaleY(0.08); }
}
@keyframes pb-twitch-l {
  0%, 88%, 100% { transform: rotate(0deg); }
  90%           { transform: rotate(-8deg); }
  93%           { transform: rotate(5deg); }
  96%           { transform: rotate(0deg); }
}
@keyframes pb-twitch-r {
  0%, 88%, 100% { transform: rotate(0deg); }
  90%           { transform: rotate(8deg); }
  93%           { transform: rotate(-5deg); }
  96%           { transform: rotate(0deg); }
}
@keyframes pb-passport-bob {
  0%, 100% { transform: rotate(-2deg) translateY(0px); }
  50%      { transform: rotate(2deg) translateY(-3px); }
}
@keyframes pb-heart-float {
  0%   { transform: translateY(0px) scale(0.3); opacity: 0; }
  10%  { opacity: 1; transform: translateY(-4px) scale(1); }
  75%  { opacity: 0.7; }
  100% { transform: translateY(-22px) scale(0.7); opacity: 0; }
}
@keyframes pb-stamp-in {
  0%   { transform: scale(2) rotate(-15deg); opacity: 0; }
  70%  { transform: scale(0.9) rotate(2deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .pb-dog, .pb-cat, .pb-dog-tail, .pb-cat-tail,
  .pb-dog-eye, .pb-cat-eye, .pb-cat-ear-l, .pb-cat-ear-r,
  .pb-passport, .pb-heart-1, .pb-heart-2, .pb-stamp {
    animation: none !important;
  }
}
`;

export function PetBorderLogo({
  size = "md",
  showWordmark = true,
  darkMode = false,
  className = "",
}: PetBorderLogoProps) {
  const { height, fontSize } = SIZE_MAP[size];
  // Maintain 160:110 viewBox aspect ratio
  const width = Math.round(height * (160 / 110));

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      style={{ height, flexShrink: 0 }}
    >
      {/* ── Inline SVG logo — viewBox 0 0 160 110 ── */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 160 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="PetBorder — dog and cat holding a passport"
        role="img"
      >
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

        {/* ════════════════════════════════════════════
            DOG  (left side, floats + wags tail)
        ════════════════════════════════════════════ */}
        <g className="pb-dog">

          {/* Tail — hangs behind body on the left, wags from base */}
          <g className="pb-dog-tail">
            <path
              d="M 22 78 C 9 73 3 63 4 52 C 5 43 11 39 16 42"
              stroke="#E8A87C"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>

          {/* Body */}
          <ellipse cx="30" cy="78" rx="16" ry="12" fill="#E8A87C" />

          {/* Left arm — drooping behind, back side */}
          <path
            d="M 17 76 C 11 79 8 83 9 87"
            stroke="#E8A87C" strokeWidth="8" strokeLinecap="round"
          />
          <circle cx="9" cy="87" r="5" fill="#D4855A" />

          {/* Right arm / paw — reaches toward passport */}
          <path
            d="M 44 74 C 52 72 57 72 62 73"
            stroke="#E8A87C" strokeWidth="8" strokeLinecap="round"
          />
          <circle cx="62" cy="73" r="5" fill="#D4855A" />

          {/* Floppy ears — rendered before head so head overlaps */}
          <g transform="rotate(-20,18,50)">
            <ellipse cx="18" cy="50" rx="8" ry="14" fill="#D4855A" />
          </g>
          <g transform="rotate(20,46,50)">
            <ellipse cx="46" cy="50" rx="8" ry="14" fill="#D4855A" />
          </g>

          {/* Head */}
          <circle cx="32" cy="44" r="20" fill="#E8A87C" />

          {/* Cheek blush */}
          <circle cx="19" cy="52" r="6.5" fill="#E67E22" fillOpacity="0.22" />
          <circle cx="45" cy="52" r="6.5" fill="#E67E22" fillOpacity="0.22" />

          {/* Snout */}
          <ellipse cx="32" cy="54" rx="11" ry="9" fill="#D4855A" />

          {/* Nose */}
          <ellipse cx="32" cy="50" rx="5.5" ry="4" fill="#2C1810" />

          {/* Left eye — blinks (scaleY from centre) */}
          <g className="pb-dog-eye">
            <circle cx="22" cy="40" r="6.5" fill="white" />
            <circle cx="22" cy="40" r="4.5" fill="#2C1810" />
            <circle cx="23.8" cy="38.2" r="1.6" fill="white" />
          </g>

          {/* Right eye — blinks */}
          <g className="pb-dog-eye">
            <circle cx="42" cy="40" r="6.5" fill="white" />
            <circle cx="42" cy="40" r="4.5" fill="#2C1810" />
            <circle cx="43.8" cy="38.2" r="1.6" fill="white" />
          </g>

          {/* Smile */}
          <path
            d="M 25 59 Q 32 66 39 59"
            stroke="#2C1810" strokeWidth="1.8" strokeLinecap="round"
          />

          {/* Tongue */}
          <ellipse cx="32" cy="63" rx="4.5" ry="3.5" fill="#E8A4C8" />
          <line x1="32" y1="59" x2="32" y2="66" stroke="#D4855A" strokeWidth="1" />
        </g>

        {/* ════════════════════════════════════════════
            PASSPORT  (centre, gently bobs + rotates)
        ════════════════════════════════════════════ */}
        <g className="pb-passport">
          {/* Cover */}
          <rect x="64" y="38" width="32" height="46" rx="3" fill="#1B4F72" />
          {/* Spine */}
          <rect x="64" y="38" width="5.5" height="46" rx="2" fill="#154060" />
          {/* Page lines */}
          <line x1="73" y1="57" x2="93" y2="57" stroke="#2A6A9A" strokeWidth="1.5" opacity="0.7" />
          <line x1="73" y1="63" x2="90" y2="63" stroke="#2A6A9A" strokeWidth="1"   opacity="0.5" />
          <line x1="73" y1="68" x2="92" y2="68" stroke="#2A6A9A" strokeWidth="1"   opacity="0.5" />

          {/* Orange badge */}
          <circle cx="80" cy="50" r="8" fill="#E67E22" />
          {/* Checkmark on badge */}
          <polyline
            points="76,50 79,53.5 84,47"
            stroke="white" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          />

          {/* Stamp — bounces in 1 s after mount */}
          <g className="pb-stamp">
            <circle
              cx="80" cy="72" r="9"
              stroke="#E67E22" strokeWidth="1.3"
              strokeDasharray="2.5 1.5"
              opacity="0.9"
            />
            {/* Paw pad */}
            <ellipse cx="80" cy="74.5" rx="3.2" ry="2.8" fill="#E67E22" opacity="0.9" />
            {/* Toe pads */}
            <circle cx="76.5" cy="71.5" r="1.5" fill="#E67E22" opacity="0.9" />
            <circle cx="80"   cy="70.5" r="1.5" fill="#E67E22" opacity="0.9" />
            <circle cx="83.5" cy="71.5" r="1.5" fill="#E67E22" opacity="0.9" />
          </g>
        </g>

        {/* ════════════════════════════════════════════
            CAT  (right side, floats offset + swishes tail)
        ════════════════════════════════════════════ */}
        <g className="pb-cat">

          {/* Tail — behind body on right, swishes from base */}
          <g className="pb-cat-tail">
            <path
              d="M 138 78 C 151 73 157 63 156 52 C 155 43 149 39 145 42"
              stroke="#9B8EE0"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>

          {/* Body */}
          <ellipse cx="130" cy="78" rx="16" ry="12" fill="#9B8EE0" />

          {/* Right arm — drooping behind, back side */}
          <path
            d="M 143 76 C 149 79 152 83 151 87"
            stroke="#9B8EE0" strokeWidth="8" strokeLinecap="round"
          />
          <circle cx="151" cy="87" r="5" fill="#7B6EC0" />

          {/* Left arm / paw — reaches toward passport */}
          <path
            d="M 116 74 C 108 72 103 72 98 73"
            stroke="#9B8EE0" strokeWidth="8" strokeLinecap="round"
          />
          <circle cx="98" cy="73" r="5" fill="#7B6EC0" />

          {/* Pointy ears — behind head, twitch independently */}
          <g className="pb-cat-ear-l">
            <polygon points="112,38 119,18 126,38" fill="#9B8EE0" />
            <polygon points="114.5,35.5 119,22 123.5,35.5" fill="#E8A4C8" />
          </g>
          <g className="pb-cat-ear-r">
            <polygon points="130,38 137,18 144,38" fill="#9B8EE0" />
            <polygon points="132.5,35.5 137,22 141.5,35.5" fill="#E8A4C8" />
          </g>

          {/* Head */}
          <circle cx="128" cy="44" r="20" fill="#9B8EE0" />

          {/* Cheek blush */}
          <circle cx="115" cy="52" r="6.5" fill="#E67E22" fillOpacity="0.22" />
          <circle cx="141" cy="52" r="6.5" fill="#E67E22" fillOpacity="0.22" />

          {/* Left eye — green iris, slit pupil, blinks */}
          <g className="pb-cat-eye">
            <ellipse cx="119" cy="41" rx="6.5" ry="5.5" fill="white" />
            <ellipse cx="119" cy="41" rx="4.5" ry="4.5" fill="#2C6B2F" />
            <ellipse cx="119" cy="41" rx="1.6" ry="3.8" fill="#2C1810" />
            <circle  cx="120.8" cy="39.2" r="1.2" fill="white" />
          </g>

          {/* Right eye — green iris, slit pupil, blinks */}
          <g className="pb-cat-eye">
            <ellipse cx="137" cy="41" rx="6.5" ry="5.5" fill="white" />
            <ellipse cx="137" cy="41" rx="4.5" ry="4.5" fill="#2C6B2F" />
            <ellipse cx="137" cy="41" rx="1.6" ry="3.8" fill="#2C1810" />
            <circle  cx="138.8" cy="39.2" r="1.2" fill="white" />
          </g>

          {/* Nose — pink triangle */}
          <polygon points="128,51 125.5,55 130.5,55" fill="#E8A4C8" />

          {/* Mouth */}
          <path
            d="M 125.5 55 Q 128 59 130.5 55"
            stroke="#2C1810" strokeWidth="1.2" strokeLinecap="round"
          />

          {/* Whiskers — 2 each side */}
          <line x1="106" y1="49" x2="122" y2="51" stroke="#2C1810" strokeWidth="0.9" opacity="0.5" />
          <line x1="106" y1="53" x2="122" y2="53" stroke="#2C1810" strokeWidth="0.9" opacity="0.5" />
          <line x1="150" y1="49" x2="134" y2="51" stroke="#2C1810" strokeWidth="0.9" opacity="0.5" />
          <line x1="150" y1="53" x2="134" y2="53" stroke="#2C1810" strokeWidth="0.9" opacity="0.5" />
        </g>

        {/* ════════════════════════════════════════════
            HEARTS  (float upward, staggered)
        ════════════════════════════════════════════ */}

        {/* Orange heart — dog side */}
        <g className="pb-heart-1">
          <path
            d="M 55 38 C 48 35 46 29 51 27 C 54 25 55 28 55 28 C 55 28 56 25 59 27 C 64 29 62 35 55 38 Z"
            fill="#E67E22"
          />
        </g>

        {/* Pink heart — cat side */}
        <g className="pb-heart-2">
          <path
            d="M 105 33 C 98 30 96 24 101 22 C 104 20 105 23 105 23 C 105 23 106 20 109 22 C 114 24 112 30 105 33 Z"
            fill="#E8A4C8"
          />
        </g>
      </svg>

      {/* ── Wordmark ── */}
      {showWordmark && (
        <span
          style={{
            fontSize,
            fontWeight: 500,
            letterSpacing: "-0.4px",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          <span style={{ color: darkMode ? "white" : "#1B4F72" }}>Pet</span>
          <span style={{ color: "#E67E22" }}>Border</span>
        </span>
      )}
    </div>
  );
}
