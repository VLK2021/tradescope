import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {cookies} from "next/headers";

import "./globals.css";

import {
    getValidLanguage,
    getValidTheme,
} from "@/src/helpers";
import {
    LanguageProvider,
    ThemeProvider,
} from "@/src/context";
import {SiteShell} from "@/src/components/layout";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TradeScope",
    description:
        "Personal cryptocurrency trading setup manager.",
};

type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export default async function RootLayout({
                                             children,
                                         }: RootLayoutProps) {
    const cookieStore = await cookies();

    const initialLang = getValidLanguage(
        cookieStore.get("lang")?.value,
    );

    const initialTheme = getValidTheme(
        cookieStore.get("theme")?.value,
    );

    return (
        <html
            lang={initialLang}
            className={`
                ${initialTheme}
                ${geistSans.variable}
                ${geistMono.variable}
                h-full
                antialiased
            `}
            suppressHydrationWarning
        >
        <body className="min-h-full">
        <ThemeProvider initialTheme={initialTheme}>
            <LanguageProvider initialLang={initialLang}>
                <SiteShell>
                    {children}
                </SiteShell>
            </LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}