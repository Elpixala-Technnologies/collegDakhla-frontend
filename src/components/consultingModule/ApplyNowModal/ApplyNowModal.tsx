import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Loginvector, Arrow, QuestionMark, Trash } from "@/Asset/index";
import Image from "next/image";
import OtpHeading from "@/components/consultingModule/heading/heading";
import OtpImg from "@/components/consultingModule/img/img";
import { PiPlus } from "react-icons/pi";
import { OTPInput } from "@/components/consultingModule/otp/otp";
const axios = require("axios");
import Swal from "sweetalert2";
import userFrom from "@/hooks/userFrom";
import { ID } from "@/types/global";
import useColleges from "@/hooks/useColleges";
import useCommonApi from "@/hooks/useCommonApi";
import useExmas from "@/hooks/useExmas";
import useCourses from "@/hooks/useCourses";
import { useAppDispatch, useAppSelector } from "@/store";
import { restUrl } from "@/utils/network";
import useSignup from "@/query/hooks/useSignup";
import useUserMetaData from "@/query/hooks/useUserMetaData";
import { setAuthState } from "@/store/authSlice";

interface ExamFormData {
  examLevel: string;
  score: string;
  bookedDate: string;
}

interface DesiredCollegesInformation {
  data: {
    id: number;
    attributes: {
      college: string;
      [key: string]: string | number;
    };
  }[];
}

