"use client";

import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";
import moment from "moment";
import { useState, useEffect } from "react";

export const Timer = ({ time }: { time: number }) => {
    const t = moment.unix(time);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            const date = moment.now();
            var ms = moment(t).diff(moment(date));
            var d = moment.duration(ms);
            setDays(Math.floor(d.asDays()));
            setHours(moment.utc(ms).get("hours"));
            setMinutes(moment.utc(ms).get("minutes"));
        }, 1000);
        return () => clearInterval(id);
    }, [t]);
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger
                    asChild
                    className="absolute right-5 top-5 text-[--text-color]"
                >
                    <button>{t.calendar()}</button>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="countdown text-lg">
                        <span>{days}</span>d<span>{hours}</span>h
                        <span>{minutes}</span>m
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
