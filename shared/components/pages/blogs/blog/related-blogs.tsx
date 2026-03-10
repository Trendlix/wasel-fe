"use client";

import { blogCardItems, IBlogCardItem } from "@/shared/constants/blogs";
import { BlogCard, TAGS_COLORS } from "../blog-card";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const RelatedBlogs = ({ blog }: { blog: IBlogCardItem }) => {
    const t = useTranslations("blogs");
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const gridRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    const related = [
        ...blogCardItems.filter((b) => b.type === blog.type && b.id !== blog.id),
        ...blogCardItems.filter((b) => b.type !== blog.type && b.id !== blog.id),
    ].slice(0, 3);

    useGSAP(() => {
        if (headingRef.current) {
            gsap.from(headingRef.current, {
                y: 30,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 88%",
                },
            });
        }

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

    if (related.length === 0) return null;

    return (
        <section className="container py-28" dir={dir}>
            <h2
                ref={headingRef}
                className="2xl:text-4xl text-3xl font-bold leading-[30px] tracking-0 mb-8 dark:text-white"
            >
                {t("relatedBlogs")}
            </h2>

            <div ref={gridRef} className={clsx("grid md:grid-cols-2 grid-cols-1 gap-4")}>
                {related.map((item) => (
                    <BlogCard key={item.id} item={item} colorIndex={(item.id - 1) % TAGS_COLORS.length} />
                ))}
            </div>
        </section>
    );
};

export default RelatedBlogs;
