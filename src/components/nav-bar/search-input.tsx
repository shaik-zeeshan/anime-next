"use client";

import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

export const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const pathname = usePathname();

        const searchParams = useSearchParams();

        const router = useRouter();

        const search = searchParams.get("search");

        const [searchValue, setSearchValue] = React.useState("");

        React.useEffect(() => {
            setSearchValue(search || "");
        }, [search]);

        const handleSearch = React.useCallback(() => {
            let path = pathname.startsWith("/anime") ? "/anime" : "/manga";

            const params = new URLSearchParams(searchParams);

            if (searchValue) {
                params.set("search", searchValue);
            } else {
                params.delete("search");
            }

            const paramString = params.toString().length
                ? `?${params.toString()}`
                : "";

            path = `${path}/filter${paramString}`;
            return path;
        }, [pathname, searchValue, searchParams]);

        return (
            <div
                className={cn(
                    "relative order-3 col-span-2 w-full  md:order-2 lg:w-96",
                    className,
                )}
            >
                <Input
                    ref={ref}
                    {...props}
                    className="h-full w-full pl-5"
                    placeholder="Search..."
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    value={searchValue}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const path = handleSearch();
                            router.push(path);
                        }
                    }}
                />
                <Button
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                    variant="ghost"
                    onClick={() => {
                        const path = handleSearch();
                        router.push(path);
                    }}
                >
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </div>
        );
    },
);

SearchInput.displayName = "SearchInput";
