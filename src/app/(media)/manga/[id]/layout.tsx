import { PageNav } from "@/components/media/page-nav";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="relative h-full w-full">
            {children}
            <PageNav />
        </div>
    );
}
