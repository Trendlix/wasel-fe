"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { forwardRef, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { serviceSection3Cards, type IServiceSection3Card } from "@/shared/constants/services";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const t = useTranslations("services.section3");
    const scopeRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingXWidthRef = useRef<HTMLSpanElement | null>(null);
    const setHeadingXWidthRef = (el: HTMLSpanElement | null) => { headingXWidthRef.current = el; };
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        // Heading: fade up + widthX bar (like services hero)
        if (headingRef.current && headingXWidthRef.current) {
            gsap.set(headingRef.current, { autoAlpha: 0, y: 50 });
            gsap.set(headingXWidthRef.current, { width: 0 });
            gsap.timeline({
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            })
                .to(headingRef.current, { autoAlpha: 1, y: 0, duration: 2, ease: "back.out(1.7)" })
                .to(headingXWidthRef.current, { width: "100%", duration: 1, ease: "back.out(1)" }, "<");
        }

        const cards = cardRefs.current.filter((el): el is HTMLDivElement => !!el);
        if (!cards.length || !scopeRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            gsap.set(cards, { autoAlpha: 0.2, y: 150 });

            cards.forEach((card) => {
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
            leaveTl.to(cards, { autoAlpha: 0.2, ease: "none" });
        });

        mm.add("(max-width: 767px)", () => {
            gsap.set(cards, { autoAlpha: 0, y: 60 });
            cards.forEach((card) => {
                if (!card) return;
                gsap.to(card, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                });
            });
        });
    }, { scope: scopeRef, dependencies: [] });

    return (
        <section ref={scopeRef} className="min-h-screen flex flex-col py-12 sm:py-16 md:py-20 xl:py-28">
            <div className="container flex flex-col flex-1 min-h-0 px-4 sm:px-6 lg:px-8">
                <Heading ref={headingRef} t={t} dir={dir} setHeadingXWidthRef={setHeadingXWidthRef} />
                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 gap-4 sm:gap-6 lg:gap-8 flex-1 min-h-0 py-6 sm:py-8 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                    {serviceSection3Cards.map((card, index) => {
                        const points = card.highlights.points.map((_, j) => t(`cards.${index}.points.${j}`));
                        const content = {
                            tag: t(`cards.${index}.tag`),
                            title: t(`cards.${index}.title`),
                            highlightsTitle: t(`cards.${index}.highlightsTitle`),
                            points,
                        };
                        return (
                            <div
                                key={card.id}
                                ref={(el) => { cardRefs.current[index] = el; }}
                                className="min-h-[320px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[420px] max-h-[90vh]"
                                dir={dir}
                            >
                                <Card card={card} content={content} reverse={card.id % 2 === 0} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const Heading = forwardRef<HTMLDivElement, { t: (key: string) => string; dir: string; setHeadingXWidthRef: (el: HTMLSpanElement | null) => void }>(({ t, dir, setHeadingXWidthRef }, ref) => {
    return (
        <div
            ref={ref}
            className="flex flex-col items-center justify-center gap-y-4 text-center"
        >
            <h2 className="font-bold 2xl:text-5xl xl:text-4xl text-3xl leading-tight">
                <p>
                    <span className={clsx("w-fit relative mt-1 text-nowrap text-white p-1")}>
                        <span className="relative z-10">{t("headingWord")}</span>
                        <span ref={setHeadingXWidthRef} className={clsx("absolute inset-0 w-full h-full bg-main-red z-0", dir === "rtl" && "origin-right right-0 left-auto")} />
                    </span>
                    {" "}
                    <span>{t("headingSuffix")}</span>
                </p>
                <p className="mt-1">{t("headingSuffix")}</p>
            </h2>
            <p className="lg:text-lg text-base leading-[21px]  md:leading-[27px] tracking-0 max-w-2xl mx-auto px-2">
                {t("subtitle")}
            </p>
        </div>
    );
});
Heading.displayName = "Heading";

const Card = ({ card, content, reverse }: { card: IServiceSection3Card; content: { tag: string; title: string; highlightsTitle: string; points: string[] }; reverse: boolean }) => {
    const { colors, image } = card;
    const textClass = colors.text ?? "text-white";

    return (
        <div
            className={clsx(
                "rounded-2xl sm:rounded-3xl overflow-hidden relative flex flex-col md:flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 w-full h-full min-h-0",
                "px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-10 xl:px-12 xl:py-10",
                colors.bg
            )}
        >
            {/* Text content: side-by-side on single-col, top/bottom on md+; reverse still swaps position */}
            <div
                className={clsx(
                    "relative z-10 shrink-0 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 min-w-0 md:min-w-[unset]",
                    reverse ? "md:order-first" : "md:order-last"
                )}
            >
                <div>
                    <span className={clsx("uppercase font-medium text-[10px] sm:text-xs lg:text-sm tracking-[4px] sm:tracking-[5px]", colors.tag)}>
                        {content.tag}
                    </span>
                    <h2 className={clsx("font-bold 2xl:text-5xl xl:text-4xl text-3xl mt-1 whitespace-pre-line leading-tight", textClass)}>
                        {content.title}
                    </h2>
                </div>
                <div>
                    <p className={clsx("font-medium text-sm sm:text-base md:text-lg lg:text-xl whitespace-pre-line", textClass)}>
                        {content.highlightsTitle}
                    </p>
                    <ul className={clsx("list-disc list-inside pl-2 font-normal text-xs sm:text-sm md:text-base lg:text-lg space-y-0.5", textClass)}>
                        {content.points.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Image: takes the rest of the space */}
            <div className={clsx("flex-1 min-h-0 min-w-0 flex items-center justify-center overflow-hidden", reverse ? "md:order-1" : "md:order-2")}>
                <Image
                    src={image}
                    alt={content.title}
                    width={500}
                    height={500}
                    className={clsx("w-full h-full object-contain", reverse ? "mix-blend-multiply" : "mix-blend-luminosity")}
                />
            </div>
        </div>
    );
};

export default Section3;