const ApplyNowModal = ({ onClose, FromStep, id, isSectionCheck }: any) => {
  // ============
  const { userID, authState, email, number } = useAppSelector(
    (store: any) => store.auth
  );

  const [isOtp, setIsOtp] = useState(false);
  const { userCheck, checkOTP } = useSignup();
  const { userMetaCreate } = useUserMetaData();
  const dispatch = useAppDispatch();

  const { userFromMetaUpdate } = userFrom();
  const [otp, setOtp] = useState<string>("");
  const [userOtp, setUserOtp] = useState<any>("");
  const [userId, setUserId] = useState<ID>();
  const otpLength = 6;

  const [timeLeft, setTimeLeft] = useState(120); // Initial time in seconds
  const [formattedTime, setFormattedTime] = useState("02:00"); // Initial formatted time HH:MM

  useEffect(() => {
    const countdown = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      setFormattedTime(`${formattedMinutes}:${formattedSeconds}`);
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timeLeft]);

  const { AllStreamData, AllCourseLevelData, AllBoardData } = useCommonApi();
  const { CourseListData } = useCourses();
  const { ExamListData } = useExmas();
  const { AllCollegesData } = useColleges();
  const [isSameAsAbove, setIsSameAsAbove] = useState(true);
  const [isSameWhatsapp, setIsSameWhatsapp] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [modalOpen, setModalOpen] = useState("basic");
  const [EmailValue, setEmailValue] = useState("");

  // ======= form data ======
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumer, setWhatsappNumer] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedCourseLevel, setSelectedCourseLevel] = useState("");

  const [selectedGender, setSelectedGender] = useState("");
  const [underGraduactionData, setUnderGraduactionData] = useState("");
  const [selectedExperianceYear, setSelectedExperianceYear] = useState("");
  const [selectedExperianceMonth, setSelectedExperianceMonth] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  // =====
  const [prefaredExamList, setPrefaredExamList] = useState<any[]>([
    { examLevel: "", score: "" },
  ]);

  const handlePrefaredExamInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const list = [...prefaredExamList];
    list[index] = {
      ...list[index],
      [name]: value,
    };
    setPrefaredExamList(list);
  };

  const handlePrefaredExamRemoveForm = (index: number) => {
    const list = prefaredExamList.filter((_, i) => i !== index);
    setPrefaredExamList(list);
  };

  const handlePrefaredExamAddForm = () => {
    if (prefaredExamList.length < 5) {
      setPrefaredExamList([...prefaredExamList, { examLevel: "", score: "" }]);
    }
  };

  // ==============
  const [bookedExamData, setBookedExamData] = useState<any[]>([
    { examLevel: "" },
  ]);
  const handleBookedExamInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const list: any[] = [...bookedExamData];
    list[index].bookedDate = value;
    setBookedExamData(list);
  };

  const handleBookedExamRemoveForm = (index: number) => {
    const list = bookedExamData.filter((_, i) => i !== index);
    setBookedExamData(list);
  };

  const handleBookedExamAddForm = () => {
    if (bookedExamData.length < 5) {
      setBookedExamData([...bookedExamData, { examLevel: "", bookedDate: "" }]);
    }
  };

  // =====

  const [collegeCount, setCollegeCount] = useState(1);

  const [appliedColleges, setAppliedColleges] =
    useState<DesiredCollegesInformation>({
      data: [
        {
          id: 1,
          attributes: {
            college: "",
          },
        },
      ],
    });

  const handleAddMorePrefaredCollege = () => {
    if (collegeCount < 5) {
      setCollegeCount(collegeCount + 1);
      setAppliedColleges((prevState) => ({
        data: [
          ...prevState.data,
          {
            id: prevState.data.length + 1,
            attributes: {
              college: "",
            },
          },
        ],
      }));
    }
  };

  const handleRemovePrefaredCollege = (id: any) => {
    setCollegeCount(collegeCount - 1);

    setAppliedColleges((prevState) => ({
      data: prevState.data.filter((college) => college.id !== id),
    }));
  };

  const handleDataChangePrefaredCollege = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newData = [...appliedColleges.data];

    if (index >= 0 && index < newData.length) {
      newData[index].attributes[
        name as keyof (typeof newData)[number]["attributes"]
      ] = value;
    } else {
      newData.push({
        id: newData.length + 1,
        attributes: {
          college: "",
        },
      });
      newData[newData.length - 1].attributes[
        name as keyof (typeof newData)[number]["attributes"]
      ] = value;
    }
  };

  // ======= form data ======

  let isLogin = useAppSelector((state) => state.auth.authState);

  const otpchecker = checkOTP(userId!, phoneNumber, userOtp);
  const checkUser = userCheck(phoneNumber, EmailValue);

  const handleCheckboxChange = (event: any) => {
    setIsSameAsAbove(event.target.checked);
    setIsSameWhatsapp(!isSameWhatsapp);
  };

  const totalSteps = FromStep?.length;

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  // ===========
  const [selectedCourseId, selectedCourseName] = selectedCourseLevel.split("|");

  const sendSignupOtp = async (e: any) => {
    e.preventDefault();

    const currentDate = new Date();
    const publishedAt = currentDate.toISOString();

    if (checkUser === false) {
      try {
        let data = JSON.stringify({
          data: {
            name: name,
            email: EmailValue,
            number: phoneNumber,
            stream: selectedStream,
            courseLevel: selectedCourseLevel,
            publishedAt: publishedAt,
          },
        });
        console.log("data ", data);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${restUrl}/api/users-data`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response: any) => {
            setUserId(response?.data?.data?.id);
            setIsOtp(true);
          })
          .catch((error: any) => {
            console.log(error);
          });
      } catch (error) {
        console.error("Error adding user:", error);
      }
    } else {
      console.log("user already exists");
    }
  };

  const handleSubmitSignup = async (e: any) => {
    e.preventDefault();
    const currentDate = new Date();
    const publishedAt = currentDate.toISOString();

    if (otpchecker != false) {
      try {
        dispatch(
          setAuthState({
            authState: true,
            userID: otpchecker?.loggedInUser?.id,
            userName: otpchecker?.loggedInUser?.attributes?.name,
            email: otpchecker?.loggedInUser?.attributes?.email,
            number: otpchecker?.loggedInUser?.attributes?.number,
          })
        );

        await userMetaCreate({
          variables: {
            name: name,
            email: EmailValue,
            number: phoneNumber,
            userDataId: userId,
            publishedAt,
          },
        });
        console.log("user signed up");
      } catch (error) {
        console.error("Error publishing user:", error);
      }
    } else {
      console.log("wrong otp");
    }
  };

  const [gradDetails, setGradDetails] = useState<any>({
    institutionName: "",
    passingYear: "",
    gradingSystem: "",
    grade: "",
    course: "",
  });
  const [doctorateDetails, setDoctorateDetails] = useState<any>({
    institutionName: "",
    passingYear: "",
    gradingSystem: "",
    grade: "",
    course: "",
  });
  const [secondaryDetails, setSecondaryDetails] = useState<any>({
    schoolName: "",
    city: "",
    passingYear: "",
    gradingSystem: "",
    grade: "",
    board: "",
    stream: "",
  });
  const [primaryDetails, setPrimaryDetails] = useState<any>({
    schoolName: "",
    city: "",
    passingYear: "",
    gradingSystem: "",
    grade: "",
    board: "",
  });

  const handleGradChange = (e: any) => {
    const { name, value } = e.target;
    setGradDetails((prevValues: any) => {
      return { ...prevValues, [name]: value };
    });
  };

  const handleDoctorateChange = (e: any) => {
    const { name, value } = e.target;
    setDoctorateDetails((prevValues: any) => {
      return { ...prevValues, [name]: value };
    });
  };

  const handleSecondaryChange = (e: any) => {
    const { name, value } = e.target;
    setSecondaryDetails((prevValues: any) => {
      return { ...prevValues, [name]: value };
    });
  };

  const handlePrimaryChange = (e: any) => {
    const { name, value } = e.target;
    setPrimaryDetails((prevValues: any) => {
      return { ...prevValues, [name]: value };
    });
  };

  // ===
  const selectedAppliedCollege = [
    {
      id: 1,
      attributes: {
        college: id,
        current_step: "3",
      },
    },
  ];

  const selectedAppliedExam = [
    {
      id: 1,
      attributes: {
        exams: id,
        current_step: "3",
      },
    },
  ];

  const selectedAppliedScholarships = [
    {
      id: 1,
      attributes: {
        scholarships: id,
        current_step: "3",
      },
    },
  ];

  const selectedAppliedCareers = [
    {
      id: 1,
      attributes: {
        careers: id,
        current_step: "3",
      },
    },
  ];

  const selectedAppliedCourse = [
    {
      id: 1,
      attributes: {
        courses: id,
        current_step: "3",
      },
    },
  ];



  const handleSubmit = async () => {
    // if (isLogin === false) {
    //   if (currentStep === 0) {
    //     sendSignupOtp();
    //   } else if (currentStep === 1) {
    //     handelSubmitSignup();
    //   }
    // }

    if (currentStep < FromStep.length - 1) {
      if (selectedOption !== "no") {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(currentStep + 2);
      }
    } else {
      try {
        const response = await userFromMetaUpdate({
          variables: {
            id: 2,
            ...(isSectionCheck === "College" && {
              appliedColleges: selectedAppliedCollege?.map(
                (item) => item.attributes
              ),
            }),
            ...(isSectionCheck === "Course" && {
              appliedCourses: selectedAppliedCourse?.map(
                (item) => item.attributes
              ),
            }),
            ...(isSectionCheck === "Exam" && {
              appliedExams: selectedAppliedExam?.map((item) => item.attributes),
            }),
            ...(isSectionCheck === "Careear" && {
              careersInterested: selectedAppliedCareers?.map(
                (item) => item.attributes
              ),
            }),
            ...(isSectionCheck === "Scholarships" && {
              appliedScholarships: selectedAppliedScholarships?.map(
                (item) => item.attributes
              ),
            }),
            primaryDetails: primaryDetails,
            secondaryDetails: secondaryDetails,
            graduationDetails: gradDetails,
            doctorateDetails: doctorateDetails,
            preferredInstitutions: appliedColleges?.data.map(
              (item) => item.attributes
            ),
          },
        });
        document.body.classList.remove("overflow-hidden");

        if (response.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfuly Submited",
            showConfirmButton: false,
            timer: 1500,
          });
          onClose();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      } catch (error) {
        console.log(error, "form error");
      }
    }
  };

  const renderStep = () => {
    const step = FromStep && FromStep[currentStep];
 
    if (!step) {
      return null;
    }

    return (
      <>
        {modalOpen === "basic" && (
          <div className="fixed inset-0  overflow-x-auto flex items-center justify-center z-[999] bg-gray-500 bg-opacity-30">
            <div className="flex justify-center w-full lg:w-[900px] mt-20">
              {/* Left Panel */}
              <div className="relative w-2/5 bg-white hidden md:block">
                <div className="flex flex-col items-center">
                  <div className="flex">
                    <OtpImg imagePath={step.step_banner.data.attributes.url} />
                  </div>
                  <span className="text-center font-semibold text-[#001761]">
                    <OtpHeading heading={step.step_heading} />
                  </span>
                  <span className="flex px-8 py-2 font-[15px]">
                    <ul className="list-disc list-outside">
                      {step.step_description.map((field: any, index: any) => (
                        <li key={index}>
                          <span className="font-semibold">
                            {field?.heading} :
                          </span>{" "}
                          {field?.details}
                        </li>
                      ))}
                    </ul>
                  </span>
                  <div className="absolute text-center bottom-0">
                    <Image src={Loginvector} alt="" />
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="w-4/5 md:w-1/2 bg-gradient-to-tl from-[#EF5F43] via-[#EF5F43] to-[#ff9355] relative">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="cursor-pointer absolute -top-3 -right-3 h-8 w-8 text-white bg-black bg-opacity-70 border rounded-full flex items-center justify-center"
                >
                  X
                </button>

                {/* Back Button */}
                <button className="p-4">
                  {currentStep >= 1 && (
                    <Image
                      className="cursor-pointer text-white"
                      src={Arrow}
                      alt="Back"
                      onClick={handleBack}
                    />
                  )}
                </button>

                {/* Right panel content */}
                <div className="flex flex-col justify-center mx-4 my-6 md:my-10 md:mx-6 p-6 h-[60vh] overflow-y-scroll hide-scrollbar">
                  {/* Right panel content */}
                  <div className="space-y-2">
                    <h1 className="text-white mt-[3rem] mb-2 font-semibold text-base text-left font-sans  md:text-xl">
                      {step.step_label}
                    </h1>

                    {step.field.map((field: any, index: any) => (
                      <div key={index} className="mb-5">
                        {field?.filed_type === "name" && (
                          <input
                            type="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        )}
                        {field?.filed_type === "phone" && (
                          <>
                            <div className="flex gap-3 font-medium">
                              <div className="flex w-1/6 text-xs">
                                <input
                                  name="countrycode"
                                  className="w-full p-2.5 mb-5 rounded-lg border border-[#050138]"
                                  placeholder="+91"
                                />
                              </div>
                              <div className="flex w-5/6 text-xs">
                                <input
                                  type="number"
                                  id="numbe"
                                  name="number"
                                  
                                  className="w-full p-2.5 mb-5 rounded-lg border border-[#050138]"
                                  placeholder="Enter 10 digit mobile number"
                                  value={phoneNumber}
                                  maxLength={10}
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              onChange={(e) => setEmailValue(e.target.value)}
                              className="w-full rounded-sm border border-[#050138] py-2 px-2"
                              placeholder="Email"
                              required
                            />
                          </>
                        )}

                        {field?.filed_type === "course_level" && (
                          <div className="mb-5">
                            <div className="flex items-start mb-5">
                              <select
                                value={selectedCourseLevel}
                                onChange={(e) =>
                                  setSelectedCourseLevel(e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              >
                                <option selected className="text-black">
                                  Please select preferred level
                                </option>
                                {AllCourseLevelData?.map(
                                  (courseLevel: any, index: any) => {
                                    const courseLevelName =
                                      courseLevel?.attributes
                                        ?.levelName ?? "";
                                    const value = `${courseLevel?.id}|${courseLevelName}`;
                                    return (
                                      <option
                                        key={index + "courseLevel"}
                                        className="text-black"
                                        value={value}
                                      >
                                        {courseLevelName}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            </div>
                          </div>
                        )}

                        {selectedCourseName === "Undergraduate" &&
                          field?.filed_type === "course_level" && (
                            <div className="my-4">
                              <select
                                name="under_graduate"
                                value={underGraduactionData}
                                onChange={(e) =>
                                  setUnderGraduactionData(e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              >
                                <option value="">
                                  Which class are you in?
                                </option>
                                <option value="11th_class">11th Class</option>
                                <option value="12th_passed">12th Passed</option>
                                <option value="12th_pursuing">
                                  12th Pursuing
                                </option>
                              </select>
                            </div>
                          )}

                        {field?.filed_type === "stream" && (
                          <div className="mb-5">
                            <div className="flex items-start mb-5">
                              <select
                                value={selectedStream}
                                onChange={(e) =>
                                  setSelectedStream(e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              >
                                <option selected className="text-black">
                                  Please Select Preferred Stream
                                </option>
                                {AllStreamData?.map(
                                  (stream: any, index: any) => {

                                    console.log(stream , "stream")
                                    return (
                                      <option
                                        key={index + "stream"}
                                        className="text-black"
                                        value={stream?.id}
                                      >
                                        {stream?.attributes?.streamName}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            </div>
                          </div>
                        )}

                        {field?.filed_type === "isWhatsappSame" && (
                          <div className="flex gap-3 font-medium">
                            <div className="flex items-start mb-5">
                              <div className="flex items-center h-5">
                                <label className="inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer text-black"
                                    checked={isSameAsAbove}
                                    onChange={handleCheckboxChange}
                                  />
                                  <div className="relative w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                  <span className="ms-3 text-sm font-medium text-white">
                                    Whatsapp number is the same as provided
                                    above
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        )}

                        {!isSameWhatsapp &&
                          field?.filed_type === "isWhatsappSame" && (
                            <div className="flex gap-3 font-medium">
                              <div className="flex w-1/6 text-xs">
                                <input
                                  name="countrycode"
                                  className="w-full p-2.5 mb-5 rounded-lg border border-[#050138]"
                                  placeholder="+91"
                                />
                              </div>
                              <div className="flex w-5/6 text-xs">
                                <input
                                  type="number"
                                  id="whatsappNumer"
                                  name="whatsappNumer"
                                  className="w-full p-2.5 mb-5 rounded-lg border border-[#050138]"
                                  placeholder="Enter 10 digit mobile number"
                                  value={whatsappNumer}
                                  onChange={(e) =>
                                    setWhatsappNumer(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          )}

                        {/* ===== OTP ===== */}

                        {field?.filed_type === "otp" && (
                          <>
                            <div className="flex gap-3 font-medium">
                              <div className="flex text-xs mb-2">
                                <OTPInput
                                  userOtp={userOtp}
                                  setUserOtp={setUserOtp}
                                  otpLength={otpLength}
                                />
                              </div>
                            </div>
                            <div className="flex gap-3 font-[13px] text-white">
                              Didn’t receive the OTP? Request again in{" "}
                              {formattedTime}
                            </div>
                          </>
                        )}

                        {/* ===== Education ===== */}
                        {field?.filed_type === "gender" && (
                          <div className="mt-4">
                            <select
                              name="gender"
                              value={selectedGender}
                              onChange={(e) =>
                                setSelectedGender(e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option value="" className="text-black">
                                Gender
                              </option>
                              <option value="male" className="text-black">
                                Male
                              </option>
                              <option value="female" className="text-black">
                                female
                              </option>
                            </select>
                          </div>
                        )}

                        {/* ========== */}

                        {underGraduactionData === "12th_pursuing" && (
                          <>
                            {field?.filed_type === "tenth_class_details" && (
                              <>
                                <div className="my-4">
                                  <h1 className="font-semibold text-sm text-white">
                                    10th Class Details
                                  </h1>
                                  <div className="mt-4">
                                    <select
                                      name="board"
                                      value={primaryDetails.board}
                                      onChange={handlePrimaryChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                      <option value="" className="text-black">
                                        Select Board
                                      </option>
                                      {AllBoardData?.map(
                                        (board: any, index: any) => {
                                          return (
                                            <option
                                              key={index + "board"}
                                              className="text-black"
                                              value={
                                                board?.attributes?.board_name
                                              }
                                            >
                                              {board?.attributes?.board_name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </select>
                                  </div>
                                </div>
                                <div className="md:flex gap-4 mt-4">
                                  <div className="">
                                    <input
                                      type="text"
                                      placeholder="Passing Year"
                                      name="passingYear"
                                      value={primaryDetails.passingYear}
                                      onChange={handlePrimaryChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                  </div>
                                  <div className="">
                                    <input
                                      type="text"
                                      placeholder="Percentage"
                                      name="grade"
                                      value={primaryDetails.grade}
                                      onChange={handlePrimaryChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}

                        {underGraduactionData === "11th_class" && (
                          <>
                            {field?.filed_type === "tenth_class_details" && (
                              <>
                                <div className="my-4">
                                  <h1 className="font-semibold text-sm text-white">
                                    10th Class Details
                                  </h1>
                                  <div className="mt-4">
                                    <select
                                      name="board"
                                      value={primaryDetails.board}
                                      onChange={handlePrimaryChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                      <option value="" className="text-black">
                                        Select Board
                                      </option>
                                      {AllBoardData?.map(
                                        (board: any, index: any) => {
                                          return (
                                            <option
                                              key={index + "board"}
                                              className="text-black"
                                              value={
                                                board?.attributes?.board_name
                                              }
                                            >
                                              {board?.attributes?.board_name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </select>
                                  </div>
                                </div>
                                <div className="md:flex gap-4 mt-4">
                                  <div className="">
                                    <input
                                      type="text"
                                      placeholder="Passing Year"
                                      name="passingYear"
                                      value={primaryDetails.passingYear}
                                      onChange={handlePrimaryChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                  </div>
                                  <div className="">
                                    <input
                                      type="text"
                                      placeholder="Percentage"
                                      name="grade"
                                      value={primaryDetails.grade}
                                      onChange={handlePrimaryChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}

                        {underGraduactionData === "12th_passed" && (
                          <>
                            {field?.filed_type === "tenth_class_details" && (
                              <>
                                <div className="my-4">
                                  <h1 className="font-semibold text-sm text-white">
                                    10th Class Details
                                  </h1>
                                  <div className="mt-4">
                                    <select
                                      name="board"
                                      value={primaryDetails.board}
                                      onChange={handlePrimaryChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                      <option value="" className="text-black">
                                        Select Board
                                      </option>
                                      {AllBoardData?.map(
                                        (board: any, index: any) => {
                                          return (
                                            <option
                                              key={index + "board"}
                                              className="text-black"
                                              value={
                                                board?.attributes?.board_name
                                              }
                                            >
                                              {board?.attributes?.board_name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </select>
                                  </div>
                                </div>
                                <div className="md:flex gap-4 mt-4">
                                  <div className="">
                                    <input
                                      type="text"
                                      placeholder="Passing Year"
                                      name="passingYear"
                                      value={primaryDetails.passingYear}
                                      onChange={handlePrimaryChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                  </div>
                                  <div className="">
                                    <input
                                      type="text"
                                      placeholder="Percentage"
                                      name="grade"
                                      value={primaryDetails.grade}
                                      onChange={handlePrimaryChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                            {field?.filed_type === "twelve_class_details" && (
                              <>
                                <div className="my-4">
                                  <h1 className="font-semibold text-sm text-white">
                                    12th Class Details
                                  </h1>
                                  <div className="mt-4">
                                    <select
                                      value={secondaryDetails.board}
                                      onChange={handleSecondaryChange}
                                      name="board"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                      <option value="" className="text-black">
                                        Select Board
                                      </option>
                                      {AllBoardData?.map(
                                        (board: any, index: any) => {
                                          return (
                                            <option
                                              key={index + "board"}
                                              className="text-black"
                                              value={
                                                board?.attributes?.board_name
                                              }
                                            >
                                              {board?.attributes?.board_name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </select>
                                  </div>
                                </div>
                                <div className="md:flex  gap-4 mt-4">
                                  <div className="">
                                    <input
                                      type="text"
                                      placeholder="Passing Year"
                                      name="passingYear"
                                      value={secondaryDetails.passingYear}
                                      onChange={handleSecondaryChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                  </div>
                                  <div className="">
                                    <input
                                      type="text"
                                      placeholder="Percentage"
                                      name="gradingSystem"
                                      value={secondaryDetails.gradingSystem}
                                      onChange={handleSecondaryChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}

                        {selectedCourseName === "Post Graduate" && (
                          <>
                            {field?.filed_type === "postgraduate_details" && (
                              <>
                                <div className="my-4">
                                  <div className="mt-4">
                                    <select
                                      name="institutionName"
                                      value={gradDetails.institutionName}
                                      onChange={handleGradChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                      <option value="">
                                        Select Graduation Institute
                                      </option>
                                      {AllCollegesData?.map(
                                        (college: any, index: any) => (
                                          <option
                                            key={index + "institute"}
                                            value={
                                              college?.attributes?.college_name
                                            }
                                            className="text-black"
                                          >
                                            {college?.attributes?.college_name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>
                                </div>
                                <div className="md:flex gap-4 mt-4">
                                  <div className="">
                                    <select
                                      name="course"
                                      value={gradDetails.course}
                                      onChange={handleGradChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                      <option value="" className="text-black">
                                        Please Select your preferred Course
                                      </option>
                                      {CourseListData?.map(
                                        (course: any, index: any) => {
                                          return (
                                            <option
                                              key={index + "course"}
                                              className="text-black"
                                              value={
                                                course?.attributes?.course_name
                                              }
                                            >
                                              {course?.attributes?.course_name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </select>
                                  </div>
                                  <div className="">
                                    <input
                                      type="date"
                                      placeholder="Passing Year"
                                      name="passingYear"
                                      value={gradDetails.passingYear}
                                      onChange={handleGradChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <span className="text-white font-semibold text-base mt-2 text-left font-sans mb-4 md:text-xl">
                                    Graduation CGPA
                                  </span>
                                  <div className="md:flex items-center gap-4">
                                    <div className="">
                                      <input
                                        type="text"
                                        placeholder="CGPA"
                                        name="gradingSystem"
                                        value={gradDetails.gradingSystem}
                                        onChange={handleGradChange}
                                        className="outline-none placeholder:text-white border border-white text-white bg-transparent w-full p-2 rounded-md"
                                      />
                                    </div>
                                    {/* <div className="my-4">
                                      <div className="mt-4">
                                        <input
                                          type="range"
                                          min="0"
                                          max="10"
                                          placeholder="Percentage/Grade"
                                          name="grade"
                                          value={gradDetails.grade}
                                          onChange={handleGradChange}
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                      </div>
                                    </div> */}
                                  </div>

                                  <div>
                                    <span className="text-white mt-2 font-semibold text-base text-left font-sans mb-4 md:text-xl">
                                      Working Experience (if any)
                                    </span>

                                    <div className="md:flex flex-col w-full items-center gap-4 mt-4">
                                      <div className="w-full ">
                                        <select
                                          value={selectedExperianceYear}
                                          onChange={(e) =>
                                            setSelectedExperianceYear(
                                              e.target.value
                                            )
                                          }
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                          <option
                                            value=""
                                            disabled
                                            selected
                                            hidden
                                          >
                                            Select Year
                                          </option>
                                          {Array.from(
                                            { length: 10 },
                                            (_, i) => {
                                              const year =
                                                new Date().getFullYear() + i;
                                              return (
                                                <option key={i} value={year}>
                                                  {year}
                                                </option>
                                              );
                                            }
                                          )}
                                        </select>
                                      </div>
                                      <div className="w-full">
                                        <select
                                          value={selectedExperianceMonth}
                                          onChange={(e) =>
                                            setSelectedExperianceMonth(
                                              e.target.value
                                            )
                                          }
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                          <option
                                            value=""
                                            disabled
                                            selected
                                            hidden
                                          >
                                            Select Month
                                          </option>
                                          <option value="January">
                                            January
                                          </option>
                                          <option value="February">
                                            February
                                          </option>
                                          <option value="March">March</option>
                                          <option value="April">April</option>
                                          <option value="May">May</option>
                                          <option value="June">June</option>
                                          <option value="July">July</option>
                                          <option value="August">August</option>
                                          <option value="September">
                                            September
                                          </option>
                                          <option value="October">
                                            October
                                          </option>
                                          <option value="November">
                                            November
                                          </option>
                                          <option value="December">
                                            December
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}

                        {selectedCourseName === "Master" && (
                          <>
                            {field?.filed_type === "doctorate_details" && (
                              <>
                                <div className="my-4">
                                  <div className="mt-4">
                                    <select
                                      name="institutionName"
                                      value={doctorateDetails.institutionName}
                                      onChange={handleDoctorateChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                      <option value="">
                                        Select Graduation Institute
                                      </option>
                                      {AllCollegesData?.map(
                                        (college: any, index: any) => (
                                          <option
                                            key={index + "institute"}
                                            value={
                                              college?.attributes?.college_name
                                            }
                                            className="text-black"
                                          >
                                            {college?.attributes?.college_name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>
                                </div>
                                <div className="md:flex gap-4 mt-4">
                                  <div className="">
                                    <select
                                      name="course"
                                      value={doctorateDetails.course}
                                      onChange={handleDoctorateChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                      <option value="" className="text-black">
                                        Please Select your preferred Course
                                      </option>
                                      {CourseListData?.map(
                                        (course: any, index: any) => {
                                          return (
                                            <option
                                              key={index + "course"}
                                              className="text-black"
                                              value={
                                                course?.attributes?.course_name
                                              }
                                            >
                                              {course?.attributes?.course_name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </select>
                                  </div>
                                  <div className="">
                                    <input
                                      type="date"
                                      name="passingYear"
                                      value={doctorateDetails.passingYear}
                                      onChange={handleDoctorateChange}
                                      placeholder="Passing Year"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <span className="text-white font-semibold text-base mt-2 text-left font-sans mb-4 md:text-xl">
                                    Graduation CGPA
                                  </span>
                                  <div className="md:flex items-center gap-4">
                                    <div className="">
                                      <input
                                        type="text"
                                        placeholder="CGPA"
                                        name="gradingSystem"
                                        value={doctorateDetails.gradingSystem}
                                        onChange={handleDoctorateChange}
                                        className="outline-none placeholder:text-white border border-white text-white bg-transparent w-full p-2 rounded-md"
                                      />
                                    </div>
                                    <div className="my-4">
                                      <div className="mt-4">
                                        <input
                                          type="range"
                                          min="0"
                                          max="10"
                                          placeholder="Percentage/Grade"
                                          name="grade"
                                          value={doctorateDetails.grade}
                                          onChange={handleDoctorateChange}
                                          className="w-full bg-transparent outline-none border border-white text-white rounded-md"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <span className="text-white mt-2 font-semibold text-base text-left font-sans mb-4 md:text-xl">
                                      Working Experience (if any)
                                    </span>

                                    <div className="md:flex w-full items-center gap-4 mt-4">
                                      <div className=" ">
                                        <select
                                          value={selectedExperianceYear}
                                          onChange={(e) =>
                                            setSelectedExperianceYear(
                                              e.target.value
                                            )
                                          }
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                          <option
                                            value=""
                                            disabled
                                            selected
                                            hidden
                                          >
                                            Select Year
                                          </option>
                                          {Array.from(
                                            { length: 10 },
                                            (_, i) => {
                                              const year =
                                                new Date().getFullYear() + i;
                                              return (
                                                <option key={i} value={year}>
                                                  {year}
                                                </option>
                                              );
                                            }
                                          )}
                                        </select>
                                      </div>
                                      <div className="w-full">
                                        <select
                                          value={selectedExperianceMonth}
                                          onChange={(e) =>
                                            setSelectedExperianceMonth(
                                              e.target.value
                                            )
                                          }
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                          <option
                                            value=""
                                            disabled
                                            selected
                                            hidden
                                          >
                                            Select Month
                                          </option>
                                          <option value="January">
                                            January
                                          </option>
                                          <option value="February">
                                            February
                                          </option>
                                          <option value="March">March</option>
                                          <option value="April">April</option>
                                          <option value="May">May</option>
                                          <option value="June">June</option>
                                          <option value="July">July</option>
                                          <option value="August">August</option>
                                          <option value="September">
                                            September
                                          </option>
                                          <option value="October">
                                            October
                                          </option>
                                          <option value="November">
                                            November
                                          </option>
                                          <option value="December">
                                            December
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}

                        {/* ============ */}
                        {field?.filed_type === "additional_education" && (
                          <div className="mt-[2rem]">
                            <div className="flex flex-col justify-between gap-2 -mt-5">
                              <div className="flex flex-row mt-4 text-white items-center gap-2">
                                <Image
                                  src={QuestionMark}
                                  alt="image"
                                  width={20}
                                  height={20}
                                  className="text-white"
                                />
                                <span className="text-6">
                                  Have you appeared or scheduled for any
                                  entrance exams?
                                </span>
                              </div>

                              <div className="sm:gap-4 gap-2 text-white flex items-center">
                                <label className="flex cursor-pointer text-4 items-center gap-1">
                                  <input
                                    type="radio"
                                    value="yes"
                                    name="option"
                                    checked={selectedOption === "yes"}
                                    onChange={handleOptionChange}
                                    className="size-6 cursor-pointer"
                                  />
                                  Yes
                                </label>

                                <label className="flex text-4 cursor-pointer items-center gap-1">
                                  <input
                                    type="radio"
                                    value="no"
                                    name="option"
                                    checked={selectedOption === "no"}
                                    onChange={handleOptionChange}
                                    className="size-6 cursor-pointer"
                                  />
                                  No
                                </label>

                                <label className="flex text-4 cursor-pointer items-center gap-1">
                                  <input
                                    type="radio"
                                    value="booked"
                                    name="option"
                                    checked={selectedOption === "booked"}
                                    onChange={handleOptionChange}
                                    className="size-6 cursor-pointer"
                                  />
                                  Booked
                                </label>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ========== exam details ======== */}
                        {field?.filed_type === "filled_exams" && (
                          <>
                            {selectedOption === "yes" && (
                              <>
                                {prefaredExamList.map(
                                  (formData: ExamFormData, index: number) => (
                                    <div
                                      key={index}
                                      className="grid py-6 px-2 relative md:grid-cols-1 grid-cols-1 gap-5 my-2"
                                    >
                                      {index > 0 && (
                                        <div className="absolute right-6 top-6">
                                          <button
                                            onClick={() =>
                                              handlePrefaredExamRemoveForm(
                                                index
                                              )
                                            }
                                          >
                                            <Image
                                              src={Trash}
                                              alt=""
                                              className="text-red-500 -mt-5"
                                            />
                                          </button>
                                        </div>
                                      )}
                                      <label className="text-white font-semibold">
                                        Select Exam
                                      </label>
                                      <select
                                        name="examLevel"
                                        value={formData.examLevel}
                                        onChange={(event) =>
                                          handlePrefaredExamInputChange(
                                            index,
                                            event
                                          )
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      >
                                        <option value="">Select Exam</option>
                                        {ExamListData?.map(
                                          (exam: any, optionIndex: any) => (
                                            <option
                                              key={optionIndex}
                                              value={exam.attributes.exam_name}
                                            >
                                              {exam.attributes.exam_name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                      <input
                                        type="text"
                                        name="score"
                                        value={formData.score}
                                        onChange={(event) =>
                                          handlePrefaredExamInputChange(
                                            index,
                                            event
                                          )
                                        }
                                        placeholder="Your Score"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      />
                                    </div>
                                  )
                                )}
                                {prefaredExamList.length < 5 && (
                                  <div className="w-full flex items-center justify-center my-4">
                                    <div
                                      className="flex flex-row items-center border border-white rounded-full p-3 cursor-pointer"
                                      onClick={handlePrefaredExamAddForm}
                                    >
                                      <PiPlus className="text-white text-sm" />
                                    </div>
                                  </div>
                                )}
                              </>
                            )}

                            {selectedOption === "booked" && (
                              <>
                                {bookedExamData?.map(
                                  (formData: any, index: number) => (
                                    <div
                                      key={index}
                                      className="grid py-2 px-2 relative md:grid-cols-1 grid-cols-1 gap-2 my-2"
                                    >
                                      {index > 0 && (
                                        <div className="absolute right-[-6%]  bottom-2">
                                          <button
                                            onClick={() =>
                                              handleBookedExamRemoveForm(index)
                                            }
                                          >
                                            <Image
                                              src={Trash}
                                              alt=""
                                              className="text-red-500 -mt-5"
                                            />
                                          </button>
                                        </div>
                                      )}
                                      <label className="text-white font-semibold">
                                        Select Exam
                                      </label>
                                      <select
                                        name="examLevel"
                                        value={formData.examLevel}
                                        onChange={(event: any) =>
                                          handleBookedExamInputChange(
                                            index,
                                            event
                                          )
                                        }
                                        className="bg-gray-50 w-[96%] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      >
                                        <option value="">Select Exam</option>
                                        {ExamListData?.map(
                                          (exam: any, optionIndex: any) => (
                                            <option
                                              key={optionIndex}
                                              value={exam.attributes.exam_name}
                                            >
                                              {exam.attributes.exam_name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                  )
                                )}
                                {bookedExamData?.length < 5 && (
                                  <div className="w-full flex items-center justify-center my-2">
                                    <div
                                      className="flex flex-row items-center border border-white rounded-full p-3 cursor-pointer"
                                      onClick={handleBookedExamAddForm}
                                    >
                                      <PiPlus className="text-white text-sm" />
                                    </div>
                                  </div>
                                )}

                                {/* Booked Exam Form */}
                              </>
                            )}
                          </>
                        )}

                        {/* ======== Institiue ====== */}

                        {field?.filed_type === "preferred_colleges" && (
                          <>
                            {appliedColleges?.data?.map(
                              (appliedCollege, index) => (
                                <div
                                  key={index}
                                  className=" w-full rounded-md flex flex-col gap-4"
                                >
                                  <div className="flex md:flex-row flex-col gap-4 items-center justify-start w-full">
                                    <div className="flex flex-col gap-1.5 flex-1 w-full">
                                      <div className="flex flex-row justify-between mt-5">
                                        <h1 className="text-white">
                                          Select College{" "}
                                          <span className="text-red-500">
                                            *
                                          </span>
                                        </h1>
                                        {collegeCount > 1 && (
                                          <button
                                            onClick={() =>
                                              handleRemovePrefaredCollege(
                                                appliedCollege.id
                                              )
                                            }
                                          >
                                            <Image
                                              src={Trash}
                                              alt=""
                                              className="text-red-500 -mt-5"
                                            />
                                          </button>
                                        )}
                                      </div>

                                      <div className="flex items-center gap-1 border border-gray-300 rounded relative">
                                        <select
                                          onChange={(e) =>
                                            handleDataChangePrefaredCollege(
                                              e,
                                              index
                                            )
                                          }
                                          className="pl-8 py-2 w-full text-sm outline-none text-gray-400 cursor-pointer rounded"
                                          value={
                                            appliedCollege?.attributes?.college
                                          }
                                          name="college"
                                        >
                                          <option
                                            value=""
                                            className="mt-1  w-40"
                                          >
                                            Please Select Applied College
                                          </option>
                                          {AllCollegesData &&
                                            AllCollegesData.map(
                                              (college: any) => (
                                                <option
                                                  key={college?.id}
                                                  value={college?.id}
                                                  className="w-40"
                                                >
                                                  {
                                                    college?.attributes
                                                      ?.college_name
                                                  }
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}

                            {collegeCount < 5 && (
                              <div className="w-full flex items-center justify-center my-2">
                                <div
                                  className="flex flex-row items-center border border-white rounded-full p-1 cursor-pointer"
                                  onClick={handleAddMorePrefaredCollege}
                                >
                                  <PiPlus className="text-white text-sm" />
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}

                    <div
                      className="flex flex-row justify-center py-6"
                      onClick={handleSubmit}
                    >
                      {currentStep !== totalSteps - 1 ? (
                        <button
                          type="submit"
                          className="w-full bg-[#FFFFFF] text-black py-2 rounded-md transition duration-300"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="w-full bg-[#FFFFFF] text-black py-2 rounded-md transition duration-300"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return <>{modalOpen === "basic" && renderStep()}</>;
};

export default ApplyNowModal;
