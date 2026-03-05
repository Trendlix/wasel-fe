export interface IServiceSection2Card {
    id: number;
    tag: string;
    title: string;
    highlights: {
        title: string;
        points: string[];
    };
    description: string;
    image: string;
    colors: {
        bg: string;
        tag: string;
        text?: string;
    };
}

export const serviceSection2Cards: IServiceSection2Card[] = [
    {
        id: 1,
        tag: "For Users",
        title: "Heavy Transportation Services",
        highlights: {
            title: "Move anything. Anytime.",
            points: [
                "On-demand heavy truck booking",
                "Flatbeds, lowbeds, and specialized vehicles",
                "Industrial & construction equipment transport",
                "Oversized cargo handling",
                "Real-time trip tracking",
            ],
        },
        description: "Fast booking. Transparent pricing. Verified drivers.",
        image: "/brand/pages/services/section2/transportation.png",
        colors: { bg: "bg-main-ukraineBlue", tag: "text-main-secondary" },
    },
    {
        id: 2,
        tag: "For Business",
        title: "Corporate &\n Enterprise Services",
        highlights: {
            title: "Custom logistics solutions for large businesses.",
            points: [
                "Dedicated fleet management",
                "Bulk shipment handling",
                "Storage contracts",
                "Advertising campaign coordination",
                "Priority support",
            ],
        },
        description: "",
        image: "/brand/pages/services/section2/safety.png",
        colors: { bg: "bg-main-red", tag: "text-main-secondary" },
    },
    {
        id: 3,
        tag: "For Business",
        title: "Safety, Transparency &\nTechnology",
        highlights: {
            title: "Built on trust and innovation.",
            points: [
                "Verified drivers & warehouses",
                "Transparent pricing",
                "Real-time tracking",
                "Secure payments",
                "Dedicated support team",
            ],
        },
        description: "",
        image: "/brand/pages/services/section2/corporate.png",
        colors: { bg: "bg-main-secondary", tag: "text-main-red", text: "text-black" },
    },
];

// --- Section 3 (Warehouse) cards ---

export interface IServiceSection3Card {
    id: number;
    title: string;
    tag: string;
    highlights: {
        title: string;
        points: string[];
    };
    description?: string;
    colors: {
        bg: string;
        tag: string;
        text?: string;
    };
    image: string;
}

export const serviceSection3Cards: IServiceSection3Card[] = [
    {
        id: 1,
        title: "For Warehouse Owners",
        tag: "secure storage, on demand",
        highlights: {
            title: "Built on trust and innovation.",
            points: [
                "List your warehouse space",
                "Manage availability easily",
                "Receive storage requests instantly",
                "Maximize unused space revenue",
                "Secure and transparent payments",
            ],
        },
        colors: { bg: "bg-main-ukraineBlue", tag: "text-main-secondary", text: "text-white" },
        image: "/brand/pages/services/section3/warehouse.png",
    },
    {
        id: 2,
        title: "For Customers",
        tag: "secure storage, on demand",
        highlights: {
            title: "Built on trust and innovation.",
            points: [
                "Short-term & long-term storage",
                "Secure monitored facilities",
                "Flexible space options",
                "Easy booking through the platform",
                "Affordable pricing plans",
                "Store machinery, inventory, materials, or bulk goods safely and efficiently.",
            ],
        },
        colors: { bg: "bg-main-secondary", tag: "text-main-ukraineBlue", text: "text-black" },
        image: "/brand/pages/services/section3/customers.png",
    },
];

// --- Section 4 (Truck Advertising) cards ---

export interface IServiceSection4Card {
    id: number;
    tag: string;
    title: string;
    highlights: {
        title?: string;
        points: string[];
    };
    description?: string;
    colors: {
        bg: string;
        tag: string;
        text?: string;
    };
    image: string;
}

export const serviceSection4Cards: IServiceSection4Card[] = [
    {
        id: 1,
        tag: "Turn Trucks Into Moving Billboards",
        title: "For Advertisers",
        highlights: {
            points: [
                "High-visibility mobile advertising",
                "City-wide brand exposure",
                "Targeted geographic routes",
                "Cost-effective marketing channel",
                "Performance tracking reports",
            ],
        },
        colors: { bg: "bg-white", tag: "text-main-ukraineBlue", text: "text-black" },
        image: "/brand/pages/services/section4/truck.png",
    },
    {
        id: 2,
        tag: "turn trucks into moving billboards",
        title: "For Truck Owners",
        highlights: {
            points: [
                "Earn additional income",
                "Approved brand partnerships",
                "Professional ad installation",
                "Flexible participation options",
            ],
        },
        colors: { bg: "bg-main-red", tag: "text-main-secondary", text: "text-white" },
        image: "/brand/pages/services/section4/coins.png",
    },
];
