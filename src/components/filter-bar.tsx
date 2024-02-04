"use client";
import categories from "@/lib/genres";
import { FilterInput } from "@/components/input/filter-input";
import { useQueryStates } from "next-usequerystate";
import { filterParams } from "@/lib/filter-params";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { SelectInput } from "./input/select-input";
import { MediaSeason } from "@/__generated__/graphql";
import { useRef } from "react";
import { getNumberRange, reverseMap } from "@/lib/utils";
import { useTransition } from "react";

type Season = keyof typeof MediaSeason;

const years = getNumberRange(1960, new Date().getFullYear()).reverse();

export const FilterBar = () => {
    const ref = useRef<HTMLDivElement>(null);

    const [_, startTransition] = useTransition();

    const [filterParam, setFilterParams] = useQueryStates(filterParams, {
        startTransition,
        history: "push",
    });

    const { genres, season, seasonYear, perPage } = filterParam;

    return (
        <div className="my-3 mb-4 w-full overflow-hidden">
            <div
                ref={ref}
                className=" flex h-10 w-full items-center  gap-14 overflow-auto px-[--padding-x] [&>*]:flex-shrink-0"
            >
                <Button size="primary" asChild>
                    <Link
                        href={{
                            query: {
                                perPage: perPage,
                            },
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
                    onChange={(genres) => {
                        setFilterParams({ genres, page: null });
                    }}
                />
                <SelectInput
                    title="Season"
                    options={Object.keys(MediaSeason).map((season) => ({
                        label: season,
                        value: season,
                    }))}
                    value={(season && reverseMap(MediaSeason, season)) || ""}
                    onValueChange={(value) => {
                        setFilterParams({
                            season: MediaSeason[value as Season],
                            page: null,
                        });
                    }}
                />
                <SelectInput
                    title="Year"
                    options={years.map((year) => ({
                        label: year.toString(),
                        value: year.toString(),
                    }))}
                    value={(seasonYear && `${seasonYear}`) || ""}
                    onValueChange={(value) => {
                        setFilterParams({
                            seasonYear: parseInt(value as string),
                            page: null,
                        });
                    }}
                />
            </div>
        </div>
    );
};
