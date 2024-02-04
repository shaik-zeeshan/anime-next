import { MediaSeason } from "@/__generated__/graphql";

type Season = MediaSeason;

interface SeasonInfo {
      currentSeason: Season;
      nextSeason: Season;
      currentYear: number;
      nextSeasonYear: number;
}

export function getSeasons(date: Date = new Date()): SeasonInfo {
      const currentYear = date.getFullYear();
      const nextSeasonYear =
            date.getMonth() > 9 ? currentYear + 1 : currentYear;
      const month = date.getMonth();

      // Define season ranges based on months (Northern Hemisphere)
      const seasons: Record<Season, { start: number; end: number }> = {
            SPRING: { start: 3, end: 5 },
            SUMMER: { start: 6, end: 8 },
            FALL: { start: 9, end: 11 },
            WINTER: { start: 0, end: 2 },
      };

      // Find current season
      let currentSeason: Season | undefined;
      for (const season in seasons) {
            if (
                  month >= seasons[season as Season].start &&
                  month <= seasons[season as Season].end
            ) {
                  currentSeason = season as Season; // Cast to ensure type safety
                  break;
            }
      }

      if (!currentSeason) {
            throw new Error("Invalid date for season calculation");
      }

      // Calculate next season
      let nextSeason: Season;
      if (currentSeason === "WINTER") {
            nextSeason = MediaSeason.Spring;
      } else {
            const nextSeasonIndex =
                  Object.keys(seasons).indexOf(currentSeason) + 1;
            nextSeason = Object.keys(seasons)[nextSeasonIndex] as Season; // Cast to ensure type safety
      }

      return { currentSeason, nextSeason, currentYear, nextSeasonYear };
}
