"use client";

import Image from "next/image";
import { CSSProperties, useState } from "react";
import { m, useIsomorphicLayoutEffect } from "framer-motion";
import { cn } from "@/lib/utils";

import moment from "moment";
import { MediaFragment, MediaType } from "@/__generated__/graphql";
import Link from "next/link";

const CarouselAlt = <T extends MediaFragment[]>({ images }: { images: T }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const filterImages = images.filter((image) => image?.bannerImage);

    useIsomorphicLayoutEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % filterImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length, activeIndex]);

    return (
        <div className="relative h-96 w-full overflow-hidden rounded-lg">
            <m.div
                className="relative h-full w-full"
                animate={{ y: activeIndex * -100 + "%" }}
                transition={{
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.2,
                    ease: "easeInOut",
                }}
            >
                {filterImages.map((image, index) => {
                    if (image?.bannerImage === null) return;
                    return (
                        <div key={index} className="h-full w-full">
                            <CarouselItem
                                id={image.id as number}
                                image={image?.bannerImage || ""}
                                alt={
                                    (image.type === "ANIME"
                                        ? image.title?.userPreferred ||
                                          image.title?.english ||
                                          image.title?.romaji
                                        : image.title?.english ||
                                          image.title?.userPreferred ||
                                          image.title?.romaji) as string
                                }
                                episode={
                                    image.nextAiringEpisode?.episode as number
                                }
                                airingAt={
                                    image.nextAiringEpisode?.airingAt as number
                                }
                                type={image.type as MediaType}
                            />
                        </div>
                    );
                })}
            </m.div>
            <div className="absolute right-5 top-1/2 z-[999] -translate-y-1/2">
                <div className="flex flex-col items-center gap-4">
                    {filterImages.map((image, index) => {
                        if (image?.bannerImage === null) return;

                        return (
                            <m.button
                                role="button"
                                aria-label={`carousel-button-${index}`}
                                key={index}
                                className={cn(
                                    "relative z-10 h-4 w-4 rounded-full bg-[--media-color] transition-all duration-300",
                                )}
                                style={
                                    {
                                        "--media-color":
                                            image?.coverImage?.color ||
                                            "hsl(var(--background))",
                                    } as CSSProperties
                                }
                                onClick={() => {
                                    setActiveIndex(index);
                                }}
                            >
                                {activeIndex === index && (
                                    <m.span
                                        layoutId="coursel-on"
                                        className="absolute inset-0 h-full w-full rounded-full outline outline-offset-2 outline-[--media-color]"
                                        animate={{
                                            outlineColor: "var(--media-color)",
                                        }}
                                    ></m.span>
                                )}
                            </m.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const CarouselItem = ({
    id,
    image,
    alt,
    episode,
    airingAt,
    type,
}: {
    id: number;
    image: string;
    alt: string;
    episode: number;
    airingAt: number;
    type: MediaType;
}) => {
    return (
        <div className="relative z-10 h-full w-full">
            <Image
                src={image}
                fill
                quality={60}
                priority
                alt={alt}
                className="h-full w-full object-cover object-center"
            />
            <div className="absolute bottom-5 z-20 flex w-full flex-col items-center justify-between px-14 text-center sm:flex-row sm:text-justify">
                <div className="text-white">
                    <Link
                        href={`/${type.toLowerCase()}/${id}`}
                        className="w-96 text-xl font-semibold sm:text-2xl "
                    >
                        {alt}
                    </Link>
                    {episode && (
                        <div className="opacity-60 ">{episode} Episodes</div>
                    )}
                </div>
                <div className="text-normal  font-medium text-white sm:text-xl">
                    {airingAt && moment.unix(airingAt).calendar()}
                </div>
            </div>
            <div className="absolute inset-0 z-10 h-full w-full bg-black opacity-50"></div>
        </div>
    );
};

export { CarouselAlt };
