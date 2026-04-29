export interface IAboutCard {
    img: string;
    title: string;
    description: string;
}

export interface IAboutFutureCard {
    titles: string[];
    descriptions: string[];
}

export interface IAboutPageContent {
    hide: boolean;
    hero: {
        hide: boolean;
        video: string;
        bg: string;
        titles: string[];
    };
    founded: {
        hide: boolean;
        titles: string[];
        descriptions: string[];
    };
    stand_for: {
        hide: boolean;
        titles: string[];
        cards: IAboutCard[];
    };
    future: {
        hide: boolean;
        cards: IAboutFutureCard[];
    };
}

export interface IAboutCommonContent {
    hide: boolean;
    app: {
        hide: boolean;
        user: {
            hide: boolean;
            img: string;
            title: string;
            links: {
                app_store: string;
                play_store: string;
            };
        };
        driver: {
            hide: boolean;
            img: string;
            title: string;
            links: {
                app_store: string;
                play_store: string;
            };
        };
    };
    brand: {
        hide: boolean;
        title: string;
        description: string;
        cta: {
            text: string;
            link: string;
        };
    };
    faqs: {
        hide: boolean;
        title: string;
        description: string;
        items: Array<{
            question: string;
            answer: string;
        }>;
    };
}

export interface IAboutPageResponse {
    content: IAboutPageContent | null;
    common: IAboutCommonContent | null;
    schemas: Record<string, unknown>[] | null;
    alt_img: string | null;
}
