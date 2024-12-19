import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {WalletProvider} from "@/components/wallet/app"
import { ConnectButton } from "@rainbow-me/rainbowkit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TodoList app",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <WalletProvider>
         <div className="min-h-screen bg-white">
          <div className="ml-auto">
            <ConnectButton/>
          </div>
          {children}
        </div>
        </WalletProvider>
      </body>
    </html>
  );
}
