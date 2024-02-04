"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

export const Summary = ({ children }: { children: ReactNode }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="px-[--padding-x]">
            <div
                className={cn(
                    "after:to-background relative overflow-hidden text-ellipsis text-sm transition-all duration-500 after:absolute after:inset-0 after:-bottom-2 after:z-10 after:bg-gradient-to-b after:from-transparent after:transition-all after:content-[''] md:text-base",
                    show
                        ? "max-h-[1100px] after:invisible"
                        : "max-h-28 after:visible",
                )}
            >
                {children}
            </div>

            <Button
                className="pl-0 uppercase"
                variant="link"
                onClick={() => {
                    setShow(!show);
                }}
            >
                {show ? "Show less" : "Show more"}
            </Button>
        </div>
    );
};
