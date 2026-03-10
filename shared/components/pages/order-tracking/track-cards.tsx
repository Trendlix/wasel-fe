"use client";

import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bell, MapPin, ShieldCheck } from "lucide-react";
import { ReactNode, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ICard {
    titleKey: string;
    descriptionKey: string;
    icon: { bg: string; icon: ReactNode };
}

const cardsConfig: ICard[] = [
    {
        titleKey: "realTimeLocation.title",
        descriptionKey: "realTimeLocation.description",
        icon: {
            bg: "bg-main-ukraineBlue/30",
            icon: <MapPin className="text-main-ukraineBlue" size={28} />,
        },
    },
    {
        titleKey: "accurateEtas.title",
        descriptionKey: "accurateEtas.description",
        icon: {
            bg: "bg-main-secondary/30",
            icon: <Bell className="text-main-secondary" size={28} />,
        },
    },
    {
        titleKey: "instantNotifications.title",
        descriptionKey: "instantNotifications.description",
        icon: {
            bg: "bg-main-red/30",
            icon: <ShieldCheck className="text-main-red" size={28} />,
        },
    },
];

const TrackCards = () => {
    const t = useTranslations("orderTracking.cards");
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
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
        <div className="container space-y-8 pb-20 pt-28 flex flex-col items-center justify-center" dir={dir}>
            <div ref={headingRef} className="space-y-1 text-center">
                <h2 className="dark:text-white text-black font-bold xl:text-4xl lg:text-3xl md:text-2xl text-xl">
                    {t("heading")}
                </h2>
                <p className="dark:text-white/70 text-black/70 text-sm max-w-2xl mx-auto">
                    {t("subtitle")}
                </p>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cardsConfig.map((card) => (
                    <Card key={card.titleKey} card={card} t={t} />
                ))}
            </div>
        </div>
    );
};

const Card = ({ card, t }: { card: ICard; t: (key: string) => string }) => {
    return (
        <div className={clsx("rounded-[20px] dark:bg-main-eerieBlack bg-main-techWhite", "flex items-center gap-5", "p-6")}>
            <div className={clsx("rounded-full p-4 shrink-0", card.icon.bg)}>
                {card.icon.icon}
            </div>
            <div className="space-y-1">
                <h3 className="dark:text-white text-black font-bold text-lg leading-tight">{t(card.titleKey)}</h3>
                <p className="dark:text-white/50 text-black/50 text-sm leading-[1.6]">{t(card.descriptionKey)}</p>
            </div>
        </div>
    );
};

export default TrackCards;
