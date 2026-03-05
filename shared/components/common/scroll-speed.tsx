"use client";

import { useEffect } from "react";

/** Multiplier for scroll delta. Lower = slower scroll (e.g. 0.5 = half speed). */
const SCROLL_SPEED = 1;

export function ScrollSpeedController() {
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (document.documentElement.classList.contains("scroll-locked")) return;
      e.preventDefault();
      window.scrollBy({
        top: e.deltaY * SCROLL_SPEED,
        left: e.deltaX * SCROLL_SPEED,
        behavior: "auto",
      });
    };

    document.addEventListener("wheel", onWheel, { passive: false });
    return () => document.removeEventListener("wheel", onWheel);
  }, []);

  return null;
}
