import { gql } from "@/__generated__";

export const IndividualAnimeQuery = gql(`
      query Anime($id: Int) {
        media:Media(id: $id) {
          bannerImage
          coverImage {
            extraLarge
            large
            medium
            color
          }
          title {
            romaji
            english
            native
            userPreferred
          }
          status(version: 2)
          description(asHtml: true)
          nextAiringEpisode {
                 id
                 timeUntilAiring
                 airingAt
                 episode
          }
          episodes
          chapters
          relations {
               nodes{
                 id
                 type
                 title {
                   english
                   romaji
                   userPreferred
                 }
                 coverImage{
                 extraLarge
                   large
                   color
                 }
               }
             }
         recommendations {
               nodes{
                 id
                 mediaRecommendation{
                          id
                          type
                          title {
                            romaji
                            english
                            native
                            userPreferred
                          }
                          coverImage {
                            extraLarge
                            large
                            medium
                            color
                          }
                }
               }
             }
         stats{
                   statusDistribution {
                     status
                     amount
                   }
                   scoreDistribution {
                     score
                     amount
                   }
                 }

                 }

      }
`);

export const AnimeUserListQuery = gql(`
      query UserList($id: Int,$page: Int,$perPage: Int) {
            users: Page(page: $page, perPage: $perPage) {
           pageInfo {
             total
             perPage
             currentPage
             lastPage
             hasNextPage
           }
           mediaList(mediaId: $id, isFollowing: true, sort: UPDATED_TIME_DESC) {
             id
             status
             score
             progress
             user {
               id
               name
               avatar {
                 large
               }
               mediaListOptions {
                 scoreFormat
               }
             }
           }
         }
      }
`);

export const AnimeMetadataQuery = gql(`
      query AnimeMetadata($id: Int) {
            media:Media(id: $id) {
                  id
                  title {
                        romaji
                        english
                        native
                        userPreferred
                  }
            }
            }
      `);

export const AnimeVoiceActorsQuery = gql(`
      query VoiceActorList($id: Int, $language: StaffLanguage, $page: Int, $perPage: Int) {
        Media(id: $id) {
            coverImage {
                  color
            }
          characters(sort: [ROLE, RELEVANCE, ID], page: $page, perPage: $perPage) {
            edges {
              name
              voiceActors(language: $language, sort: [ROLE, RELEVANCE]) {
                id
                name {
                  first
                  middle
                  last
                  full
                  native
                  userPreferred
                }
                gender
                language: languageV2
                description
                image {
                  large
                  medium
                }
              }
              role
              node {
                id
                name {
                  first
                  middle
                  last
                  full
                  native
                  userPreferred
                }
                image {
                  large
                  medium
                }
              }
            }
          }
        }
      }

      `);
