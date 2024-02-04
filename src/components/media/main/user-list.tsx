import { MediaList, MediaListStatus } from "@/__generated__/graphql";
import HorizontalScrollList from "@/components/framer-motion/horizontal-scroll";
import { AnimeUserListQuery } from "@/graphql/pages/individual-anime";
import { anilist_client } from "@/lib/graphql-request";
import { cookies } from "next/headers";
import Image from "next/image";

export const UserList = async ({ id }: { id: number }) => {
    const accessToken = cookies().get("access_token")?.value;

    if (!accessToken) {
        return false;
    }

    const data = await anilist_client.request(
        AnimeUserListQuery,
        {
            id,
            page: 1,
            perPage: 10,
        },
        {
            Authorization: `Bearer ${accessToken}`,
        },
    );

    if (!data?.users?.mediaList?.length) return false;

    return (
        <div className="space-y-3">
            <div className="flex w-full items-center justify-between px-[--padding-x]">
                <h1 className="text-xl font-semibold capitalize">Followers</h1>
                {data?.users?.pageInfo?.hasNextPage && (
                    <button className=" text-sm font-semibold text-gray-500 hover:text-gray-700">
                        See all
                    </button>
                )}
            </div>
            <div className="overflow-hidden px-[--padding-x]">
                <HorizontalScrollList className="flex gap-[--gap]">
                    {data?.users?.mediaList?.map((user, index) => (
                        <UserCard key={index} user={user as MediaList} />
                    ))}
                </HorizontalScrollList>
            </div>
        </div>
    );
};

const UserCard = ({ user }: { user: MediaList }) => {
    return (
        <div className="relative h-52 w-52 overflow-hidden rounded-lg bg-red-400 p-10 text-white">
            <Image
                src={user?.user?.avatar?.large as string}
                fill
                sizes="100%"
                quality={60}
                priority={false}
                className="absolute h-full w-full rounded-lg object-cover"
                alt={(user?.user?.name as string) || "Avatar Image"}
            />
            <div className="absolute inset-0 z-10 h-full w-full bg-black/50" />
            <div className="absolute bottom-4 right-4 z-10 ">
                <div className="flex flex-col text-right">
                    <div className="text-lg md:text-xl">{user?.user?.name}</div>
                    <div className="capitaliz text-xs">{user?.status}</div>
                </div>
            </div>
            <div className="absolute left-4 top-4 z-10">{user.progress}</div>
            {user?.status === MediaListStatus.Completed && (
                <div className="absolute  right-4 top-4 z-10">{user.score}</div>
            )}
        </div>
    );
};
