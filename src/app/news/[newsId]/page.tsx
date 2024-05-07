"use client";
import ContainerWithTextBgImg from "@/components/containerWithTextBGImg/containerWithTextBGImg";
import { getAllNews, getNews } from "@/query/schema";
import { getStrapiMedia, GetDefaultImage } from "@/utils/api-helper";
import { formatDate, getDate } from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { FaLinkedin, FaSquareFacebook, FaXTwitter } from "react-icons/fa6";
import "../../../utils/css/tableStyle.css";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  params: {
    newsId: String;
  };
};
export default function NewsPage({ params }: Props) {
  const newsID = params?.newsId;
  const { loading, error, data:newsById } = useQuery(getNews, {
    variables: { newsID: newsID },
  });
  console.log("News Heading", newsById?.new?.data?.attributes?.title)
  const newsTitle = newsById?.new?.data?.attributes?.title

  const {
    loading: newsLoader,
    error: newsError,
    data: newsData,
  } = useQuery(getAllNews);



  const news = newsData?.new?.data?.attributes;
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
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 md:col-span-3 flex flex-col gap-8 text-wrap">
              {/* {newsData?.news?.data &&
                Array.from({
                  length: Math.ceil(newsData.news.data.length / 3),
                }).map((chunk, index) => (
                  <div key={index}>
                    {newsData.news.data
                      .slice(index)
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
                          <div key={idx}>
                            {/* <h2 className="text-3xl font-semibold my-4">{news?.title}</h2> */}
                            {/* <div className="flex gap-4 items-center">
                              <div className="flex flex-col gap-1 justify-center">
                                <div className="text-sm font-semibold">
                                  {news.attributes.title}
                                </div>
                                <div className="text-xs">
                                  {getDate(news.attributes.publishedAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })} */}
                  {/* </div> */}
                {/* ))} */} 
                <h4 className="text-3xl">{newsTitle}</h4>
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
                {/* <div dangerouslySetInnerHTML={{ __html: news?.content }} className="text-wrap !overflow-x-auto"></div> */}
                <div
                  dangerouslySetInnerHTML={{ __html: news?.content }}
                  className="font-poppins text-base text-wrap !overflow-x-auto overflow-hidden"
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

                <div className="flex flex-col gap-4 text-primary-text w-80">
                  <div className="font-semibold text-xl">In this article</div>
                  <div>
                    {articleContent.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`border-l-[3px] ${
                            index === 1
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
                {/* <div className="flex flex-col gap-4 text-primary-text w-80">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="right-section">
        <div className="max-w-screen-xl mx-auto px-4 my-10 flex flex-col gap-8">
          <div>
            <h3 className="text-xl font-semibold">Recent News</h3>
          </div>
          <div className="grid grid-cols-4 gap-x-6 gap-y-10 flex-wrap">
            {[1, 2, 3, 4].map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-span-2 md:col-span-1 flex flex-col gap-3 "
                >
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
      </section> */}
    </div>
  );
}
