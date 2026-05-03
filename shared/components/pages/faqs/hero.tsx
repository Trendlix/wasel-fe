"use client";

import { RichTextHtml } from "@/shared/components/common/rich-text-html";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { RefObject, useRef } from "react";
import gsap from "gsap";
import { Search } from "lucide-react";
import useFaqsStore from "@/shared/hooks/store/pages/faqs/usefaqsStore";

type HeroProps = { onLayoutReady?: () => void };

const Hero = ({ onLayoutReady }: HeroProps) => {
    const locale = useLocale();
    const t = useTranslations("faqs");
    const heroTitles = useFaqsStore((s) => s.heroTitles);
    const heroDescription = useFaqsStore((s) => s.heroDescription);
    const dir = locale === "ar" ? "rtl" : "ltr";
    const headingRef = useRef<HTMLHeadingElement>(null);
    const headingXWidthRef = useRef<HTMLSpanElement | null>(null);
    const paragraphRef = useRef<HTMLDivElement | null>(null);
    const searchbarRef = useRef<HTMLDivElement | null>(null);

    const setHeadingXWidthRef = (el: HTMLSpanElement | null) => { headingXWidthRef.current = el; };
    const setParagraphRef = (el: HTMLDivElement | null) => { paragraphRef.current = el; };
    const setSearchbarRef = (el: HTMLDivElement | null) => { searchbarRef.current = el; };

    useGSAP(() => {
        if (!headingRef.current || !headingXWidthRef.current || !paragraphRef.current || !searchbarRef.current) return;

        gsap.set(headingRef.current, { autoAlpha: 0, y: 100 });
        gsap.set(headingXWidthRef.current, { width: 0 });
        gsap.set(paragraphRef.current, { autoAlpha: 0, y: 150 });
        gsap.set(searchbarRef.current, { autoAlpha: 0, y: 150 });

        const tl = gsap.timeline({
            onComplete: () => onLayoutReady?.(),
        });

        tl.to(headingRef.current, {
            y: 0, autoAlpha: 1, duration: 2, ease: "back.out(1.7)",
        })
            .to(headingXWidthRef.current, { width: "100%", duration: 1, ease: "back.out(1)" }, "<")
            .to(paragraphRef.current, { y: 0, autoAlpha: 1, duration: 1.2, ease: "power2.out" }, "<0")
            .to(searchbarRef.current, {
                y: 0, autoAlpha: 1, duration: 1.2, ease: "power2.out",
            }, "<");

    }, { scope: headingRef });

    return (
        <section className="container mt-36 gap-y-14 flex flex-col items-center justify-center" dir={dir}>
            <Heading
                t={t}
                dir={dir}
                headingRef={headingRef}
                setHeadingXWidthRef={setHeadingXWidthRef}
                setParagraphRef={setParagraphRef}
                cmsTitles={heroTitles}
                cmsDescription={heroDescription}
            />
            <Searchbar t={t} setSearchbarRef={setSearchbarRef} />
        </section>
    );
};

const Heading = ({
    t,
    dir,
    headingRef,
    setHeadingXWidthRef,
    setParagraphRef,
    cmsTitles,
    cmsDescription,
}: {
    t: (key: string) => string;
    dir: string;
    headingRef: RefObject<HTMLHeadingElement | null>;
    setHeadingXWidthRef: (el: HTMLSpanElement | null) => void;
    setParagraphRef: (el: HTMLDivElement | null) => void;
    cmsTitles: string[] | null;
    cmsDescription: string | null;
}) => {
    const useCms = cmsTitles && cmsTitles.length >= 2;
    const line1 = useCms ? cmsTitles[0] : t("hero.line1");
    const line2 = useCms ? cmsTitles[1] : t("hero.line2");
    const line3 = useCms ? (cmsTitles[2] ?? "") : t("hero.line3");
    const cmsSubtitle = cmsDescription?.trim() ?? "";

    return (
        <div className="flex flex-col items-center justify-center gap-y-4" dir={dir}>
            <h1
                className={clsx("text-white font-bold 2xl:text-5xl xl:text-4xl text-3xl",
                    "flex  items-center justify-center", "opacity-0", "text-start",
                    dir === "rtl" ? "text-end flex-row" : "flex-col"
                )}
                ref={headingRef}
            >
                <p className="flex gap-3 flex-wrap justify-center">
                    {useCms ? (
                        <RichTextHtml
                            as="span"
                            html={line1}
                            className="dark:text-white text-black [&_p]:inline [&_p]:mb-0"
                        />
                    ) : (
                        <span className="dark:text-white text-black">{line1}</span>
                    )}
                    {line3 ? (
                        useCms ? (
                            <RichTextHtml
                                as="span"
                                html={line3}
                                className="mt-1 dark:text-white text-black [&_p]:inline [&_p]:mb-0"
                            />
                        ) : (
                            <span className="mt-1 dark:text-white text-black">{line3}</span>
                        )
                    ) : null}
                </p>
                <span className={clsx("w-fit", "relative py-1")}>
                    <span className="relative z-10 text-white p-1">
                        {useCms ? (
                            <RichTextHtml
                                as="span"
                                html={line2}
                                className="text-white [&_p]:inline [&_p]:mb-0"
                            />
                        ) : (
                            line2
                        )}
                    </span>
                    <span
                        ref={setHeadingXWidthRef}
                        className={clsx("absolute", "inset-0 w-full h-full bg-main-ukraineBlue z-0")}
                    />
                </span>
            </h1>
            <div
                ref={setParagraphRef}
                className={clsx("lg:text-lg text-base leading-[21px] md:leading-[27px] text-center 2xl:max-w-[70%] opacity-0")}
            >
                {cmsSubtitle ? (
                    <RichTextHtml
                        html={cmsSubtitle}
                        className="lg:text-lg text-base leading-[21px] md:leading-[27px] text-center text-inherit"
                    />
                ) : (
                    t("hero.subtitle")
                )}
            </div>
        </div>
    );
};

// 👇 Accept and attach the ref via a wrapper div
const Searchbar = ({ t, setSearchbarRef }: {
    t: (key: string) => string;
    setSearchbarRef: (el: HTMLDivElement | null) => void;
}) => {
    return (
        <div ref={setSearchbarRef} className="opacity-0"> {/* 👈 wrapper div with ref */}
            <div className={clsx(
                "max-w-xl rounded-full dark:bg-main-eerieBlack bg-main-techWhite",
                "flex items-center justify-between",
                "px-1.5 py-1",
                "md:min-w-[500px]"
            )}>
                <input
                    type="text"
                    placeholder={t("search.placeholder")}
                    className={clsx(
                        "w-full rounded-full dark:bg-main-eerieBlack bg-main-techWhite dark:text-white text-black",
                        "px-6 py-4",
                        "placeholder:text-[14px] placeholder:dark:text-white/40",
                        "focus:outline-none"
                    )}
                />
                <button
                    className={clsx(
                        "flex items-center gap-2",
                        "bg-main-primary/50",
                        "px-6 py-4 rounded-full",
                        "hover:bg-main-primary/70 transition-all duration-300"
                    )}
                    type="submit"
                >
                    <span><Search size={16} className="text-white" /></span>
                    <span className={clsx("text-[12px] font-medium capitalize text-white")}>{t("search.btn")}</span>
                </button>
            </div>
        </div>
    );
};

export default Hero;