"use client";

import { IBlogItem } from "@/shared/types/pages/blogs.types";
import { BlogCard, TAGS_COLORS } from "../blog-card";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";

interface RelatedBlogsProps {
    related: IBlogItem[];
}

const RelatedBlogs = ({ related }: RelatedBlogsProps) => {
    const t = useTranslations("blogs");
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";

    if (!related.length) return null;

    return (
        <section className={clsx("container", "pb-10 pt-4")} dir={dir}>
            <h2 className="dark:text-white text-black font-bold md:text-3xl text-2xl mb-8 tracking-tight">
                {t("relatedBlogs")}
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {related.map((item, index) => (
                    <BlogCard
                        key={item.id}
                        item={item}
                        colorIndex={index % TAGS_COLORS.length}
                    />
                ))}
            </div>
        </section>
    );
};

export default RelatedBlogs;
