import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import StateSetter from "./_component/StateSetter";
import { BackGuardProvider } from "./_providers/BackGuardProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nmemou",
  description: "Nmemou - 당신의 메모장",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <BackGuardProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[calc(100vh+1px)] flex flex-col`}
        >
          <Navbar />
          {children}
        </body>
        <StateSetter />
      </BackGuardProvider>
    </html>
  );
}
