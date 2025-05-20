import type { Metadata } from "next";

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
    <div className="min-h-[calc(100vh-4rem)] flex justify-center pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {children}
      </div>
    </div>
  );
}