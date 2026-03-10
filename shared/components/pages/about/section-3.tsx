import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

type Section3Props = {
    card1Ref: React.RefObject<HTMLDivElement | null>;
    card2Ref: React.RefObject<HTMLDivElement | null>;
    card3Ref: React.RefObject<HTMLDivElement | null>;
    bar1Ref: React.RefObject<HTMLDivElement | null>;
    bar2Ref: React.RefObject<HTMLDivElement | null>;
    bar3Ref: React.RefObject<HTMLDivElement | null>;
};

const Section3 = ({ card1Ref, card2Ref, card3Ref, bar1Ref, bar2Ref, bar3Ref }: Section3Props) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const isAr = locale === "ar";
    return (
        <div className="h-full w-full">
            <div className="container h-full">
                <div className="flex flex-col gap-4 h-full">
                    <div className="flex-1 min-h-0"></div>
                    {/* Stacked cards: same position, z-index so they layer on scroll (card1 → card2 → card3 on top) */}
                    <div className="relative h-[70%] min-h-0 text-white " dir={dir}>
                        <Card1 ref={card1Ref} barRef={bar1Ref} className="absolute inset-0 z-10" isAr={isAr} />
                        <Card2 ref={card2Ref} barRef={bar2Ref} className="absolute inset-0 z-20" isAr={isAr} />
                        <Card3 ref={card3Ref} barRef={bar3Ref} className="absolute inset-0 z-30" isAr={isAr} />
                    </div>
                    <div className="flex-1 min-h-0"></div>
                </div>
            </div>
        </div>
    )
}

const barClassName = "absolute inset-0 w-0 h-full bg-main-ukraineBlue z-0";

const Card1 = forwardRef<HTMLDivElement, { className?: string; barRef?: React.RefObject<HTMLDivElement | null>; isAr?: boolean }>(({ className, barRef, isAr }, ref) => {
    const t = useTranslations("about.section3.card1");
    return (<div ref={ref} className={cn("h-full w-full rounded-[30px] flex", isAr ? "items-end justify-start" : "items-end justify-end", className)}
        style={{
            backgroundImage: "linear-gradient(to top,rgba(0,0,0,70), rgba(0,0,0,0.50)), url(/brand/pages/about/section3/reliability.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}
    >
        <div className="space-y-3 overflow-hidden py-6">
            <h3 className="font-bold 2xl:text-5xl xl:text-4xl md:text-3xl text-2xl relative w-fit pl-10 pr-2 overflow-hidden">
                <span className="relative z-10">{t("title")}</span>
                <div ref={barRef} className={barClassName} style={{ width: 0 }}></div>
            </h3>
            <p className="2xl:text-2xl xl:text-xl md:text-lg text-base px-10">{t("description")}</p>
        </div>
    </div>)
});
Card1.displayName = "Card1";

const Card2 = forwardRef<HTMLDivElement, { className?: string; barRef?: React.RefObject<HTMLDivElement | null>; isAr?: boolean }>(({ className, barRef, isAr }, ref) => {
    const t = useTranslations("about.section3.card2");
    return (<div ref={ref} className={cn("h-full w-full rounded-[30px] flex", isAr ? "items-end justify-start" : "items-end justify-end", className)}
        style={{
            backgroundImage: "linear-gradient(to top,rgba(0,0,0,70), rgba(0,0,0,0.50)), url(/brand/pages/about/section3/transparency.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}
    >
        <div className="space-y-3 overflow-hidden py-6">
            <h3 className="font-bold 2xl:text-5xl xl:text-4xl md:text-3xl text-2xl relative w-fit pl-10 pr-2 overflow-hidden ">
                <span className="relative z-10">{t("title")}</span>
                <div ref={barRef} className={barClassName} style={{ width: 0 }}></div>
            </h3>
            <p className="2xl:text-2xl xl:text-xl md:text-lg text-base px-10">{t("description")}</p>
        </div>
    </div>)
});
Card2.displayName = "Card2";

const Card3 = forwardRef<HTMLDivElement, { className?: string; barRef?: React.RefObject<HTMLDivElement | null>; isAr?: boolean }>(({ className, barRef, isAr }, ref) => {
    const t = useTranslations("about.section3.card3");
    return (<div ref={ref} className={cn("h-full w-full rounded-[30px] flex", isAr ? "items-end justify-start" : "items-end justify-end", className)}
        style={{
            backgroundImage: "linear-gradient(to top,rgba(0,0,0,70), rgba(0,0,0,0.50)), url(/brand/pages/about/section3/partnership.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}
    >
        <div className="space-y-3 overflow-hidden py-6">
            <h3 className="font-bold 2xl:text-5xl xl:text-4xl md:text-3xl text-2xl relative w-fit pl-10 pr-2 overflow-hidden">
                <span className="relative z-10">{t("title")}</span>
                <div ref={barRef} className={barClassName} style={{ width: 0 }}></div>
            </h3>
            <p className="2xl:text-2xl xl:text-xl md:text-lg text-base px-10 ">{t("description")}</p>
        </div>
    </div>)
});
Card3.displayName = "Card3";

export default Section3;