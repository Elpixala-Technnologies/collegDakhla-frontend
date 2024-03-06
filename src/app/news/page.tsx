import Button from "@/components/button/button";
import ContainerWithTextBgImg from "@/components/containerWithTextBGImg/containerWithTextBGImg";
import Image from "next/image";

export default function News() {
  return (
    <>
      <section>
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold">Trending News</h3>
          </div>
          <div className="grid grid-cols-2 grid-rows-5 gap-x-6 gap-y-4">
            <div className="row-span-5 col-span-2 md:col-span-1 flex flex-col gap-3">
              <div className="relative">
                <div className="w-full">
                  <Image
                    src={"/exam.jpg"}
                    alt=""
                    width={500}
                    height={200}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="absolute top-4 left-4 bg-cyan-400 px-1 py-[2px] text-xs text-white tracking-wider  uppercase">
                  Exam
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <div className="text-xs font-semibold">Atul Diwedi</div>
                <div>-</div>
                <div className="text-xs font-light">02-March</div>
              </div>
              <div className="font-semibold">
                Lorem Ipsum is simply dummy text of the printing
              </div>
              <div className="text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard
              </div>
            </div>
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <div
                  className="row-span-1 col-span-2 sm:col-span-1 flex flex-col md:flex-row gap-4 md:items-center"
                  key={index}
                >
                  <div>
                    <Image
                      src={"/exam.jpg"}
                      alt=""
                      width={200}
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
      <section>
        <div className="max-w-screen-xl mx-auto px-4 my-10 flex flex-col gap-8">
          <div>
            <h3 className="text-xl font-semibold">Exam News</h3>
          </div>
          <div className="grid grid-cols-4 grid-flow-row gap-x-6 gap-y-10 ">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col gap-3"
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
      <section>
        <div className="max-w-screen-xl mx-auto px-4 my-10 flex flex-col gap-8">
          <div>
            <h3 className="text-xl font-semibold">College News</h3>
          </div>
          <div className="flex gap-x-6 gap-y-10 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
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
      <section>
        <div className="max-w-screen-xl mx-auto px-4 my-16 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-semibold">Feature News</h3>
          </div>
          <div className="flex flex-col gap-8">
            <ContainerWithTextBgImg imagePath={"/news.jpg"}>
              <div className="h-full flex flex-col gap-5 justify-end text-white">
                <div className="text-2xl font-bold text-white">
                  {`Amanda Seyfried became ‘really obsessed’ with ghost stories`}
                </div>
                <div className="border-t border-t-orange-500 h-[1px] w-24"></div>
                <div className="flex gap-20 text-lg">
                  <div className="w-1/2 leading-7">
                    Hollywood actress Amanda Seyfried has recalled the time when
                    she became obsessed with ghost stories
                  </div>
                </div>
              </div>
            </ContainerWithTextBgImg>
            <div className="flex gap-4 text-primary-text justify-between">
              <div className="flex gap-4">
                <div>
                  <Image
                    src={"/news.jpg"}
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
                  <div className="font-semibold">
                    {`Amanda Seyfried became ‘really obsessed’ with ghost stories`}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Image
                    src={"/news.jpg"}
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
                  <div className="font-semibold">
                    {`Amanda Seyfried became ‘really obsessed’ with ghost stories`}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Image
                    src={"/news.jpg"}
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
                  <div className="font-semibold">
                    {`Amanda Seyfried became ‘really obsessed’ with ghost stories`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-screen-xl mx-auto px-4 my-10 flex flex-col gap-8">
          <div>
            <h3 className="text-xl font-semibold">Career News</h3>
          </div>
          <div className="flex gap-x-6 gap-y-10 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
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
    </>
  );
}
