"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import React from "react";

export const SelectInput = ({
    className,
    title,
    options,
    ariaLabel,
    defaultValue,
    id,
    ...props
}: SelectPrimitive.SelectProps & {
    className?: string;
    title: string;
    ariaLabel?: string;
    id?: string;
    options?: {
        label: string;
        value: string;
    }[];
}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Select
            open={open}
            defaultValue={defaultValue}
            onOpenChange={setOpen}
            value={undefined}
            {...props}
        >
            <SelectTrigger
                id={id || "select"}
                aria-expanded={open}
                role="combobox"
                aria-label={ariaLabel}
                className={cn("w-40", className)}
            >
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                {options?.map((option, index) => (
                    <SelectItem key={index} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
