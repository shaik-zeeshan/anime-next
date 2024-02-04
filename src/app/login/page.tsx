import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import anilist from "@/lib/oauth";
import { cn } from "@/lib/utils";
import { BackButton } from "./components";

export default function Page() {
    return (
        <main className="flex min-h-screen w-full flex-col p-24">
            <BackButton />
            <div className="flex flex-1 items-center justify-center ">
                <LoginButton className="px-5 py-2">
                    Login With Anilist
                </LoginButton>
            </div>
        </main>
    );
}

const LoginButton = ({ className, children, ...props }: ButtonProps) => {
    return (
        <Button className={cn("px-3 py-1", className)} asChild {...props}>
            <Link href={anilist.getAuthURL()}>{children}</Link>
        </Button>
    );
};
