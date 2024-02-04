"use client";
import { LazyMotion, domMax } from "framer-motion";
import { ReactNode } from "react";

const loadFeatures = async () => {
    const features = (await import("@/lib/features")).default;

    return features;
};

export const LazyMotionWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <LazyMotion strict features={loadFeatures}>
            {children}
        </LazyMotion>
    );
};
