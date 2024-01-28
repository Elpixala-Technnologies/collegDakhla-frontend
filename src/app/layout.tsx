import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200 text-primary-text font-poppins">
        <Header/>
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
        <Footer/>
        </body>
    </html>
  );
}
