"use client";

import clsx from "clsx";
import { forwardRef, Ref } from "react";

const BluredShadowItem = forwardRef(function BluredShadowItem(
    props: unknown,
    ref: Ref<HTMLDivElement>
) {
    return (
        <div
            className={clsx(
                "fixed pointer-events-none z-0 w-screen h-screen flex justify-center overflow-hidden",
            )}
        >
            <div
                ref={ref}
                className={clsx(
                    "rounded-full bg-main-primary relative w-[150vh] h-[90vh] blur-3xl opacity-30 translate-y-[50%] overflow-hidden"
                )}
            />
        </div>
    );
});

export default BluredShadowItem;