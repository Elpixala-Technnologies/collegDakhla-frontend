// /* eslint-disable @next/next/no-img-element */
// "use client";
// import Link from "next/link";
// import Button from "../button/button";
// import { FaRegStar, FaRegUser } from "react-icons/fa";
// import { PiBooksLight } from "react-icons/pi";
// import Feature from "../feature/feature";
// import { useQuery } from "@apollo/client";
// import { getStates } from "@/query/schema";
// import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
// // import StarRating from "../starRating/starRating";
// import { FaImage, FaVideo } from "react-icons/fa6";
// import Image from "next/image";
// import ApplyNowModal from "../consultingModule/ApplyNowModal/ApplyNowModal";
// import { useState } from "react";
// import userFrom from "@/hooks/userFrom";
// // import { IoShieldCheckmark } from "react-icons/io5";

// export default function CollegeListItem(allColleges: any) {
//   const { CollegeApplicatonListData } = userFrom();

//   //query to get all states
//   const {
//     loading: statesLoader,
//     error: statesError,
//     data: statesData,
//   } = useQuery(getStates);

//   const collegeFee = parseInt(
//     allColleges?.colleges?.attributes?.fees
//       ? allColleges?.colleges?.attributes?.fees
//       : 200000
//   ).toLocaleString("en-IN", {
//     style: "currency",
//     currency: "INR",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   });

//   const handleClick = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => {

//     console.log("step=======")
//     setIsModalOpen(true);
//     document.body.classList.add("overflow-hidden");
//   };
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     document.body.classList.remove("overflow-hidden");
//   };

//   const FromStep: any = CollegeApplicatonListData?.form_stape;

//   console.log(FromStep, "FromStep==============");

//   return (
//     <>
//       {allColleges?.colleges?.length > 0 ? (
//         <>
//           {allColleges.colleges.map((college: any, index: any) => {
//             const logoURL = college?.attributes?.collegeLogo?.data?.attributes
//               ?.url
//               ? getStrapiMedia(
//                   college?.attributes?.collegeLogo?.data?.attributes?.url
//                 )
//               : GetDefaultImage("logo");

//             const bannerURL = college?.attributes?.banner?.data[0]
//               ? getStrapiMedia(
//                   college?.attributes?.banner?.data[0]?.attributes?.url
//                 )
//               : GetDefaultImage("banner");

//             return (
//               <div key={index}>
//                 <div className="mb-4 p-4 flex flex-col md:flex-row gap-4 shadow-lg bg-white rounded-lg drop-shadow hover:drop-shadow-xl">
//                   <div className="relative h-44 rounded-lg">
//                     <Image
//                       width={700}
//                       height={700}
//                       src={logoURL!}
//                       alt={college?.collegeName}
//                       className="w-full sm:w-48 h-44 object-fill rounded-lg max-w-44"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
//                     <div className="absolute inset-0 text-white  mx-auto my-2 w-10/12">
//                       <div className="flex justify-between">
//                         <div className="flex gap-3 items-start">
//                           <div className="flex gap-2 items-center text-sm">
//                             <FaImage /> 7
//                           </div>

