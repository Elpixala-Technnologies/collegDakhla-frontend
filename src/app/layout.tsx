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
			<body className="bg-gray-100 text-primary-text font-poppins">
				<ApolloWrapper>
					<div className="">{children}</div>
				</ApolloWrapper>
			</body>
		</html>
	);
}
