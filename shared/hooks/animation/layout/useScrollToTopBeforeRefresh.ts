import { useEffect } from "react";

const useScrollToTopBeforeRefresh = () => {
    useEffect(() => {
        const handleBeforeUnload = () => {
            window.scrollTo(0, 0);
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
};

export default useScrollToTopBeforeRefresh;