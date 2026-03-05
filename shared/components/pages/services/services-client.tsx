"use client";

import { useState } from "react";
import clsx from "clsx";
import Navbar from "../../layout/navbar";
import HomeSection4 from "../home/section-4";
import BrandBanner from "../../common/pages/brand-banner";
import FAQ from "../../common/pages/faq";
import Footer from "../../layout/footer";
import Hero from "./hero";
import Section2 from "./sectio-2";
import Section3 from "./section-3";
import Section4 from "./section-4";


const ServicesClient = () => {
    const [heroLayoutReady, setHeroLayoutReady] = useState(false);

    return (
        <div className={clsx("bg-white dark:bg-main-codGray", "overflow-hidden", "relative")}>
            <Navbar />
            <Hero onLayoutReady={() => setHeroLayoutReady(true)} />
            <Section2 />
            <Section3 />
            <Section4 />
            <BrandBanner heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
            <HomeSection4 heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
            <FAQ heroLayoutReady={heroLayoutReady} className="py-10 bg-white dark:bg-main-codGray" />
            <Footer heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
        </div>
    );
}

export default ServicesClient;