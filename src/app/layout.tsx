import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextAuth Starter Template",
  description: "A complete authentication solution for Next.js applications with MongoDB integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col`}
      >
        <SessionProvider>
          <ThemeProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="bg-white dark:bg-gray-800 shadow-inner py-6 mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    NextAuth Starter Template &copy; {new Date().getFullYear()}
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                    A complete authentication solution for Next.js applications
                  </p>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
