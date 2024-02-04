import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.
const appURL = new URL(
    process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL as string}`
        : `http://localhost:3000/`,
);

export async function GET() {
    return new ImageResponse(
        (
            // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                }}
            >
                <div tw="flex flex-col justify-center items-center">
                    <div tw="w-full flex text-purple-600">
                        {/* eslint-disable-next-line */}
                        <img
                            src={`${appURL}logo2.png`}
                            tw="w-44 h-44"
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div tw="flex text-4xl">
                        <div tw="px-2">Anime</div>
                        <div tw="px-2">Tracking</div>
                        <div tw="px-2">App</div>
                    </div>
                </div>
            </div>
        ),
        {},
    );
}
