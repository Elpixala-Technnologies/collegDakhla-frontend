import { IconChevronDown } from "@tabler/icons-react";
// import Image from "next/image";
import { useState } from "react";
// import { Snowman, Study , Faqq } from "@/Asset";

const Faq = () => {
  const faqData = [
    {
      id: "q1",
      question: "What documents do I need to apply for college admission?",
      answer:
        "To apply for college admission, you typically need to provide documents such as your high school transcript, standardized test scores (e.g., SAT or ACT), letters of recommendation, personal statement or essay, and application fee.",
    },
    {
      id: "q2",
      question: "How do I find scholarships and financial aid for college?",
      answer:
        "You can find scholarships and financial aid for college by researching online databases, contacting the financial aid offices of colleges you're interested in, and exploring opportunities offered by government agencies, private organizations, and community foundations.",
    },
    {
      id: "q3",
      question: "What is the college application process like?",
      answer:
        "The college application process typically involves several steps, including researching colleges, completing applications (which may include essays and personal statements), submitting required documents, such as transcripts and test scores, and waiting to hear back about admission decisions.",
    },
  ];
  const [activeQ, setActiveQ] = useState("q1");

  const openQ = (id:any) => {
    setActiveQ(activeQ === id ? "" : id);
  };

  const getClassAnswer = (id:any) => {
    return activeQ === id
      ? "max-h-[28rem] lg:max-h-[12rem] py-4 lg:py-7 transition-all duration-500 ease-in-out "
      : "";
  };

  const getClassQuestion = (id:any) => {
    return activeQ === id ? "bg-orange-600 text-white shadow-xl" : "bg-white";
  };

  return (
    <>
      <section
        className=" faq-section bg-faq-section bg-no-repeat px-2 py-12 bg-auto"
        style={{ backgroundPosition: "0 70%" }}
      >
        <div className="Container">
          <div className="faq-content text-black flex flex-col  ">
            <div className="faq-content__title text-center max-w-[50rem] mx-auto flex flex-col leading-5">
              <h5 className="text-2xl font-bold">FAQ</h5>
              <h2 className="text-3xl font-semibold lg:text-[42px] lg:leading-[3rem] lg:tracking-wide mb-5 mt-2 lg:mt-0">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-gray-500 ">
              Frequently Asked Questions About College Admission: Answers to Common Concerns and Inquiries.
              </p>
            </div>

            {/* Faq Q-ans */}
            <div className="all-questions flex flex-col mt-12 lg:mt-16 rounded-xl items-center gap-2">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="faq-box w-full md:w-[50rem] cursor-pointer flex flex-col text-black bg-transparent shadow-[0_10px_15px_0_rgba(0,0,0,0.1)]"
                >
                  <div
                    onClick={() => openQ(faq.id)}
                    className={`faq-box__question ${getClassQuestion(
                      faq.id
                    )} flex justify-between items-center px-7 lg:px-11 py-4 transition-all duration-500 ease-in-out shadow-[0_3px_6px_0_rgba(0,0,0,0.1)] bg-amber-50 rounded-xl`}
                  >
                    <p className="text-sm md:text-lg font-medium">
                      {faq.question}
                    </p>
                    <IconChevronDown className="text-lg lg:text-xl" />
                  </div>
                  <div
                    onClick={() => openQ(faq.id)}
                    className={`faq-box__answer ${getClassAnswer(
                      faq.id
                    )} text-base font-normal font-rubik text-gray-700 px-11 overflow-hidden max-h-0 transition-all duration-500`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
           
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
