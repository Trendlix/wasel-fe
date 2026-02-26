import { CSSProperties } from "react";

export interface IHeroSentence {
    text: string;
    style: Pick<CSSProperties,
        | "left"
        | "right"
        | "top"
        | "bottom"
        | "transform"
    >;
}

export const heroSentences: IHeroSentence[] = [
    {
        text: "Select Location",
        style: {
            left: "10vw",
            top: "50%",
            transform: "translateY(-50%)",
        },
    },
    {
        text: "Choose Truck",
        style: {
            bottom: "-5vh",
            left: "50%",
            transform: "translateX(-50%)",
        },
    },
    {
        text: "Select Price",
        style: {
            right: "10vw",
            top: "70%",
        },
    },
    {
        text: "Select Driver",
        style: {
            bottom: "-7vh",
            left: "50%",
            transform: "translateX(-50%)",
        },
    },
    {
        text: "Confirmed",
        style: {
            left: "10vw",
            top: "50%",
            transform: "translateY(-50%)",
        },
    },
];