//                           <div className="flex gap-2 items-center text-sm">
//                             <FaVideo /> 7
//                           </div>
//                         </div>
//                         <div>
//                           <div className="text-xs">Our Rating</div>
//                           <div className="text-end">
//                             {college?.attributes?.rating
//                               ? college?.attributes?.rating
//                               : 8.6}
//                             /10
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-1 flex-col lg:flex-row">
//                     <div className="pb-4 flex flex-1 flex-col gap-3">
//                       <Link href={`/colleges/${college.id}`}>
//                         <div className="flex flex-row gap-2">
//                           <div>
//                             <img src={college.logo} alt="" />
//                           </div>
//                           <div className="flex flex-col">
//                             <h2 className="text-xl font-bold">
//                               {college?.attributes?.collegeName}
//                             </h2>
//                             <div className="text-xs">
//                               {
//                                 college?.attributes?.city?.data?.attributes
//                                   ?.name
//                               }
//                               ,
//                               {
//                                 college?.attributes?.state?.data?.attributes
//                                   ?.name
//                               }{" "}
//                               |{" "}
//                               {college?.attributes?.rankedBy?.data[0]
//                                 ?.attributes?.name
//                                 ? college?.attributes?.rankedBy?.data[0]
//                                     ?.attributes?.name
//                                 : "UGC"}{" "}
//                               |{" "}
//                               {college?.attributes?.college_type?.data
//                                 ?.attributes?.type
//                                 ? college?.attributes?.college_type?.data
//                                     ?.attributes?.type
//                                 : "Private"}{" "}
//                               | {"Rank 6"}
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                       <div className="flex items-stretch">
//                         <div className="pr-4 mr-4 border-r border-extra-light-text">
//                           <p className="text-primary font-semibold text-sm lg:text-lg">
//                             {collegeFee}
//                           </p>
//                           <p className="text-xs text-secondary-text font-light">
//                             BE/B.Tech First year fees
//                           </p>
//                         </div>
//                         <div className="pr-4 mr-4 border-r border-extra-light-text">
//                           <p className="text-primary font-semibold text-lg">
//                             JEE Advance
//                           </p>
//                           <p className="text-xs text-secondary-text font-light">
//                             Exam Accepting
//                           </p>
//                         </div>
//                         <div className="pr-4 mr-4">
//                           <p className="text-primary font-semibold text-lg">
//                             {college?.attributes?.rating
//                               ? college?.attributes?.rating
//                               : 8.6}
//                             /10
//                           </p>
//                           <p className="text-xs text-secondary-text font-light">
//                             Based on user review
//                           </p>
//                         </div>
//                       </div>
//                       {/* <div className="flex gap-2">
//                       <div>User Reviews:</div>
//                       <StarRating rating={3} />
//                     </div> */}
//                       <div className="flex gap-2 flex-wrap">
//                         <Button
//                           href={`/college/${college.id}`}
//                           text="Admission 2024"
//                           icon={<FaRegUser />}
//                           fontSize="text-xxs"
//                           outline
//                           color="text-primary"
//                           rounded
//                           textColor="text-primary"
//                           bgColor="bg-white"
//                           fontColor="text-primary-text"
//                         />
//                         <Button
//                           href={`/college/${college.id}`}
//                           text="Review"
//                           icon={<FaRegStar />}
//                           outline
//                           rounded
//                           bgColor="bg-white"
//                           textColor="text-primary"
//                           fontSize="text-xxs"
//                           fontColor="text-black"
//                         />
//                         <Button
//                           href={`/college/${college.id}`}
//                           text="Course & Fees"
//                           icon={<PiBooksLight />}
//                           outline
//                           rounded
//                           bgColor="bg-white"
//                           textColor="text-primary"
//                           fontSize="text-xxs"
//                           fontColor="text-primary-text"
//                         />
//                       </div>
//                       <div>
//                         <div className="flex flex-wrap items-stretch text-primary gap-y-2">
//                           <div className="pr-4 mr-4 border-r border-primary">
//                             <p className="text-sm t font-light">Date</p>
//                           </div>
//                           <div className="pr-4 mr-4 border-r border-primary">
//                             <p className="text-sm  font-light">News</p>
//                           </div>
//                           <div className="pr-4 mr-4 border-r border-primary">
//                             <p className="text-sm  font-light">Admission</p>
//                           </div>
//                           <div className="pr-4 mr-4 border-r border-primary">
//                             <p className="text-sm  font-light">Broshure</p>
//                           </div>
//                           <div className="pr-4 mr-4 border-r border-primary">
//                             <p className="text-sm  font-light">Placement</p>
//                           </div>
//                           <div className="pr-4 mr-4">
//                             <p className="text-sm  font-light">Course</p>
//                           </div>
//                         </div>
//                       </div>
   
//                     </div>
//                     <div className="flex flex-row gap-1 flex-wrap lg:justify-center lg:flex-col md:gap-4 md:my-4 items-center lg:border-l lg:border-l-extra-light-text lg:px-4">
//                       <Button
//                         onClick={() => handleOpenModal()}
//                         text="Apply Now"
//                         filled
//                         fontSize="text-sm"
//                         width="w-40"
//                         align="text-center"
//                         bgColor="bg-primary"
//                       />
//                       <Button
//                         href={`/college/${college.id}`}
//                         text="Download Brochure"
//                         fontSize="text-sm"
//                         outline
//                         width="w-40"
//                         align="text-center"
//                         bgColor="bg-gray-400"
//                         fontColor="text-white"
//                       />
//                       <Button
//                         href={`/college/${college.id}`}
//                         text="Compare"
//                         outline
//                         fontSize="text-sm"
//                         width="w-40"
//                         fontColor="text-primary-text"
//                         align="text-center"
//                         bgColor="bg-white"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 {(index + 1) % 4 == 0 ? (
//                   <div>
//                     <Feature
//                       title="Filter By State"
//                       tags={statesData?.states?.data}
//                     />
//                   </div>
//                 ) : (
//                   <></>
//                 )}
//               </div>
//             );
//           })}
//         </>
//       ) : (
//         <div className=" p-4 shadow-lg bg-white">
//           <p className="text-2xl text-center text-gray-500">
//             No data available
//           </p>
//         </div>
//       )}

