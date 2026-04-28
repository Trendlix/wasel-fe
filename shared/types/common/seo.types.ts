export interface ISeo {
    title?: string;
    description?: string;
    keywords?: string[];
    alt_img?: string;
    schema?: Record<string, unknown>[];
}

export interface ISeoBilingualFormat {
    en: ISeo;
    ar: ISeo;
}
