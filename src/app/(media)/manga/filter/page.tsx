import { filterParamsCache } from "@/lib/filter-params";
import { Suspense } from "react";
import { MediaList } from "./(components)";
import { Loader } from "@/components/loader";
import { removeEmpty } from "@/lib/utils";

export default async function Page({
    searchParams,
}: {
    searchParams: {
        [x: string]: any;
    };
}) {
    const filterParams = removeEmpty({
        ...filterParamsCache.parse(searchParams),
    });

    const key = new URLSearchParams(filterParams).toString();

    return (
        <div className="h-full w-full px-[--padding-x]">
            <Suspense
                key={key}
                fallback={
                    <div className="h-full w-full">
                        <Loader />
                    </div>
                }
            >
                <MediaList params={filterParams} />
            </Suspense>
        </div>
    );
}
