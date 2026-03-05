"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { aboutTruck, type IAboutTruck } from "@/shared/constants/about-truck";

gsap.registerPlugin(ScrollTrigger);

const Section4 = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const cards = cardRefs.current.filter((el): el is HTMLDivElement => !!el);
        if (!cards.length) return;

        gsap.set(cards, { autoAlpha: 0.2, y: 60 });

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
        <section ref={sectionRef} className="py-28">
            <div className="container space-y-8">
                {aboutTruck.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => { cardRefs.current[index] = el; }}
                        className="will-change-transform"
                    >
                        <Card item={item} />
                    </div>
                ))}
            </div>
        </section>
    );
};

const Card = ({ item }: { item: IAboutTruck }) => {
    const { title, description, cardShape, image, xWidthColor } = item;

    const barClass = clsx("absolute inset-0 w-full h-full z-0", xWidthColor);
    const barClassWide = clsx("absolute top-0 -left-[80%] w-[182%] h-full z-0", xWidthColor);

    if (cardShape === 1) {
        // Layout: content left, image right. Title: part0, <br />, [part1 with bar] part2
        return (
            <div className="bg-linear-to-b from-main-paleBlack/45 to-main-classicMatteGrey rounded-[30px] p-px overflow-hidden min-h-[500px] flex flex-col">
                <div className="rounded-[30px] bg-main-codGray text-white overflow-hidden py-7 flex items-center justify-between gap-10 flex-1 min-h-0">
                    <div className="flex-1 space-y-6">
                        <h3 className="2xl:text-5xl xl:text-4xl md:text-3xl text-2xl font-bold">
                            <span className="pl-20">{title[0]}</span>
                            <br />
                            <span className={clsx("relative", "w-fit")}>
                                <span className="relative z-10 pr-1 pl-20">{title[1]}</span>
                                <span className={barClass} />
                            </span>
                            {" "}
                            <span>{title[2]}</span>
                        </h3>
                        <p className="2xl:text-3xl xl:text-2xl md:text-xl text-lg tracking-[-4%] pl-20">
                            {description}
                        </p>
                    </div>
                    <div className="pr-20 max-w-[598px]">
                        <Image src={image} alt={title.join(" ")} width={1000} height={1000} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        );
    }

    if (cardShape === 2) {
        // Layout: image left, content right. Title: [part0 with bar] part1
        return (
            <div className="bg-linear-to-b from-main-paleBlack/45 to-main-classicMatteGrey rounded-[30px] p-px overflow-hidden min-h-[500px] flex flex-col">
                <div className="rounded-[30px] bg-main-codGray text-white overflow-hidden py-7 flex items-center justify-between gap-10 flex-1 min-h-0">
                    <div className="pl-20 max-w-[598px] relative z-10">
                        <Image src={image} alt={title.join(" ")} width={1000} height={1000} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-6">
                        <h3 className="2xl:text-5xl xl:text-4xl md:text-3xl text-2xl font-bold">
                            <span className={clsx("relative", "w-fit")}>
                                <span className="relative z-10 pr-1 pl-20">{title[0]}</span>
                                <span className={barClassWide} />
                            </span>
                            {" "}
                            <span>{title[1]}</span>
                        </h3>
                        <p className="2xl:text-3xl xl:text-2xl md:text-xl text-lg tracking-[-4%] pr-20">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // cardShape === 3: Layout: content left, image right. Title: [part0 with bar] <br /> part1
    return (
        <div className="bg-linear-to-b from-main-paleBlack/45 to-main-classicMatteGrey rounded-[30px] p-px overflow-hidden min-h-[500px] flex flex-col">
            <div className="rounded-[30px] bg-main-codGray text-white overflow-hidden py-7 flex items-center justify-between gap-10 flex-1 min-h-0">
                <div className="flex-1 space-y-6">
                    <h3 className="2xl:text-5xl xl:text-4xl md:text-3xl text-2xl font-bold">
                        <span className={clsx("relative", "w-fit")}>
                            <span className="relative z-10 pr-1 pl-20">{title[0]}</span>
                            <span className={barClassWide} />
                        </span>
                        <br />
                        <span className="pl-20">{title[1]}</span>
                    </h3>
                    <p className="2xl:text-3xl xl:text-2xl md:text-xl text-lg tracking-[-4%] pl-20">
                        {description}
                    </p>
                </div>
                <div className="pr-20 max-w-[598px]">
                    <Image src={image} alt={title.join(" ")} width={1000} height={1000} className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default Section4;
