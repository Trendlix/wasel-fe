export interface IBlogsSliderItem {
    id: number;
    type: "technology" | "featured" | "industry";
    title: string;
    description: string;
    timestamp: {
        date: string;
        time: string;
    };
    readTime: string;
    image: string;
}

export const blogsSliderItems: IBlogsSliderItem[] = [
    {
        id: 1,
        type: "technology",
        title: "How AI Is Reshaping Software Development in 2026",
        description: "Artificial intelligence is rapidly changing how developers write, test, and deploy code. From AI copilots to automated testing pipelines, discover how development teams are becoming faster and more efficient.",
        timestamp: {
            date: "January 28, 2026",
            time: "6 min read",
        },
        readTime: "6 min read",
        image: "/images/blogs/slider/1.jpg",
    },
    {
        id: 2,
        type: "featured",
        title: "Building Scalable SaaS Platforms: Lessons from Modern Startups",
        description: "Startups today must design systems that scale from hundreds to millions of users. This article explores architecture patterns, microservices, and cloud-native strategies used by fast-growing SaaS companies.",
        timestamp: {
            date: "February 10, 2026",
            time: "8 min read",
        },
        readTime: "8 min read",
        image: "/images/blogs/slider/2.jpg",
    },
    {
        id: 3,
        type: "industry",
        title: "The Rise of AI Voice Agents in Customer Support",
        description: "Voice AI is becoming a powerful tool for businesses. Learn how AI voice agents are reducing support costs, improving response times, and creating more natural customer experiences.",
        timestamp: {
            date: "February 22, 2026",
            time: "5 min read",
        },
        readTime: "5 min read",
        image: "/images/blogs/slider/3.jpg",
    },
]


export interface IBlogCardItem {
    id: number;
    type: "technology" | "featured" | "industry" | "transportation" | "storage" | "business";
    coverImage: string;
    title: string;
    description: string;
    timestamp: {
        date: string;
        time: string;
    };
    readTime: string;
    slug: string;
}

export const blogCardItems: IBlogCardItem[] = [
    {
        id: 1,
        type: "transportation",
        coverImage: "/brand/pages/blogs/blogs/blog-1.jpg",
        title: "How Heavy Transportation is Construction",
        description: "From flatbeds to specialized vehicles, learn how on-demand heavy truck booking is changing the construction industry.",
        timestamp: {
            date: "February 12, 2026",
            time: "7 min read",
        },
        readTime: "7 min read",
        slug: "how-heavy-transportation-is-construction",
    },
    {
        id: 2,
        type: "featured",
        coverImage: "/brand/pages/blogs/blogs/blog-2.jpg",
        title: "Building Scalable SaaS Platforms: Lessons from Modern Startups",
        description: "Startups today must design systems that scale from hundreds to millions of users. This article explores architecture patterns, microservices, and cloud-native strategies used by fast-growing SaaS companies.",
        timestamp: {
            date: "February 10, 2026",
            time: "8 min read",
        },
        readTime: "8 min read",
        slug: "building-scalable-saas-platforms-lessons-from-modern-startups",
    },
    {
        id: 3,
        type: "industry",
        coverImage: "/brand/pages/blogs/blogs/blog-3.jpg",
        title: "The Rise of AI Voice Agents in Customer Support",
        description: "Voice AI is becoming a powerful tool for businesses. Learn how AI voice agents are reducing support costs, improving response times, and creating more natural customer experiences.",
        timestamp: {
            date: "February 22, 2026",
            time: "5 min read",
        },
        readTime: "5 min read",
        slug: "the-rise-of-ai-voice-agents-in-customer-support",
    },
    {
        id: 4,
        type: "storage",
        coverImage: "/brand/pages/blogs/blogs/blog-4.jpg",
        title: "Warehouse Storage Solutions: A Complete Guide",
        description: "Everything you need to know about choosing the right warehouse storage solution for your business needs.",
        timestamp: {
            date: "February 10, 2026",
            time: "6 min read",
        },
        readTime: "6 min read",
        slug: "warehouse-storage-solutions-a-complete-guide",
    },
    {
        id: 5,
        type: "business",
        coverImage: "/brand/pages/blogs/blogs/blog-5.jpg",
        title: "Optimizing Your Supply Chain with Digital Solutions",
        description: "Learn how digital transformation is streamlining supply chain operations and reducing costs for businesses.",
        timestamp: {
            date: "February 5, 2026",
            time: "8 min read",
        },
        readTime: "8 min read",
        slug: "optimizing-your-supply-chain-with-digital-solutions",
    },
    {
        id: 6,
        type: "transportation",
        coverImage: "/brand/pages/blogs/blogs/blog-6.jpg",
        title: "The Rise of Container Shipping in Modern Trade",
        description: "Explore how container shipping has become the backbone of global trade and what the future holds.",
        timestamp: {
            date: "February 2, 2026",
            time: "6 min read",
        },
        readTime: "6 min read",
        slug: "the-rise-of-container-shipping-in-modern-trade",
    },
]