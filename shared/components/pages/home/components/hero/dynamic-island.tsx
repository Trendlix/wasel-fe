"use client";

import clsx from "clsx";
import { OfferHighlights } from "./DynamicIslandContent";
import { User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const DynamicIsland = () => {
    const locale = useLocale();
    const t = useTranslations("home.hero.cards.driver");
    const dir = locale === "ar" ? "rtl" : "ltr";

    return (
        <div className={clsx(
            "w-full max-w-[90%] max-h-[80%] h-[clamp(1.25rem,2.2vw,2.25rem)] min-h-[clamp(1.25rem,2.2vw,2.25rem)] rounded-[clamp(0.55rem,1vw,1rem)] bg-black flex flex-col justify-between overflow-hidden"
        )} id="dynamic-island-root" dir={dir}>
            <div
                id="dynamic-island-camera"
                className={clsx("flex items-center justify-end")}
                dir="ltr"
            >
                <div className="bg-main-solidBlack w-[clamp(0.5rem,1vw,1rem)] h-[clamp(0.5rem,1vw,1rem)] rounded-full"></div>
            </div>
            <div id="dynamic-island-content" className="flex flex-col gap-[clamp(0.2rem,0.5vw,0.55rem)] pb-[clamp(0.5rem,1.5vw,1.4rem)] px-[clamp(0.25rem,0.5vw,0.55rem)] hidden opacity-0 scale-[0.92]">
                {/* top content */}
                <div className="flex items-start gap-x-[clamp(0.2rem,0.5vw,0.55rem)] mt-[clamp(0.18rem,1vh,0.6rem)]">
                    {/* avatar */}
                    <div className="rounded-full bg-gradient-to-b from-main-primary to-main-ukraineBlue flex items-center justify-center" style={{ width: "30%", aspectRatio: "1 / 1" }}>
                        <span className="text-[clamp(0.45rem,0.8vw,0.9rem)] font-bold text-white">{t("avatarLetter")}</span>
                    </div>

                    {/* name + rating + highlights */}
                    <div className="w-full flex flex-col gap-[clamp(0.2rem,0.5vw,0.55rem)]">
                        <div className="w-full flex items-start justify-between *:text-nowrap gap-x-[clamp(0.2rem,0.5vw,0.55rem)]">
                            <p className="flex items-center gap-[clamp(0.1rem,0.2vw,0.3rem)] text-white font-medium text-[clamp(0.42rem,0.6vw,0.72rem)] leading-[clamp(0.58rem,0.8vw,0.9rem)]">
                                <span className="font-semibold">{t("name")}</span>
                                <span>{`⭐ ${t("rating")}`}</span>
                            </p>
                            <p className="text-main-primary uppercase font-semibold text-[clamp(0.48rem,0.8vw,0.88rem)] leading-[clamp(0.58rem,0.8vw,0.9rem)]">{t("priceAmount")}</p>
                        </div>
                        <p className="text-[clamp(0.42rem,0.6vw,0.72rem)] leading-[clamp(0.55rem,0.75vw,0.85rem)] text-white">{t("tripsCar")}</p>
                        <div className="flex flex-col gap-[clamp(0.2rem,0.5vw,0.55rem)]">
                            {OfferHighlights.map((item, index) => (
                                <div key={index} className="flex items-center gap-[clamp(0.1rem,0.2vw,0.3rem)] text-white text-[clamp(0.42rem,0.6vw,0.72rem)]">
                                    <item.icon className="w-[clamp(0.35rem,0.5vw,0.6rem)] h-[clamp(0.35rem,0.5vw,0.6rem)]" />
                                    <span>{t(`highlights.${item.descriptionKey}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* buttons */}
                <div className="flex items-center gap-[clamp(0.15rem,0.4vw,0.5rem)] mt-[clamp(0.22rem,0.8vw,0.8rem)]">
                    <button className="bg-main-ukraineBlue flex-[0.9] rounded-[clamp(0.45rem,1vw,1rem)] py-[clamp(0.22rem,0.8vw,0.8rem)] text-white font-medium text-[clamp(0.45rem,0.7vw,0.8rem)]">{t("accept")}</button>
                    <button className="bg-main-blazeRed flex-[0.7] rounded-[clamp(0.45rem,1vw,1rem)] py-[clamp(0.22rem,0.8vw,0.8rem)] text-white font-medium text-[clamp(0.45rem,0.7vw,0.8rem)]">{t("reject")}</button>
                    <button className="bg-main-beautifulWhite text-main-ukraineBlue flex-[0.5] rounded-[clamp(0.45rem,1vw,1rem)] py-[clamp(0.22rem,0.8vw,0.8rem)] flex items-center justify-center">
                        <User className="w-[clamp(0.5rem,1vw,1rem)] h-[clamp(0.5rem,1vw,1rem)]" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DynamicIsland;