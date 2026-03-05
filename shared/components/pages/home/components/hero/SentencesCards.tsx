import clsx from "clsx"
import { Check, User } from "lucide-react"
import { OfferHighlights } from "./DynamicIslandContent"
import { useLocale, useTranslations } from "next-intl"

export default function SentencesCards() {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";

    return <div dir={dir} className="h-full w-full absolute inset-0 *:z-10">
        <TruckCard />
        <SelectPriceCard />
        <SelectDriverCard />
    </div>
}

export const TruckCard = () => {
    const locale = useLocale();
    const t = useTranslations("home.hero.cards.truck");
    const dir = locale === "ar" ? "rtl" : "ltr";

    return (<div id="truck-card" dir={dir}
        className={clsx("border border-main-whiteMarble px-[clamp(0.45rem,1vw,1.2rem)] py-[clamp(0.3rem,1.7vh,0.85rem)] rounded-2xl bg-main-creamBrulee", "flex items-center justify-between", "scale-115", "relative top-[38%]", "opacity-0")}>
        <div className={clsx("flex items-center gap-[clamp(0.55rem,1.8vw,1.8rem)]")}>
            <div className="text-[clamp(1.05rem,2.6vw,2.7rem)] leading-none">🚚</div>
            <div>
                <p className={clsx("font-medium text-[clamp(0.62rem,0.9vw,1rem)] leading-[clamp(0.9rem,1.4vw,1.4rem)] text-black")}>{t("title")}</p>
                <p className={clsx("text-[clamp(0.52rem,0.75vw,0.85rem)] leading-[clamp(0.75rem,1.2vw,1.2rem)] text-main-hydrocarbon")}>{t("capacity")}</p>
            </div>
        </div>
        <div>
            <span className="w-[clamp(0.95rem,1.4vw,1.55rem)] h-[clamp(0.95rem,1.4vw,1.55rem)] rounded-full flex items-center justify-center bg-main-secondary">
                <Check className="text-white w-[clamp(0.55rem,0.9vw,0.95rem)] h-[clamp(0.55rem,0.9vw,0.95rem)]" />
            </span>
        </div>
    </div>)
}

export const SelectPriceCard = () => {
    const locale = useLocale();
    const t = useTranslations("home.hero.cards.price");
    const dir = locale === "ar" ? "rtl" : "ltr";

    return (<div id="select-price-card" dir={dir}
        className={clsx("py-[clamp(0.3rem,1vh,0.85rem)] px-[clamp(0.45rem,1vw,1.2rem)]", "bg-main-primary text-white", "flex flex-col gap-[clamp(0.15rem,0.4vh,0.5rem)] justify-between", "rounded-2xl", "scale-115", "relative top-[8.5%]", "opacity-0")}>
        <p className={clsx("text-[clamp(0.5rem,0.65vw,0.82rem)] leading-[clamp(0.72rem,1.1vw,1.1rem)]")}>{t("title")}</p>
        <p className={clsx("font-bold text-[clamp(1rem,1.8vw,2rem)] leading-[clamp(1.2rem,2.2vw,2.4rem)]")}>{t("amount")}</p>
        <p className={clsx("text-[clamp(0.5rem,0.65vw,0.82rem)] leading-[clamp(0.72rem,1vw,1rem)]")}>{t("description")}</p>
    </div>)
}

export const SelectDriverCard = () => {
    const locale = useLocale();
    const t = useTranslations("home.hero.cards.driver");
    const dir = locale === "ar" ? "rtl" : "ltr";

    return (<div id="select-driver-card" dir={dir} className={clsx("bg-white rounded-2xl border", "scale-115 scale-x-120", "relative top-[5%] opacity-0", "p-[clamp(0.4rem,0.9vw,1rem)]")}>
        <div>
            <div className={clsx("flex items-start justify-between")}>
                <div className={clsx("flex items-start gap-[clamp(0.35rem,0.9vw,1rem)]")}>
                    <div className={clsx("bg-linear-to-b from-main-primary to-main-ukraineBlue rounded-full", "flex items-center justify-center", "w-[clamp(1.1rem,2.9vw,3.6rem)] h-[clamp(1.1rem,3vw,3.6rem)]")}>
                        <span className={clsx("text-white", "rounded-full", "text-[clamp(0.6rem,1vw,1.05rem)]")}>{t("avatarLetter")}</span>
                    </div>
                    <div className="flex flex-col gap-[clamp(0.1rem,0.3vh,0.35rem)] text-black">
                        <div className={clsx(
                            "text-nowrap font-medium leading-[clamp(0.72rem,1vw,1.1rem)]",
                            "text-[clamp(0.58rem,0.8vw,0.9rem)]"
                        )}>
                            <span className="font-semibold">{t("name")}</span>
                            {" "}
                            <span>{"⭐"}{" "}
                                <span className="text-main-hydrocarbon">
                                    {t("rating")}
                                </span>
                            </span>
                        </div>
                        <div className={clsx("text-[clamp(0.5rem,0.7vw,0.8rem)] leading-[clamp(0.7rem,0.95vw,1rem)] text-main-sharkGray")}>
                            {t("tripsCar")}
                        </div>
                        <div className={clsx(
                            "flex flex-col",
                            "*:my-[clamp(0.08rem,0.2vh,0.25rem)]"
                        )}>
                            {OfferHighlights.map((item, index) => (
                                <div key={index} className={clsx(
                                    "flex items-center text-main-sharkGray",
                                    "gap-[clamp(0.15rem,0.3vw,0.4rem)]"
                                )}>
                                    <item.icon className={clsx(
                                        "shrink-0",
                                        "w-[clamp(0.38rem,0.65vw,0.75rem)] h-[clamp(0.38rem,0.65vw,0.75rem)]"
                                    )} />
                                    <span className={clsx(
                                        " text-nowrap leading-tight",
                                        "text-[clamp(0.5rem,0.7vw,0.8rem)]"
                                    )}>
                                        {t(`highlights.${item.descriptionKey}`)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-end flex-col">
                    <p className={clsx("text-main-sharkGray", "text-[clamp(0.5rem,0.65vw,0.8rem)] leading-[clamp(0.7rem,0.95vw,1rem)]")}>{t("priceLabel")}</p>
                    <p className={clsx("text-main-primary font-medium text-[clamp(0.58rem,0.8vw,0.92rem)] leading-[clamp(1rem,1.7vw,1.75rem)] text-nowrap")}>{t("priceAmount")}</p>
                </div>
            </div>
            <div className={clsx("*:flex *:items-center *:justify-center *:py-[clamp(0.3rem,0.6vh,0.7rem)] mt-[clamp(0.3rem,1vh,0.9rem)]", "flex items-center gap-[clamp(0.2rem,0.5vw,0.65rem)] text-white font-medium text-[clamp(0.58rem,0.85vw,0.95rem)]", "*:rounded-2xl", "mt-[clamp(0.3rem,1.5vh,2rem)]")}>
                <div className={clsx("bg-main-ukraineBlue", "w-[50%] h-[clamp(1.5rem,2.8vw,3rem)]")}>{t("accept")}</div>
                <div className={clsx("bg-main-blazeRed", "w-[30%] h-[clamp(1.5rem,2.8vw,3rem)]")}>{t("reject")}</div>
                <div className={clsx("w-[20%] bg-main-beautifulWhite h-[clamp(1.5rem,2.8vw,3rem)] py-2")}>
                    <User className="text-main-ukraineBlue p-[clamp(0.08rem,0.2vw,0.25rem)]" />
                </div>
            </div>
        </div>
    </div>)
}