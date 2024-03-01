"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Tooltip from "../tooltip/tooltip";
import { RiSearchLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { getStreams } from "@/query/schema";
import { useQuery } from "@apollo/client";

export default function Header() {
	const [Path, setPath] = useState("");
	const currentPath = usePathname();
	const [ShowSearch, setShowSearch] = useState(false);
	const [ShowOptions, setShowOptions] = useState(false);

	const handleSearch = () => {
		setShowSearch(!ShowSearch);
	};

	const handleShowOptions = () => {
		setShowOptions(!ShowOptions);
	};

	useEffect(() => {
		setPath(currentPath.split("/")[1]);
	}, [currentPath]);

	useEffect(() => { }, []);

	return (
		<nav className="bg-white relative z-50">
			<div className="h-12 flex gap-4 items-center mx-auto px-4 max-w-screen-xl justify-between">
				<div className="logo flex-none w-24">
					<Link href="/">
						<Image src="/logo.png" alt="" width={64} height={64} />
					</Link>
				</div>
				<div className="flex gap-8 flex-1 items-center">
					<div className="hidden sm:block">
						<Tooltip>
							<NavOption></NavOption>
						</Tooltip>
					</div>

					<div
						className={`${ShowSearch ? "block" : "hidden"
							} w-full md:block md:w-6/12`}
					>
						<div className="flex gap-4 items-center border-2 border-extra-light-text text-extra-light-text px-2 py-1 focus-within:border-secondary-text focus-within:text-secondary-text rounded-md">
							<RiSearchLine />
							<input
								className="w-full outline-none text-sm"
								type="text"
								placeholder="Search College, Course, Exam and more"
							/>
						</div>
					</div>
				</div>

				<div>
					<LoginQASection />
				</div>
				<div className="hidden max-sm:block">
					<div className="flex gap-4 ">
						<div className="" onClick={handleSearch}>
							<RiSearchLine />
						</div>
						<div onClick={handleShowOptions}>
							<GiHamburgerMenu />
						</div>
					</div>
				</div>
			</div>

			{ShowOptions ? (
				<>
					<NavOption></NavOption>
					<LoginQASection />
				</>
			) : (
				<></>
			)}
		</nav>
	);
}

const NavOption = () => {
	// get all streams
	const { loading, error: streamsError, data: streamsData } = useQuery(getStreams);

	return (
		<>
			<div className="flex flex-col gap-2 w-full p-4 sm:p-0 sm:w-6/12 sm:min-w-96">
				{streamsData?.streams?.data?.map((stream: any, index: any) => {
					return (
						<div key={index}>
							<Link
								href={{
									pathname: `/colleges/${stream.attributes.streamName.toLowerCase()}`,
								}}
								className="hover:text-primary"
							>
								Top {stream.attributes.streamName} College
							</Link>
						</div>
					);
				})}
			</div>
		</>
	);
};

const LoginQASection = () => {
	return (
		<>
			<div className="flex gap-8 max-sm:hidden">
				<div>
					<Link href="/login" className="text-sm hover:text-primary">
						Log In & Sign Up{" "}
					</Link>
				</div>
				<div>
					<Link href={"/"} className="text-sm hover:text-primary">
						Q&A
					</Link>
				</div>
			</div>
		</>
	);
};
