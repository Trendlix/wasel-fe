import { CSSProperties } from "react";

export interface IHeroSentence {
    textKey: "selectLocation" | "chooseTruck" | "selectPrice" | "selectDriver" | "confirmed";
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
        textKey: "selectLocation",
        style: {
            left: "10vw",
            top: "50%",
            transform: "translateY(-50%)",
        },
    },
    {
        textKey: "chooseTruck",
        style: {
            bottom: "-5vh",
            left: "50%",
            transform: "translateX(-50%)",
        },
    },
    {
        textKey: "selectPrice",
        style: {
            right: "10vw",
            top: "70%",
        },
    },
    {
        textKey: "selectDriver",
        style: {
            bottom: "-7vh",
            left: "50%",
            transform: "translateX(-50%)",
        },
    },
    {
        textKey: "confirmed",
        style: {
            left: "10vw",
            top: "50%",
            transform: "translateY(-50%)",
        },
    },
];