import type { Metadata } from "next";
import { Inria_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inriaSans = Inria_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crypto Catch",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inriaSans.className} bg-stone-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
