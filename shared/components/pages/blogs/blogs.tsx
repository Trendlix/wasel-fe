"use client";

import { blogCardItems } from "@/shared/constants/blogs";
import { BlogCard, TAGS_COLORS } from "./blog-card";
import { useGSAP } from "@gsap/react";
import { useLocale } from "next-intl";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gridRef.current?.children;
        if (!cards) return;

        gsap.from(cards, {
            y: 60,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: {
                each: 0.12,
                from: "start",
                grid: "auto",
            },
            scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%",
            },
        });
    }, { scope: gridRef });

    return (
        <div className={clsx("container", "pb-28 pt-10")} dir={dir}>
            <div ref={gridRef} className={clsx("grid md:grid-cols-2 grid-cols-1 gap-4")}>
                {blogCardItems.map((item) => (
                    <BlogCard key={item.id} item={item} colorIndex={(item.id - 1) % TAGS_COLORS.length} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;