"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useHeroMountReady } from "@/shared/components/pages/home/home-client";
import { Button } from "../ui/button";
import clsx from "clsx";
import ThemeSwitcher from "../common/layout/theme-switcher";

const navLinks = [
    { href: "/", labelKey: "home" },
    { href: "/about", labelKey: "about" },
    { href: "/services", labelKey: "services" },
    { href: "/contact", labelKey: "contact" },
    { href: "/blogs", labelKey: "blogs" },
    { href: "/order-tracking", labelKey: "orderTracking" },
] as const;

const Navbar = () => {
    const t = useTranslations("nav");
    const pathname = usePathname();
    const heroMountReady = useHeroMountReady();
    const isAboutPage = pathname === "/about" || pathname?.endsWith("/about");
    const isHomePage = pathname === "/" || pathname?.endsWith("/");
    const inactiveTextClass = isAboutPage ? "text-white/54 hover:text-white" : "text-main-zenGray hover:text-white";
    const navRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";

    useGSAP(() => {
        if (!navRef.current) return;
        if (!heroMountReady) {
            gsap.set(navRef.current, { y: "-100%", opacity: 0 });
            return;
        }
        gsap.fromTo(
            navRef.current,
            { y: "-100%", opacity: 0 },
            { y: 0, opacity: 1, duration: 2, ease: "back.out(1.7)" }
        );
    }, { scope: navRef, dependencies: [heroMountReady] });

    return (
        <div ref={navRef} className="fixed top-0 z-1000 w-full -translate-y-full">
            <nav className="max-w-[90%] xl:max-w-[85%] mx-auto flex items-center justify-between py-4">
                <div className="flex items-center xl:gap-6 2xl:gap-9 lg:gap-5 gap-3">
                    <Link href="/">
                        <Image src="/brand/logo.png" alt="logo" width={100} height={100} className="max-w-[75px] max-h-[75px]" />
                    </Link>
                    <div className="hidden md:flex items-center gap-6" dir={dir}>
                        {navLinks.map(({ href, labelKey }) => {
                            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={clsx(isActive ? "text-white font-medium" : inactiveTextClass, "transition-colors xl:text-sm text-xs text-nowrap")}
                                >
                                    {t(labelKey)}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 sm:gap-2 *:flex *:items-center *:justify-center">
                        <Button
                            variant="secondary"
                            className={clsx("bg-transparent whitespace-nowrap min-w-0 shrink font-medium", "2xl:text-sm xl:text-xs md:text-[10px] 2xl:max-h-[45px] xl:max-h-[40px] md:max-h-[30px]")}
                        >
                            <span className="hidden sm:inline">{t("companiesAdvertisers")}</span>
                            <span className="sm:hidden">{t("companies")}</span>
                        </Button>
                        <Button
                            variant="primary"
                            className={clsx("bg-main-ukraineBlue border-main-ukraineBlue hover:bg-transparent hover:text-white text-white whitespace-nowrap min-w-0 shrink font-medium", "2xl:text-sm xl:text-xs md:text-[10px] 2xl:max-h-[45px] xl:max-h-[40px] md:max-h-[30px]")}
                        >
                            <span className="hidden sm:inline">{t("downloadApp")}</span>
                            <span className="sm:hidden">{t("download")}</span>
                        </Button>
                    </div>
                    {!isHomePage && <ThemeSwitcher />}
                    <LanguageSwitcher inactiveClass={inactiveTextClass} />
                </div>
            </nav>
        </div>
    );
};

const LanguageSwitcher = ({ inactiveClass = "text-main-zenGray hover:text-white" }: { inactiveClass?: string }) => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-1 text-xs">
            <button
                onClick={() => router.replace(pathname || "/", { locale: "en" })}
                className={clsx("transition-colors", locale === "en" ? "text-white" : inactiveClass)}
            >
                EN
            </button>
            <button
                onClick={() => router.replace(pathname || "/", { locale: "ar" })}
                className={clsx("transition-colors", locale === "ar" ? "text-white" : inactiveClass)}
            >
                العربيه
            </button>
        </div>
    );
};

export default Navbar;