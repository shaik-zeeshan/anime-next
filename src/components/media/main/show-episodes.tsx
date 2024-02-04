import { MediaStatus } from "@/__generated__/graphql";

export const ShowEpisodes = ({
    episodes,
    status,
    nextEpisode,
    manga = false,
}: {
    episodes?: number | null;
    nextEpisode?: number | null;
    status: MediaStatus;
    manga?: Boolean;
}) => {
    const abbr = manga ? "Chapters" : "Episodes";
    switch (status) {
        case MediaStatus.Finished:
            return <div>Finished {episodes && `- ${episodes} ${abbr} `}</div>;
        case MediaStatus.Releasing:
            return (
                <div>
                    Releasing {nextEpisode && `- ${nextEpisode} ${abbr} `}
                </div>
            );
        case MediaStatus.NotYetReleased:
            return <div>Not Yet Released</div>;
        case MediaStatus.Cancelled:
            return <div>Cancelled</div>;
        default:
            return false;
    }

    // return (
    //     <div>
    //         {episodes} <span>Episodes</span>
    //     </div>
    // );
};
