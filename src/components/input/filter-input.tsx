import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterInput {
    className?: string;
    title: string;
    options: {
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }>;
    }[];
    selected: string[];
    onChange: (value: string[] | null) => void;
}

export function FilterInput({
    title,
    options,
    selected,
    onChange,
    className,
}: FilterInput) {
    const selectedValues = new Set(selected);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={cn("h-full", className)}
                >
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    {title}
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-4"
                            />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) =>
                                            selectedValues.has(option.value),
                                        )
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(
                                    option.value,
                                );

                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            console.log(isSelected);
                                            if (isSelected) {
                                                selectedValues.delete(
                                                    option.value,
                                                );
                                            } else {
                                                selectedValues.add(
                                                    option.value,
                                                );
                                            }
                                            const filterValues =
                                                Array.from(selectedValues);
                                            console.log(filterValues);
                                            onChange(
                                                filterValues.length > 0
                                                    ? filterValues
                                                    : null,
                                            );
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible",
                                            )}
                                        >
                                            <CheckIcon
                                                className={cn("h-4 w-4")}
                                            />
                                        </div>
                                        {option.icon && (
                                            <option.icon className="text-muted-foreground mr-2 h-4 w-4" />
                                        )}
                                        <span>{option.label}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => {
                                            onChange(null);
                                        }}
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
