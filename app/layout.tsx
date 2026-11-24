import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TawkChat from "@/components/TawkChat"; // <-- 1. Yahan import kiya
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
  title: "Professional Embroidery Digitizing & Vector Art Services | NewLeafSkills",
  description: "Expert manual embroidery digitizing and vector art conversion services. 6-8 hour turnaround, zero thread breakage guarantee, all machine formats (DST, PES, EXP, JEF).",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        
        {/* Tawk.to Live Chat Widget */}
        <TawkChat /> {/* <-- 2. Yahan render kar diya */}
      </body>
    </html>
  );
}