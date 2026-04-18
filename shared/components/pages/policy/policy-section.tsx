"use client";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { useRef } from "react";
import gsap from "gsap";
import PolicySidebar from "./policy-sidebar";
import PolicyContent from "./policy-content";

const PolicySection = () => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";

    useGSAP(() => {
        if (!sidebarRef.current || !contentRef.current) return;

        gsap.set(sidebarRef.current, { autoAlpha: 0, y: 100 });
        gsap.set(contentRef.current, { autoAlpha: 0, y: 150 });

        const tl = gsap.timeline();

        tl.to(sidebarRef.current, {
            y: 0, autoAlpha: 1, duration: 2, ease: "back.out(1.7)",
        })
            .to(contentRef.current, {
                y: 0, autoAlpha: 1, duration: 1.2, ease: "power2.out",
            }, "<0");
    });
    return (<section dir={dir} className={clsx(
        "container relative",
        "md:flex lg:[&>*:first-child]:flex-1 lg:[&>*:last-child]:flex-5 md:gap-7.75 md:[&>*:first-child]:flex-1 md:[&>*:last-child]:flex-3",
        "space-y-7.75 md:space-y-0 mt-20 mb-24"
    )}>
        <div ref={sidebarRef} className="opacity-0 md:sticky md:top-28 self-start">
            <PolicySidebar />
        </div>
        <div ref={contentRef} className="opacity-0 md:relative md:top-8">
            <PolicyContent />
        </div>
    </section>)
}

export default PolicySection;