import { gql } from "@/__generated__/gql";

export const UpdateUserAnimeProgress = gql(`
      mutation UpdateUserAnimeProgress($mediaId: Int, $status: MediaListStatus, $score: Float, $progress: Int) {
        SaveMediaListEntry(mediaId: $mediaId, status: $status, score: $score, progress: $progress) {
          id
          status
          progress
          score
        }
      }
`);
