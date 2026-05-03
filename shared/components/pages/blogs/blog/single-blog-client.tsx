"use client";

import { IBlogItem, IBlogsCommonContent } from "@/shared/types/pages/blogs.types";
import { useLocale } from "next-intl";
import Hero from "./hero";
import Content from "./content";
import RelatedBlogs from "./related-blogs";
import BrandBanner from "@/shared/components/common/pages/brand-banner";
import FAQ from "@/shared/components/common/pages/faq";
import Footer from "@/shared/components/layout/footer";
import { useState } from "react";
import Navbar from "@/shared/components/layout/navbar";

interface SingleBlogClientProps {
    blog: IBlogItem;
    related: IBlogItem[];
    common: IBlogsCommonContent | null;
    schemas: Record<string, unknown>[];
}

const SingleBlogClient = ({ blog, related, common }: SingleBlogClientProps) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const [heroLayoutReady, setHeroLayoutReady] = useState(false);

    return (
        <div className="bg-white dark:bg-main-codGray" dir={dir}>
            <Navbar hideLanguageSwitcher />
            <Hero blog={blog} onLayoutReady={() => setHeroLayoutReady(true)} />
            <Content description={blog.description} />
            {related.length > 0 && <RelatedBlogs related={related} />}
            <BrandBanner
                heroLayoutReady={heroLayoutReady}
                className="bg-white dark:bg-main-codGray"
                brandContent={common?.brand ?? null}
            />
            <FAQ
                heroLayoutReady={heroLayoutReady}
                className="py-10 bg-white dark:bg-main-codGray"
                faqContent={common?.faqs ?? null}
            />
            <Footer heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
        </div>
    );
};

export default SingleBlogClient;
