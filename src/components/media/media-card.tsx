"use client";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimeData } from "@/lib/transformers";

export const MediaCard = ({
    image,
    scroll = false,
    className,
}: {
    image: AnimeData;
    scroll?: Boolean;
    className?: string;
}) => {
    const router = useRouter();

    const path = usePathname().startsWith(`/${image.type?.toLowerCase()}`);

    const type = image.type === "ANIME" ? "anime" : "manga";

    return (
        <button
            onClick={() => {
                router.push(`/${type}/${image.id}`);
            }}
        >
            <div
                className={cn(
                    "card flex flex-shrink-0 select-none flex-col gap-1",
                    scroll
                        ? "min-h-[16rem] w-[10rem]  sm:min-h-[18rem]  md:min-h-[20rem] md:w-[12rem] lg:min-h-[20rem]  lg:w-[14rem] xl:min-h-[24rem] xl:w-[16rem]"
                        : "h-full w-full",
                    className,
                )}
                style={
                    {
                        "--media-color": image?.color || "--foreground",
                    } as CSSProperties
                }
            >
                <div className="relative flex-1 overflow-hidden rounded-lg">
                    <Image
                        src={image?.coverImage as string}
                        fill
                        sizes="100%"
                        priority={false}
                        quality={60}
                        alt={"Anime Image"}
                        className="absolute z-10 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 z-20 bg-black/0" />
                    <div className="absolute inset-0 z-0 animate-pulse bg-[--media-color]" />
                    {path ? null : (
                        <div className="absolute right-2 top-2 z-30 grid h-5 w-5 place-items-center rounded-lg bg-[--media-color] text-xs">
                            {image?.type && image.type[0]}
                        </div>
                    )}
                </div>
                <div className="md:text-normal line-clamp-2 h-10 pl-1 text-start text-sm font-medium md:line-clamp-1 md:h-6 md:pl-4">
                    {image.title}
                </div>
            </div>
        </button>
    );
};

//  min-h-[16rem] w-[10rem]  sm:min-h-[18rem]  md:min-h-[20rem] md:w-[12rem] lg:min-h-[22rem]  lg:w-[14rem] xl:min-h-[24rem] xl:w-[16rem]
