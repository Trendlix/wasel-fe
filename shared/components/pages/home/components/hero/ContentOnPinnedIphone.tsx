import GradientText from "@/shared/components/common/GradientText";
import { heroSentences } from "@/shared/constants/hero-sentences";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const ContentOnPinnedIphone = () => {
    const t = useTranslations("home.hero.words");

    return (
        <div className="pointer-events-none h-screen fixed w-screen inset-0 z-50">
            {heroSentences.map(({ textKey, style }, index) => (
                <p
                    key={index}
                    className={clsx(
                        "hero-word absolute font-medium",
                        "text-2xl",
                        "sm:text-3xl",
                        "md:text-4xl",
                        "lg:text-5xl",
                        "xl:text-6xl",
                        "2xl:text-6xl",
                    )}
                    style={{ opacity: 0, ...style }}
                >
                    <GradientText
                        text={t(textKey)}
                        colors={[
                            "#fff",
                            "var(--color-main-matteLightGray)",
                            "#fff",
                            "#fff",
                            "var(--color-main-matteLightGray)",
                        ]}
                        direction="to top"
                    />
                </p>
            ))}
        </div>
    );
};

export default ContentOnPinnedIphone;