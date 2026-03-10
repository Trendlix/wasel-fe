import { create } from "zustand";

interface INavbarStore {
    isLight: boolean;
    setIsLight: (value: boolean) => void;

    aboutScrolled: boolean;
    setAboutScrolled: (value: boolean) => void;

    colors: {
        text: {
            active: string;
            inactive: string;
        }
        bg: string;
    };
    setColors: (colors: { text: { active: string; inactive: string }; bg: string }) => void;

    logo: string;
    setLogo: (value: string) => void;
}

const useNavbarStore = create<INavbarStore>((set) => ({
    isLight: false,
    setIsLight: (value: boolean) => set({ isLight: value }),
    aboutScrolled: false,
    setAboutScrolled: (value: boolean) => set({ aboutScrolled: value }),
    colors: {
        text: {
            active: "text-white",
            inactive: "text-white/54 hover:text-white",
        },
        bg: "bg-transparent",
    },
    setColors: (colors: { text: { active: string; inactive: string }; bg: string }) => set({ colors }),
    logo: "/brand/logo.png",
    setLogo: (value: string) => set({ logo: value }),
}));

export default useNavbarStore;