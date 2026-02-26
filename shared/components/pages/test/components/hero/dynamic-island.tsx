"use client";

import clsx from "clsx";
import { OfferHighlights } from "../../../home/components/hero/DynamicIslandContent";
import { User } from "lucide-react";

const DynamicIsland = () => {
    return (
        <div className={clsx(
            "w-full max-w-[90%] max-h-[80%] rounded-[1vw] bg-black flex flex-col justify-between overflow-hidden"
        )} id="dynamic-island-root">
            <div
                id="dynamic-island-camera"
                className={clsx("flex items-center justify-end")}
            >
                <div className="bg-main-solidBlack w-[1vw] h-[1vw] rounded-full"></div>
            </div>
            <div id="dynamic-island-content" className="flex flex-col gap-[0.5vw] pb-[1.5vw] px-[0.5vw]">
                {/* top content */}
                <div className="flex items-start gap-x-[0.5vw] mt-[1vh]">
                    {/* avatar */}
                    <div className="rounded-full bg-gradient-to-b from-main-primary to-main-ukraineBlue flex items-center justify-center" style={{ width: "30%", aspectRatio: "1 / 1" }}>
                        <span className="text-[0.8vw] font-bold text-white">A</span>
                    </div>

                    {/* name + rating + highlights */}
                    <div className="w-full flex flex-col gap-[0.5vw]">
                        <div className="w-full flex items-start justify-between *:text-nowrap gap-x-[0.5vw]">
                            <p className="flex items-center gap-[0.2vw] text-white font-medium text-[0.6vw] leading-[0.8vw]">
                                <span className="font-semibold">Ahmed Wael</span>
                                <span>⭐ 4.9</span>
                            </p>
                            <p className="text-main-primary uppercase font-semibold text-[0.8vw] leading-[0.8vw]">200 EGP</p>
                        </div>
                        <p className="text-[0.6vw] leading-[0.6vw] text-white">342 trips • Mercedes</p>
                        <div className="flex flex-col gap-[0.5vw]">
                            {OfferHighlights.map((item, index) => (
                                <div key={index} className="flex items-center gap-[0.2vw] text-white text-[0.6vw]">
                                    <item.icon className="w-[0.5vw] h-[0.5vw]" />
                                    <span>{item.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* buttons */}
                <div className="flex items-center gap-[0.4vw] mt-[0.8vw]">
                    <button className="bg-main-ukraineBlue flex-[0.9] rounded-[1vw] py-[0.8vw] text-white font-medium text-[0.7vw]">Accept</button>
                    <button className="bg-main-blazeRed flex-[0.7] rounded-[1vw] py-[0.8vw] text-white font-medium text-[0.7vw]">Reject</button>
                    <button className="bg-main-beautifulWhite text-main-ukraineBlue flex-[0.5] rounded-[1vw] py-[0.8vw] flex items-center justify-center">
                        <User className="w-[1vw] h-[1vw]" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DynamicIsland;