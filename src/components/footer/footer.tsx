import Link from "next/link";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaTwitter,
} from "react-icons/fa6";
import React from "react";

export default function Footer() {
  return (
    <>
      <div className="bg-gray-900 md:p-8 p-4 w-full sticky max-w-screen-2xl mx-auto">
        <div className="h-90 max-w-screen-xl max-sm:justify-between mx-auto">
          <div className="footer-top flex gap-4 justify-between flex-wrap max-sm:flex-col text-white">
            <div className=" justify-center">
              <div className="logo pl-[25px]">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    width={100}
                    height={100}
                    alt="Picture of the author"
                  />
                </Link>
              </div>
              <div className="address flex items-center my-2">
                <FaLocationDot />
                <span className="ml-2">
                  {footerContent?.contactDetails?.address
                    .split("\n")
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </span>
              </div>
              <div className="email flex items-center my-2">
                <MdEmail />
                <Link href={`mailto:${footerContent?.contactDetails?.email}`}>
                  <span className="ml-2">
                    {footerContent?.contactDetails?.email}
                  </span>
                </Link>
              </div>
              <div className="contact flex items-center my-2">
                <FaPhone />
                <Link href={`tel:${footerContent?.contactDetails?.phone}`}>
                  <span className="ml-2">
                    {footerContent?.contactDetails?.phone}
                  </span>
                </Link>
              </div>
            </div>
            <div className=" text-white quick-links text-left">
              <h1 className="text-2xl font-semibold max-w-max group flex flex-col items-center">
                {footerContent.section1.title}
                <div className="bg-amber-500 h-[0.20rem] w-0 group-hover:w-full transition-all duration-500"></div>
              </h1>
              <ul className="mt-2">
                {footerContent?.section1?.list.map((item: any, index: any) => (
                  <Link href={item.link} key={index}>
                    <li className="max-w-max group flex flex-col items-center">
                      {item.label}
                      <div className="bg-amber-500 h-[0.10rem] w-0 group-hover:w-full transition-all duration-500"></div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className=" text-white helpful-links">
              <h1 className="text-2xl font-semibold max-w-max group flex flex-col items-center">
                {footerContent.section2.title}
                <div className="bg-amber-500 h-[0.20rem] w-0 group-hover:w-full transition-all duration-500"></div>
              </h1>
              <ul className="mt-2">
                {footerContent?.section2?.list.map((item: any, index: any) => (
                  <Link href={item.link} key={index}>
                    <li className="max-w-max group flex flex-col items-center">
                      {item.label}
                      <div className="bg-amber-500 h-[0.10rem] w-0 group-hover:w-full transition-all duration-500"></div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className=" text-white page">
              <h1 className="text-2xl font-semibold max-w-max group flex flex-col items-center">
                {footerContent.section3.title}
                <div className="bg-amber-500 h-[0.20rem] w-0 group-hover:w-full transition-all duration-500"></div>
              </h1>
              <ul className="mt-2">
                {footerContent?.section3?.list.map((item: any, index: any) => (
                  <Link href={item.link} key={index}>
                    <li className="max-w-max group flex flex-col items-center">
                      {item.label}
                      <div className="bg-amber-500 h-[0.10rem] w-0 group-hover:w-full transition-all duration-500"></div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-middle border md:my-10 my-5"></div>
          <div className="footer-bottom flex flex-wrap justify-between text-white md:text-sm max-md:flex-col gap-4 text-sm ">
            <ul className="social-icons flex items-center gap-3 md:gap-4 text-xl">
              {footerContent.socialLinks.map((item: any, index: any) => (
                <Link href={item.link} key={index}>
                  <li className="hover:text-amber-500">{item.label}</li>
                </Link>
              ))}
            </ul>
            <div className="bottom-links">
              <ul className="list-none flex max-sm:flex-col flex-wrap gap-4 max-sm:gap-0">
                {footerContent.bottomLinks.map((item: any, index: any) => (
                  <Link href={item.link} key={index}>
                    <li className="hover:text-amber-500">{item.label}</li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="copyright">
              <span>{footerContent?.copyright}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const footerContent = {
  contactDetails: {
    address:
      "First Floor, Plot No. 2, Niti Khand 1, Near Mangal Chowk, \n Indrapuram. Ghaziabad (UP) 201014",
    email: "director@collegedakhla.com",
    phone: "+919899880100",
  },
  section1: {
    title: "Quick Links",
    list: [
      { label: "MBBS", link: "/colleges" },
      { label: "B.Tech", link: "/colleges" },
      { label: "BCA", link: "/colleges" },
      { label: "Enquiry", link: "/" },
    ],
  },
  section2: {
    title: "Helpful Links",
    list: [
      { label: "Terms of Service", link: "/more" },
      { label: "Privacy Policy", link: "/more" },
      { label: "Cookie Policy", link: "/more" },
      { label: "Contact Us", link: "/" },
    ],
  },
  section3: {
    title: "Page",
    list: [
      { label: "About Us", link: "/more" },
      { label: "Careers", link: "/more" },
      { label: "News & Article", link: "/news" },
      { label: "Legal Notice", link: "/news" },
    ],
  },
  socialLinks: [
    {
      label: <FaInstagram />,
      link: "https://www.instagram.com/collegedakhla/",
    },
    { label: <FaFacebook />, link: "https://www.facebook.com/collegedakhla/" },
    { label: <FaTwitter />, link: "https://twitter.com/collegedakhla" },
    {
      label: <FaLinkedin />,
      link: "https://www.linkedin.com/in/college-dakhla-500871241/",
    },
  ],
  bottomLinks: [
    { label: "Terms of Service", link: "/more" },
    { label: "Privacy Policy", link: "/more" },
    { label: "Cookie Policy", link: "/more" },
    { label: "Contact Us", link: "/" },
  ],
  copyright: "Copyright © 2024 College Dakhla, All rights reserved.",
};
