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
            "w-full max-w-[95%] max-h-[366px] h-[clamp(1.25rem,0.5vw,2.25rem)] min-h-[clamp(1.25rem,0.5vw,2.25rem)] rounded-[clamp(0.55rem,1vw,1rem)] bg-black flex flex-col justify-between overflow-hidden"
        )} id="dynamic-island-root" dir={dir}>
            <div
                id="dynamic-island-camera"
                className={clsx("flex items-center justify-end")}
                dir="ltr"
            >
                <div className="bg-main-solidBlack w-[clamp(0.5rem,0.8vw,1rem)] h-[clamp(0.5rem,0.8vw,1rem)] rounded-full"></div>
            </div>

            <div
                id="dynamic-island-content"
                className="flex flex-col gap-[clamp(0.12rem,0.35vw,0.4rem)] pb-[clamp(0.35rem,1vw,0.9rem)] px-[clamp(0.18rem,0.38vw,0.4rem)] hidden opacity-0 scale-[0.92] px-0!"
            >
                {/* top content */}
                <div className="flex items-start gap-x-[clamp(0.14rem,0.38vw,0.42rem)] mt-[clamp(0.12rem,0.7vh,0.42rem)]">
                    {/* avatar */}
                    <div
                        className="rounded-full bg-linear-to-b from-main-primary to-main-ukraineBlue flex items-center justify-center shrink-0"
                        style={{ width: "28%", aspectRatio: "1 / 1" }}
                    >
                        <span className="text-[clamp(0.3rem,0.55vw,0.6rem)] font-bold text-white">
                            {t("avatarLetter")}
                        </span>
                    </div>

                    {/* name + rating + highlights */}
                    <div className="w-full flex flex-col gap-[clamp(0.12rem,0.35vw,0.4rem)]">
                        <div className="w-full flex items-start justify-between *:text-nowrap gap-x-[clamp(0.12rem,0.3vw,0.38rem)]">
                            <p className="flex items-center gap-[clamp(0.08rem,0.15vw,0.22rem)] text-white font-medium text-[clamp(0.28rem,0.45vw,0.52rem)] leading-[clamp(0.4rem,0.6vw,0.72rem)]">
                                <span className="font-semibold">{t("name")}</span>
                                <span>{`⭐ ${t("rating")}`}</span>
                            </p>
                            <p className="text-main-primary uppercase font-semibold text-[clamp(0.3rem,0.52vw,0.6rem)] leading-[clamp(0.4rem,0.6vw,0.72rem)]">
                                {t("priceAmount")}
                            </p>
                        </div>

                        <p className="text-[clamp(0.28rem,0.45vw,0.52rem)] leading-[clamp(0.38rem,0.55vw,0.65rem)] text-white">
                            {t("tripsCar")}
                        </p>

                        <div className="flex flex-col gap-[clamp(0.12rem,0.35vw,0.4rem)]">
                            {OfferHighlights.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-[clamp(0.08rem,0.15vw,0.22rem)] text-white text-[clamp(0.28rem,0.45vw,0.52rem)]"
                                >
                                    <item.icon className="w-[clamp(0.25rem,0.38vw,0.44rem)] h-[clamp(0.25rem,0.38vw,0.44rem)] shrink-0" />
                                    <span>{t(`highlights.${item.descriptionKey}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* buttons */}
                <div className="flex items-center gap-[clamp(0.1rem,0.3vw,0.36rem)] mt-[clamp(0.12rem,0.5vw,0.5rem)]">
                    <button className="bg-main-ukraineBlue flex-[0.9] rounded-[clamp(0.3rem,0.7vw,0.7rem)] py-[clamp(0.15rem,0.55vw,0.55rem)] text-white font-medium text-[clamp(0.28rem,0.48vw,0.55rem)]">
                        {t("accept")}
                    </button>
                    <button className="bg-main-blazeRed flex-[0.7] rounded-[clamp(0.3rem,0.7vw,0.7rem)] py-[clamp(0.15rem,0.55vw,0.55rem)] text-white font-medium text-[clamp(0.28rem,0.48vw,0.55rem)]">
                        {t("reject")}
                    </button>
                    <button className="bg-main-beautifulWhite text-main-ukraineBlue flex-[0.5] rounded-[clamp(0.3rem,0.7vw,0.7rem)] py-[clamp(0.15rem,0.55vw,0.55rem)] flex items-center justify-center">
                        <User className="w-[clamp(0.38rem,0.7vw,0.72rem)] h-[clamp(0.38rem,0.7vw,0.72rem)]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DynamicIsland;
