import clsx from "clsx"
import { Check, User } from "lucide-react"
import { OfferHighlights } from "./DynamicIslandContent"

export default function SentencesCards() {
    return <div className="h-full w-full absolute inset-0 *:z-10">
        <TruckCard />
        <SelectPriceCard />
        <SelectDriverCard />
    </div>
}

export const TruckCard = () => {
    return (<div id="truck-card"
        className={clsx("border border-main-whiteMarble px-5 py-3 rounded-2xl bg-main-creamBrulee", "flex items-center justify-between", "scale-115", "relative top-[38%]", "opacity-0")}>
        <div className={clsx("flex items-center gap-9")}>
            <div className="text-5xl">🚚</div>
            <div>
                <p className={clsx("font-medium text-base leading-6 text-black")}>Medium Truck</p>
                <p className={clsx("text-sm leading-5 text-main-hydrocarbon")}>Capacity: 3-5 tons</p>
            </div>
        </div>
        <div>
            <span className="w-7 h-7 rounded-full flex items-center justify-center bg-main-secondary">
                <Check size={20} className="text-white" />
            </span>
        </div>
    </div>)
}

export const SelectPriceCard = () => {
    return (<div id="select-price-card"
        className={clsx("py-3 px-5", "bg-main-primary text-white", "flex flex-col gap-1 justify-between", "rounded-2xl", "scale-115", "relative top-[8.5%]", "opacity-0")}>
        <p className={clsx("text-[12px] leading-5")}>Wasel Suggested Price</p>
        <p className={clsx("font-bold text-3xl leading-9")}>3200 EGP</p>
        <p className={clsx("text-[12px] leading-3.5")}>Based on distance, truck type, and current demand</p>
    </div>)
}

export const SelectDriverCard = () => {
    return (<div id="select-driver-card" className={clsx("bg-white rounded-2xl border", "scale-115 scale-x-120", "relative top-[5%] opacity-0", "p-4")}>
        <div>
            <div className={clsx("flex items-start justify-between")}>
                <div className={clsx("flex items-start gap-4")}>
                    <div className={clsx("bg-linear-to-b from-main-primary to-main-ukraineBlue rounded-full", "flex items-center justify-center", "w-12 h-12")}>
                        <span className={clsx("text-white", "rounded-full", "text-xl")}>A</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className={clsx(
                            "text-nowrap font-medium leading-5",
                            "text-sm"
                        )}>
                            <span className="font-semibold">Ahmed Wael</span>
                            {" "}
                            <span>{"⭐"}{" "}{"4.9"}</span>
                        </div>
                        <div className={clsx("text-[13px] leading-4 text-main-sharkGray")}>
                            342 trips • Mercedes
                        </div>
                        <div className={clsx(
                            "flex flex-col",
                            "*:my-0.5 lg:*:my-0.5 xl:*:my-1 2xl:*:my-1 3xl:*:my-1.5 4xl:*:my-1.5"
                        )}>
                            {OfferHighlights.map((item, index) => (
                                <div key={index} className={clsx(
                                    "flex items-center text-main-sharkGray",
                                    "gap-1"
                                )}>
                                    <item.icon className={clsx(
                                        "shrink-0",
                                        "w-3 h-3"
                                    )} />
                                    <span className={clsx(
                                        " text-nowrap leading-tight",
                                        "text-[13px]"
                                    )}>
                                        {item.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-end flex-col">
                    <p className={clsx("text-main-sharkGray", "text-[12px] leading-4")}>Price</p>
                    <p className={clsx("text-main-primary font-medium text-sm leading-8 text-nowrap")}>200 EGP</p>
                </div>
            </div>
            <div className={clsx("*:flex *:items-center *:justify-center *:py-2 mt-4", "flex items-center gap-2 text-white font-medium text-base", "*:rounded-2xl")}>
                <div className={clsx("bg-main-ukraineBlue", "w-[50%]")}>Accept</div>
                <div className={clsx("bg-main-blazeRed", "w-[30%]")}>Reject</div>
                <div className={clsx("w-[20%] bg-main-beautifulWhite")}>
                    <User className="text-main-ukraineBlue p-1" />
                </div>
            </div>
        </div>
    </div>)
}