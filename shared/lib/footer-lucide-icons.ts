import type { LucideIcon } from "lucide-react";
import {
    ExternalLink,
    Facebook,
    Github,
    Globe,
    Instagram,
    Linkedin,
    Mail,
    MessageCircle,
    Send,
    Youtube,
} from "lucide-react";

/** Must match backend `FOOTER_LUCIDE_ICON_ALLOWLIST` and dashboard `FOOTER_LUCIDE_ICONS`. */
const FOOTER_ICONS: Record<string, LucideIcon> = {
    Facebook,
    Globe,
    Linkedin,
    Instagram,
    Youtube,
    Github,
    Mail,
    MessageCircle,
    Send,
    ExternalLink,
};

export function resolveFooterLucideIcon(name: string): LucideIcon {
    const key = typeof name === "string" ? name.trim() : "";
    return FOOTER_ICONS[key] ?? Globe;
}
