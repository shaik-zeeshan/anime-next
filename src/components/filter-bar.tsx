"use client";
import categories from "@/lib/genres";
import { FilterInput } from "@/components/input/filter-input";
import { useQueryStates } from "next-usequerystate";
import { filterParams } from "@/lib/filterParams";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SelectInput } from "./input/select-input";
import { MediaSeason } from "@/__generated__/graphql";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import HorizontalScrollList from "./framer-motion/horizontal-scroll";
import useMeasure from "react-use-measure";

type Season = keyof typeof MediaSeason;

function reverseMap(enumObj: any, value: string) {
    return Object.keys(enumObj).find((key) => enumObj[key] === value);
}

function getNumberRange(from: number, to: number): number[] {
    return new Array(to - from + 1).fill("").map((v, i) => i + from);
}

const years = getNumberRange(1900, new Date().getFullYear()).reverse();

export const FilterBar = () => {
    const pathname = usePathname();
    const ref = useRef<HTMLDivElement>(null);

    const [filterParam, setFilterParams] = useQueryStates(filterParams, {
        shallow: false,
        history: "replace",
    });

    const { genres, season, seasonYear } = filterParam;

    return (
        <div ref={ref} className="my-8 w-full">
            <HorizontalScrollList>
                <div className="flex h-10 w-full items-center gap-14 px-[--padding-x] [&>*]:flex-shrink-0">
                    <Button size="primary" asChild>
                        <Link
                            href={{
                                pathname: pathname,
                                query: {},
                            }}
                        >
                            <TrashIcon className="h-5 w-5" />
                        </Link>
                    </Button>
                    <FilterInput
                        title="Genres"
                        options={categories.map((genre) => ({
                            label: genre.genre,
                            value: genre.genre,
                        }))}
                        selected={genres as string[]}
                        onChange={(genres) => setFilterParams({ genres })}
                    />
                    <SelectInput
                        title="Season"
                        options={Object.keys(MediaSeason).map((season) => ({
                            label: season,
                            value: season,
                        }))}
                        defaultValue={
                            (season && reverseMap(MediaSeason, season)) ||
                            undefined
                        }
                        onValueChange={(value) => {
                            setFilterParams({
                                season: MediaSeason[value as Season],
                            });
                        }}
                    />
                    <SelectInput
                        title="Year"
                        options={years.map((year) => ({
                            label: year.toString(),
                            value: year.toString(),
                        }))}
                        defaultValue={
                            (seasonYear && `${seasonYear}`) || undefined
                        }
                        onValueChange={(value) => {
                            setFilterParams({
                                seasonYear: parseInt(value as string),
                            });
                        }}
                    />
                </div>
            </HorizontalScrollList>
        </div>
    );
};