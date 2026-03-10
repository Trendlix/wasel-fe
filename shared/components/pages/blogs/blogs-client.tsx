"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import BrandBanner from "../../common/pages/brand-banner";
import FAQ from "../../common/pages/faq";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Blogs from "./blogs";
import Hero from "./hero";

const BlogsClient = () => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const [heroLayoutReady, setHeroLayoutReady] = useState(false);

    return (<div className="bg-white dark:bg-main-codGray" dir={dir}>
        <Navbar />
        <Hero onLayoutReady={() => setHeroLayoutReady(true)} />
        <Blogs />
        <BrandBanner heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray pb-24!" />
        <FAQ heroLayoutReady={heroLayoutReady} className=" bg-white dark:bg-main-codGray" />
        <Footer heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
    </div>)
}



export default BlogsClient;