"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
    const router = useRouter();
    return (
        <button
            className="h-14 w-full"
            onClick={() => {
                router.back();
            }}
        >
            <div className="flex items-center gap-5 transition-all duration-200 hover:gap-4">
                <ArrowLeft className="h-6 w-6" />
                Back
            </div>
        </button>
    );
};