//       {isModalOpen && (
//         <ApplyNowModal
//           id={11}
//           FromStep={FromStep}
//           isSectionCheck={"College"}
//           onClose={handleCloseModal}
//         />
//       )}
//     </>
//   );
// }


/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import Button from "../button/button";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { PiBooksLight } from "react-icons/pi";
import Feature from "../feature/feature";
import { useQuery } from "@apollo/client";
import { getStates } from "@/query/schema";
import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import { FaImage, FaVideo } from "react-icons/fa6";
import Image from "next/image";
import ApplyNowModal from "../consultingModule/ApplyNowModal/ApplyNowModal";
import { useState } from "react";
import userFrom from "@/hooks/userFrom";

export default function CollegeListItem(allColleges: any) {
  const { CollegeApplicatonListData } = userFrom();
  const [slectedId, setSelectedId] = useState<any>(null)


  // query to get all states
  const {
    loading: statesLoader,
    error: statesError,
    data: statesData,
  } = useQuery(getStates);

  const collegeFee = parseInt(
    allColleges?.colleges?.attributes?.fees
      ? allColleges?.colleges?.attributes?.fees
      : 200000
  ).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (id:any) => {
    setIsModalOpen(true);
    setSelectedId(id)
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const FromStep: any = CollegeApplicatonListData?.form_stape;

  return (
    <>
      {allColleges?.colleges?.length > 0 ? (
        <>
          {allColleges.colleges.map((college: any, index: any) => {
            const logoURL = college?.attributes?.collegeLogo?.data?.attributes
              ?.url
              ? getStrapiMedia(
                  college?.attributes?.collegeLogo?.data?.attributes?.url
                )
              : GetDefaultImage("logo");

            const bannerURL = college?.attributes?.banner?.data[0]
              ? getStrapiMedia(
                  college?.attributes?.banner?.data[0]?.attributes?.url
                )
              : GetDefaultImage("banner");

            return (
              <div key={index}>
                <div className="mb-4 p-4 flex flex-col md:flex-row gap-4 shadow-lg bg-white rounded-lg drop-shadow hover:drop-shadow-xl">
                  <div className="relative h-44 rounded-lg">
                    <Image
                      width={700}
                      height={700}
                      src={logoURL!}
                      alt={college?.collegeName}
                      className="w-full sm:w-48 h-44 object-fill rounded-lg max-w-44"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                    <div className="absolute inset-0 text-white  mx-auto my-2 w-10/12">
                      <div className="flex justify-between">
                        <div className="flex gap-3 items-start">
                          <div className="flex gap-2 items-center text-sm">
                            <FaImage /> 7
                          </div>

                          <div className="flex gap-2 items-center text-sm">
                            <FaVideo /> 7
                          </div>
                        </div>
                        <div>
                          <div className="text-xs">Our Rating</div>
                          <div className="text-end">
                            {college?.attributes?.rating
                              ? college?.attributes?.rating
                              : 8.6}
                            /10
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col lg:flex-row">
                    <div className="pb-4 flex flex-1 flex-col gap-3">
                      <Link href={`/colleges/${college.id}`}>
                        <div className="flex flex-row gap-2">
                          <div>
                            <img src={college.logo} alt="" />
                          </div>
                          <div className="flex flex-col">
                            <h2 className="text-xl font-bold">
                              {college?.attributes?.collegeName}
                            </h2>
                            <div className="text-xs">
                              {
                                college?.attributes?.city?.data?.attributes
                                  ?.name
                              }
                              ,
                              {
                                college?.attributes?.state?.data?.attributes
                                  ?.name
                              }{" "}
                              |{" "}
                              {college?.attributes?.rankedBy?.data[0]
                                ?.attributes?.name
                                ? college?.attributes?.rankedBy?.data[0]
                                    ?.attributes?.name
                                : "UGC"}{" "}
                              |{" "}
                              {college?.attributes?.college_type?.data
                                ?.attributes?.type
                                ? college?.attributes?.college_type?.data
                                    ?.attributes?.type
                                : "Private"}{" "}
                              | {"Rank 6"}
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="flex items-stretch">
                        <div className="pr-4 mr-4 border-r border-extra-light-text">
                          <p className="text-primary font-semibold text-sm lg:text-lg">
                            {collegeFee}
                          </p>
                          <p className="text-xs text-secondary-text font-light">
                            BE/B.Tech First year fees
                          </p>
                        </div>
                        <div className="pr-4 mr-4 border-r border-extra-light-text">
                          <p className="text-primary font-semibold text-lg">
                            JEE Advance
                          </p>
                          <p className="text-xs text-secondary-text font-light">
                            Exam Accepting
                          </p>
                        </div>
                        <div className="pr-4 mr-4">
                          <p className="text-primary font-semibold text-lg">
                            {college?.attributes?.rating
                              ? college?.attributes?.rating
                              : 8.6}
                            /10
                          </p>
                          <p className="text-xs text-secondary-text font-light">
                            Based on user review
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          href={`/college/${college.id}`}
                          text="Admission 2024"
                          icon={<FaRegUser />}
                          fontSize="text-xxs"
                          outline
                          color="text-primary"
                          rounded
                          textColor="text-primary"
                          bgColor="bg-white"
                          fontColor="text-primary-text"
                        />
                        <Button
                          href={`/college/${college.id}`}
                          text="Review"
                          icon={<FaRegStar />}
                          outline
                          rounded
                          bgColor="bg-white"
                          textColor="text-primary"
                          fontSize="text-xxs"
                          fontColor="text-black"
                        />
                        <Button
                          href={`/college/${college.id}`}
                          text="Course & Fees"
                          icon={<PiBooksLight />}
                          outline
                          rounded
                          bgColor="bg-white"
                          textColor="text-primary"
                          fontSize="text-xxs"
                          fontColor="text-primary-text"
                        />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-stretch text-primary gap-y-2">
                          <div className="pr-4 mr-4 border-r border-primary">
                            <p className="text-sm t font-light">Date</p>
                          </div>
                          <div className="pr-4 mr-4 border-r border-primary">
                            <p className="text-sm  font-light">News</p>
                          </div>
                          <div className="pr-4 mr-4 border-r border-primary">
                            <p className="text-sm  font-light">Admission</p>
                          </div>
                          <div className="pr-4 mr-4 border-r border-primary">
                            <p className="text-sm  font-light">Broshure</p>
                          </div>
                          <div className="pr-4 mr-4 border-r border-primary">
                            <p className="text-sm  font-light">Placement</p>
                          </div>
                          <div className="pr-4 mr-4">
                            <p className="text-sm  font-light">Course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row gap-1 flex-wrap lg:justify-center lg:flex-col md:gap-4 md:my-4 items-center lg:border-l lg:border-l-extra-light-text lg:px-4">
                      <Button
                        onClick={()=>handleOpenModal(college?.id)}
                        text="Apply Now"
                        filled
                        fontSize="text-sm"
                        width="w-40"
                        align="text-center"
                        bgColor="bg-primary"
                      />
                      <Button
                        href={`/college/${college.id}`}
                        text="Download Brochure"
                        fontSize="text-sm"
                        outline
                        width="w-40"
                        align="text-center"
                        bgColor="bg-gray-400"
                        fontColor="text-white"
                      />
                      <Button
                        href={`/college/${college.id}`}
                        text="Compare"
                        outline
                        fontSize="text-sm"
                        width="w-40"
                        fontColor="text-primary-text"
                        align="text-center"
                        bgColor="bg-white"
                      />
                    </div>
                  </div>
                </div>
                {(index + 1) % 4 == 0 ? (
                  <div>
                    <Feature
                      title="Filter By State"
                      tags={statesData?.states?.data}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </>
      ) : (
        <div className=" p-4 shadow-lg bg-white">
          <p className="text-2xl text-center text-gray-500">
            No data available
          </p>
        </div>
      )}

      {isModalOpen && (
        <ApplyNowModal
          id={slectedId}
          FromStep={FromStep}
          isSectionCheck={"College"}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
