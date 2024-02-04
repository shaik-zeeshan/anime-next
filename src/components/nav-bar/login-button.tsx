import { cn } from "@/lib/utils";
import { LogIn } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import anilist from "@/lib/oauth";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import { LogoutButton } from "./logout-button";
import { userQuery } from "@/graphql/user";
import { anilist_client } from "@/lib/graphql-request";

export const LoginButton = async ({ className }: { className?: string }) => {
    const accessToken = cookies().get("access_token")?.value;

    if (accessToken === undefined) {
        return (
            <div className="order-2 flex justify-end md:order-3">
                <Button
                    role="button"
                    aria-label="Login"
                    className={cn(" p-3 ", className)}
                    variant="ghost"
                    asChild
                >
                    <Link href={anilist.getAuthURL()}>
                        <LogIn size={16} />
                    </Link>
                </Button>
            </div>
        );
    }

    const data = await anilist_client.request(userQuery, undefined, {
        Authorization: `Bearer ${accessToken}`,
        next: {
            tags: ["user"] as unknown,
        } as unknown as string,
    });

    if (!data) return;

    return (
        <div className="order-2 flex items-center justify-end gap-5 md:order-3">
            <Button
                role="button"
                aria-label="Profile"
                className={cn("h-6 w-6 rounded-lg", className)}
                variant={"link"}
            >
                <Avatar>
                    <AvatarImage
                        src={data?.user?.avatar?.large as string}
                        className="object-cover"
                        alt={data.user?.name || "user avatar"}
                    />
                    <AvatarFallback>{data?.user?.name}</AvatarFallback>
                </Avatar>
            </Button>
            <LogoutButton />
        </div>
    );
};

LoginButton.displayName = "LoginButton";
