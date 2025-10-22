import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import StateSetter from "./_component/StateSetter";
import { BackGuardProvider } from "./_providers/BackGuardProvider";
import { getCurrentUser } from "@/lib/api/server/user";
import ErrorBoundary from "@/components/ErrorBoundary";
import { WebVitals } from "./web-vitals";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 서버에서 user 정보를 한 번만 가져옴 (중복 호출 방지)
  let user: Awaited<ReturnType<typeof getCurrentUser>> | null = null;
  try {
    user = await getCurrentUser();
  } catch (error) {
    // 로그인하지 않은 경우 또는 에러 발생시 user는 null
    console.log('User not logged in or error fetching user');
  }

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[calc(100vh+1px)] flex flex-col`}
      >
        <ErrorBoundary>
          <BackGuardProvider>
            <Navbar />
            {children}
            <StateSetter initialUser={user} />
          </BackGuardProvider>
        </ErrorBoundary>
        <WebVitals />
      </body>
    </html>
  );
}
