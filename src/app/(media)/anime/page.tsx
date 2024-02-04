import { Media, MediaFragment, MediaType } from "@/__generated__/graphql";
import { AnimeCarousel } from "@/components/anime-carousel";
import { PageQuery } from "@/graphql/pages/anime";
import { notFound } from "next/navigation";
import MediaList from "@/components/media/scroll-media-list";
import { getSeasons } from "@/lib/helpers/get-seasons";
import GenreList from "@/components/genre-list";
import { anilist_client } from "@/lib/graphql-request";
import { WatchingList } from "@/components/current-list/watching-list";
import { transformerAnimeData } from "@/lib/transformers";

export default async function Page() {
    const fetchInfo = getSeasons(new Date());

    const data = await anilist_client.request(PageQuery, {
        nextSeason: fetchInfo.nextSeason,
        nextYear: fetchInfo.nextSeasonYear,
        season: fetchInfo.currentSeason,
        seasonYear: fetchInfo.currentYear,
        type: MediaType.Anime,
    });

    if (!data) {
        notFound();
    }

    return (
        <main className="pb-[--gap]">
            <div className="px-[--padding-x]">
                <AnimeCarousel
                    images={data.trending?.anime as MediaFragment[]}
                    alt
                />
            </div>

            <div className="mt-10 h-full w-full space-y-[--gap]">
                <GenreList />
                <WatchingList />
                <MediaList
                    title="Seasonal"
                    media={transformerAnimeData(data.season?.anime as Media[])}
                    link={`/anime/filter?season=${fetchInfo.currentSeason}&seasonYear=${fetchInfo.currentYear}`}
                />
                <MediaList
                    title="Upcoming"
                    media={transformerAnimeData(
                        data.nextSeason?.anime as Media[],
                    )}
                    link={`/anime/filter?season=${fetchInfo.nextSeason}&seasonYear=${fetchInfo.nextSeasonYear}`}
                />
                <MediaList
                    title="Popular"
                    media={transformerAnimeData(data.popular?.anime as Media[])}
                    link="/anime/filter?sort=POPULARITY_DESC"
                />
            </div>
        </main>
    );
}
