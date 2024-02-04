import { PageNav } from "@/components/media/page-nav";
import { ReactNode } from "react";

export default function Layout({
    children,
    voiceactors,
}: {
    children: ReactNode;
    voiceactors: ReactNode;
}) {
    return (
        <div className="relative h-full w-full">
            {children}
            {voiceactors}
            <PageNav />
        </div>
    );
}
