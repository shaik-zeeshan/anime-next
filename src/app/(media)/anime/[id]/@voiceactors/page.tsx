import { CharacterConnection } from "@/__generated__/graphql";
import { VoicactorList } from "@/components/media/staff/voiceactor-list";
import { AnimeVoiceActorsQuery } from "@/graphql/pages/individual-anime";
import { voiceActorParamsCache } from "@/lib/filter-params";
import { anilist_client } from "@/lib/graphql-request";
import {
    AnimeVoiceActor,
    transformerAnimeVoiceActors,
} from "@/lib/transformers";
import { Suspense } from "react";
import Image from "next/image";
import { Loader } from "@/components/loader";

export default async function Page({
    params,
    searchParams,
}: {
    params: {
        id: string;
    };
    searchParams: {
        [x: string]: any;
    };
}) {
    const languageParams = voiceActorParamsCache.parse(searchParams);

    return (
        <section
            id="staff"
            className="flex min-h-screen w-full scroll-mt-2 flex-col md:scroll-mt-4"
        >
            <div className="mt-10 flex h-full flex-1 flex-col md:mt-0">
                <div className="flex flex-1 flex-col space-y-3">
                    <VoicactorList />
                    <Suspense
                        key={new URLSearchParams(searchParams).toString()}
                        fallback={
                            <div className="grid flex-1 place-items-center">
                                <Loader />
                            </div>
                        }
                    >
                        <ActorList
                            id={parseInt(params.id)}
                            languageParams={languageParams}
                        />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}

const ActorList = async ({
    id,
    languageParams,
}: {
    languageParams: {
        [x: string]: any;
    };
    id: number;
}) => {
    const res = await anilist_client.request(AnimeVoiceActorsQuery, {
        id: id,
        ...languageParams,
    });

    const data = transformerAnimeVoiceActors(
        res?.Media?.characters as CharacterConnection,
    );

    return (
        <div className="flex flex-1 flex-col px-[--padding-x]">
            <>
                {data.length ? (
                    <div className="grid h-full w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {data.map((actor, index) => (
                            <ActorCard actor={actor} key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid flex-1 place-items-center">
                        No data
                    </div>
                )}
            </>
        </div>
    );
};

const ActorCard = ({ actor }: { actor: AnimeVoiceActor }) => {
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
