export interface IHomePageResponse {
    content: {
        hero: {
            screen_1: string[];
            screen_2: string;
            screen_3: string;
            screen_4: string;
            screen_5: string;
            screen_6: string;
        };
        platform: {
            title: string;
            card_1_title: string;
            card_2_title: string;
            card_3_title: string;
            card_4: {
                title: string;
                description: string;
            };
        };
        transport: {
            card_1: {
                title: string;
                description: string;
            };
            card_2: {
                title: string;
                description: string;
            };
            card_3: {
                title: string;
                description: string;
            };
        };
        maximizing: {
            title: string;
            description: string;
            cards: {
                card_1: {
                    title: string;
                    description: string;
                };
                card_2: {
                    title: string;
                    description: string;
                };
                card_3: {
                    title: string;
                    description: string;
                };
            };
        };
    } | null;
    common: {
        app: {
            user: {
                img: string;
                title: string;
                links: {
                    app_store: string;
                    play_store: string;
                };
            };
            driver: {
                img: string;
                title: string;
                links: {
                    app_store: string;
                    play_store: string;
                };
            };
        };
        brand: {
            title: string;
            description: string;
            cta: {
                text: string;
                link: string;
            };
        };
        faqs: {
            title: string;
            description: string;
            items: Array<{
                question: string;
                answer: string;
            }>;
        };
    } | null;
    schemas: Record<string, unknown>[] | null;
    alt_img: string | null;
}