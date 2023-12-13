import anilist from "@/lib/oauth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
      const searchParams = request.nextUrl.searchParams;

      const tokens = await anilist.getTokens(
            searchParams.get("code") as string,
      );

      const { access_token, refresh_token } = tokens;

      cookies().set("access_token", access_token);
      cookies().set("refresh_token", refresh_token);

      redirect("/");
}
