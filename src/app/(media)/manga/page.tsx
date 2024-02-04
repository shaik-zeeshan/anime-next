import { Media, MediaFragment, MediaType } from "@/__generated__/graphql";
import { AnimeCarousel } from "@/components/anime-carousel";
import { notFound } from "next/navigation";
import MediaList from "@/components/media/scroll-media-list";
import GenreList from "@/components/genre-list";
import { anilist_client } from "@/lib/graphql-request";
import { transformerAnimeData } from "@/lib/transformers";
import { mangaPageQuery } from "@/graphql/pages/manga";
import { ReadingList } from "@/components/current-list/reading-list";

export default async function Page() {
    const data = await anilist_client.request(mangaPageQuery, {
        type: MediaType.Manga,
        perPage: 10,
    });

    if (!data) {
        notFound();
    }

    return (
        <main className="pb-[--gap]">
            <div className="px-[--padding-x]">
                <AnimeCarousel
                    images={data.trending?.media as MediaFragment[]}
                    alt
                />
            </div>

            <div className="mt-10 h-full w-full space-y-[--gap]">
                <GenreList />
                <ReadingList />
                <MediaList
                    title="Popular"
                    media={transformerAnimeData(data.popular?.media as Media[])}
                    // link={`/anime/filter?season=${fetchInfo.currentSeason}&seasonYear=${fetchInfo.currentYear}`}
                />
                <MediaList
                    title="Manhwa"
                    media={transformerAnimeData(data.manhwa?.media as Media[])}
                    // link={`/anime/filter?season=${fetchInfo.nextSeason}&seasonYear=${fetchInfo.nextSeasonYear}`}
                />
                <MediaList
                    title="Top"
                    media={transformerAnimeData(data.top?.media as Media[])}
                    // link="/anime/filter?sort=POPULARITY_DESC"
                />
            </div>
        </main>
    );
}
