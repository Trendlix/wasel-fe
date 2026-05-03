"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import BrandBanner from "../../common/pages/brand-banner";
import FAQ from "../../common/pages/faq";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Blogs from "./blogs";
import Hero from "./hero";
import { IBlogsPageContent, IBlogsCommonContent } from "@/shared/types/pages/blogs.types";
import type { IPaginationMeta } from "@/shared/types/common/pagination.types";

interface BlogsClientProps {
    content: IBlogsPageContent | null;
    common: IBlogsCommonContent | null;
    meta: IPaginationMeta | null;
    altImg?: string | null;
}

const BlogsClient = ({ content, common, meta, altImg }: BlogsClientProps) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const [heroLayoutReady, setHeroLayoutReady] = useState(false);

    return (
        <div className="bg-white dark:bg-main-codGray" dir={dir}>
            <Navbar />
            <Hero
                heroData={content?.hero ?? null}
                onLayoutReady={() => setHeroLayoutReady(true)}
            />
            <Blogs blogs={content?.blogs ?? []} meta={meta} />
            <BrandBanner
                heroLayoutReady={heroLayoutReady}
                className="bg-white dark:bg-main-codGray pb-24!"
                brandContent={common?.brand ?? null}
            />
            <FAQ
                heroLayoutReady={heroLayoutReady}
                className="bg-white dark:bg-main-codGray"
                faqContent={common?.faqs ?? null}
            />
            <Footer heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
        </div>
    );
};

export default BlogsClient;
