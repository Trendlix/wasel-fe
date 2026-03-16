"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import clsx from "clsx";

const ThemeSwitcher = ({ activeClass, className }: { activeClass?: string, className?: string }) => {
    const { setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            suppressHydrationWarning
            className={clsx("relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ", activeClass)}
        >
            <Sun
                size={16}
                className={clsx("absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0", className)}
            />
            <Moon size={16} className={clsx("absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100", className)} />
        </button>
    );
};

export default ThemeSwitcher;
