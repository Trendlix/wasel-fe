import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

const NotFound = async () => {
    const locale = await getLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";

    const t = await getTranslations("notFound");
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#070B1A] text-white" dir={dir}>
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl animate-float-slow" />
                <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-fuchsia-500/25 blur-3xl animate-float-medium" />
                <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl animate-float-fast" />
            </div>

            <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
                <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm tracking-wide animate-fade-up">
                    {t("title")}
                </p>

                <h1 className="bg-linear-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-size-[200%_200%] bg-clip-text text-7xl font-extrabold leading-none text-transparent md:text-9xl animate-gradient-shift">
                    404
                </h1>

                <h2 className="mt-6 text-2xl font-bold md:text-4xl">
                    {t("title")}
                </h2>

                <p className="mt-4 max-w-2xl text-base text-white/75 md:text-lg">
                    {t("description")}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#070B1A] transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]"
                    >
                        {t("homeButton")}
                    </Link>
                    <Link
                        href="/contact"
                        className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:bg-white/20"
                    >
                        {t("contactButton")}
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default NotFound;
