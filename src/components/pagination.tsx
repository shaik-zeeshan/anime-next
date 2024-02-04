"use client";
import { filterParams } from "@/lib/filter-params";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useQueryStates } from "next-usequerystate";
import { Button } from "./ui/button";
import { getNumberRange } from "@/lib/utils";
import { useTransition } from "react";

type PageInfo = {
    currentPage: number;
    hasNextPage: boolean;
    lastPage: number;
    perPage: number;
    total: number;
};

export const Pagination = ({ pageInfo }: { pageInfo: PageInfo }) => {
    const [__, startTransition] = useTransition();
    const [_, setFilterParams] = useQueryStates(filterParams, {
        history: "push",
        startTransition,
    });

    const handlePageChange = (page: number) => {
        setFilterParams({
            page,
        });
    };

    const handlePerPageChange = (perPage: number) => {
        setFilterParams({
            perPage,
        });
    };

    const prev = pageInfo.currentPage > 1;
    const next = pageInfo.hasNextPage;

    return (
        <div className=" flex h-16 w-full items-center justify-center">
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    className="h-8 w-8 p-2"
                    onClick={() => {
                        handlePageChange(pageInfo.currentPage - 1);
                    }}
                    disabled={!prev}
                >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 px-2">
                    <span className="text-sm text-gray-500">
                        {pageInfo.currentPage} x
                    </span>
                    <Select
                        value={`${pageInfo.perPage}`}
                        onValueChange={(value) => {
                            handlePerPageChange(parseInt(value));
                        }}
                    >
                        <SelectTrigger
                            role="button"
                            aria-label="per page"
                            className="h-8 w-20 sm:w-[70px]"
                        >
                            <SelectValue placeholder={pageInfo.perPage} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {getNumberRange(1, 30).map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-2"
                    onClick={() => {
                        handlePageChange(pageInfo.currentPage + 1);
                    }}
                    disabled={!next}
                >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
