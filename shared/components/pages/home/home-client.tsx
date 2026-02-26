"use client";

import { useLockScroll } from "@/shared/hooks/common/useScrollLock";
import useLenis from "@/shared/hooks/animation/layout/useLenis";
import useScrollToTopBeforeRefresh from "@/shared/hooks/animation/layout/useScrollToTopBeforeRefresh";
import HeroTest from "../test/hero-test";

const HomeClient = () => {
    useLockScroll({ duration: 2000 });
    useLenis();
    useScrollToTopBeforeRefresh();

    return (
        <div className="relative min-h-screen">
            <HeroTest />
        </div>
    );
};

export default HomeClient;