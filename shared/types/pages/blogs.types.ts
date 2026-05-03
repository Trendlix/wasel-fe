import { IPaginationMeta } from "../common/pagination.types";

export interface IBlogSeo {
    title: string;
    description: string;
    keywords: string[];
    alt_img: string;
    schema: Record<string, unknown>[];
}

export interface IBlogItem {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    category_slug: string;
    cover_img: string;
    time_to_read: string;
    created_at: string;
    published_at: string;
    seo: IBlogSeo;
    // Optional CMS fields (aligned with dashboard CMS payload)
    locale?: 'en' | 'ar';
    status?: 'draft' | 'scheduled' | 'published';
    is_schedualed?: boolean;
    release_date?: string | null;
    created_by?: string | null;
    updated_at?: string;
}

// DEPRECATED: IBlogsHeroCard is no longer used for hero (banner-only)
// Keeping for backward compatibility during migration
export interface IBlogsHeroCard {
    id: string;
    tag: string;
    title: string;
    description: string;
    created_at: string;
    time_to_read: string;
    cover_img?: string;
}

// Banner with tag_slug (canonical unique field) and bilingual tags
export interface IBlogsBanner {
    id: string;
    tag_slug: string;    // Canonical unique identifier
    slug: string;        // Legacy alias for backward compatibility
    tag_en: string;      // English tag
    tag_ar: string;      // Arabic tag
    title: string;
    description: string;
    created_at: string;
    time_to_read: string;
    cover_img?: string;
}

export interface IBlogsHeroSection {
    title: string;
    description: string;
    banner: IBlogsBanner[];  // Array of banner items (banner-only hero)
    // cards removed - banner is the only hero source
}

export interface IBlogsPageContent {
    hero: IBlogsHeroSection;
    blogs: IBlogItem[];
}

// Blogs pages have simplified common (NO app download section)
export interface IBlogsCommonContent {
    hide: boolean;
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

export interface IBlogsPageResponse {
    content: IBlogsPageContent;
    common: IBlogsCommonContent;
    schemas: Record<string, unknown>[];
    alt_img: string;
    meta: IPaginationMeta;
}

export interface ISingleBlogResponse {
    blog: IBlogItem;
    related: IBlogItem[];
    common: IBlogsCommonContent;
    schemas: Record<string, unknown>[];
    alt_img: string;
    seo: {
        title: string;
        description: string;
        keywords: string[];
    };
}
