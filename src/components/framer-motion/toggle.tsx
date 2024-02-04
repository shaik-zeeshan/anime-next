"use client";
import { m } from "framer-motion";
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
    useTransition,
} from "react";
import { cn } from "@/lib/utils";

const mediaContext = createContext<{
    media: string;
    setMedia: (state: string) => void;
    onMediaChange?: (state: string) => void;
    onAuxClick?: (state: string) => void;
} | null>(null);

const Toggle = ({
    state,
    children,
    className,
    onMediaChange = () => {},
    onAuxClick = () => {},
}: {
    state: string;
    children: ReactNode;
    className?: string;
    onMediaChange?: (state: string) => void;
    onAuxClick?: (state: string) => void;
}) => {
    const [media, setMedia] = useState(state);

    useEffect(() => {
        setMedia(state);
    }, [state]);

    return (
        <mediaContext.Provider
            value={{ media, setMedia, onMediaChange, onAuxClick }}
        >
            <m.div
                className={cn(
                    "relative flex h-8 w-max items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-900 ",
                    className,
                )}
            >
                {children}
            </m.div>
        </mediaContext.Provider>
    );
};

const ToggleButton = React.forwardRef<
    HTMLButtonElement,
    {
        value: string;
        children: ReactNode;
        className?: string;
        motionClassName?: string;
    }
>(({ value, children, className, motionClassName, ...props }, ref) => {
    const ctx = useContext(mediaContext);
    const [_, startTransition] = useTransition();

    return (
        <button
            ref={ref}
            onAuxClick={() => {
                startTransition(() => {
                    ctx?.setMedia(value);
                    if (ctx?.onAuxClick) {
                        ctx?.onAuxClick(value);
                    }
                });
            }}
            className={cn("group w-24 text-center text-sm ", className)}
            onClick={() => {
                startTransition(() => {
                    ctx?.setMedia(value);
                    if (ctx?.onMediaChange) {
                        ctx?.onMediaChange(value);
                    }
                });
            }}
            {...props}
        >
            <div className="relative z-20 font-medium text-white mix-blend-exclusion ">
                {children}
            </div>
            {ctx?.media === value && (
                <m.div
                    layoutId="media-toggle"
                    className={cn(
                        "bg-foreground absolute top-0 z-10 h-8 w-24 rounded-lg",
                        motionClassName,
                    )}
                    transition={{
                        duration: 0.2,
                        type: "easeInOut",
                    }}
                ></m.div>
            )}
            <div
                className={cn(
                    "bg-background/30 absolute left-0 right-0 top-0 hidden h-full w-full rounded-lg transition-all duration-100 group-hover:block",
                )}
            ></div>
        </button>
    );
});

ToggleButton.displayName = "ToggleButton";

export { Toggle, ToggleButton };
