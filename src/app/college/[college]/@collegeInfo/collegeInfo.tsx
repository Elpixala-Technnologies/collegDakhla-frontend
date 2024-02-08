import Author from "@/components/author/author";
import Button from "@/components/button/button";
import CollegeDescription from "@/components/collegeDescription/collegeDescription";
import CoursesOffered from "@/components/coursesOffered/coursesOffered";
import FeesEligibility from "@/components/fees&Eligibilty/feesEligibility";
import Image from "next/image";


var abc = [
	"IIM Bangalore Highlights",
	"IIM Bangalore Important Dates 2024",
	"IIM Bangalore Fees",
	"IIM Bangalore Courses",
	"IIM Bangalore Admission 2024",
	"IIM Bangalore Cut - off 2024(Expected)"
]

var images = [

]



export default function CollegeInfo({ info }: any) {
	console.log(info?.collegeDescription);
	const collegeDescription = info?.collegeDescription ? info?.collegeDescription : '';

	return (
		<>
			<div className="container h-full my-10">
				<div className="main-wrapper flex gap-4">
					<div className="left-wrapper w-full basis-3/4 flex flex-col gap-6">
						<section className="bg-gray-50 rounded-xl p-5">
							<Author></Author>
							<div className="college-details-wrapper font-poppins text-base	">
								<div dangerouslySetInnerHTML={{ __html: collegeDescription }}></div>
							</div>
							{/* Render College name here */}
							{abc.map(collegeName => (<CollegeDescription key={Math.random() * 1000} name={collegeName} />))}
						</section>
						<FeesEligibility />
						<CoursesOffered />
					</div>
					<div className="right-wrapper basis-1/4 rounded md:flex md:flex-col md:gap-2 hidden">
						<Button href={`/college/`} text="Apply Now" filled fontSize="text-sm" fontWeight="font-bold" width="w-full" align="text-center" />
						<Button href={`/college/`} text="Download Brochure" outline fontSize="text-sm" width="w-full" align="text-center" />
						<div className="college-videos bg-gray-50 p-3">
							<h4 className="text-base font-bold font-poppins border-b-2 pb-2">Videos</h4>
							<div className="py-4">
								<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameBorder="0" height="168" src="https://www.youtube.com/embed/4-YEBaUXUGo" title="video" width="100%" className="jsx-4002731190"></iframe>
							</div>
							<div>
								<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameBorder="0" height="168" src="https://www.youtube.com/embed/4-YEBaUXUGo" title="video" width="100%" className="jsx-4002731190"></iframe>
							</div>
						</div>
						<div className="college-photos gap-1 columns-2">

							<div className="col-6">
								<Image src="/140724328776347_10150270122024944_741327732_n.webp" alt="" width={100} height={80}></Image>
							</div>
							<div className="col-6">
								<Image src="/140724328776347_10150270122024944_741327732_n.webp" alt="" width={100} height={80}></Image>
							</div>
							<div className="col-6">
								<Image src="/140724328776347_10150270122024944_741327732_n.webp" alt="" width={100} height={80}></Image>
							</div>
							<div className="col-6">
								<Image src="/140724328776347_10150270122024944_741327732_n.webp" alt="" width={100} height={80}></Image>
							</div>
							<div className="col-6">
								<Image src="/140724328776347_10150270122024944_741327732_n.webp" alt="" width={100} height={80}></Image>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>)
}