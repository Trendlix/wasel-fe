import { IAboutCommonContent } from "./about.types";

export interface IServicePageCard {
    tag: string;
    title: string;
    description: string;
    img: string;
    alt_img?: string;
}

export interface IServicePageSection {
    title: string[];
    description: string;
    cards: IServicePageCard[];
}

export interface IServicePageContent {
    hero: IServicePageSection;
    warehouse: IServicePageSection;
    advertising: IServicePageSection;
}

export interface IServicePageResponse {
    content: IServicePageContent | null;
    common: IAboutCommonContent | null;
    schemas: Record<string, unknown>[] | null;
    alt_img: string | null;
}
