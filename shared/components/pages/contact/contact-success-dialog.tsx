"use client";

import Lottie from "lottie-react";
import { useTranslations } from "next-intl";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import animationData from "@/shared/assets/lottie/contact-success.json";

type ContactSuccessDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function ContactSuccessDialog({ open, onOpenChange }: ContactSuccessDialogProps) {
    const t = useTranslations("contact.form.successModal");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent closeAriaLabel={t("closeAria")} className="max-w-md overflow-hidden sm:max-w-md">
                <DialogHeader className="items-center gap-3 sm:items-center">
                    <div
                        className={cn(
                            "flex h-[180px] w-full max-w-[260px] items-center justify-center",
                            "rounded-xl bg-main-beautifulWhite/80 dark:bg-main-lightBlack/60",
                            "[&_svg]:mx-auto [&_svg]:max-h-[170px] [&_svg]:w-auto",
                        )}
                        aria-hidden
                    >
                        <Lottie
                            animationData={animationData}
                            loop={false}
                            className="w-full max-w-[240px] dark:brightness-[1.08] dark:contrast-[1.06]"
                        />
                    </div>
                    <DialogTitle className="text-center text-xl">{t("title")}</DialogTitle>
                    <DialogDescription className="text-center text-base leading-relaxed">
                        {t("description")}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
