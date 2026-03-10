export interface IAboutTruck {
    title: string[];
    description: string;
    cardShape: 1 | 2 | 3;
    image: string;
    imageLight: string;
    xWidthColor: string;
}

export const aboutTruck: IAboutTruck[] = [
    {
        title: ["What Makes", "Wasel", "Different"],
        description: "Wasel is not just a transportation app — it is a complete logistics ecosystem designed to create measurable value for everyone involved.",
        cardShape: 1,
        image: "/brand/pages/about/section4/different.png",
        imageLight: "/brand/pages/about/section4/different-light.png",
        xWidthColor: "bg-main-red",
    },
    {
        title: ["Wasel", "Mission"],
        description: "To simplify heavy transportation by delivering smart, reliable, and scalable digital solutions that empower every partner in the logistics chain.",
        cardShape: 2,
        image: "/brand/pages/about/section4/mission.png",
        imageLight: "/brand/pages/about/section4/mission-light.png",
        xWidthColor: "bg-main-ukraineBlue",
    },
    {
        title: ["Wasel", "Commitment"],
        description: "We are committed to building a trusted transportation network where reliability, transparency, and performance drive long-term success.",
        cardShape: 3,
        image: "/brand/pages/about/section4/commitment.png",
        imageLight: "/brand/pages/about/section4/commitment-light.png",
        xWidthColor: "bg-main-ukraineBlue",
    },
    {
        title: ["Wasel", "Vision"],
        description: "To become the leading heavy transportation platform in the region, setting new standards for operational efficiency, transparency, and technological innovation.",
        cardShape: 2,
        image: "/brand/pages/about/section4/vision.png",
        imageLight: "/brand/pages/about/section4/vision-light.png",
        xWidthColor: "bg-main-secondary",
    }
]