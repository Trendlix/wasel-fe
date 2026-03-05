import type { LucideIcon } from "lucide-react";
import { Clock, Mail, MapPin, Phone, Smartphone } from "lucide-react";

export interface IContactItem {
    id: "mobile" | "landline" | "email" | "address" | "businessHours";
    icon: LucideIcon;
}

export const contactInfoItems: IContactItem[] = [
    { id: "mobile", icon: Smartphone },
    { id: "landline", icon: Phone },
    { id: "email", icon: Mail },
    { id: "address", icon: MapPin },
    { id: "businessHours", icon: Clock },
];
