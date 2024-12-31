import { Geist, Geist_Mono } from "next/font/google";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Ovex Assessment",
    description: "Request a quote apis",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AppHeader />
                {children}
                <AppFooter />
            </body>
        </html>
    );
}
