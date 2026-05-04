"use client";

import clsx from "clsx";
import { Loader2, Mail, MessageSquare, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";

import { contactInfoItems, type IContactItem } from "@/shared/constants/contact";
import { ContactSuccessDialog } from "@/shared/components/pages/contact/contact-success-dialog";
import { useState, type FormEvent } from "react";
import axios from "axios";


const contactInfoTitleClass = "font-medium md:text-[22.74px] text-lg leading-[34.11px] tracking-0 dark:text-main-dutchOrigin text-main-ukraineBlue";
const contactIconClass = "w-[30.32px] h-[30.32px] dark:text-main-dutchOrigin text-main-ukraineBlue shrink-0";
const contactItemClass = "font-normal md:text-[20.21px] text-[18px] leading-[30.32px] tracking-0";

const formLabelClass = "font-medium text-[17.69px] leading-[17.69px] tracking-0 text-white";
const formLabelIconClass = "w-5 h-5 dark:text-main-dutchOrigin text-main-ukraineBlue shrink-0";
const inputClass = "w-full rounded-lg dark:bg-main-lightBlack bg-main-techWhite px-4 py-3 dark:text-white text-main-flatBlack placeholder:text-main-dmGray placeholder:font-normal placeholder:text-sm placeholder:leading-[100%] placeholder:tracking-0 border-0 outline-none focus:ring-1 focus:ring-main-dutchOrigin";

const formFieldIds = ["name", "email", "phone", "message"] as const;
const formFieldIcons = { name: User, email: Mail, phone: Phone, message: MessageSquare };

const FormField = ({
    id,
    value,
    onChange,
}: {
    id: (typeof formFieldIds)[number];
    value: string;
    onChange: (id: keyof ContactFormPayload, value: string) => void;
}) => {
    const fieldT = useTranslations(`contact.form.fields.${id}`);
    const Icon = formFieldIcons[id];
    const type = id === "message" ? "textarea" : id === "email" ? "email" : id === "phone" ? "tel" : "text";
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-end gap-2">
                <Icon className={formLabelIconClass} />
                <label htmlFor={id} className={clsx(formLabelClass, "dark:text-white! text-black!")}>
                    {fieldT("label")}
                </label>
            </div>
            {type === "textarea" ? (
                <textarea
                    id={id}
                    name={id}
                    value={value}
                    placeholder={fieldT("placeholder")}
                    rows={5}
                    className={clsx(inputClass, "resize-none min-h-[120px]")}
                    onChange={(e) => onChange(id, e.target.value)}
                />
            ) : (
                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    placeholder={fieldT("placeholder")}
                    className={inputClass}
                    onChange={(e) => onChange(id, e.target.value)}
                />
            )}
        </div>
    );
};

const ContactItem = ({ item }: { item: IContactItem }) => {
    const t = useTranslations(`contact.info.${item.id}`);
    const Icon = item.icon;
    const label = t("label");
    let valueContent: string;
    if (item.id === "address") {
        valueContent = [t("line1"), t("line2"), t("line3")].join("\n");
    } else if (item.id === "businessHours") {
        valueContent = [t("weekdays"), t("saturday"), t("sunday")].join("\n");
    } else {
        valueContent = t("value");
    }

    return (
        <div className="flex items-start gap-x-4">
            <div className="py-1">
                <Icon className={contactIconClass} />
            </div>
            <div>
                <p className={clsx(contactItemClass, "dark:text-main-dutchOrigin text-main-ukraineBlue")}>{label}</p>
                {item.id === "email" ? (
                    <a href={`mailto:${valueContent}`} className={clsx(contactItemClass, "text-main-perfectGray hover:underline")}>
                        {valueContent}
                    </a>
                ) : (
                    <p className={clsx(contactItemClass, "text-main-perfectGray whitespace-pre-line")}>
                        {valueContent}
                    </p>
                )}
            </div>
        </div>
    );
};

interface ContactFormPayload {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

const emailLooksValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/** International + prefix → 00 for backends/sheets that expect numeric country codes */
const phoneForSubmit = (trimmed: string) => trimmed.replace(/\+/g, "00");

/** Best-effort message from Apps Script / JSON / plain text bodies */
const parseResponseMessage = (data: unknown): string | undefined => {
    if (data == null) return undefined;
    if (typeof data === "string") {
        const s = data.trim();
        if (!s) return undefined;
        if (s.startsWith("{") || s.startsWith("[")) {
            try {
                return parseResponseMessage(JSON.parse(s) as unknown);
            } catch {
                return s;
            }
        }
        return s;
    }
    if (typeof data === "object" && data !== null) {
        const rec = data as Record<string, unknown>;
        if (typeof rec.message === "string" && rec.message.trim()) return rec.message.trim();
        if (typeof rec.error === "string" && rec.error.trim()) return rec.error.trim();
    }
    return undefined;
};

const resolveSubmitError = (err: unknown, tr: (key: string) => string): string => {
    if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") return tr("validation.submitTimeout");
        if (err.response == null) return tr("validation.submitNetworkError");
        const fromBody = parseResponseMessage(err.response.data);
        if (fromBody) return fromBody;
        return tr("validation.submitGenericError");
    }
    if (err instanceof Error && err.message.trim()) return err.message.trim();
    return tr("validation.submitGenericError");
};

