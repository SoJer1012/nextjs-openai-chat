import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideNav from "./components/sidenav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextjs-OpenAI-Chat",
  description: "Examples of using the Vercel AI SDK with Next.js and OpenAI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-2 overflow-hidden md:overflow-y-auto md:p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
