"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const HomeThemeLock = () => {
    const { setTheme } = useTheme();

    useEffect(() => {
        const previousTheme = window.localStorage.getItem("theme") ?? "system";
        setTheme("dark");
        return () => {
            setTheme(previousTheme);
        };
    }, [setTheme]);

    return null;
};

export default HomeThemeLock;
