import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Art 1O1",
  description: "Software Design and Documentation, 2026 Fall, Group Project",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="w-full min-h-full flex flex-col">
        <div className="w-full bg-white">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
