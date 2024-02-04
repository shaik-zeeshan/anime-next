import {
      CharacterConnection,
      CharacterRole,
      Maybe,
      Media,
} from "@/__generated__/graphql";

export const transformerAnimeData = (data: Media[]) => {
      return data.map((item) => ({
            title:
                  item.type === "ANIME"
                        ? item.title?.userPreferred ||
                          item.title?.english ||
                          item.title?.romaji
                        : item.title?.english ||
                          item.title?.userPreferred ||
                          item.title?.romaji,
            id: item.id,
            coverImage: item.coverImage?.extraLarge || item.coverImage?.large,
            color: item.coverImage?.color,
            type: item.type,
      }));
};

export type TranformedAnimeData = ReturnType<typeof transformerAnimeData>;

export type AnimeData = TranformedAnimeData[number];

export type AnimeVoiceActor = {
      id: number | undefined;
      name: Maybe<string> | undefined;
      image: Maybe<string> | undefined;
      language: Maybe<string> | undefined;
      role: Maybe<CharacterRole> | undefined;
      characterId: number | undefined;
      characterName: Maybe<string> | undefined;
      characterImage: Maybe<string> | undefined;
};

export type AnimeVoiceActors = AnimeVoiceActor[];

export const transformerAnimeVoiceActors = (data: CharacterConnection) => {
      const voiceActors: AnimeVoiceActors = [];

      data.edges?.forEach((item) => {
            item?.voiceActors?.forEach((actor) => {
                  voiceActors.push({
                        id: actor?.id,
                        name: actor?.name?.userPreferred,
                        image: actor?.image?.large,
                        language: actor?.languageV2,
                        role: item?.role,
                        characterId: item?.node?.id,
                        characterName: item?.node?.name?.userPreferred,
                        characterImage:
                              item?.node?.image?.large ||
                              item?.node?.image?.medium,
                  });
            });
      });

      return voiceActors;
};
