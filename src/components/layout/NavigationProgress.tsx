"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin animated progress bar shown during page transitions.
 * Starts on any <a> click and completes when the pathname changes.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const prevPathname = useRef(pathname);

  // Advance bar width to simulate progress
  function advance(current: number) {
    const next = current < 30
      ? current + 12
      : current < 60
      ? current + 6
      : current < 85
      ? current + 2
      : current;
    setWidth(next);
    if (next < 85) {
      timerRef.current = setTimeout(() => advance(next), 180);
    }
  }

  // Listen for any link click to start the bar
  useEffect(() => {
    function onAnchorClick(e: MouseEvent) {
      const target = (e.target as Element).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      // Only internal navigation
      if (!href || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#")) return;
      if (target.getAttribute("target") === "_blank") return;

      setActive(true);
      setWidth(5);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => advance(5), 100);
    }

    document.addEventListener("click", onAnchorClick);
    return () => document.removeEventListener("click", onAnchorClick);
  }, []);

  // Complete bar when pathname changes
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      if (timerRef.current) clearTimeout(timerRef.current);
      setWidth(100);
      timerRef.current = setTimeout(() => {
        setActive(false);
        setWidth(0);
      }, 300);
    }
  }, [pathname]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!active && width === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[200] h-0.5 pointer-events-none"
    >
      <div
        className="h-full bg-accent-500 transition-all ease-out"
        style={{
          width: `${width}%`,
          transitionDuration: width === 100 ? "200ms" : "400ms",
          opacity: active ? 1 : 0,
          transitionProperty: "width, opacity",
        }}
      />
    </div>
  );
}
