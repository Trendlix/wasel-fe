import type { ITermItem } from "@/shared/constants/terms";

/** Strip tags for anchor derivation (IDs must not contain raw `<` / `>`). */
export function stripHtmlForAnchor(value: string): string {
    return value.replace(/<[^>]*>/g, "").trim();
}

/**
 * Stable section `id` / hash slug for terms & policy sidebars.
 * Prefer explicit `slug` (e.g. CMS `categoryKey`); otherwise derive from title
 * without stripping Arabic or other non-Latin letters.
 */
export function legalSectionAnchorId(item: Pick<ITermItem, "id" | "slug" | "title">): string {
    const explicit = item.slug?.trim();
    if (explicit) return explicit;
    const base = stripHtmlForAnchor(item.title)
        .toLocaleLowerCase()
        .replace(/\s+/g, "-")
        .replace(/["#]/g, "");
    if (base.length > 0) return base;
    return `section-${item.id}`;
}
