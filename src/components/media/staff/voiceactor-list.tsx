"use client";

import { StaffLanguage } from "@/__generated__/graphql";

import { voiceActorParams } from "@/lib/filter-params";
import { AnimeVoiceActor } from "@/lib/transformers";
import { reverseMap } from "@/lib/utils";
import { useQueryStates } from "next-usequerystate";
import { useTransition } from "react";
import { SelectInput } from "@/components/input/select-input";
import Image from "next/image";

type Languages = keyof typeof StaffLanguage;

export const VoicactorList = () => {
    const [_, startTransition] = useTransition();

    const [{ language }, setParams] = useQueryStates(voiceActorParams, {
        history: "replace",
        startTransition,
    });

    return (
        <div className="flex w-full items-center justify-between px-[--padding-x]">
            <h1 className="text-xl font-semibold capitalize">Voice Actor</h1>
            <SelectInput
                title="Language"
                ariaLabel="Select a language"
                options={Object.keys(StaffLanguage).map((lang) => ({
                    label: lang,
                    value: lang,
                }))}
                value={(language && reverseMap(StaffLanguage, language)) || ""}
                onValueChange={(value) => {
                    startTransition(() => {
                        setParams({
                            language: StaffLanguage[value as Languages],
                        });
                    });
                }}
            />
        </div>
    );
};

export const ActorCard = ({ actor }: { actor: AnimeVoiceActor }) => {
    return (
        <div className="relative grid h-52 w-full grid-cols-3 overflow-hidden rounded-lg border-2 ">
            <div className="relative">
                <Image
                    src={actor.image || ""}
                    alt={actor.name || "Actor Image"}
                    fill
                    sizes="100%"
                    priority={false}
                    quality={60}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
            <div className="text flex flex-col justify-between text-wrap px-5 py-5 text-center text-sm sm:px-1 md:px-3 xl:px-2">
                <div>{actor.name}</div>
                <div>{actor.characterName}</div>
            </div>
            <div className="relative">
                <Image
                    src={actor.characterImage || ""}
                    alt={actor.characterName || "Character Image"}
                    fill
                    sizes="100%"
                    priority={false}
                    quality={60}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    );
};
