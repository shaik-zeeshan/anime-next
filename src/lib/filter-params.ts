import {
      MediaStatus,
      MediaType,
      MediaSource,
      MediaSeason,
      StaffLanguage,
} from "@/__generated__/graphql";
import {
      createSearchParamsCache,
      parseAsArrayOf,
      parseAsBoolean,
      parseAsInteger,
      parseAsString,
      parseAsStringEnum,
} from "next-usequerystate/parsers";

export const filterParams = {
      page: parseAsInteger.withDefault(1),
      // id: parseAsInteger,
      type: parseAsStringEnum<MediaType>(Object.values(MediaType)).withDefault(
            MediaType.Anime,
      ),
      isAdult: parseAsBoolean.withDefault(false),
      search: parseAsString,
      status: parseAsStringEnum<MediaStatus>(Object.values(MediaStatus)),
      countryOfOrigin: parseAsString,
      source: parseAsStringEnum<MediaSource>(Object.values(MediaSource)),
      season: parseAsStringEnum<MediaSeason>(Object.values(MediaSeason)),
      seasonYear: parseAsInteger,
      year: parseAsString,
      genres: parseAsArrayOf(parseAsString),
      perPage: parseAsInteger.withDefault(12),
};

export const filterParamsCache = createSearchParamsCache(filterParams);

export const voiceActorParams = {
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(15),
      language: parseAsStringEnum<StaffLanguage>(
            Object.values(StaffLanguage),
      ).withDefault(StaffLanguage.Japanese),
};

export const voiceActorParamsCache = createSearchParamsCache(voiceActorParams);
