import { ArrowUpRight, LucideIcon } from "lucide-react";

interface IFooterItem {
    href: string;
    titleKey: string;
    icon?: LucideIcon;
}

interface IFooterList {
    titleKey: string;
    items: IFooterItem[];
}

export const footerLinks: IFooterList[] = [
    {
        titleKey: "waselFleet",
        items: [
            { titleKey: "companiesDashboard", href: "#", icon: ArrowUpRight },
            { titleKey: "advertisersDashboard", href: "#", icon: ArrowUpRight },
            { titleKey: "iosUserApp", href: "#", icon: ArrowUpRight },
            { titleKey: "androidUserApp", href: "#", icon: ArrowUpRight },
            { titleKey: "iosDriverApp", href: "#", icon: ArrowUpRight },
            { titleKey: "androidDriverApp", href: "#", icon: ArrowUpRight },
        ],
    },
    {
        titleKey: "company",
        items: [
            { titleKey: "about", href: "#" },
            { titleKey: "services", href: "#" },
            { titleKey: "blogs", href: "#" },
            { titleKey: "contact", href: "#" },
        ],
    },
    {
        titleKey: "waselFor",
        items: [
            { titleKey: "companies", href: "#" },
            { titleKey: "advertisers", href: "#" },
        ],
    },
    {
        titleKey: "support",
        items: [
            { titleKey: "helpCenter", href: "#" },
            { titleKey: "talkToSupport", href: "#" },
        ],
    },
];
