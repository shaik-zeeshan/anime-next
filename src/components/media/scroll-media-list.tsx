import Link from "next/link";
import HorizontalScrollList from "../framer-motion/horizontal-scroll";
import { MediaCard } from "./media-card";
import { TranformedAnimeData } from "@/lib/transformers";

const ScrollMediaList = ({
    media,
    title,
    link,
}: {
    media: TranformedAnimeData | undefined;
    title: string;
    link?: string;
}) => {
    if (!media?.length) return false;

    return (
        <div className="space-y-3">
            <div className="flex w-full items-center justify-between px-[--padding-x]">
                <h1 className="text-xl font-semibold capitalize">{title}</h1>
                {link && (
                    <Link
                        href={link}
                        className=" text-sm font-semibold text-gray-500 hover:text-gray-700"
                    >
                        See all
                    </Link>
                )}
            </div>
            <div className="overflow-hidden px-[--padding-x]">
                <HorizontalScrollList className="flex gap-[--gap]">
                    {media?.map((image, index) => (
                        <MediaCard image={image} key={index} scroll />
                    ))}
                </HorizontalScrollList>
            </div>
        </div>
    );
};

export default ScrollMediaList;
