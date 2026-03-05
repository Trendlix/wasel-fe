"use client";

import { useState } from "react";
import clsx from "clsx";
import Hero from "./hero";
import Navbar from "../../layout/navbar";
import Section1 from "./section-1";
import Section2 from "./section-2";
import Section4 from "./section-4";
import HomeSection4 from "../home/section-4";
import BrandBanner from "../../common/pages/brand-banner";
import FAQ from "../../common/pages/faq";
import Footer from "../../layout/footer";

const AboutClient = () => {
    const [heroLayoutReady, setHeroLayoutReady] = useState(false);

    return (
        <div className={clsx("bg-white dark:bg-main-codGray", "overflow-hidden", "relative")}>
            <Navbar />
            <Hero onLayoutReady={() => setHeroLayoutReady(true)} />
            <Section1 />
            <Section2 />
            <Section4 />
            <HomeSection4 heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
            <BrandBanner heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
            <FAQ heroLayoutReady={heroLayoutReady} className="py-10 bg-white dark:bg-main-codGray" />
            <Footer heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
        </div>
    );
}

export default AboutClient;