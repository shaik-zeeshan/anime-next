"use client";

import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-5">
                <h1 className="text-4xl font-bold text-gray-900">
                    Something Went Wrong
                </h1>
                <p className="px-20 text-center text-gray-700">
                    {error.message}
                    {error.digest && (
                        <>
                            <br />
                            <span className="text-gray-500">
                                {error.digest}
                            </span>
                        </>
                    )}
                </p>
                <Button
                    className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-white"
                    onClick={reset}
                >
                    Reset
                </Button>
            </div>
        </main>
    );
}
