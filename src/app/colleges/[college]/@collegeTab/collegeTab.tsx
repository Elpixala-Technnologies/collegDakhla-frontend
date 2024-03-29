import Author from "@/components/author/author";
import Button from "@/components/button/button";
import Image from "next/image";
import YoutubeVideo from "@/components/youtubeVideo/youtubeVideo";
import PageData from "@/components/pageData/pageData";

export default function CollegeTab(props: any) {
  return (
    <>
      <div className="container h-full my-10">
        <div className="main-wrapper flex gap-4">
          <div className="left-wrapper md:basis-3/4 w-full md:w-9/12 flex flex-col gap-5">
            <div className="author-section bg-gray-50 rounded-xl p-5">
              <Author />
            </div>
            <div className="page-data-wrapper">
              {props?.data?.map((item: any, index: number) => {
                return (
                  <div
                    className="content bg-gray-50 rounded-xl px-5 pt-5 mb-5"
                    key={index}
                  >
                    <h2 className="text-lg font-bold mb-2 text-primary">
                      {item?.heading}
                    </h2>
                    <PageData data={item} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="right-wrapper basis-1/4 rounded min-w-72 hidden md:block">
            <div className=" md:flex md:flex-col md:gap-2 ">
              <Button
                href={`/college/`}
                text="Apply Now"
                filled
                fontSize="text-sm"
                fontWeight="font-bold"
                width="w-full"
                align="text-center"
              />
              <Button
                href={`/college/`}
                text="Download Brochure"
                outline
                fontSize="text-sm"
                width="w-full"
                align="text-center"
                fontColor="text-primary-text"
              />
              <div className="college-videos bg-gray-50 p-3">
                <h4 className="text-base font-bold font-poppins border-b-2 pb-2">
                  Videos
                </h4>
                <div className="flex flex-col gap-2">
                  <YoutubeVideo
                    videoId={"4-YEBaUXUGo"}
                    width={"100%"}
                    height={"168"}
                  />
                  <YoutubeVideo
                    videoId={"4-YEBaUXUGo"}
                    width={"100%"}
                    height={"168"}
                  />
                </div>
              </div>

              <div className="college-photos gap-2 columns-2">
                <div className="col-6 pb-2">
                  <Image
                    src="/140724328776347_10150270122024944_741327732_n.webp"
                    alt=""
                    width={100}
                    height={80}
                    className="object-cover w-full h-16"
                  ></Image>
                </div>
                <div className="col-6 pb-2">
                  <Image
                    src="/140724328776347_10150270122024944_741327732_n.webp"
                    alt=""
                    width={100}
                    height={80}
                    className="object-cover w-full h-16"
                  ></Image>
                </div>
                <div className="col-6 pb-2">
                  <Image
                    src="/140724328776347_10150270122024944_741327732_n.webp"
                    alt=""
                    width={100}
                    height={80}
                    className="object-cover w-full h-16"
                  ></Image>
                </div>
                <div className="col-6 pb-2">
                  <Image
                    src="/140724328776347_10150270122024944_741327732_n.webp"
                    alt=""
                    width={100}
                    height={80}
                    className="object-cover w-full h-16"
                  ></Image>
                </div>
                <div className="col-6 pb-2">
                  <Image
                    src="/140724328776347_10150270122024944_741327732_n.webp"
                    alt=""
                    width={100}
                    height={80}
                    className="object-cover w-full h-16"
                  ></Image>
                </div>
                <div className="col-6 pb-2">
                  <Image
                    src="/140724328776347_10150270122024944_741327732_n.webp"
                    alt=""
                    width={100}
                    height={80}
                    className="object-cover w-full h-16"
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
