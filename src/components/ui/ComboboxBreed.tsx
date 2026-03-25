"use client";

import { useState, useRef, useEffect, useId } from "react";

// ── Breed lists ───────────────────────────────────────────────────────────────

export const DOG_BREEDS = [
  "Labrador Retriever",
  "Golden Retriever",
  "German Shepherd",
  "French Bulldog",
  "Bulldog",
  "Poodle",
  "Beagle",
  "Rottweiler",
  "Yorkshire Terrier",
  "Boxer",
  "Dachshund",
  "Siberian Husky",
  "Dobermann",
  "Cavalier King Charles Spaniel",
  "Shih Tzu",
  "Border Collie",
  "Australian Shepherd",
  "Maltese",
  "Staffordshire Bull Terrier",
  "Cocker Spaniel",
  "Miniature Schnauzer",
  "Chihuahua",
  "Pug",
  "Bichon Frise",
  "Whippet",
  "Greyhound",
  "Jack Russell Terrier",
  "Weimaraner",
  "Dalmatian",
  "Great Dane",
  "Mixed breed / Crossbreed",
];

export const CAT_BREEDS = [
  "Domestic Shorthair",
  "Domestic Longhair",
  "Domestic Mediumhair",
  "British Shorthair",
  "Ragdoll",
  "Maine Coon",
  "Persian",
  "Siamese",
  "Abyssinian",
  "Burmese",
  "Russian Blue",
  "Birman",
  "Scottish Fold",
  "Devon Rex",
  "Cornish Rex",
  "Sphynx",
  "Norwegian Forest Cat",
  "American Shorthair",
  "Tonkinese",
  "Exotic Shorthair",
  "Mixed breed",
];

// ── Banned breed detection ────────────────────────────────────────────────────

const BANNED_DOG_PATTERNS = [
  /pit\s*bull/i,
  /pitbull/i,
  /japanese\s*tosa/i,
  /\btosa\b/i,
  /dogo\s*argentino/i,
  /fila\s*brasileiro/i,
  /presa\s*canario/i,
  /wolf\s*hybrid/i,
  /wolfdog/i,
];

type BannedWarning =
  | { kind: "banned_dog"; breedName: string }
  | { kind: "banned_cat_bengal" }
  | { kind: "banned_cat_savannah" };

export function detectBannedBreed(
  petType: "dog" | "cat",
  value: string
): BannedWarning | null {
  if (!value.trim()) return null;
  if (petType === "dog") {
    for (const pat of BANNED_DOG_PATTERNS) {
      if (pat.test(value)) return { kind: "banned_dog", breedName: value.trim() };
    }
  } else {
    if (/\bbengal\b/i.test(value)) return { kind: "banned_cat_bengal" };
    if (/\bsavannah\b/i.test(value)) return { kind: "banned_cat_savannah" };
  }
  return null;
}

// ── Props ─────────────────────────────────────────────────────────────────────

export interface ComboboxBreedProps {
  petType: "dog" | "cat";
  value: string;
  onChange: (breed: string) => void;
  id?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ComboboxBreed({
  petType,
  value,
  onChange,
  id,
  label,
  placeholder,
  required,
  hint,
}: ComboboxBreedProps) {
  const uid = useId();
  const inputId = id ?? `combobox-breed-${uid}`;
  const listId = `${inputId}-list`;

  const breeds = petType === "cat" ? CAT_BREEDS : DOG_BREEDS;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Build filtered option list
  const query = value.trim().toLowerCase();
  const filtered = query
    ? breeds.filter((b) => b.toLowerCase().includes(query))
    : breeds;

  const exactMatch = breeds.some((b) => b.toLowerCase() === query);
  const showCustom = query.length > 0 && !exactMatch;

  type Option = { id: string; label: string; isCustom: boolean };
  const options: Option[] = [];
  if (showCustom) {
    options.push({ id: `${listId}-custom`, label: value.trim(), isCustom: true });
  }
  filtered.forEach((b, i) => {
    options.push({ id: `${listId}-${i}`, label: b, isCustom: false });
  });

  const bannedWarning = detectBannedBreed(petType, value);

  function open() { setIsOpen(true); setActiveIndex(-1); }
  function close() { setIsOpen(false); setActiveIndex(-1); }

  function select(label: string) {
    onChange(label);
    close();
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      open(); e.preventDefault(); return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0 && options[activeIndex]) {
      e.preventDefault();
      select(options[activeIndex].label);
    } else if (e.key === "Escape" || e.key === "Tab") {
      close();
    }
  }

