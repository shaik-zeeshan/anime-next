"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const ScrollUp = () => {
    const { scrollY } = useScroll();
    const display = useTransform(
        scrollY,
        [0, 100, 101],
        ["none", "none", "block"],
    );

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <m.button
            role="button"
            aria-label="Scroll to top"
            style={{ display }}
            onClick={scrollToTop}
            className="fixed bottom-3 left-2 z-50 rounded-lg bg-gray-200 p-2 dark:bg-gray-900"
        >
            <ArrowUp size="24" />
        </m.button>
    );
};
