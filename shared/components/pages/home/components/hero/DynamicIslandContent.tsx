import clsx from "clsx";
import { Clock, LucideIcon, MapPin, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

interface IOfferHighlightsInterface {
    icon: LucideIcon;
    descriptionKey: string;
}

export const OfferHighlights: IOfferHighlightsInterface[] = [
    {
        descriptionKey: "arrive15",
        icon: Clock
    },
    {
        descriptionKey: "gpsTracked",
        icon: MapPin
    }
]

const DynamicIslandContent = () => {
    const locale = useLocale();
    const t = useTranslations("home.hero.cards.driver");
    const dir = locale === "ar" ? "rtl" : "ltr";

    return (
        <div
            dir={dir}
            className={clsx(
                "w-full h-fit flex flex-col pointer-events-none opacity-0",
                // padding scales up with screen size
                "p-1 pt-3",
                "lg:p-1 lg:pt-4",
                "xl:p-1.5 xl:pt-5",
                "2xl:p-2 2xl:pt-6",
                "3xl:p-2.5 3xl:pt-7",
                "4xl:p-3 4xl:pt-8",
            )}
            id="dynamic-island-content"
        >
            {/* ── Top Row ── */}
            <div className="flex items-start justify-between gap-x-5">
                <div className={clsx(
                    "flex items-start w-full",
                    "gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 3xl:gap-7 4xl:gap-8"
                )}>

                    {/* Avatar */}
                    <div className={clsx(
                        "shrink-0 bg-linear-to-b from-main-primary to-main-ukraineBlue",
                        "rounded-full text-white uppercase flex items-center justify-center font-semibold",
                        // size scales across breakpoints
                        "w-10 h-10 text-base",
                        "lg:w-12 lg:h-12 lg:text-lg",
                        "xl:w-14 xl:h-14 xl:text-xl",
                        "2xl:w-16 2xl:h-16 2xl:text-2xl",
                        "3xl:w-18 3xl:h-18 3xl:text-3xl",
                        "4xl:w-20 4xl:h-20 4xl:text-3xl",
                    )}>
                        {t("avatarLetter")}
                    </div>

                    {/* Info block */}
                    <div className={clsx(
                        "text-white flex flex-col items-start w-[calc(100%-3rem)]",
                        "gap-0.5 lg:gap-1 xl:gap-1.5 2xl:gap-1.5 3xl:gap-2 4xl:gap-2"
                    )}>

                        {/* Name + Price Row */}
                        <div className="flex items-center justify-between w-full">
                            <div className={clsx(
                                "text-nowrap font-medium leading-tight",
                                "text-xs lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl"
                            )}>
                                <span className="font-semibold">{t("name")}</span>
                                {" "}
                                <span>{"⭐"}{" "}{t("rating")}</span>
                            </div>
                            <div className={clsx(
                                "text-main-primary uppercase font-semibold text-nowrap leading-tight",
                                "text-xs lg:text-sm xl:text-base 2xl:text-xl 3xl:text-2xl 4xl:text-2xl"
                            )}>
                                {t("priceAmount")}
                            </div>
                        </div>

                        {/* Trips + Car */}
                        <p className={clsx(
                            "text-white/80",
                            "text-xs lg:text-xs xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-lg"
                        )}>
                            {t("tripsCar")}
                        </p>

                        {/* Highlights */}
                        <div className={clsx(
                            "flex flex-col",
                            "*:my-0.5 lg:*:my-0.5 xl:*:my-1 2xl:*:my-1 3xl:*:my-1.5 4xl:*:my-1.5"
                        )}>
                            {OfferHighlights.map((item, index) => (
                                <div key={index} className={clsx(
                                    "flex items-center",
                                    "gap-1 lg:gap-1.5 xl:gap-2 2xl:gap-2 3xl:gap-2.5 4xl:gap-3"
                                )}>
                                    <item.icon className={clsx(
                                        "shrink-0",
                                        "w-3 h-3",
                                        "lg:w-3 lg:h-3",
                                        "xl:w-3.5 xl:h-3.5",
                                        "2xl:w-4 2xl:h-4",
                                        "3xl:w-4.5 3xl:h-4.5",
                                        "4xl:w-5 4xl:h-5",
                                    )} />
                                    <span className={clsx(
                                        "text-white text-nowrap leading-tight",
                                        "text-xs",
                                        "lg:text-xs",
                                        "xl:text-sm",
                                        "2xl:text-base",
                                        "3xl:text-lg",
                                        "4xl:text-lg",
                                    )}>
                                        {t(`highlights.${item.descriptionKey}`)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Action Buttons ── */}
            <div className={clsx(
                "flex items-center mt-auto",
                // gap
                "gap-1 lg:gap-1.5 xl:gap-2 2xl:gap-2 3xl:gap-2.5 4xl:gap-3",
                // rounded corners
                "*:rounded-xl lg:*:rounded-xl xl:*:rounded-2xl 2xl:*:rounded-2xl",
                // vertical padding / height
                "*:flex *:items-center *:justify-center",
                "pt-2 pb-4",
                "lg:pt-3 lg:pb-6",
                "xl:pt-4 xl:pb-7",
                "2xl:pt-4 2xl:pb-8",
                "3xl:pt-5 3xl:pb-9",
                "4xl:pt-5 4xl:pb-10",
            )}>
                {/* Accept */}
                <div className={clsx(
                    "bg-main-ukraineBlue text-white font-semibold w-[50%]",
                    "h-8 text-xs",
                    "lg:h-9 lg:text-sm",
                    "xl:h-11 xl:text-base",
                    "2xl:h-14 2xl:text-lg",
                    "3xl:h-16 3xl:text-xl",
                    "4xl:h-[71px] 4xl:text-2xl",
                )}>
                    {t("accept")}
                </div>

                {/* Reject */}
                <div className={clsx(
                    "bg-main-blazeRed text-white font-semibold w-[30%]",
                    "h-8 text-xs",
                    "lg:h-9 lg:text-sm",
                    "xl:h-11 xl:text-base",
                    "2xl:h-14 2xl:text-lg",
                    "3xl:h-16 3xl:text-xl",
                    "4xl:h-[71px] 4xl:text-2xl",
                )}>
                    {t("reject")}
                </div>

                {/* Profile */}
                <div className={clsx(
                    "bg-white text-main-primary w-[20%]",
                    "h-8",
                    "lg:h-9",
                    "xl:h-11",
                    "2xl:h-14",
                    "3xl:h-16",
                    "4xl:h-[71px]",
                )}>
                    <User className={clsx(
                        "w-3.5 h-3.5",
                        "lg:w-4 lg:h-4",
                        "xl:w-5 xl:h-5",
                        "2xl:w-6 2xl:h-6",
                        "3xl:w-7 3xl:h-7",
                        "4xl:w-7 4xl:h-7",
                    )} />
                </div>
            </div>
        </div>
    );
};

export default DynamicIslandContent;