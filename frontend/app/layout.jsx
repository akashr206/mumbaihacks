import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SidebarOpenProvider } from "@/hooks/useSidebar";
import LayoutContent from "./LayoutContent";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Team Arise",
    description: "Team Arise's MumbaiHacks project",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-zinc-950`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <SidebarOpenProvider>
                        <LayoutContent>{children}</LayoutContent>
                    </SidebarOpenProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
