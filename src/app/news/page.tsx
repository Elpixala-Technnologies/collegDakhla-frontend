"use client";
import { getAllNews, getNewsCategories } from "@/query/schema";
import { getStrapiMedia, GetDefaultImage } from "@/utils/api-helper";
import { getDate } from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

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
          <h3 className="text-3xl font-semibold pt-2 text-primary">
            Latest News
          </h3>
          <div className="flex flex-row items-start justify-end">
            <div className="flex flex-col leftSide">
              {newsData?.news?.data && (
                <div className="flex flex-col">
                  {newsData.news.data.slice(0, 1).map((news: any, idx: any) => {
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
                      <div className="flex gap-8 flex-col h-2/3 m-2" key={idx}>
                        <div className="flex-1 pb-4 flex-col">
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
                              <div className="h-full flex flex-col gap-10 justify-end text-xs text-black">
                                <div className="text-3xl font-bold text-black">
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
                        <div className="w-full">
                          <div className="text-lg leading-8 text-primary-text">
                            {news?.attributes?.excerpt}
                          </div>
                          <div>
                            <span className="text-primary cursor-pointer">
                              <Link href={`/news/${news.id}`}>Read more</Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col w-2/3">
              {newsData?.news?.data && (
                <div className="flex flex-col gap-4 h-9/12 w-full overflow-y-scroll">
                  {newsData.news.data.slice(1).map((news: any, idx: any) => {
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
                      <div className="flex gap-8 items-start justify-start w-full" key={idx}>
                        <div className="flex">
                          <div className="relative rounded-lg overflow-hidden h-28 w-48">
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
                        <div className="w-full">
                          <div className="text-sm leading-8 text-primary-text line-clamp-4">
                            {news?.attributes?.excerpt}
                          </div>
                          <div>
                            <span className="text-primary cursor-pointer">
                              <Link href={`/news/${news.id}`}>Read more</Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
