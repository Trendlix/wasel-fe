"use client";
import { IOrderTracking, orders } from "@/shared/constants/order";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { CircleOff, Search } from "lucide-react";
import { useRef, useState } from "react";
import OrderResult from "./order-result";
import TrackCards from "./track-cards";

const normalize = (n: string) => n.trim().toLowerCase().replace(/^wsl/, "");

const Track = () => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [order, setOrder] = useState<IOrderTracking | null>(null);
    const [searched, setSearched] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useGSAP(() => {
        gsap.from(formRef.current?.children ?? [], {
            y: 30,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
        });
    }, { scope: formRef });

    const handleTrack = () => {
        const found = orders.find(o => normalize(o.number) === normalize(trackingNumber));
        setOrder(found ?? null);
        setSearched(true);
    };

    const notFound = searched && !order;

    return (
        <div>
            <div className="container pt-14">
                <form
                    ref={formRef}
                    className="flex items-center justify-center flex-col gap-5"
                    onSubmit={(e) => { e.preventDefault(); handleTrack(); }}
                >
                    <div className={clsx("max-w-xl rounded-full bg-main-eerieBlack", "flex items-center justify-between", "px-1.5 py-1", "md:min-w-[500px]")}>
                        <input
                            type="text"
                            placeholder="Enter your tracking number (e.g. WSL1234567890)"
                            className={clsx("w-full rounded-full bg-main-eerieBlack", "px-6 py-4", "placeholder:text-[14px]", "focus:outline-none")}
                            value={trackingNumber}
                            onChange={(e) => { setTrackingNumber(e.target.value); setSearched(false); }}
                        />
                        <button
                            className={clsx("flex items-center gap-2", "bg-main-primary/50", "px-6 py-4 rounded-full", "hover:bg-main-primary/70 transition-all duration-300")}
                            type="submit"
                        >
                            <span><Search size={16} /></span>
                            <span className={clsx("text-[12px] font-medium capitalize")}>track</span>
                        </button>
                    </div>

                    {notFound && (
                        <NoOrderFound />
                    )}

                    <div className="flex items-center flex-col gap-2">
                        <p className="text-xs text-white/50">Try these sample tracking numbers:</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-white/60">
                            {orders.map((o) => (
                                <button
                                    key={o.id}
                                    type="button"
                                    className="px-2.5 py-0.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                                    onClick={() => { setTrackingNumber(`WSL${o.number}`); setSearched(false); }}
                                >
                                    WSL{o.number}
                                </button>
                            ))}
                        </div>
                    </div>
                </form>
            </div>

            {order ? <OrderResult order={order} /> : <TrackCards />}
        </div>
    );
};

const NoOrderFound = () => {
    return (
        <div className={clsx(
            "md:min-w-[500px] min-w-[300px]",
            "bg-main-red/10 border border-main-red/20",
            "rounded-2xl px-6 py-5",
            "flex items-center gap-4",
        )}>
            <div className="shrink-0 w-10 h-10 rounded-full bg-main-red/20 flex items-center justify-center">
                <CircleOff className="text-main-red" size={18} />
            </div>
            <div>
                <p className="text-main-red font-semibold text-sm">No order found</p>
                <p className="text-main-red/60 text-xs mt-0.5">
                    Double-check your tracking number and try again.
                </p>
            </div>
        </div>
    );
}

export default Track;
