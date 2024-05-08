"use client";
import Button from "@/components/button/button";
import NewsCard from "@/components/card/newsCard";
import ContainerWithTextBgImg from "@/components/containerWithTextBGImg/containerWithTextBGImg";
import { getAllNews, getNewsCategories } from "@/query/schema";
import { getStrapiMedia, GetDefaultImage } from "@/utils/api-helper";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { formatDate, getDate } from "@/utils/formatDate";
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
      <section className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col gap-6 ">
          <h3 className="text-3xl font-semibold pt-2 text-primary">Latest News</h3>
          <div className="flex flex-col">
            {newsData?.news?.data &&
              Array.from({
                length: Math.ceil(newsData.news.data.length / 3),
              }).map((chunk, index) => (
                <div key={index} className="flex flex-col gap-4">
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
                        <div className="flex gap-8" key={index}>
                          <div className="flex-1 pb-4">
                            <div className="relative rounded-lg overflow-hidden h-72">
                              {news.attributes.featuredImage && (
                                <Image
                                  src={featuredImageUrl!}
                                  alt=""
                                  width={100}
                                  height={100}
                                  className="h-full w-full"
                                />
                              )}
                              <div className="absolute inset-0 bg-black opacity-20 h-full w-full object-cover" />
                              <div className="absolute inset-0 p-6">
                                <div className="h-full flex flex-col gap-10 justify-end text-xs text-white">
                                  <div className="text-3xl font-bold text-white">
                                    <Link href={`/news/${news.id}`}>
                                      {news?.attributes?.title}
                                    </Link>
                                  </div>
                                  <div className="flex gap-20">
                                    <div>
                                      {getDate(news.attributes.publishedAt)}
                                    </div>
                                    <div>CNN Indonesia</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-1/3">
                            <div className="text-lg leading-8 text-primary-text">
                              {news?.attributes?.excerpt}
                            </div>
                            <div>
                              <span className="text-primary cursor-pointer">
                                <Link href={`/news/${news.id}`}>
                                  Read more
                                </Link>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
