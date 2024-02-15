import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ApolloWrapper } from "@/lib/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "College Dakhla",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200 text-primary-text font-poppins">
        <ApolloWrapper>
          <Header />
          <div className="">{children}</div>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}
