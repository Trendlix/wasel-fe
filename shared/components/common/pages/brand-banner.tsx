"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "../../ui/button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

type BrandBannerProps = {
    heroLayoutReady?: boolean;
    className?: string;
    keepVisibleOnScroll?: boolean;
};

const BrandBanner = ({
    heroLayoutReady = false,
    className,
    keepVisibleOnScroll = false,
    brandContent = null,
}: BrandBannerProps & {
    brandContent?: {
        title: string;
        description: string;
        cta: {
            text: string;
            link: string;
        };
    } | null;
}) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const t = useTranslations("brandBanner");
    const scopeRef = useRef<HTMLDivElement>(null);
    const elementsRefs = useRef<Array<HTMLDivElement | null>>([]);

    useGSAP(() => {
        if (!heroLayoutReady || !scopeRef.current || !elementsRefs.current[0] || !elementsRefs.current[1] || !elementsRefs.current[2]) return;

        const isMdOrUp = window.matchMedia("(min-width: 768px)").matches;
        if (!isMdOrUp) {
            gsap.set(elementsRefs.current, { autoAlpha: 1, y: 0 });
            return;
        }

        gsap.set(elementsRefs.current, { autoAlpha: 0.2, y: 150 });

        [0, 1, 2].forEach((i) => {
            const el = elementsRefs.current[i];
            if (!el) return;

            const opacityTl = gsap.timeline({
                scrollTrigger: { trigger: el, start: "top bottom", end: "top 60%", scrub: true },
            });
            opacityTl.to(el, { autoAlpha: 1, ease: "none" });

            ScrollTrigger.create({
                trigger: el,
                start: "top bottom",
                onEnter: () => gsap.to(el, { y: 0, duration: 0.9, ease: "back.out(1.1)", overwrite: "auto" }),
                onEnterBack: () => gsap.to(el, { y: 0, duration: 0.9, ease: "back.out(1.1)", overwrite: "auto" }),
            });
        });

        if (!keepVisibleOnScroll) {
            const leaveTl = gsap.timeline({
                scrollTrigger: { trigger: scopeRef.current, start: "30% top", end: "70% top", scrub: true },
            });
            leaveTl.to(elementsRefs.current, { autoAlpha: 0.2, ease: "none" });
        }
    }, { scope: scopeRef, dependencies: [heroLayoutReady, keepVisibleOnScroll] });

    return (
        <section ref={scopeRef} className={clsx("bg-white dark:bg-black pb-32", className)}>
            <div className="container">
                <div className="rounded-4xl overflow-hidden flex flex-col justify-between bg-gradient-to-br from-main-ukraineBlue/12 via-white to-main-secondary/15 dark:bg-main-flatBlack dark:from-main-flatBlack dark:via-main-flatBlack dark:to-main-flatBlack xl:px-9 lg:px-6 md:px-4 px-4">
                    <div ref={(el) => { elementsRefs.current[0] = el; }} className="self-end max-sm:self-center flex items-start justify-end max-sm:justify-end">
                        <Image src="/common/Link (1).png" alt="truck" width={1000} height={1000} className="xl:max-w-[15%] xl:max-h-[15%] lg:max-w-[15%] lg:max-h-[15%] md:max-w-[25%] max-w-[40%]" />
                    </div>
                    <div ref={(el) => { elementsRefs.current[1] = el; }} className="space-y-3 self-center text-main-codGray dark:text-white text-center max-sm:w-full" dir={dir}>
                        <h3 className="font-bold xl:text-4xl text-2xl">
                            {brandContent?.title || t("heading")}
                        </h3>
                        <p className="text-main-paleBlack dark:text-main-matteLightGray">{brandContent?.description || t("description")}</p>
                        <div className="flex items-center gap-4 justify-center mt-10 *:max-h-[60px] *:flex *:items-center *:justify-center max-sm:flex-col max-sm:w-full font-medium">
                            <a href={brandContent?.cta?.link || "#"} target="_blank" rel="noreferrer" className="max-sm:w-full">
                                <Button variant="primary" className="text-xs sm:text-sm md:text-base max-sm:w-full">{brandContent?.cta?.text || t("companiesPortal")}</Button>
                            </a>
                            <Button variant="secondary" className="text-xs sm:text-sm md:text-base max-sm:w-full">{t("driverPortal")}</Button>
                        </div>
                    </div>
                    <div ref={(el) => { elementsRefs.current[2] = el; }} className="self-start max-sm:self-center w-full max-sm:flex max-sm:justify-start">
                        <Image src="/common/Link (2).png" alt="truck" width={1000} height={1000} className="xl:max-w-[15%] xl:max-h-[15%] lg:max-w-[15%] lg:max-h-[15%] md:max-w-[25%] max-w-[40%]" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BrandBanner;
