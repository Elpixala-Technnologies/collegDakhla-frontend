import ContainerWithTextBgImg from "@/components/containerWithTextBGImg/containerWithTextBGImg";
import Image from "next/image";
import { FaLinkedin, FaSquareFacebook, FaXTwitter } from "react-icons/fa6";

type Props = {
  params: {
    newsId: String;
  };
};
export default function NewsPage({ params }: Props) {
  let newsId = params.newsId;
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
      <section>
        <div className="max-w-screen-xl mx-auto px-4 flex gap-6">
          <div className="flex-1 flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-semibold my-4">
                I Built an App in 6 Hours that Makes $1,500/Mo
              </h2>
              <div className="flex gap-4 items-center">
                <div>
                  <Image src={"/avatar.svg"} width={50} height={50} alt="" />
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <div className="text-sm font-semibold">Atul Diwedi</div>
                  <div className="text-xs">02 March 2024</div>
                </div>
              </div>
            </div>
            <div className="mb-10">
              <ContainerWithTextBgImg imagePath={"/news.jpg"}>
                <div></div>
                {/* <div className="h-full flex flex-col gap-5 justify-end text-white">
                <div className="text-2xl font-bold text-white">
                  {`Massa tortor nibh nulla condimentum imperdiet scelerisque...`}
                </div>
                <div className="text-sm text-white flex gap-4">
                  <span>Oct 19</span>
                  <span>10 min read</span>
                </div>
              </div> */}
              </ContainerWithTextBgImg>
            </div>
            <div className=" flex flex-col gap-4 ">
              <h6 className="text-2xl font-semibold">
                Exploring Generative AI in Content Creation
              </h6>
              <p>
                Hello there! As a marketing manager in the SaaS industry, you
                might be looking for innovative ways to engage your audience. I
                bet generative AI has crossed your mind as an option for
                creating content. Well, let me share from my firsthand
                experience. Google encourages high-quality blogs regardless of
                whether they're written by humans or created using artificial
                intelligence like ChatGPT. Here's what matters: producing
                original material with expertise and trustworthiness based on
                Google E-E-A-T principles. This means focusing more on
                people-first writing rather than primarily employing AI tools to
                manipulate search rankings. There comes a time when many
                experienced professionals want to communicate their insights but
                get stuck due to limited writing skills – that’s where
                Generative AI can step in. So, together, we’re going explore how
                this technology could help us deliver valuable content without
                sounding robotic or defaulting into mere regurgitations of
                existing materials (spoiler alert – common pitfalls!). Hang
                tight - it’ll be a fun learning journey!
              </p>
            </div>
            <div className=" flex flex-col gap-4 ">
              <h6 className="text-2xl font-semibold">
                Exploring Generative AI in Content Creation
              </h6>
              <p>
                Hello there! As a marketing manager in the SaaS industry, you
                might be looking for innovative ways to engage your audience. I
                bet generative AI has crossed your mind as an option for
                creating content. Well, let me share from my firsthand
                experience. Google encourages high-quality blogs regardless of
                whether they're written by humans or created using artificial
                intelligence like ChatGPT. Here's what matters: producing
                original material with expertise and trustworthiness based on
                Google E-E-A-T principles. This means focusing more on
                people-first writing rather than primarily employing AI tools to
                manipulate search rankings. There comes a time when many
                experienced professionals want to communicate their insights but
                get stuck due to limited writing skills – that’s where
                Generative AI can step in. So, together, we’re going explore how
                this technology could help us deliver valuable content without
                sounding robotic or defaulting into mere regurgitations of
                existing materials (spoiler alert – common pitfalls!). Hang
                tight - it’ll be a fun learning journey!
              </p>
            </div>
            <div className=" flex flex-col gap-4 ">
              <h6 className="text-2xl font-semibold">
                Exploring Generative AI in Content Creation
              </h6>
              <p>
                Hello there! As a marketing manager in the SaaS industry, you
                might be looking for innovative ways to engage your audience. I
                bet generative AI has crossed your mind as an option for
                creating content. Well, let me share from my firsthand
                experience. Google encourages high-quality blogs regardless of
                whether they're written by humans or created using artificial
                intelligence like ChatGPT. Here's what matters: producing
                original material with expertise and trustworthiness based on
                Google E-E-A-T principles. This means focusing more on
                people-first writing rather than primarily employing AI tools to
                manipulate search rankings. There comes a time when many
                experienced professionals want to communicate their insights but
                get stuck due to limited writing skills – that’s where
                Generative AI can step in. So, together, we’re going explore how
                this technology could help us deliver valuable content without
                sounding robotic or defaulting into mere regurgitations of
                existing materials (spoiler alert – common pitfalls!). Hang
                tight - it’ll be a fun learning journey!
              </p>
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
      <section>
        <div className="max-w-screen-xl mx-auto px-4 my-10 flex flex-col gap-8">
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
