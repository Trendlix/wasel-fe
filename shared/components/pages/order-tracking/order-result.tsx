"use client";

import { IOrderTracking } from "@/shared/constants/order";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { CheckCircle2, Mail, MapPin, Package, Phone, Truck } from "lucide-react";
import { useRef } from "react";

const statusConfig: Record<
    IOrderTracking["status"],
    { label: string; description: string }
> = {
    order_placed: { label: "Order Placed", description: "Shipment booking confirmed" },
    order_picked_up: { label: "Picked Up", description: "Package picked up from origin" },
    order_in_transit: { label: "In Transit", description: "En route to destination" },
    order_out_for_delivery: { label: "Out for Delivery", description: "Package out for final delivery" },
    order_delivered: { label: "Delivered", description: "Package delivered successfully" },
    order_cancelled: { label: "Cancelled", description: "Order has been cancelled" },
};

const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const OrderResult = ({ order }: { order: IOrderTracking }) => {
    const currentStatus = statusConfig[order.status];
    const scopeRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(headerRef.current, { y: 40, autoAlpha: 0, duration: 0.6 })
            .from(leftRef.current, { y: 40, autoAlpha: 0, duration: 0.6 }, "-=0.3")
            .from(rightRef.current?.children ?? [], { y: 30, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, "-=0.4");
    }, { scope: scopeRef });

    return (
        <div ref={scopeRef} className="container pb-28 pt-10 space-y-4">
            {/* ── Header ── */}
            <div ref={headerRef} className="rounded-2xl bg-main-ukraineBlue p-8 flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                        <span className="text-xs font-medium uppercase tracking-widest text-white/70">
                            Current Status
                        </span>
                    </div>
                    <h2 className="text-white font-bold text-4xl md:text-5xl">
                        {currentStatus.label}
                    </h2>
                    <p className="text-sm text-white/70">
                        Tracking Number:{" "}
                        <span className="text-main-secondary font-semibold">
                            WSL{order.number}
                        </span>
                    </p>
                </div>

                <div className="bg-white/10 rounded-xl px-6 py-4 text-right shrink-0 hidden sm:block">
                    <p className="text-xs text-white/60 mb-1">Estimated Delivery</p>
                    <p className="text-white font-bold text-lg">
                        {formatDate(order.expectedDeliveryDate)}
                    </p>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="grid lg:grid-cols-[1fr_360px] gap-4 items-start">
                {/* Left – Timeline */}
                <div ref={leftRef} className="bg-main-eerieBlack rounded-2xl p-6 space-y-6">
                    <h3 className="text-white font-bold text-xl">Shipment Timeline</h3>

                    <div>
                        {order.shipment.timeline.map((entry, idx) => {
                            const config = statusConfig[entry.status];
                            const isLast = idx === order.shipment.timeline.length - 1;

                            return (
                                <div key={idx} className="flex gap-4">
                                    {/* Icon + connector */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-main-ukraineBlue flex items-center justify-center shrink-0">
                                            <CheckCircle2 size={18} className="text-white" />
                                        </div>
                                        {!isLast && (
                                            <div className="w-px bg-main-ukraineBlue/30 flex-1 my-1" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div
                                        className={clsx(
                                            "flex items-start justify-between w-full",
                                            isLast ? "pb-0" : "pb-7"
                                        )}
                                    >
                                        <div className="space-y-1">
                                            <p className="text-white font-bold">{config.label}</p>
                                            <p className="text-white/50 text-sm">{config.description}</p>
                                            <p className="text-main-secondary text-xs flex items-center gap-1">
                                                <MapPin size={11} />
                                                {entry.location}
                                            </p>
                                        </div>
                                        <p className="text-white/40 text-xs text-right shrink-0 ml-4">
                                            {formatDate(entry.date)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right – Details / Driver / Help */}
                <div ref={rightRef} className="space-y-4">
                    {/* Shipment Details */}
                    <div className="bg-main-eerieBlack rounded-2xl p-6 space-y-4">
                        <h3 className="text-white font-bold text-xl">Shipment Details</h3>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Package size={16} className="text-main-secondary mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-white/40 text-xs">From</p>
                                    <p className="text-white font-medium text-sm">{order.shipment.from}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-main-secondary mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-white/40 text-xs">To</p>
                                    <p className="text-white font-medium text-sm">{order.shipment.to}</p>
                                </div>
                            </div>

                            <div className="h-px bg-white/5" />

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-white/40">Weight</span>
                                <span className="text-white">{order.shipment.weight}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-white/40">Vehicle Type</span>
                                <span className="text-white">{order.shipment.vehicleType}</span>
                            </div>
                        </div>
                    </div>

                    {/* Driver */}
                    <div className="bg-main-secondary rounded-2xl p-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <Truck size={20} className="text-black shrink-0" />
                            <div>
                                <p className="text-black/60 text-xs">Driver</p>
                                <p className="text-black font-bold text-lg leading-tight">
                                    {order.driver.name}
                                </p>
                            </div>
                        </div>

                        <a
                            href={`tel:+${order.driver.phone}`}
                            className="flex items-center justify-center gap-2 w-full bg-white rounded-full py-3 text-black font-medium text-sm hover:bg-white/90 transition-colors"
                        >
                            <Phone size={14} />
                            +{order.driver.phone}
                        </a>
                    </div>

                    {/* Need Help */}
                    <div className="bg-main-eerieBlack rounded-2xl p-6 space-y-4">
                        <div>
                            <h3 className="text-white font-bold text-lg">Need Help?</h3>
                            <p className="text-white/50 text-sm mt-1">
                                Our support team is here to assist you with any questions about your shipment.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <a
                                href="tel:+1234567890"
                                className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 rounded-xl py-3 text-white text-sm transition-colors"
                            >
                                <Phone size={14} />
                                Call Support
                            </a>
                            <a
                                href="mailto:support@wasel.com"
                                className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 rounded-xl py-3 text-white text-sm transition-colors"
                            >
                                <Mail size={14} />
                                Email Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderResult;
