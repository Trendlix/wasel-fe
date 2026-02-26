'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="p-2 w-8 h-8" />;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md border"
        >
            {theme === 'dark' ? '🌙' : '☀️'}
        </button>
    );
}