"use server";

import { MediaListStatus } from "@/__generated__/graphql";
import { UpdateUserAnimeProgress } from "@/graphql/mutation";
import { UserAnimeProgress } from "@/graphql/user";
import { anilist_client } from "@/lib/graphql-request";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    cookies().delete("access_token");
    cookies().delete("user_id");
}

export async function getUserProgress(id: number) {
    const user_id = cookies().get("user_id")?.value;

    if (!user_id) redirect("/login");

    let res;

    try {
        res = await anilist_client.request(UserAnimeProgress, {
            id,
            userId: parseInt(user_id),
        });
    } catch (e) {
        return null;
    }

    return res.MediaList;
}

export async function updateUserProgress(data: FormData) {
    const { id, progress, score, status } = Object.fromEntries(
        data.entries(),
    ) as {
        [x: string]: string;
    };

    if (!parseInt(id)) return null;

    const access_token = cookies().get("access_token")?.value;

    if (!access_token) redirect("/login");

    try {
        await anilist_client.request(
            UpdateUserAnimeProgress,
            {
                mediaId: parseInt(id),
                ...(progress && { progress: parseFloat(progress) as number }),
                ...(score && { score: parseInt(score) as number }),
                ...(status && { status: status as MediaListStatus }),
            },
            {
                Authorization: `Bearer ${access_token}`,
            },
        );
    } catch (e) {
        console.log(e);

        return null;
    }

    revalidatePath(`/anime/${id}`);
    revalidatePath(`/manga/${id}`);
}
