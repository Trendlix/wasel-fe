"use client";

import { IBlogCardItem } from "@/shared/constants/blogs";
import { useLocale, useTranslations } from "next-intl";
import Hero from "./hero";
import Content from "./content";
import RelatedBlogs from "./related-blogs";
import BrandBanner from "@/shared/components/common/pages/brand-banner";
import FAQ from "@/shared/components/common/pages/faq";
import Footer from "@/shared/components/layout/footer";
import { useState } from "react";
import Navbar from "@/shared/components/layout/navbar";

const SingleBlogClient = ({ blog }: { blog: IBlogCardItem }) => {
    const tCards = useTranslations("blogs.cards");
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const [heroLayoutReady, setHeroLayoutReady] = useState(false);
    const description = blog ? tCards(`${blog.slug}.description`) : "";
    return (<div className="space-y-10 bg-white dark:bg-main-codGray" dir={dir}>
        <Navbar />
        <Hero blog={blog} onLayoutReady={() => setHeroLayoutReady(true)} />
        <Content description={description} />
        <RelatedBlogs blog={blog} />
        <BrandBanner heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
        <FAQ heroLayoutReady={heroLayoutReady} className="py-10 bg-white dark:bg-main-codGray" />
        <Footer heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
    </div>)
}

export default SingleBlogClient;