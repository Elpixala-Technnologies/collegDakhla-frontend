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

export default function News() {
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
      <section className="first-category">

        <div className="flex flex-col gap-6 max-w-screen-xl mx-auto px-4 py-4 ">
          <h3 className="text-3xl font-semibold text-primary">Latest News</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <div className="row-span-1 col-span-1">
                <div className="relative rounded-lg overflow-hidden h-full">
                  <div className="relative rounded-lg overflow-hidden h-full">
                    <Image
                      src={firstPostImage!}
                      alt=""
                      width={500}
                      height={200}
                      style={{ width: "100%", height: "400px" }}
                    />
                    <div className="absolute inset-0 bg-black opacity-20 h-full w-full pt-4" />
                    <div className="absolute inset-0 p-4">
                      <div className="flex">
                      </div>
                      <div className="h-full w-full flex flex-col gap-1 justify-end text-xs text-white">
                        <div className="flex">
                          <div className="text-xs mb-1">Results Declared - 20 May 2024</div>
                        </div>
                        <div className="text-xl font-semibold mb-8">
                          CBSE Class 10th and 12th Results 2024 Likely to Be Declared After May 20
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-span-1 col-span-1 gap-4 pt-4">
                <div className="relative rounded-lg overflow-hidden h-full">
                  <Image
                    src={firstPostImage!}
                    alt=""
                    width={500}
                    height={200}
                    style={{ width: "100%", height: "400px" }}
                  />
                  <div className="absolute inset-0 bg-black opacity-20 h-full w-full pt-4" />
                  <div className="absolute inset-0 p-4">
                    <div className="flex">
                    </div>
                    <div className="h-full w-full flex flex-col gap-1 justify-end text-xs text-white">
                      <div className="flex">
                        <div className="text-xs mb-1">Results Declared - 20 May 2024</div>
                      </div>
                      <div className="text-xl font-semibold mb-8">
                        CBSE Class 10th and 12th Results 2024 Likely to Be Declared After May 20
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="relative rounded-lg overflow-hidden h-full">
                <Image
                  src={firstPostImage!}
                  alt=""
                  width={500}
                  height={200}
                  style={{ width: "100%", height: "100%" }}
                />
                <div className="absolute inset-0 bg-black opacity-20 h-full w-full object-cover" />
                <div className="absolute inset-0 p-4">
                  <div className="h-full flex flex-col gap-1 justify-end text-xs text-white">
                    <div className="flex ">
                      <div className="text-xs">Intimation Slip - 27 Dec 2024</div>
                    </div>
                    <div className="text-2xl font-semibold ">
                      NEET UG 2024 City Intimation Slip Soon: Check marking scheme, exam pattern, and more

                    </div>
                    <div className="flex justify-between">
                      <div className="">2 Hours Ago</div>
                      <div className="">CNN Indonesia</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="row-span-1 col-span-1">
                <div className="relative rounded-lg overflow-hidden h-full">
                  <div className="relative rounded-lg overflow-hidden h-full">
                    <Image
                      src={firstPostImage!}
                      alt=""
                      width={500}
                      height={200}
                      style={{ width: "100%", height: "400px" }}
                    />
                    <div className="absolute inset-0 bg-black opacity-20 h-full w-full pt-4" />
                    <div className="absolute inset-0 p-4">
                      <div className="flex">
                      </div>
                      <div className="h-full w-full flex flex-col gap-1 justify-end text-xs text-white">
                        <div className="flex">
                          <div className="text-xs mb-1">Craig Bator - 27 Dec 2020</div>
                        </div>
                        <div className="text-xl font-semibold mb-8">
                          They’re back! Kennedy Darling named to return to
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-span-1 col-span-1 gap-4 pt-4">
                <div className="relative rounded-lg overflow-hidden h-full">
                  <Image
                    src={firstPostImage!}
                    alt=""
                    width={500}
                    height={200}
                    style={{ width: "100%", height: "400px" }}
                  />
                  <div className="absolute inset-0 bg-black opacity-20 h-full w-full pt-4" />
                  <div className="absolute inset-0 p-4">
                    <div className="flex">
                    </div>
                    <div className="h-full w-full flex flex-col gap-1 justify-end text-xs text-white">
                      <div className="flex">
                        <div className="text-xs mb-1">Examination released - 1 May 2024</div>
                      </div>
                      <div className="text-xl font-semibold mb-8">
                        NEET 2024 Admit Card for the examination is released on 1 May
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="max-w-screen-xl mx-auto mb-8  my-10 px-4">
          <h3 className="text-3xl font-semibold pb-3 text-primary">Recent Post</h3>
          <div className="grid grid-cols-3 gap-8">
            {/* {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div><NewsCard /></div>
              );
            })} */}
            {/* <NewsCard /> */}
            <div className="flex flex-wrap gap-4 my-2 px-0 overflow-x-auto py-2 md:py-0">
              {newsData?.news?.data &&
                Array.from({
                  length: Math.ceil(newsData.news.data.length / 3),
                }).map((chunk, index) => (
                  <div key={index} className="flex gap-2 justify-evenly w-full">
                    {newsData.news.data
                      .slice(index * 3, index * 3 + 3)
                      .map((news: any, idx: any) => {
                        console.log(news, "news12345");
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

          </div>
        </section>





        {/* <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold">
              {firstCategory?.attributes?.category}
            </h3>
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
              <div className="text-sm">{firstPost?.excerpt}</div>
            </div>

            {firstCategory?.attributes?.news?.data
              ?.slice(1, 6)
              .map((newsItem: any, index: number) => {
                const featuredImageUrl = newsItem?.attributes.featuredImage
                  ?.data[0]
                  ? getStrapiMedia(
                    newsItem?.attributes.featuredImage?.data[0].attributes
                      ?.url
                  )
                  : GetDefaultImage("banner");

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
        </div> */}
      </section>

      {/* {newsData?.newsCategories?.data
        ?.slice(1)
        .map((newsCategory: any, index: number) => {
          if ((index + 1) % 2 == 0) {
            return (
              <section key={index}>
                <div
                  className="max-w-screen-xl mx-auto px-4 my-10 flex flex-col gap-8"
                  key={index}
                >
                  <div>
                    <h3 className="text-xl font-semibold">
                      {newsCategory?.attributes?.category}
                    </h3>
                  </div>
                  <div className="flex gap-x-6 gap-y-10 flex-wrap">
                    {newsCategory?.attributes?.news?.data
                      ?.slice(0, 10)
                      .map((news: any, index: any) => {
                        const featuredImageUrl = news?.featuredImage?.data[0]
                          ? getStrapiMedia(
                            news?.featuredImage?.data[0].attributes?.url
                          )
                          : GetDefaultImage("banner");
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
                                <div className="text-xs font-semibold">
                                  Atul Diwedi
                                </div>
                                <div>-</div>
                                <div className="text-xs font-light">
                                  02-March
                                </div>
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
              </section>
            );
          } else {
            const heroNews =
              newsCategory?.attributes?.news?.data[0]?.attributes;
            return (
              <section key={index}>
                <div className="max-w-screen-xl mx-auto px-4 my-16 flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {newsCategory?.attributes?.category}
                    </h3>
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
                      {newsCategory?.attributes?.news?.data
                        ?.slice(1, 3)
                        ?.map((news: any) => {
                          const featuredImageUrl = news?.attributes
                            .featuredImage?.data[0]
                            ? getStrapiMedia(
                              news?.attributes.featuredImage?.data[0]
                                .attributes?.url
                            )
                            : GetDefaultImage("banner");

                          return (
                            <div className="flex gap-4" key={index}>
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
                          );
                        })}
                    </div>
                  </div>
                </div>
              </section>
            );
          }
        })} */}
    </>
  );
}
