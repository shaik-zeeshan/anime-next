import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { TailwindInticator } from "@/components/tailwind-indicator";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LazyMotionWrapper } from "@/components/lazymotion-wrapper";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "500", "700"],
});

const appURL = new URL(
    process.env.NEXT_PUBLIC_BASE_URL
        ? `https://${process.env.NEXT_PUBLIC_BASE_URL as string}`
        : `http://localhost:3000`,
);

export const metadata: Metadata = {
    metadataBase: appURL,
    title: "Anime Tracking App",
    description: "Track your anime progress",
};

export const viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "cyan" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={poppins.className}>
                <SpeedInsights />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <LazyMotionWrapper>{children}</LazyMotionWrapper>
                    <div className="fixed bottom-3 right-2 z-50">
                        <ThemeToggle />
                    </div>
                    <TailwindInticator />
                </ThemeProvider>
            </body>
        </html>
    );
}
