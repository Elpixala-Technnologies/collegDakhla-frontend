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

export default function CollegeInfo() {
	return (
		<>
			<div className="container h-full my-10">
				<div className="main-wrapper flex gap-4">
					<div className="left-wrapper w-full basis-3/4 flex flex-col gap-6">
						<section className="bg-gray-50 rounded-xl p-5">
							<Author></Author>
							<div className="college-details-wrapper font-poppins text-base	">
								<p>
									IIM Bangalore, established in 1973 is the 2nd best management institute in India, according to NIRF ranking. IIMB Flagship MBA and EMBA program has also been ranked 52nd by the FT Global Rankings 2023. IIM Bangalore's 2-year MBA program offers admission through CAT. IIM Bangalore cut-off is around 85 percentile overall for the Written Ability Test (WAT) and Personal Interview (PI) round.
								</p>
								<p>
									IIM Bangalore MBA fees is INR 24,50,000, while the IIM Bangalore average package stood at INR 35.31 LPA for the 2024 batch. IIM Bangalore placement 2023 has also concluded with a 100% placement and with offers from top recruiters like Adani Group, Paytm, Microsoft, Cogoport, Jio Platform, Accenture, and BCG.
								</p>
							</div>
							{/* Render College name here */}
							{abc.map(collegeName => (<CollegeDescription name={collegeName} />))}
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