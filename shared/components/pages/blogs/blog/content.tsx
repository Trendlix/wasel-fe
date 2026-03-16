"use client";

import { useLocale } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Content = ({ description }: { description: string }) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(ref.current, {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
            },
        });
    }, { scope: ref });

    return (
        <div ref={ref} className="2xl:max-w-3xl! mx-auto container" dir={dir}>
            <p>
                {description}
            </p>
        </div>
    );
};

export default Content;