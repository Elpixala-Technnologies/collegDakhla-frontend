"use client";
import Button from "@/components/button/button";
import NewsCard from "@/components/card/newsCard";
import ContainerWithTextBgImg from "@/components/containerWithTextBGImg/containerWithTextBGImg";
import { getAllNews, getNewsCategories } from "@/query/schema";
import { getStrapiMedia, GetDefaultImage } from "@/utils/api-helper";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { getDate } from "@/utils/formatDate";
import NewsSidebar from "@/components/newsSidebar/newsSidebar";

export default function News() {
  const {
    loading: newsLoader,
    error: newsError,
    data: newsData,
  } = useQuery(getAllNews);

  const firstCategory = newsData?.newsCategories?.data[0];
  const firstPost = firstCategory?.attributes?.news?.data[0]?.attributes;
  const firstPostImage = firstPost?.featuredImage?.data[0]
    ? getStrapiMedia(firstPost?.featuredImage?.data[0].attributes?.url)
    : GetDefaultImage("banner");

  return (
    <>
      <section className="first-category">
        <div className="flex flex-col gap-6 max-w-screen-xl mx-auto px-4 py-4 ">
          <h3 className="text-3xl font-semibold text-primary">Latest News</h3>
          <div className="grid grid-cols-3 gap-4">
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
                        author,
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
                              width={700}
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
                          <Link href={""}>
                            <p className="sm:text-xl text-base font-normal text-primary-text line-clamp-1">
                              {news?.attributes.title}
                            </p>
                          </Link>

                          <p className="sm:text-sm text-xs line-clamp-3">
                            {news?.attributes.excerpt}
                          </p>
                          <Link
                            href={`/news/${news.id}`}
                            className="hover:text-primary text-blue-600 text-lg hover:underline  pt-3"
                          >
                            Read more
                          </Link>
                        </div>
                      );
                    })}
                </div>
              ))}
          </div>
          {/* <div>
            <NewsSidebar />
          </div> */}
        </div>
      </section>
    </>
  );
}
