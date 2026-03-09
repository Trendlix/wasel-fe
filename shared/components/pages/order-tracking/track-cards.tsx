"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bell, MapPin, ShieldCheck } from "lucide-react";
import { ReactNode, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ICard {
    title: string;
    description: string;
    icon: { bg: string; icon: ReactNode };
}

const cards: ICard[] = [
    {
        title: "Real-Time Location",
        description: "Track your shipment's exact location with GPS updates every 30 seconds.",
        icon: {
            bg: "bg-main-ukraineBlue/30",
            icon: <MapPin className="text-main-ukraineBlue" size={28} />,
        },
    },
    {
        title: "Accurate ETAs",
        description: "AI-powered delivery estimates based on real traffic and weather conditions",
        icon: {
            bg: "bg-main-secondary/30",
            icon: <Bell className="text-main-secondary" size={28} />,
        },
    },
    {
        title: "Instant Notifications",
        description: "Get SMS and email alerts for every major milestone in your delivery",
        icon: {
            bg: "bg-main-red/30",
            icon: <ShieldCheck className="text-main-red" size={28} />,
        },
    },
];

const TrackCards = () => {
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(headingRef.current, {
            y: 30,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
                trigger: headingRef.current,
                start: "top 88%",
            },
        });

        gsap.from(gridRef.current?.children ?? [], {
            y: 50,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: {
                each: 0.15,
                from: "start",
                grid: "auto",
            },
            scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%",
            },
        });
    });

    return (
        <div className="container space-y-8 pb-20 pt-28 flex flex-col items-center justify-center">
            <div ref={headingRef} className="space-y-1 text-center">
                <h2 className="text-white font-bold xl:text-4xl lg:text-3xl md:text-2xl text-xl">
                    Why Track with Wasel?
                </h2>
                <p className="text-white/70 text-sm max-w-2xl mx-auto">
                    Get complete visibility into your shipments
                </p>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map((card) => (
                    <Card key={card.title} card={card} />
                ))}
            </div>
        </div>
    );
};

const Card = ({ card }: { card: ICard }) => {
    return (
        <div className={clsx("rounded-[20px] bg-main-eerieBlack", "flex items-center gap-5", "p-6")}>
            <div className={clsx("rounded-full p-4 shrink-0", card.icon.bg)}>
                {card.icon.icon}
            </div>
            <div className="space-y-1">
                <h3 className="text-white font-bold text-lg leading-tight">{card.title}</h3>
                <p className="text-white/50 text-sm leading-[1.6]">{card.description}</p>
            </div>
        </div>
    );
};

export default TrackCards;
