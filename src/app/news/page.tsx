"use client"
import Button from "@/components/button/button";
import ContainerWithTextBgImg from "@/components/containerWithTextBGImg/containerWithTextBGImg";
import { getAllNews, getNewsCategories } from "@/query/schema";
import { getStrapiMedia, GetDefaultImage } from "@/utils/api-helper";
import { useQuery } from "@apollo/client";
import Image from "next/image";

export default function News() {

	const {
		loading: newsLoader,
		error: newsError,
		data: newsData,
	} = useQuery(getNewsCategories);
	console.log("all news are ", newsData);

	const firstCategory = newsData?.newsCategories?.data[0]
	const firstPost = firstCategory?.attributes?.news?.data[0]?.attributes
	const firstPostImage = firstPost?.featuredImage?.data[0] ? getStrapiMedia(firstPost?.featuredImage?.data[0].attributes?.url) : GetDefaultImage("banner")


	return (
		<>
			< section className="first-category" >
				<div className="max-w-screen-xl mx-auto px-4 py-4">
					<div className="mb-4">
						<h3 className="text-2xl font-semibold">{firstCategory?.attributes?.category}</h3>
					</div>
					<div className="grid grid-cols-2 grid-rows-5 gap-x-6 gap-y-4">
						<div className="news-left row-span-5 col-span-1 flex flex-col gap-3">
							<div className="relative">
								<div className="w-full">
									<Image
										src={firstPostImage!}
										alt=""
										width={500}
										height={200}
										style={{ width: "100%", height: "400px" }}
									/>
								</div>
								<div className="absolute top-4 left-4 bg-cyan-400 px-1 py-[2px] text-xs text-white tracking-wider  uppercase">
									{firstCategory?.attributes?.category}
								</div>
							</div>
							<div className="meta-data flex gap-1 items-center">
								<div className="text-xs font-semibold">Atul Diwedi</div>
								<div>-</div>
								<div className="text-xs font-light">02-March</div>
							</div>
							<div className="font-semibold text-primary">
								{firstPost?.title}
							</div>
							<div className="text-sm">
								{firstPost?.excerpt}
							</div>
						</div>

						{/* first category posts */}
						{firstCategory?.attributes?.news?.data?.slice(1, 6).map((newsItem: any, index: number) => {

							const featuredImageUrl = newsItem?.attributes.featuredImage?.data[0] ? getStrapiMedia(newsItem?.attributes.featuredImage?.data[0].attributes?.url) : GetDefaultImage("banner")

							return (
								<div
									className="row-span-1 col-span-1 flex gap-4 items-center"
									key={index}
								>
									<div>
										<Image
											src={featuredImageUrl!}
											alt={newsItem?.id}
											width={200}
											height={200}
											style={{}}
										/>
									</div>
									<div>
										<div className="flex gap-1 items-center flex-1">
											<div className="text-xs font-semibold">Atul Diwedi</div>
											<div>-</div>
											<div className="text-xs font-light">02-March</div>
										</div>
										<div className="font-semibold text-primary">
											{newsItem?.attributes?.title}
										</div>
										<div className="text-sm">
											{newsItem?.attributes?.excerpt}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section >

			{newsData?.newsCategories?.data?.slice(1).map((newsCategory: any, index: number) => {
				console.log("news category is ", newsCategory?.attributes?.news?.data[0]);
				if ((index + 1) % 2 == 0) {
					return (<section>
						<div className="max-w-screen-xl mx-auto px-4 my-10 flex flex-col gap-8">
							<div>
								<h3 className="text-xl font-semibold">{newsCategory?.attributes?.category}</h3>
							</div>
							<div className="flex gap-x-6 gap-y-10 flex-wrap">
								{newsCategory?.attributes?.news?.data?.slice(0, 10).map((news: any, index: any) => {
									const featuredImageUrl = news?.featuredImage?.data[0] ? getStrapiMedia(news?.featuredImage?.data[0].attributes?.url) : GetDefaultImage("banner")
									return (
										<div key={index} className="flex flex-col gap-3 w-56">
											<div>
												<Image
													src={featuredImageUrl!}
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
												<div className="font-semibold text-primary">
													{news?.attributes?.title}
												</div>
												<div className="text-sm">
													{news?.attributes?.excerpt}
												</div>
											</div>
										</div>
									);
								})}
							</div>
							<div className="flex justify-center">
								<Button
									text="Show More"
									outline={true}
									outlineColor="border-primary"
									fontColor="text-primary"
								/>
							</div>
						</div>
					</section>)
				}
				else {
					const heroNews = newsCategory?.attributes?.news?.data[0]?.attributes
					return (
						<section>
							<div className="max-w-screen-xl mx-auto px-4 my-16 flex flex-col gap-6">
								<div>
									<h3 className="text-xl font-semibold">{newsCategory?.attributes?.category}</h3>
								</div>

								<div className="flex flex-col gap-8">
									<ContainerWithTextBgImg imagePath={"/news.jpg"}>
										<div className="h-full flex flex-col gap-5 justify-end text-white">
											<div className="text-2xl font-bold text-primary">
												{heroNews?.title}
											</div>
											<div className="border-t border-t-orange-500 h-[1px] w-24"></div>
											<div className="flex gap-20 text-lg">
												<div className="w-1/2 leading-7">
													{heroNews?.excerpt}
												</div>
											</div>
										</div>
									</ContainerWithTextBgImg>
									<div className="flex gap-4 text-primary-text justify-between">
										{newsCategory?.attributes?.news?.data?.slice(1, 3)?.map((news: any) => {
											const featuredImageUrl = news?.attributes.featuredImage?.data[0] ? getStrapiMedia(news?.attributes.featuredImage?.data[0].attributes?.url) : GetDefaultImage("banner")

											return (
												<div className="flex gap-4">
													<div>
														<Image
															src={featuredImageUrl!}
															alt=""
															width={200}
															height={200}
															className="w-40 h-24"
														/>
													</div>
													<div className="flex flex-col gap-3">
														<div className="text-[10px]">
															<span>Craig Bator - </span>
															<span className="text-primary-text opacity-80">
																27 Dec 2020
															</span>
														</div>
														<div className="font-semibold text-primary">
															{news?.attributes?.title}
														</div>
													</div>
												</div>
											)
										})}
									</div>
								</div>
							</div>
						</section>
					)
				}

			})}

		</>
	);
}
