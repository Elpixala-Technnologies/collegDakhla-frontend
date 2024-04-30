import { IconChevronDown } from "@tabler/icons-react";
// import Image from "next/image";
import { useState } from "react";
// import { Snowman, Study , Faqq } from "@/Asset";

const Faq = () => {
  const faqData = [
    {
      id: "q1",
      question: "What is special about comparing rental car deals?",
      answer:
        "Comparing rental car deals is important as it helps find the best deal that fits your budget and requirements, ensuring you get the most value for your money. By comparing various options, you can find deals that offer lower prices, additional services, or better car models. You can find car rental deals by researching online and comparing prices from different rental companies.",
    },
    {
      id: "q2",
      question: "How do I find the car rental deals?",
      answer:
        "You can find car rental deals by researching online and comparing prices from different rental companies. Websites such as Expedia, Kayak, and Travelocity allow you to compare prices and view available rental options. It is also recommended to sign up for email newsletters and follow rental car companies on social media to be informed of any special deals or promotions.",
    },
    {
      id: "q3",
      question: "How do I find such low rental car prices?",
      answer:
        "Book in advance: Booking your rental car ahead of time can often result in lower prices. Compare prices from multiple companies: Use websites like Kayak, Expedia, or Travelocity to compare prices from multiple rental car companies. Look for discount codes and coupons: Search for discount codes and coupons that you can use to lower the rental price. Renting from an off-airport location can sometimes result in lower prices.",
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
        className=" faq-section bg-faq-section bg-no-repeat px-2 py-12 lg:py-24 bg-auto drop-shadow-xl drop-shadow-slate-900 rounded-3xl"
        style={{ backgroundPosition: "0 70%" }}
      >
        <div className="Container">
          <div className="faq-content text-black flex flex-col border pt-12 pb-20 rounded-lg shadow-lg">
            <div className="faq-content__title text-center max-w-[50rem] mx-auto flex flex-col leading-5">
              <h5 className="text-2xl font-bold">FAQ</h5>
              <h2 className="text-2xl lg:text-[42px] lg:leading-[3rem] lg:tracking-wide font-bold mb-5 mt-2 lg:mt-0">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-gray-500 ">
                Frequently Asked Questions About the Car Rental Booking Process
                on Our Website: Answers to Common Concerns and Inquiries.
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
