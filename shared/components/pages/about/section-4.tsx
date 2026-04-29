"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { aboutTruck, type IAboutTruck } from "@/shared/constants/about-truck";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { IAboutPageContent, IAboutFutureCard } from "@/shared/types/pages/about.types";

gsap.registerPlugin(ScrollTrigger);

type Section4Props = {
    future?: IAboutPageContent["future"];
};

const Section4 = ({ future }: Section4Props) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const isAr = locale === "ar";
    const tHeading = useTranslations("about.section4.card0");
    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const cards = cardRefs.current.filter((el): el is HTMLDivElement => !!el);
        if (!cards.length) return;

        gsap.set(cards, { autoAlpha: 0.2, y: 60 });

        // set all bars to width 0 on mount
        cards.forEach((el) => {
            const bar = el.querySelector<HTMLElement>("[data-bar]");
            if (bar) gsap.set(bar, { width: 0 });
        });

        cards.forEach((el) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }).to(el, { y: 0, duration: 0.7, ease: "power2.out" });
        });

        const section = sectionRef.current;
        if (!section) return;

        let lastActiveIndex = -1;

        ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onUpdate: () => {
                const vh = window.innerHeight;
                let activeIndex = 0;
                let minDistance = Infinity;

                cards.forEach((el, i) => {
                    const rect = el.getBoundingClientRect();
                    const cardCenter = rect.top + rect.height / 2;
                    const viewportCenter = vh / 2;
                    const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
                    const inView = rect.top < vh && rect.bottom > 0;

                    if (inView && distanceFromCenter < minDistance) {
                        minDistance = distanceFromCenter;
                        activeIndex = i;
                    }
                });

                cards.forEach((el, i) => {
                    const isActive = i === activeIndex;
                    gsap.to(el, { autoAlpha: isActive ? 1 : 0.2, duration: 0.3, ease: "power2.out", overwrite: "auto" });

                    if (lastActiveIndex !== activeIndex) {
                        const bar = el.querySelector<HTMLElement>("[data-bar]");
                        if (bar) {
                            const targetWidth = bar.dataset.barWidth ?? "100%";
                            gsap.to(bar, {
                                width: isActive ? targetWidth : 0,
                                duration: 0.8,
                                ease: "power2.out",
                                overwrite: "auto",
                            });
                        }
                    }
                });

                lastActiveIndex = activeIndex;
            },
        });
    }, { scope: sectionRef, dependencies: [] });

    return (
        <section ref={sectionRef} className="py-16 md:py-20 xl:py-28">
            <h2 className="sr-only">{[tHeading("title0"), tHeading("title1"), tHeading("title2")].join(" ")}</h2>
            <div className="container space-y-6 md:space-y-8">
                {aboutTruck && aboutTruck.length > 0 && aboutTruck.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => { cardRefs.current[index] = el; }}
                        className="will-change-transform"
                        dir={dir}
                    >
                        <Card item={item} index={index} dir={dir} isAr={isAr} content={future?.cards?.[index]} />
                    </div>
                ))}
            </div>
        </section>
    );
};

