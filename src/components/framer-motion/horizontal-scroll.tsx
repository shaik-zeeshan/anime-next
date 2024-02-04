"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import { m, useMotionValue, animate } from "framer-motion";

const HorizontalScrollList = ({
    children,
    className,
    width = 0,
    ...props
}: {
    children: ReactNode;
    className?: string;
    width?: number;
}) => {
    const ref = useRef<any>(null);

    const hasDragged = useRef(false);
    const x = useMotionValue(0);
    const [scroll, setScroll] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGesture(
        {
            onDrag: ({ first, last }) => {
                if (first) hasDragged.current = true;
                if (last) setTimeout(() => (hasDragged.current = false), 0);
            },
            onClickCapture: ({ event }) => {
                if (hasDragged.current) {
                    event?.stopPropagation();
                }
            },
            onWheel: ({ offset: [ox] }) => {
                const newX = Math.max(-scroll, Math.min(0, ox));
                animate(x, newX, {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                });
            },
        },
        {
            drag: {
                bounds: { left: -scroll, right: 0 },
                axis: "x",
                from: () => [x.get(), 0],
                rubberband: true,
                preventScroll: true,
                preventScrollAxis: "y",
                axisThreshold: {
                    mouse: 4,
                    touch: 10,
                },
            },
            wheel: {
                axis: "x",
                filterTaps: true,
                preventScroll: true,
                preventScrollAxis: "y",
            },
            target: scrollRef,
        },
    );

    useEffect(() => {
        if (ref?.current) {
            setScroll(ref.current?.scrollWidth - ref.current.clientWidth);
        }
    }, []);

    return (
        <div ref={ref}>
            <m.div
                data-x={scroll}
                drag="x"
                dragConstraints={{
                    right: 0,
                    left: -scroll,
                }}
                ref={scrollRef}
                className={cn("cursor-grab touch-none", className)}
                style={{
                    x,
                }}
                {...props}
            >
                {children}
            </m.div>
        </div>
    );
};

export default HorizontalScrollList;
