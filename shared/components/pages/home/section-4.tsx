"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import Image from "next/image";
import { forwardRef, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLocale, useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

type Section4Props = {
    heroLayoutReady?: boolean;
    className?: string;
};

const Section4 = ({ heroLayoutReady = false, className }: Section4Props) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const cardsRefs = useRef<Array<HTMLDivElement | null>>([]);
    const scopeRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!heroLayoutReady || !scopeRef.current || !cardsRefs.current[0] || !cardsRefs.current[1]) return;

        gsap.set(cardsRefs.current, { autoAlpha: 0.2, y: 150 });

        [0, 1].forEach((i) => {
            const card = cardsRefs.current[i];
            if (!card) return;

            const opacityTl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "top 60%",
                    scrub: true,
                },
            });
            opacityTl.to(card, { autoAlpha: 1, ease: "none" });

            ScrollTrigger.create({
                trigger: card,
                start: "top bottom",
                onEnter: () => {
                    gsap.to(card, {
                        y: 0,
                        duration: 0.9,
                        ease: "back.out(1.1)",
                        overwrite: "auto",
                    });
                },
                onEnterBack: () => {
                    gsap.to(card, {
                        y: 0,
                        duration: 0.9,
                        ease: "back.out(1.1)",
                        overwrite: "auto",
                    });
                },
            });
        });

        const leaveTl = gsap.timeline({
            scrollTrigger: {
                trigger: scopeRef.current,
                start: "30% top",
                end: "70% top",
                scrub: true,
            },
        });

        leaveTl.to(cardsRefs.current, {
            autoAlpha: 0.2,
            ease: "none",
        });
    }, { scope: scopeRef, dependencies: [heroLayoutReady] });

    return (
        <section ref={scopeRef} className={clsx("bg-black", className)}>
            <div className="container py-10 md:py-16 flex items-stretch gap-6 xl:gap-11 *:flex-1 max-lg:flex-col">
                <Card1 ref={(el) => { cardsRefs.current[0] = el; }} dir={dir} />
                <Card2 ref={(el) => { cardsRefs.current[1] = el; }} dir={dir} />
            </div>
        </section>
    );
};

const Card1 = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { dir: string }>(({ dir, ...props }, ref) => {
    const t = useTranslations("home.section4.card1");
    return (<div ref={ref} dir={dir} {...props} className="h-full min-h-[380px] md:min-h-[460px] xl:min-h-[520px] text-white pt-6 md:pt-8 px-5 sm:px-8 lg:px-10 xl:px-12 bg-main-ukraineBlue rounded-4xl flex flex-col md:flex-row justify-between gap-6 overflow-hidden">
        <div className="xl:space-y-12 lg:space-y-10 md:space-y-8 space-y-6 flex-1 flex items-start flex-col justify-center">
            <p className={clsx("font-bold xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg leading-tight")}>
                {t("title")}
                <br className="max-lg:hidden" />
                {t("title2")}
            </p>
            <div className="space-y-3">
                <div>
                    <Image src="/brand/pages/home/section4/appstore.png" alt="app-store" width={1000} height={1000} className="w-[130px] sm:w-[152px] h-auto" />
                </div>
                <div>
                    <Image src="/brand/pages/home/section4/google.png" alt="app-store" width={1000} height={1000} className="w-[130px] sm:w-[152px] h-auto" />
                </div>
            </div>
        </div>
        <div className="flex-1 flex items-end justify-center md:justify-end mt-auto">
            <Image src="/brand/pages/home/section4/homw-drag.png" alt="phone" width={1440} height={1000} className="w-full max-w-[340px] md:max-w-[420px] lg:max-w-[460px] h-auto object-contain object-bottom" />
        </div>
    </div>);
});
Card1.displayName = "Card1";

const Card2 = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { dir: string }>(({ dir, ...props }, ref) => {
    const t = useTranslations("home.section4.card2");
    return (<div ref={ref} dir={dir} {...props} className="h-full min-h-[380px] md:min-h-[460px] xl:min-h-[520px] text-black pt-6 md:pt-8 px-5 sm:px-8 lg:px-10 xl:px-12 bg-main-secondary rounded-4xl flex flex-col md:flex-row justify-between gap-6 overflow-hidden">
        <div className="xl:space-y-12 lg:space-y-10 md:space-y-8 space-y-6 flex-1 flex items-start flex-col justify-center">
            <p className={clsx("font-bold xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg leading-tight")}>
                {t("title")} <br className="max-lg:hidden" /> {t("title2")}
            </p>
            <div className="space-y-3">
                <div>
                    <Image src="/brand/pages/home/section4/appstore.png" alt="app-store" width={1000} height={1000} className="w-[130px] sm:w-[152px] h-auto" />
                </div>
                <div>
                    <Image src="/brand/pages/home/section4/google.png" alt="app-store" width={1000} height={1000} className="w-[130px] sm:w-[152px] h-auto" />
                </div>
            </div>
        </div>
        <div className="flex-1 flex items-end justify-center md:justify-end mt-auto">
            <Image src="/brand/pages/home/section4/join-wasel.png" alt="phone" width={1440} height={1000} className="w-full max-w-[340px] md:max-w-[420px] lg:max-w-[460px] h-auto object-contain object-bottom" />
        </div>
    </div>);
});
Card2.displayName = "Card2";

export default Section4;