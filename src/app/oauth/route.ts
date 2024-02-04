import { userQuery } from "@/graphql/user";
import { anilist_client } from "@/lib/graphql-request";
import anilist from "@/lib/oauth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
      const searchParams = request.nextUrl.searchParams;

      const tokens = await anilist.getTokens(
            searchParams.get("code") as string,
      );

      const { access_token, expires_in } = tokens;

      const data = await anilist_client.request(userQuery, undefined, {
            Authorization: `Bearer ${access_token}`,
      });

      if (data?.user?.id) {
            cookies().set("user_id", `${data.user.id}`, {
                  httpOnly: true,
                  maxAge: expires_in,
            });
            cookies().set("access_token", access_token, {
                  httpOnly: true,
                  maxAge: expires_in,
            });
      } else {
            throw new Error("User not found");
      }

      redirect("/");
}
