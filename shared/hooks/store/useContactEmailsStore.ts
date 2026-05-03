import {
    fetchContactEmailsPublic,
    type ContactEmailsPayload,
} from "@/shared/lib/contact-emails-api";
import { create } from "zustand";

const emptyEmails = (): ContactEmailsPayload => ({
    general_support: "",
    legal_inquiries: "",
    privacy_concerns: "",
    business_partnerships: "",
});

/** Dedupes concurrent hydration (e.g. React Strict Mode double mount). */
let hydrateInFlight: Promise<void> | null = null;

interface ContactEmailsState {
    emails: ContactEmailsPayload;
    hydrated: boolean;
    hydrateEmails: () => Promise<void>;
}

const useContactEmailsStore = create<ContactEmailsState>((set, get) => ({
    emails: emptyEmails(),
    hydrated: false,

    hydrateEmails: async () => {
        if (get().hydrated) return;
        if (!hydrateInFlight) {
            hydrateInFlight = (async () => {
                try {
                    const payload = await fetchContactEmailsPublic();
                    set({
                        emails: payload ?? emptyEmails(),
                        hydrated: true,
                    });
                } catch {
                    set({ emails: emptyEmails(), hydrated: true });
                } finally {
                    hydrateInFlight = null;
                }
            })();
        }
        await hydrateInFlight;
    },
}));

export default useContactEmailsStore;
