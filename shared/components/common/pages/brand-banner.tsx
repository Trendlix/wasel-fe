"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "../../ui/button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

type BrandBannerProps = { heroLayoutReady?: boolean, className?: string };

const BrandBanner = ({ heroLayoutReady = false, className }: BrandBannerProps) => {
    const t = useTranslations("brandBanner");
    const scopeRef = useRef<HTMLDivElement>(null);
    const elementsRefs = useRef<Array<HTMLDivElement | null>>([]);

    useGSAP(() => {
        if (!heroLayoutReady || !scopeRef.current || !elementsRefs.current[0] || !elementsRefs.current[1] || !elementsRefs.current[2]) return;

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

        const leaveTl = gsap.timeline({
            scrollTrigger: { trigger: scopeRef.current, start: "30% top", end: "70% top", scrub: true },
        });
        leaveTl.to(elementsRefs.current, { autoAlpha: 0.2, ease: "none" });
    }, { scope: scopeRef, dependencies: [heroLayoutReady] });

    return (
        <div ref={scopeRef} className={clsx("bg-black pb-32", className)}>
            <div className="container rounded-4xl overflow-hidden flex flex-col justify-between bg-main-flatBlack xl:px-9 lg:px-6 md:px-4 px-4">
                <div ref={(el) => { elementsRefs.current[0] = el; }} className="self-end flex items-start justify-end">
                    <Image src="/common/Link (1).png" alt="truck" width={1000} height={1000} className="max-w-[15%] max-h-[15%]" />
                </div>
                <div ref={(el) => { elementsRefs.current[1] = el; }} className="space-y-3 self-center text-white">
                    <h3 className="font-bold xl:text-4xl text-2xl">
                        {t("heading")}
                    </h3>
                    <p>{t("description")}</p>
                    <div className="flex items-center gap-4 justify-center mt-10 *:max-h-[60px] *:flex *:items-center *:justify-center">
                        <Button variant="primary">{t("companiesPortal")}</Button>
                        <Button variant="secondary">{t("driverPortal")}</Button>
                    </div>
                </div>
                <div ref={(el) => { elementsRefs.current[2] = el; }} className="self-start">
                    <Image src="/common/Link (2).png" alt="truck" width={1000} height={1000} className="max-w-[15%] max-h-[15%]" />
                </div>
            </div>
        </div>
    );
}

export default BrandBanner;
