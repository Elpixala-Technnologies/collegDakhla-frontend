import { allfaqs } from "@/query/graphql/faq";
import { useQuery } from "@apollo/client";
import { IconChevronDown } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const Faq = () => {
  const [activeQ, setActiveQ] = useState<number | null>(null);

  const openQ = (id: number) => {
    setActiveQ(activeQ === id ? null : id);
  };

  const getClassAnswer = (id: number) => {
    return activeQ === id
      ? "max-h-[28rem] lg:max-h-[12rem] py-4 lg:py-7 transition-all duration-500 ease-in-out overflow-visible"
      : "max-h-0 py-0 overflow-hidden";
  };

  const getClassQuestion = (id: number) => {
    return activeQ === id ? "bg-orange-600 text-white shadow-xl" : "bg-white";
  };

  const {
    data: faqData,
    loading: faqLoader,
    error: faqError,
  } = useQuery(allfaqs);

  useEffect(() => {
    console.log("faqs: ", faqData?.faqs?.data);
  }, [faqData]);

  return (
    <section
      className="faq-section bg-faq-section bg-no-repeat px-2 py-12 bg-auto"
      style={{ backgroundPosition: "0 70%" }}
    >
      <div className="Container">
        <div className="faq-content text-black flex flex-col">
          <div className="faq-content__title text-center max-w-[50rem] mx-auto flex flex-col leading-5">
            <h5 className="text-2xl font-bold">FAQ</h5>
            <h2 className="text-3xl font-semibold lg:text-[42px] lg:leading-[3rem] lg:tracking-wide mb-5 mt-2 lg:mt-0">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Frequently Asked Questions About College Admission: Answers to Common Concerns and Inquiries.
            </p>
          </div>

          <div className="all-questions flex flex-col mt-12 lg:mt-16 rounded-xl items-center gap-2">
            {faqData?.faqs?.data?.map((faq: any, index: any) => (
              <div
                key={index}
                className="faq-box w-full md:w-[50rem] cursor-pointer flex flex-col text-black bg-transparent shadow-[0_10px_15px_0_rgba(0,0,0,0.1)]"
              >
                {/* Question  */}
                <div
                  onClick={() => openQ(index)}
                  className={`faq-box__question ${getClassQuestion(
                    index
                  )} flex justify-between items-center px-7 lg:px-11 py-4 transition-all duration-500 ease-in-out shadow-[0_3px_6px_0_rgba(0,0,0,0.1)] bg-amber-50 rounded-xl`}
                >
                  <p className="text-sm md:text-lg font-medium">
                    {faq?.attributes?.question}
                  </p>
                  <IconChevronDown className="text-lg lg:text-xl" />
                </div>
                {/* Anwser  */}
                <div
                  className={`faq-box__answer ${getClassAnswer(
                    index
                  )} text-base font-normal font-rubik text-gray-700 px-11 transition-all duration-500`}
                >
                  {faq?.attributes?.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
