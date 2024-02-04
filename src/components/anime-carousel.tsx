"use client";

import { MediaFragment } from "@/__generated__/graphql";
import { cn } from "@/lib/utils";
import { m } from "framer-motion";
import Image from "next/image";
import { CSSProperties, Dispatch, SetStateAction, useState } from "react";
import Carousel from "./framer-motion/carousel";
import { CarouselAlt } from "./framer-motion/carousel-alt";

export const AnimeCarousel = <T extends MediaFragment[]>({
    images,
    alt = false,
}: {
    images: T;
    alt?: boolean;
}) => {
    const [current, setCurrent] = useState(0);

    if (alt) {
        return <CarouselAlt images={images} />;
    }

    return (
        <Carousel<T>
            state={current}
            setState={setCurrent}
            images={images}
            repeat
            control={(image, count, i) => (
                <AnimeCarouselControl<MediaFragment>
                    image={image}
                    count={count}
                    i={i}
                    set={setCurrent}
                />
            )}
        >
            <Image
                src={images[current].bannerImage as string}
                alt={images[current]?.title?.userPreferred as string}
                fill
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 h-full w-full bg-black/30">
                <div className="absolute bottom-5  flex w-full justify-between px-14">
                    <div>
                        <h1 className="text-2xl font-medium text-white">
                            {images[current]?.title?.userPreferred}
                        </h1>
                    </div>
                    <p className="text-lg text-white">
                        {images[current]?.title?.userPreferred}
                    </p>
                </div>
            </div>
        </Carousel>
    );
};

const AnimeCarouselControl = <T extends { [x: string]: any }>({
    image,
    count,
    i,
    set,
}: {
    image: T;
    count: number;
    i: number;
    set: Dispatch<SetStateAction<number>>;
}) => {
    return (
        <m.button
            className={cn(
                "relative z-10 h-4 w-4 rounded-full bg-[--media-color] transition-all duration-300",
            )}
            style={
                {
                    "--media-color": image.coverImage.color,
                } as CSSProperties
            }
            onClick={() => {
                set(i);
            }}
        >
            {count === i && (
                <m.span
                    layoutId="coursel-on"
                    className="absolute inset-0 h-full w-full rounded-full outline outline-offset-2 outline-[--media-color]"
                ></m.span>
            )}
        </m.button>
    );
};
