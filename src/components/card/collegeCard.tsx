/* eslint-disable @next/next/no-img-element */
import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaMedal } from "react-icons/fa6";
import Tag from "../tag/tags";
import { BiBadgeCheck } from "react-icons/bi";
import { BsFlag } from "react-icons/bs";
import StarRating from "../starRating/starRating";
import Swal from "sweetalert2";
import useUserMetaData from "@/query/hooks/useUserMetaData";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import useSignup from "@/query/hooks/useSignup";
import { ID } from "@/types/global";
import { useQuery } from "@apollo/client";
import { GET_USER_METADATA_COLLEGE } from "@/graphql/userSchema/userSchema";
import userFrom from "@/hooks/userFrom";
import { FaRegHeart } from "react-icons/fa";

export default function CollegeCard({ featuredCollege }: any) {
	let college = featuredCollege?.attributes;
	const logoURL = college?.collegeLogo?.data?.attributes?.url
		? getStrapiMedia(college?.collegeLogo?.data?.attributes?.url)
		: GetDefaultImage("logo");
	const bannerURL = college?.banner?.data[0]
		? getStrapiMedia(college?.banner?.data[0]?.attributes?.url)
		: GetDefaultImage("banner");

	const collegeId = featuredCollege?.id;

	const { CollegeApplicatonListData, saveCollege } = userFrom();
	const { GetUserMetaData } = useUserMetaData();
	const [showLoginPopup, setShowLoginPopup] = useState(false);

	const closeLoginPopup = () => {
		setShowLoginPopup(false);
	};

	const { userID } = useAppSelector((store: any) => store.auth);
	let isLogin = useAppSelector((state) => state.auth.authState);

	const { GetUserDataMetaId } = useSignup();

	const userMetaId: ID = GetUserDataMetaId(userID);

	const userData = GetUserMetaData(userMetaId);

	const AppliedCollege: any = userData?.userAllMetaData?.appliedColleges;

	const isCollegeApplied =
		Array.isArray(AppliedCollege) &&
		AppliedCollege?.some(
			(applied: { college: { data: { id: any } } }) =>
				applied?.college?.data?.id === collegeId
		);

	const {
		data: CollgeMetaUser,
		loading: collegeMetaLoading,
		error: collegeMetaError,
	} = useQuery(GET_USER_METADATA_COLLEGE, {
		variables: { id: userMetaId },
	});

	const [selectedSaveCollege, setSelectedSaveCollege] = useState<any[]>([]);
	const [saveCollegeData, setSaveCollegeData] = useState<any[]>([]);
	const [isSave, setIsSave] = useState<any>(false);
	const uniqueId = () => Math.random().toString(36).substr(2, 9);

	useEffect(() => {
		const existingColleges =
			CollgeMetaUser?.usersMetaData?.data[0]?.attributes?.saveColleges;
		setSaveCollegeData(existingColleges);
	}, [CollgeMetaUser]);

	const existingColleges =
		saveCollegeData?.map((extD) => ({
			id: extD?.college?.data?.id,
			attributes: {
				college: extD?.college?.data?.id,
			},
		})) || [];

	useEffect(() => {
		setSelectedSaveCollege([
			{
				id: uniqueId(),
				attributes: {
					college: collegeId,
				},
			},
		]);
	}, [collegeId]);

	const mergeData = [...existingColleges, ...selectedSaveCollege];

	const handleSaveCollege = async () => {
		try {
			if (isLogin) {
				const response = await saveCollege({
					variables: {
						id: userMetaId,
						saveColleges: mergeData?.map((item: any) => ({
							college: item?.attributes?.college,
						})),
					},
				});

				if (response?.data) {
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Successfully Saved",
						showConfirmButton: false,
						timer: 1500,
					});
					setIsSave(true);
				}
			} else {
				setShowLoginPopup(true);
			}
		} catch (error) {
			console.error("Error saving college:", error);
		}
	};

	const AlreadyApplyedCollegeFilter = saveCollegeData?.filter((item: any) => {
		return item.college.data.id === collegeId;
	});

	return (
		<div className="flex flex-col items-stretch min-w-56 bg-white rounded-lg drop-shadow-sm hover:drop-shadow-lg">
			<div className="relative rounded-t-lg">
				<img
					src={bannerURL!}
					alt={college?.name}
					className="w-full h-28 object-cover rounded-t-lg"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg"></div>
				<div className="absolute inset-0 px-2 py-3 flex justify-between max-h-max items-center">
					<>
						{college?.isFeaturedCollege ? (
							<div className="bg-white rounded-full px-2 py-1 text-base text-primary flex gap-2 items-center">
								<FaMedal className="h-4 w-4" />
								<div className="text-sm">Featured</div>
							</div>
						) : <></>
						}
					</>
					<div className="ml-auto">
						<button
							onClick={() => handleSaveCollege()}
							disabled={isSave || AlreadyApplyedCollegeFilter?.length > 0}
							className="rounded-full p-1 text-sm cursor-pointer text-white"
						>
							{isSave || AlreadyApplyedCollegeFilter?.length > 0 ? (
								<FaHeart size={10} color="red" />
							) : (
								<FaRegHeart color="black" size={10} />
							)}
						</button>
					</div>
				</div>
			</div>
			<div className="relative flex flex-col">
				<div className="absolute left-2 -top-7">
					<Image
						src={logoURL!}
						alt=""
						className="shadow-md rounded-sm "
						width={60}
						height={60}
					/>
				</div>
				<div className="p-2 pt-4 flex-1 h-fit shadow flex flex-col gap-2">
					<div className=" flex justify-end">
						<StarRating rating={3.6} />
					</div>

					<h4 className="text-primary font-semibold truncate max-w-60">
						{college.collegeName}
					</h4>

					<p className="text-xs text-secondary-text">
						{college.city?.data?.attributes?.name},
						{college.state?.data?.attributes?.name}
					</p>
					<div className="text-sm text-secondary-text flex gap-2 items-center">
						<div className="flex gap-1 items-center">
							<span>
								<BiBadgeCheck />
							</span>
							<span className="text-xs">
								Approved By:
							</span>
						</div>
						<div className="flex gap-2">
							<Tag
								text={"UGC"}
								bgcolor="bg-blue-100"
								color="text-gray-800"
								borderColor="transparent"
								rounded
								fontSize="text-xs"
							/>
							<Tag
								text={"AICTC"}
								bgcolor="bg-yellow-400"
								color="text-gray-800"
								borderColor="transparent"
								rounded
								fontSize="text-xs"
							/>
						</div>
						{/* {college.rankedBy?.data[0]?.attributes
              ? college.rankedBy?.data[0]?.attributes.name
              : "UGC"} */}
					</div>
					<div className="text-xs text-secondary-text flex gap-1 items-center">
						<div>
							<BsFlag />
						</div>
						<div>{college?.college_type?.data?.attributes?.type}</div>
					</div>
				</div>
				<Link href={`/colleges/${college?.url}`}>
					<div className="w-full p-2 bg-gradient-to-l from-gray-300 via-gray-500 to-gray-900 rounded-b-lg text-center text-white text-sm">
						Apply Now
					</div>
				</Link>
			</div>
		</div>
	);
}
