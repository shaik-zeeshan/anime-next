"use client";

import genres, { Genre } from "@/lib/genres";
import Image from "next/image";
import HorizontalScrollList from "./framer-motion/horizontal-scroll";
import React from "react";
import { useRouter } from "next/navigation";

const GenreList = () => {
    return (
        <div className="relative w-full space-y-3 ">
            <div className="flex w-full items-center justify-between px-[--padding-x]">
                <h1 className="text-xl font-semibold capitalize">Genres</h1>
            </div>
            <div className="overflow-hidden px-[--padding-x]">
                <HorizontalScrollList className="flex gap-[--gap]">
                    {genres?.map((genre, index) => (
                        <GenreCard key={index} genre={genre} />
                    ))}
                </HorizontalScrollList>
            </div>
        </div>
    );
};

const GenreCard = ({ genre }: { genre: Genre }) => {
    const router = useRouter();
    return (
        <button
            onClick={() => {
                router.push(`/anime/filter?genres=${genre.genre}`);
            }}
        >
            <div className="card relative min-h-[10rem] min-w-[240px] flex-shrink-0 gap-1 overflow-hidden rounded-lg sm:min-h-[10rem] md:min-h-[13rem] lg:min-h-[15rem]">
                <Image
                    src={genre.image}
                    fill
                    sizes="100%"
                    alt={genre.genre}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute left-0 top-0 h-full w-full bg-black/30"></div>
                <div className="absolute bottom-5 left-5 z-10 text-lg font-semibold text-white md:text-xl">
                    {genre.genre}
                </div>
            </div>
        </button>
    );
};

const MemoizedGenreList = React.memo(GenreList);

export default MemoizedGenreList;
