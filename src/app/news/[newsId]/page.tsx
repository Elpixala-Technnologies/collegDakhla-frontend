"use client"
import ContainerWithTextBgImg from "@/components/containerWithTextBGImg/containerWithTextBGImg";
import { getNews } from "@/query/schema";
import { getStrapiMedia, GetDefaultImage } from "@/utils/api-helper";
import { getDate } from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { FaLinkedin, FaSquareFacebook, FaXTwitter } from "react-icons/fa6";
import '@/utils/css/tableStyle.css'

type Props = {
	params: {
		newsId: String;
	};
};
export default function NewsPage({ params }: Props) {
	const newsID = params?.newsId;

	// get exam data
	const {
		loading,
		error,
		data: newsData,
	} = useQuery(getNews, {
		variables: { newsID },
	});
	console.log("news data is ", newsData);

	const news = newsData?.new?.data?.attributes;
	console.log("news is ", news);

	const bannerUrl = news?.featuredImage?.data[0]
		? getStrapiMedia(news?.featuredImage?.data[0]?.attributes?.url)
		: GetDefaultImage("banner");


	const articleContent = [
		{ name: "Exploring Generative AI in Content Creation" },
		{ name: "Steering Clear of Common AI Writing Pitfalls" },
		{ name: "Understanding ChatGPT Capabilities - Define Your Style" },
		{ name: "Understand Your Readers" },
		{ name: "Creating Quality AI-powered Blogs that Stand Out" },
		{ name: "Conclusion: Embracing AI in Blog Creation" },
		{ name: "Afterword: The AI Behind This Articles" },
	];
	return (
		<div className="my-6 sm:my-16">
			<section className="left-section">
				<div className="max-w-screen-xl px-4 flex gap-6 md:basis-3/4 w-full md:w-9/12">
					<div className="flex-1 flex flex-col gap-8">
						<div>
							<h2 className="text-3xl font-semibold my-4">
								{news?.title}
							</h2>
							<div className="flex gap-4 items-center">
								{/* <div>
									<Image src={"/avatar.svg"} width={50} height={50} alt="" />
								</div> */}
								<div className="flex flex-col gap-1 justify-center">
									<div className="text-sm font-semibold">Atul Diwedi</div>
									<div className="text-xs">{getDate(news?.publishedAt)}</div>
								</div>
							</div>
						</div>
						<div className="">
							<ContainerWithTextBgImg imagePath={bannerUrl!}>
								<div className="h-full flex flex-col gap-5 justify-end text-primary">
									<p className="bg-slate-50 border rounded px-2 ">
										{news?.excerpt}
									</p>
								</div>
							</ContainerWithTextBgImg>
						</div>
						<div className="flex flex-col gap-4 ">
							{/* <div dangerouslySetInnerHTML={{ __html: news?.content }} className="text-wrap !overflow-x-auto"></div> */}
							<div
								dangerouslySetInnerHTML={{ __html: news?.content }}
								className="font-poppins text-base text-wrap !overflow-x-auto"
							>
							</div>
						</div>

						<div className="flex justify-between items-center gap-[10px] w-full p-4 rounded-[10px] bg-primary text-white">
							<div>Share with your friends!</div>
							<div className="flex gap-4">
								<div className="text-white text-3xl">
									<FaSquareFacebook />
								</div>
								<div className="text-white text-3xl">
									<FaXTwitter />
								</div>
								<div className="text-white text-3xl">
									<FaLinkedin />
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-[10px] w-full p-4 rounded-[10px] bg-primary text-white">
							<div>Share with your community!</div>
							<div className="flex gap-4">
								<div className="text-white text-3xl">
									<FaSquareFacebook />
								</div>
								<div className="text-white text-3xl">
									<FaXTwitter />
								</div>
								<div className="text-white text-3xl">
									<FaLinkedin />
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4 text-primary-text w-80">
							<div className="font-semibold text-xl">In this article</div>
							<div>
								{articleContent.map((item, index) => {
									return (
										<div
											key={index}
											className={`border-l-[3px] ${index === 1
												? "border-primary text-primary"
												: "border-transparent"
												} px-4 py-2 cursor-pointer`}
										>
											{item.name}
										</div>
									);
								})}
							</div>
						</div>
						<div className="flex flex-col gap-4 text-primary-text w-80">
							<div className="font-semibold text-xl">You might like</div>
							<div>
								{articleContent.map((item, index) => {
									return (
										<div
											key={index}
											className={`py-1 font-medium cursor-pointer hover:text-primary`}
										>
											{item.name}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="right-section">
				<div className="max-w-screen-xl px-4 my-10 flex flex-col gap-8">
					<div>
						<h3 className="text-xl font-semibold">Related Articles</h3>
					</div>
					<div className="flex gap-x-6 gap-y-10 flex-wrap">
						{[1, 2, 3, 4, 5].map((item, index) => {
							return (
								<div key={index} className="flex flex-col gap-3 w-56">
									<div>
										<Image
											src={"/news.jpg"}
											alt=""
											width={500}
											height={200}
											style={{ width: "100%" }}
										/>
									</div>
									<div>
										<div className="flex gap-1 items-center flex-1">
											<div className="text-xs font-semibold">Atul Diwedi</div>
											<div>-</div>
											<div className="text-xs font-light">02-March</div>
										</div>
										<div className="font-semibold">
											Lorem Ipsum is simply dummy text of the printing
										</div>
										<div className="text-sm">
											Lorem Ipsum is simply dummy text of the printing and
											typesetting industry. Lorem Ipsum has been the industry's
											standard
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</div>
	);
}
