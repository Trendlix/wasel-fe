"use client";

import { IOrderTracking } from "@/shared/constants/order";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import gsap from "gsap";
import { CheckCircle2, Mail, MapPin, Package, Phone, Truck } from "lucide-react";
import { useRef } from "react";

const formatDate = (date: Date, locale: string) =>
    new Date(date).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const OrderResult = ({ order }: { order: IOrderTracking }) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const t = useTranslations("orderTracking.result");
    const tStatus = useTranslations("orderTracking.status");
    const currentStatus = {
        label: tStatus(`${order.status}.label`),
        description: tStatus(`${order.status}.description`),
    };
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
        <div ref={scopeRef} className="container pb-28 pt-10 space-y-4" dir={dir}>
            {/* ── Header ── */}
            <div ref={headerRef} className="rounded-2xl bg-main-ukraineBlue p-8 flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                        <span className="text-xs font-medium uppercase tracking-widest text-white/70">
                            {t("currentStatus")}
                        </span>
                    </div>
                    <h2 className="text-white font-bold text-4xl md:text-5xl">
                        {currentStatus.label}
                    </h2>
                    <p className="text-sm text-white/70">
                        {t("trackingNumber")}{" "}
                        <span className="text-main-secondary font-semibold">
                            WSL{order.number}
                        </span>
                    </p>
                </div>

                <div className={clsx("bg-white/10 rounded-xl px-6 py-4 shrink-0 hidden sm:block", dir === "rtl" ? "text-left" : "text-right")}>
                    <p className="text-xs text-white/60 mb-1">{t("estimatedDelivery")}</p>
                    <p className="text-white font-bold text-lg">
                        {formatDate(order.expectedDeliveryDate, locale)}
                    </p>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="grid lg:grid-cols-[1fr_360px] gap-4 items-start">
                {/* Left – Timeline */}
                <div ref={leftRef} className="dark:bg-main-eerieBlack bg-main-techWhite rounded-2xl p-6 space-y-6">
                    <h3 className="dark:text-white text-black font-bold text-xl">{t("shipmentTimeline")}</h3>

                    <div>
                        {order.shipment.timeline.map((entry, idx) => {
                            const configLabel = tStatus(`${entry.status}.label`);
                            const configDesc = tStatus(`${entry.status}.description`);
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
                                            <p className="dark:text-white text-black font-bold">{configLabel}</p>
                                            <p className="dark:text-white/50 text-black/50 text-sm">{configDesc}</p>
                                            <p className="text-main-secondary text-xs flex items-center gap-1">
                                                <MapPin size={11} />
                                                {entry.location}
                                            </p>
                                        </div>
                                        <p className={clsx("dark:text-white/40 text-black/40 text-xs shrink-0 ml-4", dir === "rtl" ? "text-left" : "text-right")}>
                                            {formatDate(entry.date, locale)}
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
                    <div className="dark:bg-main-eerieBlack bg-main-techWhite rounded-2xl p-6 space-y-4">
                        <h3 className="dark:text-white text-black font-bold text-xl">{t("shipmentDetails")}</h3>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Package size={16} className="text-main-secondary mt-0.5 shrink-0" />
                                <div>
                                    <p className="dark:text-white/40 text-black/40 text-xs">{t("from")}</p>
                                    <p className="dark:text-white text-black font-medium text-sm">{order.shipment.from}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-main-secondary mt-0.5 shrink-0" />
                                <div>
                                    <p className="dark:text-white/40 text-black/40 text-xs">{t("to")}</p>
                                    <p className="dark:text-white text-black font-medium text-sm">{order.shipment.to}</p>
                                </div>
                            </div>

                            <div className="h-px dark:bg-white/5 bg-black/5" />

                            <div className="flex items-center justify-between text-sm">
                                <span className="dark:text-white/40 text-black/40">{t("weight")}</span>
                                <span className="dark:text-white text-black">{order.shipment.weight}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="dark:text-white/40 text-black/40">{t("vehicleType")}</span>
                                <span className="dark:text-white text-black">{order.shipment.vehicleType}</span>
                            </div>
                        </div>
                    </div>

                    {/* Driver */}
                    <div className="bg-main-secondary rounded-2xl p-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <Truck size={20} className="text-black shrink-0" />
                            <div>
                                <p className="text-black/60 text-xs">{t("driver")}</p>
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
                    <div className="dark:bg-main-eerieBlack bg-main-techWhite rounded-2xl p-6 space-y-4">
                        <div>
                            <h3 className="dark:text-white text-black font-bold text-lg">{t("needHelp")}</h3>
                            <p className="dark:text-white/50 text-black/50 text-sm mt-1">
                                {t("needHelpDescription")}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <a
                                href="tel:+1234567890"
                                className="flex items-center justify-center gap-2 w-full dark:bg-white/5 bg-black/5 dark:hover:bg-white/10 hover:bg-black/10 rounded-xl py-3 dark:text-white text-black text-sm transition-colors"
                            >
                                <Phone size={14} />
                                {t("callSupport")}
                            </a>
                            <a
                                href="mailto:support@wasel.com"
                                className="flex items-center justify-center gap-2 w-full dark:bg-white/5 bg-black/5 dark:hover:bg-white/10 hover:bg-black/10 rounded-xl py-3 dark:text-white text-black text-sm transition-colors"
                            >
                                <Mail size={14} />
                                {t("emailUs")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderResult;
