"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useRef } from "react";

const Hero = ({ onLayoutReady }: { onLayoutReady?: () => void }) => {
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
        <section ref={scopeRef} className="mt-36">
            <div className="container">
                <div className="text-center flex items-center flex-col gap-3">
                    <h1
                        ref={headingRef}
                        className={clsx("text-white font-bold lg:text-6xl text-4xl leading-[60px] tracking-0")}
                    >
                        Track Your Shipment
                    </h1>
                    <p
                        ref={subtitleRef}
                        className={clsx("text-white/70 leading-[26px] tracking-0", "max-w-xl")}
                    >
                        Enter your tracking number below to get real-time updates on your shipment status and location.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
