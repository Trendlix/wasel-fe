"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { serviceSection2Cards, type IServiceSection2Card } from "@/shared/constants/services";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const t = useTranslations("services.section2");
    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const cards = cardRefs.current.filter((el): el is HTMLDivElement => !!el);
        if (!cards.length) return;

        gsap.set(cards, { autoAlpha: 0.2, y: 60 });
        if (cards[0]) gsap.set(cards[0], { autoAlpha: 0, y: 60 });

        // First card: fade up on page load (from 0 to 1)
        const firstCard = cards[0];
        if (firstCard) {
            gsap.to(firstCard, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.2 });
        }

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
                    gsap.to(el, { autoAlpha: i === activeIndex ? 1 : 0.2, duration: 0.3, ease: "power2.out", overwrite: "auto" });
                });
            },
        });
    }, { scope: sectionRef, dependencies: [] });

    return (
        <section ref={sectionRef} dir={dir} className="pb-28 pt-10">
            <div className="container space-y-8">
                {serviceSection2Cards.map((card, index) => {
                    const points = card.highlights.points.map((_, j) => t(`cards.${index}.points.${j}`));
                    const content = {
                        tag: t(`cards.${index}.tag`),
                        title: t(`cards.${index}.title`),
                        highlightsTitle: t(`cards.${index}.highlightsTitle`),
                        description: t(`cards.${index}.description`),
                        points,
                    };
                    return (
                        <div
                            key={index}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className={clsx("will-change-transform", card.id === 1 && "opacity-0")}
                        >
                            <Card card={card} content={content} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

const Card = ({ card, content }: { card: IServiceSection2Card; content: { tag: string; title: string; highlightsTitle: string; description: string; points: string[] } }) => {
    const { image, colors, id } = card;
    const textClass = colors.text ?? "text-white";

    return (
        <div className={clsx("rounded-[30px] overflow-hidden relative min-h-[400px] max-md:flex max-md:flex-col-reverse", "overflow-hidden", colors.bg)}>
            {/* bg - image pinned to right bottom */}
            <div className={clsx("md:absolute right-0 w-full h-full flex items-end justify-end pointer-events-none", id == 1 && "-bottom-10")}>
                <Image
                    src={image}
                    alt={content.title}
                    width={1000}
                    height={1000}
                    className={clsx("object-bottom-right object-contain mix-blend-multiply", id == 1 ? "md:max-w-[57%]" : "md:max-w-[50%] max-md:h-[331px]")}
                />
            </div>
            {/* content */}
            <div className={clsx("relative z-10 space-y-7 md:py-20 md:px-16 px-[30px] py-[29px]")}>
                <div>
                    <span className={clsx("uppercase font-medium text-sm tracking-[5px]", colors.tag)}>
                        {content.tag}
                    </span>
                    <h2 className={clsx("font-bold 2xl:text-5xl xl:text-4xl text-3xl mt-1 whitespace-pre-line", textClass)}>
                        {content.title}
                    </h2>
                </div>
                <div>
                    <p className={clsx("font-medium 2xl:text-xl xl:text-lg md:text-base text-sm whitespace-pre-line", textClass)}>
                        {content.highlightsTitle}
                    </p>
                    <ul className={clsx("list-disc list-inside pl-2 font-normal 2xl:text-lg xl:text-base md:text-sm text-xs", textClass)}>
                        {content.points.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                    {content.description ? (
                        <p className={clsx("mt-4 font-medium 2xl:text-xl xl:text-lg md:text-base text-sm", textClass)}>
                            {content.description}
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Section2;