const ContactForm = () => {
    const t = useTranslations("contact.form");
    const [submitting, setSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [payload, setPayload] = useState<ContactFormPayload>({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (id: keyof ContactFormPayload, value: string) => {
        setFormErrors([]);
        setSubmitError(null);
        setPayload({ ...payload, [id]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);

        const nameTrimmed = payload.name.trim();
        const messageTrimmed = payload.message.trim();
        const emailTrimmed = payload.email.trim();
        const phoneTrimmed = (payload.phone ?? "").trim();
        const hasContact = emailTrimmed.length > 0 || phoneTrimmed.length > 0;

        const errors: string[] = [];
        if (!nameTrimmed) errors.push(t("validation.nameRequired"));
        if (!hasContact) errors.push(t("validation.contactRequired"));
        if (emailTrimmed && !emailLooksValid(emailTrimmed)) errors.push(t("validation.emailInvalid"));
        if (!messageTrimmed) errors.push(t("validation.messageRequired"));

        setFormErrors(errors);
        if (errors.length > 0) return;

        setSubmitting(true);
        try {
            const res = await axios.post("/api/contact", {
                name: nameTrimmed,
                email: emailTrimmed,
                phone: phoneForSubmit(phoneTrimmed),
                message: messageTrimmed,
            }, {
                timeout: 45_000,
                validateStatus: () => true,
            });
            if (res.status === 201) {
                setSuccessDialogOpen(true);
                setPayload({ name: "", email: "", phone: "", message: "" });
            } else if (res.status >= 200 && res.status < 300) {
                setSubmitError(t("validation.unexpectedResponse"));
            } else {
                setSubmitError(parseResponseMessage(res.data) ?? t("validation.submitGenericError"));
            }
        } catch (err) {
            setSubmitError(resolveSubmitError(err, t));
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <>
            <ContactSuccessDialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen} />
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2 xl:w-[40%] xl:flex-none min-w-0">
                <p className={clsx(contactInfoTitleClass, "dark:text-white! text-black!")}>
                    {t("contactInfoTitle")}
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                    {contactInfoItems.map((item) => (
                        <ContactItem key={item.id} item={item} />
                    ))}
                </div>
            </div>

            <div className="w-full lg:w-1/2 xl:w-[60%] xl:flex-1 min-w-0 rounded-lg p-6 md:p-8 dark:bg-main-sportBlack dark:border-0 border">
                <h2 className="font-medium text-[20.21px] leading-[30.32px] tracking-0 dark:text-white text-black">
                    {t("sendMessageTitle")}
                </h2>
                <form className="mt-[30px] flex flex-col gap-10" onSubmit={handleSubmit} noValidate>
                    {formFieldIds.map((id) => (
                        <FormField key={id} id={id} value={payload[id] ?? ""} onChange={handleChange} />
                    ))}
                    <button
                        type="submit"
                        disabled={submitting}
                        aria-busy={submitting}
                        className={clsx(
                            "inline-flex w-full items-center justify-center gap-2.5 rounded-full py-4 font-medium text-[20.21px] leading-[30.32px] tracking-0 transition-opacity",
                            "dark:bg-main-dutchOrigin bg-main-ukraineBlue dark:text-black text-white",
                            "hover:opacity-90 disabled:pointer-events-none disabled:opacity-80",
                            submitting && "cursor-wait",
                        )}
                    >
                        {submitting ? (
                            <Loader2 className="size-5 shrink-0 animate-spin" aria-hidden />
                        ) : null}
                        {t("sendButton")}
                    </button>
                    {submitError && (
                        <div
                            role="alert"
                            className={clsx(
                                "rounded-lg border px-4 py-3 text-sm leading-relaxed",
                                "border-main-red/35 bg-main-red/[0.07] text-main-red",
                                "dark:border-main-blazeRed/45 dark:bg-main-blazeRed/12 dark:text-main-blazeRed",
                            )}
                        >
                            {submitError}
                        </div>
                    )}
                    {formErrors.length > 0 && (
                        <div
                            role="alert"
                            className={clsx(
                                "rounded-lg border px-4 py-3 text-sm leading-relaxed",
                                "border-main-red/35 bg-main-red/[0.07] text-main-red",
                                "dark:border-main-blazeRed/45 dark:bg-main-blazeRed/12 dark:text-main-blazeRed",
                            )}
                        >
                            <ul className="list-disc space-y-1 ps-5 marker:text-current">
                                {formErrors.map((msg) => (
                                    <li key={msg}>{msg}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </form>
            </div>
            </div>
        </>
    );
};

export default ContactForm;