"use client";

import { blogsSliderItems, IBlogsSliderItem } from "@/shared/constants/blogs";
import clsx from "clsx";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const BannerSlider = () => {
    const [activeTab, setActiveTab] = useState<IBlogsSliderItem["type"]>("technology");

    const activeItem = blogsSliderItems.find((i) => i.type === activeTab) ?? null;

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        gsap.fromTo(
            contentRef.current.children,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
            }
        );
    }, [activeTab]);

    return (
        <div className={clsx("space-y-10", "xl:p-[70px] lg:p-[50px] md:p-[40px] p-[30px]")}>
            <SliderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <SliderContent ref={contentRef} activeItem={activeItem} />
        </div>
    );
};

const SliderTabs = ({
    activeTab,
    setActiveTab,
}: {
    activeTab: IBlogsSliderItem["type"];
    setActiveTab: (tab: IBlogsSliderItem["type"]) => void;
}) => {
    const tabsRef = useRef<HTMLDivElement>(null);

    const baseClass = "font-medium text-sm leading-7 tracking-[1%] rounded-full uppercase";
    const activeClass = "bg-main-ukraineBlue text-white py-1 px-4";
    const inactiveClass = "text-white/70 bg-transparent py-1";

    const tabs = [...new Set(blogsSliderItems.map((item) => item.type))];

    useEffect(() => {
        if (!tabsRef.current) return;

        gsap.fromTo(
            tabsRef.current.children,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
            }
        );
    }, []);

    return (
        <div ref={tabsRef} className={clsx("uppercase flex items-center gap-4")}>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={clsx(baseClass, activeTab === tab ? activeClass : inactiveClass)}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

const SliderContent = ({
    activeItem,
    ref,
}: {
    activeItem: IBlogsSliderItem | null;
    ref: React.Ref<HTMLDivElement>;
}) => {
    if (!activeItem) return null;

    return (
        <div ref={ref} className={clsx("space-y-4")}>
            <h2 className="text-white font-bold xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-14 max-w-5xl">
                {activeItem.title}
            </h2>

            <p className="text-white/70 text-sm sm:text-base md:text-lg xl:text-xl leading-normal sm:leading-[27px] max-w-3xl">
                {activeItem.description}
            </p>

            <div className="flex items-center gap-6 text-white/70 text-base *:flex *:items-center *:gap-2">
                <p>
                    <Calendar size={15} />
                    <span>{activeItem.timestamp.date}</span>
                </p>

                <p>
                    <Clock size={15} />
                    <span>{activeItem.readTime}</span>
                </p>
            </div>
        </div>
    );
};

export default BannerSlider;