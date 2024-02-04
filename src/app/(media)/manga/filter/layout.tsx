import { FilterBar } from "@/components/filter-bar";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <div className="flex h-full w-full flex-col pb-2">
            <div>
                <FilterBar />
            </div>
            <div className="flex-1">{children}</div>
        </div>
    );
}
