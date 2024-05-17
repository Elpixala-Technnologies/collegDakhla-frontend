import { Profile } from "../../Asset/index";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Card = () => {
  const valueText = (value: number) => {
    switch (value) {
      case 0:
        return "Ordered";
      case 1:
        return "Shipped";
      case 2:
        return "Delivered";
      default:
        return "";
    }
  };

  const styles = {
    root: {
      color: "blue",
      height: 4,
    },
    thumb: {
      display: "none",
    },
    track: {
      height: 4,
    },
  };

  const paymentStatus = [
    {
      value: 0,
      label: "Student Details",
    },
    {
      value: 1,
      label: "Qualification",
    },
    {
      value: 2,
      label: "Payment Status",
    },
    {
      value: 3,
      label: "Done",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="deop-shadow hover:drop-shadow-lg p-2 rounded-lg border flex flex-col my-2 mx-2 bg-white ">
      <div className="flex flex-row items-center justify-between px-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col items-start justify-start">
            <Image
              src={Profile}
              width={isMobile ? 20 : 50}
              height={isMobile ? 20 : 50}
              alt="profile"
            />
            <span className="text-sm sm:text-normal">College</span>
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <span className="sm:text-3xl text-xl">IIT-M, Chennai</span>
            <span className="text-normal font-light">Chennai, Tamil Nadu</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="sm:text-3xl text-xl">15/08/2024</span>
          <span className="text-sm font-light">Applied Date</span>
          <button className="bg-primary text-white rounded text-sm px-2 py-1">
            Open Application
          </button>
        </div>
      </div>

      <hr className="w-full mt-5" />

      <div className="flex flex-col gap-2 my-2">
        <div className="flex flex-row items-center gap-2 px-4">
          <span>Status:</span>
          <Image src="/assets/done.png" width={20} height={20} alt="profile" />
          <span>Payment Done</span>
          {/* <div className="ml-5 mt-2 w-[70%] relative">
            {/* <Slider
              aria-label="Payment status"
              value={2}
              getAriaValueText={valueText}
              step={1}
              marks={paymentStatus}
              valueLabelDisplay="off"
              min={0}
              max={3}
              sx={styles}
              color="primary"
            /> */}
            {/* <p className="absolute top-1 right-0 text-black bg-white border rounded-full px-3 py-1 z-30">
              &gt;
            </p>
          </div> */}
        </div>
        <div className="flex flex-row items-center gap-2 px-4">
          <span>Offer Letter:</span>
          <span className="text-green-600 font-semibold">Received</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
