import { MediaListStatus, StatusDistribution } from "@/__generated__/graphql";

export const DisplayStats = ({ scores }: { scores: StatusDistribution[] }) => {
    const stats = [
        {
            name: "Current",
            color: "#68D638",
            value: scores.filter(
                (score) => score.status === MediaListStatus.Current,
            )[0]?.amount,
        },
        {
            name: "Planning",
            color: "#40A9FF",
            value: scores.filter(
                (score) => score.status === MediaListStatus.Planning,
            )[0]?.amount,
        },
        {
            name: "Paused",
            color: "#9256F3",
            value: scores.filter(
                (score) => score.status === MediaListStatus.Paused,
            )[0]?.amount,
        },
        {
            name: "Dropped",
            color: "#F679A4",
            value: scores.filter(
                (score) => score.status === MediaListStatus.Dropped,
            )[0]?.amount,
        },
        {
            name: "Completed",
            color: "#E85D75",
            value: scores.filter(
                (score) => score.status === MediaListStatus.Completed,
            )[0]?.amount,
        },
    ];

    return (
        <div className="min-h-44 mx-auto grid w-4/5 grid-cols-2 justify-between gap-5 md:grid-cols-5">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="flex flex-1 items-center justify-center text-center"
                >
                    <div>
                        <div className="text-xl">{stat.value}</div>
                        <div
                            className="mx-auto w-max rounded-lg px-2 py-1 text-sm text-white"
                            style={{
                                backgroundColor: stat.color,
                            }}
                        >
                            {stat.name}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
