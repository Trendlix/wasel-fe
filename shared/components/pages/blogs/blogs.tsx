"use client";

import { blogCardItems, IBlogCardItem } from "@/shared/constants/blogs";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const tagsColors = [
    { text: "text-white", bg: "bg-main-red" },
    { text: "text-black", bg: "bg-main-secondary" },
    { text: "text-white", bg: "bg-main-ukraineBlue" },
];

const Blogs = () => {
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
        <div className={clsx("container", "pb-28 pt-10")}>
            <div ref={gridRef} className={clsx("grid md:grid-cols-2 grid-cols-1 gap-4")}>
                {blogCardItems.map((item) => (
                    <BlogCard key={item.id} item={item} colorIndex={(item.id - 1) % tagsColors.length} />
                ))}
            </div>
        </div>
    );
};

const BlogCard = ({ item, colorIndex }: { item: IBlogCardItem; colorIndex: number }) => {
    const color = tagsColors[colorIndex];
    const pCircleRef = useRef<HTMLDivElement>(null);

    return (
        <Link href={`/blogs/${item.slug}`} className={clsx("rounded-[20px] overflow-hidden", "border border-main-carbonFiber", "flex flex-col", "bg-[#0d0d0d]", "group cursor-pointer")}
            onMouseEnter={() => {
                if (pCircleRef.current) {
                    gsap.to(pCircleRef.current, {
                        scale: 1.1,
                        padding: 100,
                        duration: 0.3,
                        ease: "power3.out",
                    });
                }
            }}
            onMouseLeave={() => {
                if (pCircleRef.current) {
                    gsap.to(pCircleRef.current, {
                        scale: 1,
                        padding: 0,
                        duration: 0.3,
                        ease: "power3.out",
                    });
                }
            }}
        >
            <div className="relative aspect-video w-full shrink-0">
                <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                <div className={clsx("absolute top-4 left-4", "rounded-full px-4 py-1.5", "uppercase text-xs font-medium tracking-wider", color.bg, color.text)}>
                    {item.type}
                </div>
            </div>

            <div className="flex flex-col gap-3 p-4 mt-auto">
                <h3 className="text-white font-bold text-2xl leading-[30px] tracking-0">
                    {item.title}
                </h3>

                <p className="text-white/70 font-normal text-base leading-[22px] tracking-0">
                    {item.description}
                </p>

                <div className="flex items-center justify-between text-white/50 font-normal text-sm leading-[21px] tracking-0">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} />
                            {item.timestamp.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={13} />
                            {item.readTime}
                        </span>
                    </div>
                    <ArrowRight size={16} className="text-main-secondary" />
                </div>
            </div>
            <div ref={pCircleRef} className="p-0 rounded-full bg-main-carbonFiber absolute -bottom-20 -right-20 z-[-1]">
            </div>
        </Link>
    );
};

export default Blogs;