import { gql } from "@/__generated__";

export const mangaPageQuery = gql(`
      query MangaPageQuery($page:Int=1,$perPage:Int=6,$type:MediaType){
        trending: Page(page: $page, perPage: $perPage) {
          media(sort: TRENDING_DESC, type: $type, isAdult: false) {
            ...media
          }
        }
        popular: Page(page: $page, perPage: $perPage) {
          media(sort: POPULARITY_DESC, type: $type, isAdult: false) {
            ...media
          }
        }
        manhwa: Page(page: $page, perPage: $perPage) {
          media(sort: POPULARITY_DESC, type: $type, countryOfOrigin: "KR", isAdult: false) {
            ...media
          }
        }
        top: Page(page: $page, perPage: $perPage) {
          media(sort: SCORE_DESC, type: $type, isAdult: false) {
            ...media
          }
        }
      }

      fragment manga on Media {
        id
        title {
          english
          userPreferred
        }
        coverImage {
          extraLarge
          large
          color
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        bannerImage
        season
        type
        format
        status(version: 2)
        episodes
        duration
        chapters
        volumes
        genres
        isAdult
        averageScore
        popularity
        mediaListEntry {
          id
          status
        }
      }

      `);
