"use client";
import { Toggle, ToggleButton } from "./framer-motion/toggle";
import { usePathname, useRouter } from "next/navigation";

const MediaToggle = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Toggle
            state={pathname.startsWith("/anime") ? "anime" : "manga"}
            className="order-1 col-span-1 h-10"
            onMediaChange={(state) => {
                let path;
                if (state === "anime") {
                    path = "/anime";
                } else {
                    path = "/manga";
                }
                router.push(path);
            }}
        >
            <ToggleButton value="anime" motionClassName="h-10">
                Anime
            </ToggleButton>
            <ToggleButton value="manga" motionClassName="h-10">
                Manga
            </ToggleButton>
        </Toggle>
    );
};

export { MediaToggle };
