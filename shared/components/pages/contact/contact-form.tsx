"use client";

import clsx from "clsx";
import { Mail, MessageSquare, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";

import { contactInfoItems, type IContactItem } from "@/shared/constants/contact";

const contactInfoTitleClass = "font-medium text-[22.74px] leading-[34.11px] tracking-0 dark:text-main-dutchOrigin text-main-ukraineBlue";
const contactIconClass = "w-[30.32px] h-[30.32px] dark:text-main-dutchOrigin text-main-ukraineBlue shrink-0";
const contactItemClass = "font-normal text-[20.21px] leading-[30.32px] tracking-0";

const formLabelClass = "font-medium text-[17.69px] leading-[17.69px] tracking-0 text-white";
const formLabelIconClass = "w-5 h-5 dark:text-main-dutchOrigin text-main-ukraineBlue shrink-0";
const inputClass = "w-full rounded-lg dark:bg-main-lightBlack bg-main-techWhite px-4 py-3 text-white placeholder:text-main-dmGray placeholder:font-normal placeholder:text-sm placeholder:leading-[100%] placeholder:tracking-0 border-0 outline-none focus:ring-1 focus:ring-main-dutchOrigin";

const formFieldIds = ["name", "email", "phone", "message"] as const;
const formFieldIcons = { name: User, email: Mail, phone: Phone, message: MessageSquare };

const FormField = ({ id }: { id: (typeof formFieldIds)[number] }) => {
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
                    placeholder={fieldT("placeholder")}
                    rows={5}
                    className={clsx(inputClass, "resize-none min-h-[120px]")}
                />
            ) : (
                <input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={fieldT("placeholder")}
                    className={inputClass}
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

const ContactForm = () => {
    const t = useTranslations("contact.form");
    return (
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
                <form className="mt-[30px] flex flex-col gap-10">
                    {formFieldIds.map((id) => (
                        <FormField key={id} id={id} />
                    ))}
                    <button
                        type="submit"
                        className="w-full rounded-full dark:bg-main-dutchOrigin bg-main-ukraineBlue py-4 font-medium text-[20.21px] leading-[30.32px] tracking-0 dark:text-black text-white hover:opacity-90 transition-opacity"
                    >
                        {t("sendButton")}
                    </button>
                </form>
            </div>
        </div >
    );
};

export default ContactForm;