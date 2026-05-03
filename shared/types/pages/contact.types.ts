import { IAboutCommonContent } from "./about.types";

export interface IContactEmails {
    general_support: string;
    legal_inquiries: string;
    privacy_concerns: string;
    business_partnerships: string;
}

export interface IContactPageContent {
    mobile: string;
    landline: string;
    email: string;
    address: string;
    business_hours: string;
    emails: IContactEmails;
}

export interface IContactPageResponse {
    content: IContactPageContent | null;
    common: IAboutCommonContent | null;
    schemas: Record<string, unknown>[] | null;
    alt_img: string | null;
}
