import { Media, MediaType, PageInfo } from "@/__generated__/graphql";
import { MediaCard } from "@/components/media/media-card";
import { Pagination } from "@/components/pagination";
import { FilterQuery } from "@/graphql/pages/filter";
import { anilist_client } from "@/lib/graphql-request";
import { AnimeData, transformerAnimeData } from "@/lib/transformers";

export const MediaList = async ({
      params,
}: {
      params: {
            [x: string]: any;
      };
}) => {
      const data = await anilist_client.request(FilterQuery, {
            ...params,
            type: MediaType.Manga,
      });

      return (
            <div className="flex h-full w-full flex-col gap-2">
                  <div className=" w-full flex-1">
                        {data?.animes?.media?.length ? (
                              <div className="grid  w-full grid-cols-2 gap-[--gap] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                                    {transformerAnimeData(
                                          data?.animes?.media as Media[],
                                    ).map((anime, index) => {
                                          return (
                                                <MediaCard
                                                      key={index}
                                                      image={anime as AnimeData}
                                                      className="min-h-[18rem] sm:min-h-[20rem] md:min-h-[22rem] lg:min-h-[22rem] xl:min-h-[24rem]"
                                                />
                                          );
                                    })}
                              </div>
                        ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                    No results found
                              </div>
                        )}
                  </div>
                  {/* @ts-ignore */}
                  <Pagination pageInfo={data?.animes?.pageInfo as PageInfo} />
            </div>
      );
};
