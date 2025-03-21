import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { link } from "fs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Welcome to my Next.js website!",
  icons: "/public/favicon-for-app/favicon.ico"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/public/task-list-f.svg" type="image/svg+xml" />
      </Head>
      <body className={`${inter.variable} font-inter antialiased`}>
        {children}
      </body>
    </html>
  );
}
