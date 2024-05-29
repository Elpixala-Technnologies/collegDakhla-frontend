import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ApolloWrapper } from "@/lib/client";
import ReduxProvider from "@/store/provider";

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
			<body className=" text-primary-text font-poppins">
				<ReduxProvider>
					<ApolloWrapper>
						<Header />
						<div className="">{children}</div>
						<Footer />
					</ApolloWrapper>
				</ReduxProvider>
			</body>
		</html>
	);
}
