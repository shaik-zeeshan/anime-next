import { gql } from "@/__generated__";

export const PageQuery = gql(`
      query AnimePage(
            $season: MediaSeason
            $seasonYear: Int
            $nextSeason: MediaSeason
            $nextYear: Int
            $type: MediaType
      ) {
            trending: Page(page: 1, perPage: 6) {
                 anime: media(sort: TRENDING_DESC, type: $type, isAdult: false) {
                        ...media
                  }
            }
            season: Page(page: 1, perPage: 10) {
                 anime: media(
                        season: $season
                        seasonYear: $seasonYear
                        sort: POPULARITY_DESC
                        type: $type
                        isAdult: false
                  ) {
                        ...media
                  }
            }
            nextSeason: Page(page: 1, perPage: 10) {
                  anime:media(
                        season: $nextSeason
                        seasonYear: $nextYear
                        sort: POPULARITY_DESC
                        type: $type
                        isAdult: false
                  ) {
                        ...media
                  }
            }
            popular: Page(page: 1, perPage: 10) {
                 anime: media(sort: POPULARITY_DESC, type: $type, isAdult: false) {
                        ...media
                  }
            }
      }

      fragment media on Media {
            id
            title {
                  english
                  romaji
                  userPreferred
            }
            coverImage {
                  extraLarge
                  large
                  color
            }
            bannerImage
            season
            seasonYear
            type
            format
            status(version: 2)
            genres
            isAdult
            averageScore
            popularity
            mediaListEntry {
                  id
                  status
            }
            nextAiringEpisode {
                  airingAt
                  timeUntilAiring
                  episode
            }
      }`);
