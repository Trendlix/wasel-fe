import { create } from 'zustand';

interface IShadowProperties {
    width: string;
    height: string;
    opacity: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
    blur: string;
}

interface IBluredShadowItemStore {
    parent: IShadowProperties;
    child: IShadowProperties;
    updateParent: (config: Partial<IShadowProperties>) => void;
    updateChild: (config: Partial<IShadowProperties>) => void;
    reset: () => void;
}

const defaultProps: IShadowProperties = {
    width: "w-[150vh]",
    height: "h-[100vh]",
    opacity: "opacity-100",
    top: "top-0",
    bottom: "bottom-auto",
    left: "left-0",
    right: "right-auto",
    blur: "blur-none",
};

const useBluredShadowItem = create<IBluredShadowItemStore>((set) => ({
    parent: { ...defaultProps },
    child: { ...defaultProps, blur: "blur-3xl", bottom: "-bottom-100", top: "top-auto", opacity: "opacity-30" },

    updateParent: (config) =>
        set((state) => ({ parent: { ...state.parent, ...config } })),

    updateChild: (config) =>
        set((state) => ({ child: { ...state.child, ...config } })),

    reset: () => set({ parent: { ...defaultProps }, child: { ...defaultProps } }),
}));

export default useBluredShadowItem;