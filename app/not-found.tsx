"use client";

import Link from "next/link";

const NotFound = () => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#070B1A] text-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl animate-float-slow" />
                <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-fuchsia-500/25 blur-3xl animate-float-medium" />
                <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl animate-float-fast" />
            </div>

            <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
                <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm tracking-wide animate-fade-up">
                    Wasel
                </p>

                <h1 className="bg-linear-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-size-[200%_200%] bg-clip-text text-7xl font-extrabold leading-none text-transparent md:text-9xl animate-gradient-shift">
                    404
                </h1>

                <h2 className="mt-6 text-2xl font-bold md:text-4xl">
                    Page not found
                </h2>

                <p className="mt-4 max-w-2xl text-base text-white/75 md:text-lg">
                    The page you are looking for may have been moved, removed, or never existed.
                    Let&apos;s get you back to the right route.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#070B1A] transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]"
                    >
                        Go to home
                    </Link>
                    <Link
                        href="/contact"
                        className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:bg-white/20"
                    >
                        Contact support
                    </Link>
                </div>
            </section>

            <style jsx global>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-14px) translateX(10px); }
                }
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(10px) translateX(-12px); }
                }
                @keyframes float-fast {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-8px) translateX(8px); }
                }
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes fade-up {
                    0% { opacity: 0; transform: translateY(8px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
                .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
                .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
                .animate-gradient-shift { animation: gradient-shift 6s ease-in-out infinite; }
                .animate-fade-up { animation: fade-up 600ms ease-out both; }
            `}</style>
        </main>
    );
};

export default NotFound;