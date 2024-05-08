"use client";
import ContainerWithTextBgImg from "@/components/containerWithTextBGImg/containerWithTextBGImg";
import { getAllNews, getNews } from "@/query/schema";
import { getStrapiMedia, GetDefaultImage } from "@/utils/api-helper";
import { getDate } from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { FaLinkedin, FaSquareFacebook, FaXTwitter } from "react-icons/fa6";
import "../../../utils/css/tableStyle.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { slideInFromLeft } from "@/components/Motion/motion";

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

  //get all news in descending order
  const {
    loading: newsLoader,
    error: newsError,
    data: newsRelatedData,
  } = useQuery(getAllNews);


  // useEffect(() => {
  //   if (news.length > 0) {
  //     const currentIndex = news.findIndex((news) => news.id === currentNewsId);
  //     if (currentIndex !== -1) {
  //       const upcoming = news.filter((_, index) => index !== currentIndex);
  //       setUpcomingNews(upcoming);
  //     }
  //   }
  // }, [news, currentNewsId]);


  const news = newsData?.new?.data?.attributes;
  const relatednews = newsRelatedData?.new?.data?.attributes;
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
  console.log("newdata112", newsData);
  return (
    <div className="my-6 sm:my-16">
      <section className="left-section">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 md:col-span-3 flex flex-col gap-8 text-wrap">
              <div>
                <h2 className="text-3xl font-semibold my-4">{news?.title}</h2>
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col gap-1 justify-center">
                    <span className="text-gray-800">
                      Published at : {" "}
                      {getDate(news?.publishedAt)}
                    </span>
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
              <div className="flex flex-col gap-4 p-4 bg-white">
                <div
                  dangerouslySetInnerHTML={{ __html: news?.content }}
                  className="font-poppins text-base text-wrap !overflow-x-auto overflow-hidden"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                ></div>
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
            <div className="hidden md:block col-span-1">
              <div className=" flex flex-col gap-4">
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
          </div>
        </div>
      </section>
      <section className="right-section">
        <div className="max-w-screen-xl mx-auto px-4 py-5 my-10 flex flex-col gap-4 bg-white rounded-lg">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-3xl font-semibold p-4">Related News</h3>
            <div className="flex flex-row  my-6">
              <div className="flex md:flex-row flex-col gap-6 md:items-center"></div>
              <div>
                <Link
                  href="/news"
                  className="flex text-lg text-nowrap gap-1 md:gap-2 text-[#1268F5] items-center"
                >
                  <span>View All</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height={25}
                    width={25}
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M17.6453 19.0736L24.2188 12.5002L17.6453 5.92676L16.5404 7.03164L21.2278 11.719H0.818556V13.2815H21.2277L16.5404 17.9688L17.6453 19.0736Z"
                      fill="#1268F5"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 my-2 px-0 overflow-x-auto py-2 md:py-0">
            {newsRelatedData?.news?.data &&
              Array.from({
                length: Math.ceil(newsRelatedData.news.data.length / 3),
              }).map((chunk, index) => (
                <div key={index} className="flex gap-2 justify-evenly w-full">
                  {newsRelatedData.news.data
                    .slice(index * 3, index * 3 + 3)
                    .map((relatedNews: any, idx: any) => {
                      const {
                        title,
                        excerpt,
                        publishedAt,
                        author,
                        attributes: { featuredImage },
                        id,
                      } = relatedNews;
                      const featuredImageUrl = featuredImage?.data[0]
                        ? getStrapiMedia(featuredImage.data[0].attributes.url)
                        : GetDefaultImage("banner");
                      return (
                        <div
                          key={idx}
                          className="flex flex-col gap-2 max-w-80 min-w-72 p-3  border-2 border-gray-200 rounded-xl justify-between"
                        >
                          {relatedNews.attributes.featuredImage && (
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
                              {getDate(relatedNews.attributes.publishedAt)}
                            </span>
                          </p>
                          <p className="sm:text-xl text-base font-normal text-primary-text line-clamp-1">
                            <Link href={`/news/${relatedNews.id}`}>
                              {relatedNews.attributes.title}
                            </Link>
                          </p>
                          <p className="sm:text-sm text-xs line-clamp-3">
                            {relatedNews.attributes.excerpt}
                          </p>
                        </div>
                      );
                    })}
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
