"use client";

import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import gsap from "gsap";
import { useRef } from "react";

const Hero = ({ onLayoutReady }: { onLayoutReady?: () => void }) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const t = useTranslations("orderTracking.hero");
    const scopeRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.8 },
            onComplete: onLayoutReady,
        });

        tl.from(scopeRef.current, { autoAlpha: 0, duration: 0.5 })
            .from(headingRef.current, { y: 50, autoAlpha: 0 }, "-=0.2")
            .from(subtitleRef.current, { y: 30, autoAlpha: 0 }, "-=0.5");
    }, { scope: scopeRef });

    return (
        <section ref={scopeRef} className="mt-36" dir={dir}>
            <div className="container">
                <div className="text-center flex items-center flex-col gap-3">
                    <h1
                        ref={headingRef}
                        className={clsx("dark:text-white text-black font-bold lg:text-6xl text-4xl leading-[60px] tracking-0")}
                    >
                        {t("title")}
                    </h1>
                    <p
                        ref={subtitleRef}
                        className={clsx("dark:text-white/70 text-black/70 leading-[26px] tracking-0", "max-w-xl")}
                    >
                        {t("subtitle")}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