const Card = ({
    item,
    index,
    dir,
    isAr,
    content,
}: {
    item: IAboutTruck;
    index: number;
    dir: string;
    isAr: boolean;
    content?: IAboutFutureCard;
}) => {
    const t = useTranslations(`about.section4.card${index}`);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { cardShape, image, imageLight, xWidthColor } = item;

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    const imgSrc = !mounted ? imageLight : (resolvedTheme ?? "light") === "dark" ? image : imageLight;
    const title0 = content?.titles?.[0] || t("title0");
    const title1 = content?.titles?.[1] || t("title1");
    const title2 = content?.titles?.[2] || t("title2");
    const description = content?.descriptions?.[0] || t("description");

    const barClass = clsx("absolute top-0 left-0 w-full h-full z-0", isAr ? "right-0 left-auto origin-right" : "origin-left", xWidthColor);
    const barClassWide = clsx("absolute top-0 h-full z-0 p-1", isAr ? "-right-[200%] w-[250%] origin-right" : "-left-[95%] w-[195%] origin-left ", xWidthColor);

    if (cardShape === 1) {
        // Layout: content left, image right. Title: part0, <br />, [part1 with bar] part2
        return (
            <div className="bg-main-lightGray/55 dark:bg-main-lightGray dark:bg-linear-to-b dark:from-main-paleBlack/45 dark:to-main-classicMatteGrey rounded-[24px] md:rounded-[30px] p-px overflow-hidden flex flex-col  ">
                <div className={clsx("rounded-[24px] md:rounded-[30px] dark:bg-main-codGray bg-white dark:text-white text-main-codGray overflow-hidden py-6 md:py-7 lg:py-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 sm:gap-10 flex-1 min-h-0", isAr ? "px-4 sm:px-6 md:px-9" : "")}>
                    <div className="order-2 sm:order-1 w-full space-y-4 md:space-y-6 sm:basis-1/2 sm:flex-1" >
                        <h3 className={clsx("font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl", isAr && "leading-tight")} dir={dir}>
                            <span className={clsx(isAr ? "" : "pl-0 sm:pl-10 md:pl-12 lg:pl-20")}>{title0}</span>
                            {" "}
                            <br className={clsx(isAr && "hidden")} />
                            <span className={clsx("relative", "w-fit")}>
                                <span className={clsx("relative z-10 text-white", isAr ? "px-1.5 py-1" : "pr-1")}>{title1}</span>
                                <span className={barClass} data-bar data-bar-width={"100%"} />
                            </span>
                            <br className={clsx(!isAr && "hidden")} />
                            {" "}
                            <span>{title2}</span>
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl tracking-[-2%] pl-0 sm:pl-10 md:pl-12 lg:pl-20">
                            {description}
                        </p>
                    </div>
                    <div className="order-1 sm:order-2 w-full pr-0 sm:pr-10 md:pr-12 lg:pr-20 max-w-full sm:max-w-none sm:basis-1/2 sm:flex-1">
                        <Image src={imgSrc} alt={cardShape === 1 ? [title0, title1, title2].join(" ") : [title0, title1].join(" ")} width={1000} height={1000} className={clsx("w-full h-auto max-h-[262px] md:h-full md:max-h-none object-cover", isAr ? "scale-x-[-1]" : "")} />
                    </div>
                </div>
            </div>
        );
    }

    if (cardShape === 2) {
        // Layout: image left, content right. Title: [part0 with bar] part1
        return (
            <div className="bg-main-lightGray/55 dark:bg-main-lightGray dark:bg-linear-to-b dark:from-main-paleBlack/45 dark:to-main-classicMatteGrey rounded-[24px] md:rounded-[30px] p-px overflow-hidden flex flex-col  ">
                <div className={clsx("rounded-[24px] md:rounded-[30px] dark:bg-main-codGray bg-white dark:text-white text-main-codGray overflow-hidden py-6 md:py-7 lg:py-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 sm:gap-10 flex-1 min-h-0", isAr ? "px-4 sm:px-6 md:px-9" : "px-4 sm:px-6")}>
                    <div className="order-1 sm:order-2 lg:order-1 w-full pl-0 sm:pl-10 md:pl-12 lg:pl-20 max-w-full sm:max-w-none sm:basis-1/2 sm:flex-1 relative z-10">
                        <Image src={imgSrc} alt={[t("title0"), t("title1")].join(" ")} width={1000} height={1000} className={clsx("w-full h-auto max-h-[262px] md:h-full md:max-h-none object-cover", isAr ? "scale-x-[-1]" : "")} />
                    </div>
                    <div className="order-2 sm:order-1 lg:order-2 w-full space-y-4 md:space-y-6 sm:basis-1/2 sm:flex-1">
                        <h3 className={clsx("font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl", isAr && "leading-tight")}>
                            <span className={clsx("relative", "w-fit")}>
                                <span className={clsx("relative z-10 text-white", isAr ? "px-1.5 py-1" : "pr-1 pl-0 sm:pl-10 md:pl-12 lg:pl-20")}>{title0}</span>
                                <span className={barClassWide} data-bar data-bar-width={isAr ? "300%" : "195%"} />
                            </span>
                            {" "}
                            <span>{title1}</span>
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl tracking-[-2%] pr-0 sm:pr-10 md:pr-12 lg:pr-20">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // cardShape === 3: Layout: content left, image right. Title: [part0 with bar] <br /> part1
    return (
        <div className="bg-main-lightGray/55 dark:bg-main-lightGray dark:bg-linear-to-b dark:from-main-paleBlack/45 dark:to-main-classicMatteGrey rounded-[24px] md:rounded-[30px] p-px overflow-hidden flex flex-col  ">
            <div className={clsx("rounded-[24px] md:rounded-[30px] dark:bg-main-codGray bg-white dark:text-white text-main-codGray overflow-hidden py-6 md:py-7 lg:py-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 sm:gap-10 flex-1 min-h-0", isAr ? "px-4 sm:px-6 md:px-9" : "px-4 sm:px-6")}>
                <div className="order-2 sm:order-1 w-full space-y-4 md:space-y-6 sm:basis-1/2 sm:flex-1">
                    <h3 className={clsx("font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl", isAr && "leading-tight")}>
                        <span className={clsx("relative", "w-fit")}>
                            <span className={clsx("relative z-10 text-white", isAr ? "px-1.5 py-1" : "pr-1 pl-0 sm:pl-10 md:pl-12 lg:pl-20")}>{title0}</span>
                            <span className={barClassWide} data-bar data-bar-width={isAr ? "300%" : "195%"} />
                        </span>
                        <br />
                        <span className="pl-0 sm:pl-10 md:pl-12 lg:pl-20">{title1}</span>
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl tracking-[-2%] pl-0 sm:pl-10 md:pl-12 lg:pl-20">
                        {description}
                    </p>
                </div>
                <div className="order-1 sm:order-2 w-full pr-0 sm:pr-10 md:pr-12 lg:pr-20 max-w-full sm:max-w-none sm:basis-1/2 sm:flex-1">
                    <Image src={imgSrc} alt={[title0, title1].join(" ")} width={1000} height={1000} className={clsx("w-full h-auto max-h-[262px] md:h-full md:max-h-none object-cover", isAr ? "scale-x-[-1]" : "")} />
                </div>
            </div>
        </div>
    );
};

export default Section4;
