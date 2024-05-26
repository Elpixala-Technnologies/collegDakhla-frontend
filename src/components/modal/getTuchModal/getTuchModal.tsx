import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import {
  FormControl,
  FormLabel,
  Select,
  Option,
} from "@mui/joy";
import useGetTuch from "@/src/Hooks/useGetTuch";
import useCommonApi from "@/src/Hooks/useCommonApi";
import { useAppSelector } from "@/src/store";
import Swal from "sweetalert2";

const GetTuchModal = ({ isOpen, onClose, heading = "Get in touch" }: any) => {
  const { createGetTuch } = useGetTuch();
  const { AllStreamData } = useCommonApi();
  const [name, setName] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);
  const [phone, setPhone] = useState<any>(null);
  const [streams, setStreams] = useState<any>(null);
  const { number } = useAppSelector((store: any) => store.auth);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    setIsFormValid(
      name !== "" && email !== "" && phone !== "" && streams !== ""
    );
  }, [name, email, phone, streams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill in all the fields",
        showConfirmButton: true,
      });
      return;
    }

    try {
      const currentDate = new Date();
      const publishedAt = currentDate.toISOString();

      const response = await createGetTuch({
        variables: {
          name,
          email,
          phone,
          streams,
          userPhone: number,
          publishedAt,
        },
      });

      if (response.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Saved",
          showConfirmButton: false,
          timer: 1500,
        });
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="get-tuch"
        aria-describedby="get-tuch-description"
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 transform bg-white shadow-md p-4 w-full max-w-5xl rounded-lg">
          <ModalClose variant="plain" sx={{ m: 1 }} />

          <div className="relative flex items-top justify-center  bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
              <div className="my-8 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                    <h1 className="text-2xl sm:text-3xl text-gray-800 dark:text-white font-extrabold tracking-tight">
                      {heading}
                    </h1>
                    <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                      Fill in the form to start a conversation
                    </p>

                    <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div className="ml-4 text-md tracking-wide font-semibold w-40">
                        Head Office #1114, World Trade Tower(WTT), Sector 16
                        Noida, 201301 Noida, Uttar Pradesh, India
                      </div>
                    </div>

                    <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div className="ml-4 text-md tracking-wide font-semibold w-40">
                        +91 9311431087
                      </div>
                    </div>

                    <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div className="ml-4 text-md tracking-wide font-semibold w-40">
                        info@affinityeducation.in
                      </div>
                    </div>
                  </div>

                  <form
                    className="p-6 flex flex-col justify-center"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col">
                      <label htmlFor="name" className="hidden">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Full Name"
                        className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mt-2">
                      <label htmlFor="email" className="hidden">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mt-2 mb-2">
                      <label htmlFor="tel" className="hidden">
                        Number
                      </label>
                      <input
                        type="tel"
                        name="tel"
                        id="tel"
                        placeholder="Telephone Number"
                        className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <FormControl sx={{ mb: 2, width: "100%" }}>
                      <FormLabel>
                        <span className="text-gray-400 text-lg font-semibold -mb-2">
                          Streams
                        </span>
                      </FormLabel>
                      <Select
                        value={streams}
                        onChange={(e, newValue) => setStreams(newValue)}
                      >
                        {AllStreamData?.map((stream: any, index: any) => (
                          <Option key={index} value={stream?.id}>
                            {stream?.attributes?.stream_name}
                          </Option>
                        ))}
                      </Select>
                    </FormControl>

                    <button
                      type="submit"
                      className="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default GetTuchModal;
