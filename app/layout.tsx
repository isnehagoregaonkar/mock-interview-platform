import "./globals.css";

import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import { Toaster } from "sonner";

const geistSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepWise",
  description: "AN AI powered platform for preparing for mock interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} pattern antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
