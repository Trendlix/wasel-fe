"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
    const { setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            suppressHydrationWarning
            className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 bg-white/10 hover:bg-white/20 group-data-scrolled:bg-black/10 group-data-scrolled:hover:bg-black/20 dark:group-data-scrolled:bg-white/10 dark:group-data-scrolled:hover:bg-white/20"
        >
            <Sun
                size={16}
                className="absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 text-white dark:text-transparent"
            />
            <Moon
                size={16}
                className="absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-transparent dark:text-white"
            />
        </button>
    );
};

export default ThemeSwitcher;
