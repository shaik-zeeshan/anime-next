import {
      Media,
      MediaStatus,
      StatusDistribution,
} from "@/__generated__/graphql";
import { ShowEpisodes } from "@/components/media/main/show-episodes";
import { Summary } from "@/components/media/main/summary";

import { UserList } from "@/components/media/main/user-list";
import {
      AnimeMetadataQuery,
      IndividualAnimeQuery,
} from "@/graphql/pages/individual-anime";
import { anilist_client } from "@/lib/graphql-request";
import Image from "next/image";
import { CSSProperties } from "react";
import ScrollMediaList from "@/components/media/scroll-media-list";
import { TranformedAnimeData, transformerAnimeData } from "@/lib/transformers";
import { DisplayStats } from "@/components/media/stats/display-stats";
import { AnimeProgress } from "@/components/media/anime-progress";
import { cookies } from "next/headers";

export async function generateMetadata({ params }: { params: { id: string } }) {
      if (!parseInt(params.id)) return {};

      const data = await anilist_client.request(AnimeMetadataQuery, {
            id: parseInt(params.id),
      });

      return {
            title: (data?.media?.title?.english ||
                  data?.media?.title?.userPreferred ||
                  data?.media?.title?.romaji) as string,
            description: "Anime Tracking App",
            keywords: (data?.media?.title?.english ||
                  data?.media?.title?.userPreferred ||
                  data?.media?.title?.romaji) as string,
      };
}

export default async function Page({ params }: { params: { id: string } }) {
      const access_token = cookies().get("access_token")?.value;

      const data = await anilist_client.request(IndividualAnimeQuery, {
            id: parseInt(params.id),
      });

      if (!data) return false;

      const relationFunction = () => {
            if (
                  data?.media?.relations?.nodes?.length ||
                  data?.media?.recommendations?.nodes?.length
            ) {
                  return true;
            } else {
                  return false;
            }
      };

      const relationPresent = relationFunction();

      return (
            <main
                  className="space-y-[--gap]"
                  style={
                        {
                              "--media-color":
                                    data?.media?.coverImage?.color ||
                                    "var(--foreground)",
                        } as CSSProperties
                  }
            >
                  <section id="main">
                        <div className="px-[--padding-x]">
                              <div
                                    className="relative h-96 w-full rounded-lg "
                                    style={
                                          {
                                                "--text-color": data?.media
                                                      ?.bannerImage
                                                      ? "white"
                                                      : "currentColor",
                                          } as CSSProperties
                                    }
                              >
                                    {data?.media?.bannerImage && (
                                          <>
                                                <Image
                                                      src={
                                                            data.media
                                                                  ?.bannerImage as string
                                                      }
                                                      fill
                                                      quality={60}
                                                      sizes="100vw"
                                                      className="absolute h-full w-full rounded-lg object-cover"
                                                      alt={
                                                            (data.media?.title
                                                                  ?.english as string) ||
                                                            "Banner Image"
                                                      }
                                                />
                                                <div className="absolute h-full w-full rounded-lg bg-black/60" />
                                          </>
                                    )}
                                    <div className="absolute left-1/2 top-1/4 w-10/12 -translate-x-1/2  rounded-lg">
                                          <div className="flex h-full grid-cols-6 flex-col items-center gap-5 lg:grid lg:grid-flow-col xl:grid-cols-4 2xl:grid-cols-5">
                                                <div className="relative col-span-2 h-96 w-full max-w-[17rem] overflow-hidden rounded-lg shadow xl:col-span-1 xl:max-w-xs">
                                                      <Image
                                                            src={
                                                                  data.media
                                                                        ?.coverImage
                                                                        ?.extraLarge as string
                                                            }
                                                            fill
                                                            sizes="100%"
                                                            className="absolute inset-0 z-10 rounded-lg object-cover"
                                                            alt={
                                                                  (data.media
                                                                        ?.title
                                                                        ?.english as string) ||
                                                                  "Cover Image"
                                                            }
                                                      />
                                                      <div className="absolute inset-0 z-0 animate-pulse bg-[--media-color]" />
                                                      {access_token && (
                                                            <div className="absolute bottom-2 right-2 z-20">
                                                                  <AnimeProgress
                                                                        id={parseInt(
                                                                              params.id,
                                                                        )}
                                                                        total={
                                                                              data
                                                                                    ?.media
                                                                                    ?.episodes as number
                                                                        }
                                                                  />
                                                            </div>
                                                      )}
                                                </div>
                                                <div className="text-foreground col-span-4 flex items-center text-center lg:text-left lg:text-[--text-color]">
                                                      <div>
                                                            <div className="line-clamp-2  text-xl font-semibold  lg:text-2xl xl:text-4xl">
                                                                  {data?.media
                                                                        ?.title
                                                                        ?.english ||
                                                                        data
                                                                              ?.media
                                                                              ?.title
                                                                              ?.userPreferred}
                                                            </div>
                                                            <ShowEpisodes
                                                                  status={
                                                                        data
                                                                              ?.media
                                                                              ?.status as MediaStatus
                                                                  }
                                                                  episodes={
                                                                        data
                                                                              ?.media
                                                                              ?.chapters
                                                                  }
                                                                  nextEpisode={
                                                                        data
                                                                              ?.media
                                                                              ?.nextAiringEpisode
                                                                              ?.episode
                                                                  }
                                                                  manga={true}
                                                            />
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div className="mt-56 space-y-5 lg:mt-32">
                              <Summary>
                                    <div
                                          dangerouslySetInnerHTML={{
                                                __html: data?.media
                                                      ?.description as string,
                                          }}
                                    ></div>
                              </Summary>
                              <div>
                                    <UserList id={parseInt(params.id)} />
                              </div>
                        </div>
                  </section>

                  {relationPresent ? (
                        <section
                              id="relation"
                              className="scroll-mt-3 space-y-[--gap] md:scroll-mt-10"
                        >
                              <ScrollMediaList
                                    title="Related"
                                    media={transformerAnimeData(
                                          data?.media?.relations
                                                ?.nodes as Media[],
                                    )}
                              />
                              <ScrollMediaList
                                    title="Recommendations"
                                    media={
                                          data?.media?.recommendations?.nodes?.map(
                                                (item) => ({
                                                      title:
                                                            item
                                                                  ?.mediaRecommendation
                                                                  ?.title
                                                                  ?.english ||
                                                            item
                                                                  ?.mediaRecommendation
                                                                  ?.title
                                                                  ?.userPreferred,

                                                      coverImage:
                                                            item
                                                                  ?.mediaRecommendation
                                                                  ?.coverImage
                                                                  ?.extraLarge ||
                                                            item
                                                                  ?.mediaRecommendation
                                                                  ?.coverImage
                                                                  ?.large,
                                                      id: item
                                                            ?.mediaRecommendation
                                                            ?.id,
                                                      type: item
                                                            ?.mediaRecommendation
                                                            ?.type,
                                                      color: item
                                                            ?.mediaRecommendation
                                                            ?.coverImage?.color,
                                                }),
                                          ) as TranformedAnimeData
                                    }
                              />
                        </section>
                  ) : (
                        <></>
                  )}

                  <section
                        id="stats"
                        className="w-full scroll-mt-3 md:scroll-mt-10"
                  >
                        <div className="w-full pt-10 md:pt-0">
                              <DisplayStats
                                    scores={
                                          data?.media?.stats
                                                ?.statusDistribution as StatusDistribution[]
                                    }
                              />
                        </div>
                  </section>
            </main>
      );
}
