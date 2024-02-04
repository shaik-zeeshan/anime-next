"use client";

import { Shell, Hash, BarChart2, BookUser, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

const scrolltoHash = function (element_id: string) {
    const element = document.getElementById(element_id);
    element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
    });
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const checkIfPresent = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
        return true;
    }
    return false;
};

const sections = [
    {
        name: "main",
        icon: Shell,
        func: scrollToTop,
        label: "main",
    },
    {
        name: "relation",
        icon: Hash,
        func: () => scrolltoHash("relation"),
        label: "relation",
    },
    {
        name: "stats",
        icon: BarChart2,
        func: () => scrolltoHash("stats"),
        label: "stats",
    },
    {
        name: "staff",
        icon: BookUser,
        func: () => scrolltoHash("staff"),
        label: "staff",
    },
];

export const PageNav = () => {
    return (
        <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-lg bg-gray-200 px-1 py-1 shadow dark:bg-gray-900">
            {sections.map((section, index) => (
                <SectionButton key={index} section={section} />
            ))}
        </div>
    );
};

const SectionButton = ({
    section,
}: {
    section: {
        name: string;
        icon: LucideIcon;
        func: () => void;
        label: string;
    };
}) => {
    const [present, setPresent] = useState(false);

    useEffect(() => {
        setPresent(checkIfPresent(section.name));
    }, [section.name]);

    return (
        <button
            aria-label={section.label}
            role="button"
            onClick={section.func}
            className="hover:bg-foreground/30 rounded-lg p-2"
            hidden={!present}
        >
            <section.icon
                className="text-foreground dark:text-foreground-dark h-6 w-6"
                size={24}
            />
        </button>
    );
};
