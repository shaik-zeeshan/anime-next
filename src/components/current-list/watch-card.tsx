"use client";
import { Media } from "@/__generated__/graphql";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const WatchCard = ({
    anime,
    progress,
}: {
    anime: Media;
    progress: number;
}) => {
    const router = useRouter();

    const type = anime.type?.toLowerCase();

    return (
        <button
            onClick={() => {
                router.push(`/${type}/${anime.id}`);
            }}
        >
            <div className="card relative min-h-[10rem] min-w-[22rem] flex-shrink-0 gap-1 overflow-hidden rounded-lg bg-gray-600 sm:min-h-[10rem] sm:min-w-[23rem] md:min-h-[10rem] md:min-w-[23rem] lg:min-h-[12rem] lg:min-w-[25rem]">
                <Image
                    src={anime.coverImage?.extraLarge as string}
                    fill
                    sizes="100%"
                    alt={anime.title?.userPreferred || "Media Image"}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute left-0 top-0 h-full w-full bg-black/50"></div>
                <div className="absolute bottom-0 left-0 z-10 w-full truncate p-5 text-left text-lg font-semibold text-white md:text-xl">
                    {anime.title?.userPreferred}
                </div>
                <div className="absolute right-5 top-5 z-10 w-full text-right text-lg font-semibold text-white md:text-xl">
                    {progress}
                </div>
            </div>
        </button>
    );
};
