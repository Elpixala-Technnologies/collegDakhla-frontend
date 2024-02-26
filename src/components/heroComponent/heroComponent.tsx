import Image from "next/image";
import { RiSearchLine } from "react-icons/ri";
export default function HeroSection() {
	return (
		<>
			<div className="relative w-full h-[80vh]">
				<img
					src={"/collegeImg.jpg"}
					alt="College"
					className="object-cover w-full h-full"
				/>
				<div className="absolute inset-0  bg-gradient-to-b from-[#000]  to-transparent"></div>
				<div className=" max-w-screen-xl mx-auto">
					<div className="absolute top-4 flex gap-4 text-white px-4 text-sm">
						<div>All Courses</div>
						<div>B.Tech</div>
						<div>MBA</div>
						<div>M.Tech</div>
						<div>MBBS</div>
						<div>B.Com</div>
						<div>B.Sc</div>
						<div>B.Sc Nursing</div>
						<div>BCA</div>
						<div>BBA</div>
						<div>BA</div>
					</div>
				</div>
				<div className="absolute inset-0 p-2 flex flex-col justify-center items-center  max-w-screen-xl mx-auto">
					<h1 className="text-white text-xl sm:text-4xl py-4">
						Find 2500+ colleages in India
					</h1>
					<div className="Search flex bg-white items-center rounded-md w-8/12 min-w-min">
						<div className="p-3 text-extra-light-text">
							<RiSearchLine />
						</div>
						<div className="flex-1">
							<input type="text" placeholder="Search For college, Exam" />
						</div>
						<div className="px-4 py-2 bg-primary text-white font-bold text-lg rounded-r-md">
							search
						</div>
					</div>
					<div className="flex gap-4 my-4 w-8/12 justify-between items-center">
						<div className="flex text-white items-center gap-4">
							<div className="font-semibold">Recent Visit:</div>
							<div className="p-1 border border-white rounded text-sm">BCA</div>
							<div className="p-1 border border-white rounded text-sm">BBA</div>
							<div className="p-1 border border-white rounded text-sm">
								B.Tech
							</div>
						</div>
						<div className="bg-primary text-white text-sm font-semibold py-1 px-8 rounded">
							Need Counselling
						</div>
					</div>
				</div>
				<div className="w-8/12 mx-auto text-right">
					<div className="absolute bottom-4 right-20 text-white px-4 text-sm justify-end">
						Sita Ram College of Commerse, Delhi{" "}
						<span className="bg-black bg-opacity-50 p-1 rounded-md">1/3</span>
					</div>
				</div>
			</div>
		</>
	);
}

{
	/* <div className="relative w-screen h-[90vh] overflow-hidden">
	<img
		src={"/collegeImg.jpg"}
		alt="College"
		className="object-cover w-full h-full"
	/>
	<div className="absolute inset-0 bg-black bg-opacity-50"></div>
	<div className="absolute inset-0 p-2 flex flex-col justify-center  items-center">
		<div className="bg-white rounded-full px-2 py-1 text-xs">
			Featured
		</div>
	</div>
</div>
</div> */
}
