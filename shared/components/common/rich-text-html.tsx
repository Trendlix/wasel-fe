import clsx from "clsx";

const cmsProseClass = clsx(
    "[&_p]:mb-2 [&_p:last-child]:mb-0",
    "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
    "[&_a]:underline [&_a]:text-main-secondary",
    "[&_strong]:font-semibold [&_b]:font-semibold",
    "[&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-semibold",
);

/** CMS rich text often ships inline `color:#000`; inherit + !important beats inline so dark mode works. */
const cmsThemeOverrideInlineColors = clsx(
    "[&_p]:![color:inherit]",
    "[&_span]:![color:inherit]",
    "[&_div]:![color:inherit]",
    "[&_li]:![color:inherit]",
    "[&_ul]:![color:inherit]",
    "[&_ol]:![color:inherit]",
    "[&_strong]:![color:inherit]",
    "[&_em]:![color:inherit]",
    "[&_b]:![color:inherit]",
    "[&_i]:![color:inherit]",
    "[&_h1]:![color:inherit]",
    "[&_h2]:![color:inherit]",
    "[&_h3]:![color:inherit]",
    "[&_h4]:![color:inherit]",
    "[&_blockquote]:![color:inherit]",
    "[&_code]:![color:inherit]",
    "[&_pre]:![color:inherit]",
    "[&_a]:!text-main-secondary dark:[&_a]:!text-main-secondary",
);

type RichTextHtmlProps = {
    html: string;
    className?: string;
    /** Use `span` for inline contexts (e.g. inside buttons). */
    as?: "div" | "span";
};

/** Renders trusted CMS HTML (marketing / informative pages). */
export function RichTextHtml({ html, className, as = "div" }: RichTextHtmlProps) {
    if (!html?.trim()) return null;
    const classNames = clsx(cmsProseClass, cmsThemeOverrideInlineColors, className);
    if (as === "span") {
        return (
            <span
                className={classNames}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    }
    return (
        <div
            className={classNames}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
