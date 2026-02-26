import { create } from "zustand";

interface IHeroIphoneStuff {
    imageSrc: string;
    imageLoaded: boolean;
    setImageLoaded: (value: boolean) => void;
    updateImageSrc: (value: string) => void;
}

const useHeroIphoneStuff = create<IHeroIphoneStuff>((set) => ({
    imageSrc: "/brand/pages/home/iphone.png",
    imageLoaded: false,
    updateImageSrc: (value: string) => set({ imageSrc: value }),
    setImageLoaded: (value: boolean) => set({ imageLoaded: value }),
}));

export default useHeroIphoneStuff;