import { Divider } from "@mui/material";
import Link from "next/link";
import Button from "../button/button";

let coursesOffered = {}

export default function CoursesOffered(props: any) {
	return (
		<section className="courses-offered-wrapper container h-auto p-5 bg-gray-50 rounded-xl">
			<h2 className="text-lg font-bold mb-2">Courses Offered By `{props?.collegeName}`
			</h2>
			<Divider />
			<div className="course-card flex flex-col gap-1 my-3">
				<div className="course-heading flex items-center">
					<div className="course-name">
						<Link href={""}>
							<p className="course-name text-base font-semibold">Post Graduate Program in Management [PGPM]</p>
						</Link>
					</div>
					<div className="course-fees ml-auto text-slate-600 text-right font-weight-medium text-sm flex flex-col">
						<span className="fee text-success font-weight-bold mr-2 text-lg"> ₹ 2,450,000</span>
						Total Fees
					</div>
				</div>
				<div className="course-info flex items-center">
					<div className="course-labels text-sm gap-2 hidden md:flex">
						<span className="text-year">2 Years</span>
						<span className="text-degree">Degree</span>
						<span className="text-silver">On Campus</span>
						<span className="text-link">Full Time</span>
					</div>
					<span className="text-primary ml-auto text-right">
						<Link href={""}>Check Detailed page</Link>
					</span>
				</div>
				<div className="course-details-wrapper text-sm gap-y-px">
					<div className="exams-details mb-2">
						<span className="exam-head text-gray">Exams Accepeted: </span>
						<span className="exam-details text-primary font-medium">
							<Link href={"/"}>
								CAT
							</Link>
						</span>
					</div>
					<div className="cutoff-details mb-2">
						<span className="cutoff-head text-gray">Cuttoff: </span>
						<span className="cutoff-details font-medium">PG Programme in Business Analytics CAT 2023 Cut off: 99</span>
					</div>
					<div className="course-deadline mb-2">
						<span className="deadline-head text-gray">Application Deadline: </span>
						<span className="deadline-data font-medium">2 Aug - 31 Jan 2024</span>
					</div>
				</div>
				<div className="course-links flex gap-2">
					<Button href={""} text={"Addmission Predictor"} width="100px"></Button>
					<Button href={""} text={"Download Brochure"}></Button>
					<Button href={""} text={"Compare"}></Button>
				</div>
			</div>
			<Divider></Divider>
			<div className="course-card flex flex-col gap-1 my-3">
				<div className="course-heading flex items-center">
					<div className="course-name">
						<Link href={""}>
							<p className="course-name text-base font-semibold">Post Graduate Program in Management [PGPM]</p>
						</Link>
					</div>
					<div className="course-fees ml-auto text-slate-600 text-right font-weight-medium text-sm">
						<span className="fee text-success font-weight-bold mr-2 text-lg"> ₹ 2,450,000</span>
						Total Fees
					</div>
				</div>
				<div className="course-info flex items-center ">
					<div className="course-labels text-sm gap-2 hidden md:flex">
						<span className="text-year">2 Years</span>
						<span className="text-degree">Degree</span>
						<span className="text-silver">On Campus</span>
						<span className="text-link">Full Time</span>
					</div>
					<span className="text-primary ml-auto text-right">
						<Link href={""}>Check Detailed page</Link>
					</span>
				</div>
				<div className="course-details-wrapper text-sm gap-y-px">
					<div className="exams-details mb-2">
						<span className="exam-head text-gray">Exams Accepeted: </span>
						<span className="exam-details text-primary font-medium">
							<Link href={"/"}>
								CAT
							</Link>
						</span>
					</div>
					<div className="cutoff-details mb-2">
						<span className="cutoff-head text-gray">Cuttoff: </span>
						<span className="cutoff-details font-medium">PG Programme in Business Analytics CAT 2023 Cut off: 99</span>
					</div>
					<div className="course-deadline mb-2">
						<span className="deadline-head text-gray">Application Deadline: </span>
						<span className="deadline-data font-medium">2 Aug - 31 Jan 2024</span>
					</div>
				</div>
				<div className="course-links flex gap-2">
					<Button href={""} text={"Addmission Predictor"} width="100px"></Button>
					<Button href={""} text={"Download Brochure"}></Button>
					<Button href={""} text={"Compare"}></Button>
				</div>
			</div>
			<Divider></Divider>
			<div className="course-card flex flex-col gap-1 my-3">
				<div className="course-heading flex items-center">
					<div className="course-name">
						<Link href={""}>
							<p className="course-name text-base font-semibold">Post Graduate Program in Management [PGPM]</p>
						</Link>
					</div>
					<div className="course-fees ml-auto text-slate-600 text-right font-weight-medium text-sm">
						<span className="fee text-success font-weight-bold mr-2 text-lg"> ₹ 2,450,000</span>
						Total Fees
					</div>
				</div>
				<div className="course-info flex items-center">
					<div className="course-labels text-sm gap-2 hidden md:flex">
						<span className="text-year">2 Years</span>
						<span className="text-degree">Degree</span>
						<span className="text-silver">On Campus</span>
						<span className="text-link">Full Time</span>
					</div>
					<span className="text-primary ml-auto text-right">
						<Link href={""}>Check Detailed page</Link>
					</span>
				</div>
				<div className="course-details-wrapper text-sm gap-y-px">
					<div className="exams-details mb-2">
						<span className="exam-head text-gray">Exams Accepeted: </span>
						<span className="exam-details text-primary font-medium">
							<Link href={"/"}>
								CAT
							</Link>
						</span>
					</div>
					<div className="cutoff-details mb-2">
						<span className="cutoff-head text-gray">Cuttoff: </span>
						<span className="cutoff-details font-medium">PG Programme in Business Analytics CAT 2023 Cut off: 99</span>
					</div>
					<div className="course-deadline mb-2">
						<span className="deadline-head text-gray">Application Deadline: </span>
						<span className="deadline-data font-medium">2 Aug - 31 Jan 2024</span>
					</div>
				</div>
				<div className="course-links flex gap-2">
					<Button href={""} text={"Addmission Predictor"} width="100px"></Button>
					<Button href={""} text={"Download Brochure"}></Button>
					<Button href={""} text={"Compare"}></Button>
				</div>
			</div>
		</section>
	)
}