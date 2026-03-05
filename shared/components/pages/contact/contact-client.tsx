"use client";

import { useState } from "react";
import clsx from "clsx";
import Navbar from "../../layout/navbar";
import Hero from "./hero";
import HomeSection4 from "../home/section-4";
import BrandBanner from "../../common/pages/brand-banner";
import FAQ from "../../common/pages/faq";
import Footer from "../../layout/footer";

const ContactClient = () => {
    const [heroLayoutReady, setHeroLayoutReady] = useState(false);

    return (
        <div className={clsx("bg-main-codGray", "overflow-hidden", "relative")}>
            <Navbar />
            <Hero onLayoutReady={() => setHeroLayoutReady(true)} />
            <BrandBanner heroLayoutReady={heroLayoutReady} className="bg-main-codGray" />
            <HomeSection4 heroLayoutReady={heroLayoutReady} className="bg-main-codGray" />
            <FAQ heroLayoutReady={heroLayoutReady} className="py-10 bg-main-codGray" />
            <Footer heroLayoutReady={heroLayoutReady} className="bg-main-codGray" />
        </div>
    );
};

export default ContactClient;