import { cn } from "@/lib/utils";
import { useGesture } from "@use-gesture/react";
import { useSpring, config, animated } from "@react-spring/web";

import { ReactNode, useRef, useState, useEffect } from "react";

export const AltHorizontalScroll = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const isDragging = useRef(false);

    let [scroll, setScroll] = useState(0);

    const [{ x }, api] = useSpring(() => ({ x: 0 }));

    useEffect(() => {
        if (ref?.current) {
            setScroll(ref.current?.scrollWidth - ref.current.clientWidth);
        }
    }, []);

    const bind = useGesture(
        {
            onDrag: ({ first, last, offset: [x] }) => {
                if (first) isDragging.current = true;
                if (last) setTimeout(() => (isDragging.current = false), 0);
                api.start({ x, config: config.gentle });
            },
            onClickCapture: ({ event }) => {
                if (isDragging.current) {
                    event?.stopPropagation();
                    event?.preventDefault();
                }
            },
            onWheel: ({ offset: [x] }) => {
                const newX = Math.max(-scroll, Math.min(0, x));
                api.start({ x: newX, config: config.gentle });
            },
        },
        {
            drag: {
                bounds: { left: -scroll, right: 0 },
                axis: "x",
                from: () => [x.get(), 0],
                rubberband: true,
                filterTaps: true,
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
        },
    );

    return (
        <div ref={ref}>
            <animated.div
                data-x={scroll}
                className={cn("w-max touch-pan-y select-none", className)}
                {...bind()}
                style={{ x }}
            >
                {children}
            </animated.div>
        </div>
    );
};
