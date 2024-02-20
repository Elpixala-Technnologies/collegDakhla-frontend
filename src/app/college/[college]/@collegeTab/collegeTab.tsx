import Author from "@/components/author/author";
import Button from "@/components/button/button";
import CollegeDescription from "@/components/collegeDescription/collegeDescription";
import CoursesOffered from "@/components/coursesOffered/coursesOffered";
import FeesEligibility from "@/components/fees&Eligibilty/feesEligibility";
import Table from "@/components/table/table";
import Image from "next/image";


export default function CollegeTab(props: any) {
	// console.log("info is ", props?.data);

	//const collegeDescription = info?.collegeDescription ? info?.collegeDescription : '';
	return (
		<>
			<div className="container h-full my-10">
				<div className="main-wrapper flex gap-4">
					<div className="left-wrapper basis-3/4 w-9/12 flex flex-col gap-5">

						<div className="author-section bg-gray-50 rounded-xl p-5">
							<Author />
						</div>
						<div className="page-data-wrapper">
							{props?.data?.map((item: any, index: number) => {
								// console.log("item is ", item.data);
								const tableRegex = /<table[^>]*>[\s\S]*?<\/table>/;
								const tableMatch = item?.data.match(tableRegex);
								const extractedTableHtml = tableMatch ? tableMatch[0] : '';
								// console.log("extractedTableHtml ", extractedTableHtml);
								//extractedTableHtml.style("bg-black")

								return (

									(!extractedTableHtml) ? (<div className=" h-auto p-5 bg-gray-50 rounded-xl font-poppins text-base text-wrap mb-5" key={index}>
										<h2 className="text-md font-bold mb-2 text-primary"> {item?.heading}</h2>
										<div dangerouslySetInnerHTML={{ __html: item?.data }} className="text-wrap"></div>
									</div>) : (<div className=" h-auto p-5 bg-gray-50 rounded-xl font-poppins text-base text-wrap mb-5" key={index}>
										<h2 className="text-md font-bold mb-2 text-primary"> {item?.heading} agam</h2>
										{/* <div dangerouslySetInnerHTML={{ __html: extractedTableHtml }} className="text-wrap w-full overflow-x-auto"></div> */}
										<Table tableData={extractedTableHtml} />
									</div>)


								)
							})}
						</div>
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