  // Scroll active option into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const el = listRef.current.querySelector<HTMLElement>(
        `[data-idx="${activeIndex}"]`
      );
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // Close on outside pointer-down
  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  const activeId = activeIndex >= 0 ? options[activeIndex]?.id : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-gray-700">
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">*</span>
          )}
        </label>
      )}

      {/* Relative container — dropdown positions against this */}
      <div ref={containerRef} style={{ position: "relative" }}>
        {/* Input row */}
        <div className="relative">
          <input
            ref={inputRef}
            id={inputId}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-haspopup="listbox"
            aria-required={required}
            aria-invalid={!!bannedWarning}
            value={value}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck={false}
            maxLength={100}
            onFocus={open}
            onChange={(e) => { onChange(e.target.value); open(); }}
            onKeyDown={handleKeyDown}
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
            className={[
              "w-full pl-4 pr-10 py-3 rounded-xl border text-gray-900 text-sm placeholder-gray-400",
              "transition-colors duration-150 min-h-[48px]",
              "focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent",
              bannedWarning
                ? "border-red-400 bg-red-50"
                : "border-card-border bg-white hover:border-gray-400",
            ].join(" ")}
          />
          {/* Chevron */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{
                transition: "transform 150ms",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        {/* Options list — always opens below */}
        {isOpen && options.length > 0 && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={label ?? "Breed options"}
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              zIndex: 9999,
              maxHeight: 280,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch" as never,
              background: "white",
              border: "1px solid #E5E3DF",
              borderRadius: 12,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              margin: 0,
              padding: "4px 0",
              listStyle: "none",
            }}
          >
            {options.map((opt, idx) => {
              const isActive = idx === activeIndex;
              const isSelected = !opt.isCustom && value === opt.label;
              return (
                <li
                  key={opt.id}
                  id={opt.id}
                  role="option"
                  aria-selected={isSelected}
                  data-idx={idx}
                  onMouseDown={(e) => {
                    e.preventDefault(); // prevent blur before selection fires
                    select(opt.label);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    select(opt.label);
                  }}
                  style={{
                    padding: "10px 16px",
                    minHeight: 44,
                    cursor: "pointer",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                    background: isActive ? "#EBF5FB" : isSelected ? "#F0F9FF" : "white",
                    color: isActive
                      ? "#1B4F72"
                      : opt.isCustom
                      ? "#E67E22"
                      : "#111827",
                    fontWeight: opt.isCustom || isSelected ? 600 : 400,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {opt.isCustom ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, color: "#E67E22" }}>
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Use &ldquo;{opt.label}&rdquo; as breed name
                    </>
                  ) : (
                    <>
                      {isSelected && (
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, color: "#1B4F72" }}>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {opt.label}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Hint — only shown when no banned warning */}
      {hint && !bannedWarning && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}

      {/* Banned breed warnings */}
      {bannedWarning && (
        <div
          role="alert"
          style={{
            background: "#FDEDEC",
            border: "1px solid #E74C3C",
            borderRadius: 10,
            padding: "12px 14px",
          }}
        >
          <p className="text-sm font-bold" style={{ color: "#922B21", marginBottom: 4 }}>
            {bannedWarning.kind === "banned_dog"
              ? "⚠️ This breed cannot enter Australia"
              : bannedWarning.kind === "banned_cat_bengal"
              ? "⚠️ Bengal cats banned from March 2026"
              : "⚠️ Savannah cats cannot enter Australia"}
          </p>
          <p className="text-sm" style={{ color: "#922B21" }}>
            {bannedWarning.kind === "banned_dog"
              ? `${bannedWarning.breedName} is a restricted breed under Australian biosecurity law and cannot be imported. Please contact DAFF directly at imports@agriculture.gov.au for advice.`
              : bannedWarning.kind === "banned_cat_bengal"
              ? "Bengal cats are no longer permitted to enter Australia as of March 2026. Please contact DAFF at imports@agriculture.gov.au for advice."
              : "Savannah cats are a hybrid species and are not permitted to enter Australia. Please contact DAFF at imports@agriculture.gov.au for advice."}
          </p>
        </div>
      )}
    </div>
  );
}
