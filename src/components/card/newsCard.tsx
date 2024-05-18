
import Image from "next/image";
import { getStrapiMedia, GetDefaultImage } from "@/utils/api-helper";
import { getAllNews, getNewsCategories } from "@/query/schema";
import { useQuery } from "@apollo/client";
import { AvatarImage, VerifiedIcon } from "@/Asset";
import { getDate } from "@/utils/formatDate";
import Link from "next/link";

export default function NewsCard() {
    const {
        loading: newsLoader,
        error: newsError,
        data: newsData,
    } = useQuery(getNewsCategories);

    const firstCategory = newsData?.newsCategories?.data[0];
    const firstPost = firstCategory?.attributes?.news?.data[0]?.attributes;
    const firstPostImage = firstPost?.featuredImage?.data[0]
        ? getStrapiMedia(firstPost?.featuredImage?.data[0].attributes?.url)
        : GetDefaultImage("banner");
    return (
        <>

            <div className="flex flex-wrap gap-4 my-2 px-0 overflow-x-auto py-2 md:py-0">
                {newsData?.news?.data &&
                    Array.from({
                        length: Math.ceil(newsData.news.data.length / 3),
                    }).map((chunk, index) => (
                        <div key={index} className="flex gap-2 justify-evenly w-full">
                            {newsData.news.data
                                .slice(index * 3, index * 3 + 3)
                                .map((news: any, idx: any) => {
                                    const {
                                        title,
                                        excerpt,
                                        publishedAt,
                                        attributes: { featuredImage },
                                        id,
                                    } = news;
                                    const featuredImageUrl = featuredImage?.data[0]
                                        ? getStrapiMedia(featuredImage.data[0].attributes.url)
                                        : GetDefaultImage("banner");
                                    return (
                                        <div
                                            key={idx}
                                            className="flex flex-col gap-2 max-w-80 min-w-72 p-3  border border-gray-200 rounded-xl justify-between"
                                        >
                                            {news.attributes.featuredImage && (
                                                <Image
                                                    src={featuredImageUrl!}
                                                    alt=""
                                                    width={500}
                                                    height={500}
                                                    className="w-full sm:min-w-28 min-w-20 sm:h-36 h-20 object-cover object-center rounded-lg"
                                                />
                                            )}
                                            <p className="text-gray-400 mt-1">
                                                Published at{" "}
                                                <span className="text-gray-800">
                                                    {getDate(news.attributes.publishedAt)}
                                                </span>
                                            </p>
                                            <p className="sm:text-xl text-base font-normal text-primary-text line-clamp-1">
                                                {news.attributes.title}
                                            </p>
                                            <p className="sm:text-sm text-xs line-clamp-3">
                                                {news.attributes.excerpt}
                                            </p>
                                            <Link
                                                href={`/news/${news.id}`}
                                                className="hover:text-primary text-blue-600 text-lg hover:underline  pt-5"
                                            >
                                                Read more
                                            </Link>
                                        </div>
                                    );
                                })}
                        </div>
                    ))}
            </div>
            {/* <div className="flex relative  border border-[#E5EAF4]">
                <div className="flex flex-col">
                    <div>
                        <Image
                            src={firstPostImage!}
                            alt=""
                            width={500}
                            height={200}
                            style={{ width: "100%", height: "400px" }}
                        />
                    </div>
                    <div className="text-xl font-semibold text-primary p-2">
                    CBSE Class 10th and 12th Results 2024 Likely to Be Declared After May 20
                    </div>

                    <p className="text-[#5A7184] p-2">
                    Students will not be allowed entry to the exam hall after 1:30 pm ...
                    </p>

                    <div className="flex justify-between items-center text-white">
                        <div className="flex gap-2 p-2 items-center">
                        <Image
                                src={AvatarImage}
                                objectFit="cover"
                                width={40}
                                height={40}
                                alt=""
                            />
                            <div className="">
                                <p className="font-semibold text-[#183B56]">Viola Manisa</p>
                                <div className="flex gap-2 text-sm">
                                    <Image src={VerifiedIcon} width={16} height={16} alt="" />
                                    <p className="italic text-[#5A7184]">Verified</p>
                                </div>
                            </div>
                        </div>
                        <div className="font-semibold text-[#5A7184] px-2">2 May</div>
                    </div>
                </div>
            </div> */}
        </>
    );
}
