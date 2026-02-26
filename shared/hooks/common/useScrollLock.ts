"use client";

import { useEffect } from "react";

const SCROLL_KEYS = new Set([
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
    "PageUp", "PageDown", "Home", "End", " ", "Tab",
]);

export function useLockScroll(options?: { delay?: number; duration?: number }) {
    useEffect(() => {
        let lockTimer: NodeJS.Timeout | null = null;
        let unlockTimer: NodeJS.Timeout | null = null;
        let isLocked = false;

        const preventDefault = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const preventScrollKeys = (e: KeyboardEvent) => {
            if (SCROLL_KEYS.has(e.key)) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        const preventWheel = (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const preventMiddleClick = (e: MouseEvent) => {
            if (e.button === 1) e.preventDefault();
        };

        const addListeners = () => {
            window.addEventListener("wheel", preventWheel, { passive: false });
            window.addEventListener("touchstart", preventDefault, { passive: false });
            window.addEventListener("touchmove", preventDefault, { passive: false });
            window.addEventListener("touchend", preventDefault, { passive: false });
            window.addEventListener("keydown", preventScrollKeys, { passive: false });
            window.addEventListener("scroll", preventDefault, { passive: false });
            window.addEventListener("mousedown", preventMiddleClick);
            document.addEventListener("wheel", preventWheel, { passive: false });
            document.addEventListener("touchmove", preventDefault, { passive: false });
            document.addEventListener("keydown", preventScrollKeys, { passive: false });
        };

        const removeListeners = () => {
            window.removeEventListener("wheel", preventWheel);
            window.removeEventListener("touchstart", preventDefault);
            window.removeEventListener("touchmove", preventDefault);
            window.removeEventListener("touchend", preventDefault);
            window.removeEventListener("keydown", preventScrollKeys);
            window.removeEventListener("scroll", preventDefault);
            window.removeEventListener("mousedown", preventMiddleClick);
            document.removeEventListener("wheel", preventWheel);
            document.removeEventListener("touchmove", preventDefault);
            document.removeEventListener("keydown", preventScrollKeys);
        };

        const lock = () => {
            if (isLocked) return;
            isLocked = true;

            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            document.documentElement.dataset.scrollTop = String(scrollTop);
            document.documentElement.classList.add("scroll-locked");

            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollTop}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
            document.body.style.touchAction = "none";

            addListeners();

            // Schedule unlock if duration is set
            if (options?.duration && options.duration > 0) {
                unlockTimer = setTimeout(unlock, options.duration);
            }
        };

        const unlock = () => {
            if (!isLocked) return;
            isLocked = false;

            const scrollTop = Number(document.documentElement.dataset.scrollTop || 0);
            delete document.documentElement.dataset.scrollTop;

            document.documentElement.classList.remove("scroll-locked");

            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";
            document.body.style.touchAction = "";

            window.scrollTo({ top: scrollTop, behavior: "instant" });

            removeListeners();
        };

        if (options?.delay && options.delay > 0) {
            lockTimer = setTimeout(lock, options.delay);
        } else {
            lock();
        }

        return () => {
            if (lockTimer) clearTimeout(lockTimer);
            if (unlockTimer) clearTimeout(unlockTimer);
            unlock();
        };
    }, [options?.delay, options?.duration]);
}