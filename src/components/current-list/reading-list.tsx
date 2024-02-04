import { Media, MediaType } from "@/__generated__/graphql";
import HorizontalScrollList from "@/components/framer-motion/horizontal-scroll";
import { UserProgress } from "@/graphql/user";
import { anilist_client } from "@/lib/graphql-request";
import { cookies } from "next/headers";
import { WatchCard } from "./watch-card";

export const ReadingList = async () => {
    const userId = cookies().get("user_id")?.value;

    if (!userId) return false;

    const data = await anilist_client.request(UserProgress, {
        id: parseInt(userId),
        type: MediaType.Manga,
    });

    if (!data) return false;

    return (
        <div className="w-full space-y-3">
            <div className="flex w-full items-center justify-between px-[--padding-x]">
                <h1 className="text-xl font-semibold capitalize">Watching</h1>
            </div>
            <div className="overflow-hidden px-[--padding-x]">
                <HorizontalScrollList className="flex gap-[--gap]">
                    {data?.currentList?.media?.map((media, index) => (
                        <WatchCard
                            key={index}
                            anime={media?.media as Media}
                            progress={media?.progress as number}
                        />
                    ))}
                </HorizontalScrollList>
            </div>
        </div>
    );
};
