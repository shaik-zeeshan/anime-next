"use client";

import {
    useEffect,
    useState,
    ReactNode,
    ReactElement,
    Dispatch,
    SetStateAction,
} from "react";
import { AnimatePresence, Variants, m } from "framer-motion";
import useMeasure from "react-use-measure";
import { usePrevious } from "@/lib/hooks/usePrevious";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const ANIMATE_DURATION = 0.4;

const Carousel = <T extends Array<any>>({
    state,
    setState,
    repeat = false,
    children,
    control,
    className,
    images,
}: {
    images: T;
    state?: number;
    setState?: Dispatch<SetStateAction<number>>;
    repeat?: boolean;
    children?: ReactNode;
    control?: (image: T[0], count: number, i: number) => ReactElement;
    className?: string;
}) => {
    const [ct, setcount] = useState(0);

    const count = state ? state : ct;

    const setCount = setState ? setState : setcount;

    let prev = usePrevious<number>(count) as number;
    let direction = count >= (prev ? prev : 0) ? 1 : -1;

    const [ref, { height }] = useMeasure();

    useEffect(() => {
        if (repeat) {
            const interval = setInterval(() => {
                setCount((count) => (count + 1) % images.length);
            }, 3000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [count, repeat, setCount, images.length]);

    return (
        <div
            className={cn(
                "relative h-96 w-full overflow-hidden rounded-lg",
                className,
            )}
            ref={ref}
        >
            <AnimatePresence
                mode="popLayout"
                custom={{
                    direction,
                    height,
                }}
            >
                <m.div
                    className="h-full w-full"
                    key={count}
                    variants={variants}
                    custom={{
                        direction,
                        height,
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: ANIMATE_DURATION }}
                >
                    <div className="absolute h-full w-full ">
                        <div className="relative h-full w-full">{children}</div>
                    </div>
                </m.div>
            </AnimatePresence>
            <div className="absolute right-10 top-1/2 z-50 -translate-y-1/2">
                <div className="flex flex-col items-center gap-5">
                    {images.map((image, i) =>
                        control ? (
                            <Slot key={i}>{control(image, count, i)}</Slot>
                        ) : (
                            <button
                                key={i}
                                className={`h-3 w-3 rounded-full ${
                                    i === count ? "bg-white" : "bg-gray-300"
                                }`}
                                onClick={() => setCount(i)}
                            />
                        ),
                    )}
                </div>
            </div>
        </div>
    );
};

const variants: Variants = {
    enter: ({ direction, height }) => ({
        y: direction * height,
        zIndex: 10,
    }),
    center: { y: 0 },
    exit: ({ direction, height }) => ({
        y: direction * -height,
        zIndex: 5,
        transition: {
            delay: ANIMATE_DURATION,
        },
    }),
};

export default Carousel;
