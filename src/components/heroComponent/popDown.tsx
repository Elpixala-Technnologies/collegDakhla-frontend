import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { getColleges, searchCollege } from "@/query/schema";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineSort } from "react-icons/md";
// import CollegeListItem from "../collegeListItem/collegeListItem";
import CollegeList from "./collegeList";

const PopDown = ({ inputValue, onChange , onRecentSearch }: any) => {
  // const [Search, setSearch] = useState("");
  // const [MobileFilter, setMobileFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // get college data
  const { data: initialData } = useQuery(getColleges);

  const handleSearch = (event: any) => {
    const value = event.target.value.slice(0, 2);
    setSearchValue(value);
    onChange(event);
  };

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredData(initialData?.colleges?.data.slice(0, 2));
    } else {
      const filtered = initialData?.colleges?.data
        .filter((college: any) =>
          college.attributes.collegeName
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      setFilteredData(filtered);
    }
  }, [searchValue, initialData]);

  const inputRef = useRef<HTMLInputElement>(null); 

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex-1 w-full ">
      <div className="mb-4 flex gap-4 items-stretch relative max-md:flex-col">
        <div className="bg-white h-10 flex border-2 border-extra-light-text rounded-md flex-1 items-center text-primary-text px-2 focus-within:border-secondary-text outline-none cursor-pointer">
          <RiSearchLine />
          <input
            ref={inputRef}
            className="w-full focus:outline-none outline-none"
            type="text"
            placeholder="Search colleges..."
            onChange={handleSearch}
            value={inputValue}
          />
        </div>
        <div className="flex gap-4">
          <Link href="/colleges">
            <div
              className="flex border-2 h-10 items-center px-2 border-extra-light-text gap-2 rounded-md cursor-pointer"
              
            >
              <span>All Colleges</span> <MdOutlineSort />
            </div>
          </Link>
        </div>
      </div>
      <div className="flex sm:flex-col flex-row">
        {searchValue.trim() === "" ? (
          <div className="m-6 mt-2 pb-4">
            <h1 className="text-3xl text-primary font-semibold pb-6">
              Trending Searches
            </h1>
            <ul className="list-outside list-disc ml-6 text-xl flex flex-col gap-4">
              <li> Top Colleges</li>
              <li> Top Universities</li>
              <li>IIT-Madras</li>
              <li> Ashoka University</li>
              <li> IILM</li>
            </ul>
          </div>
        ) : (
          <CollegeList colleges={filteredData} />
        )}
      </div>
    </div>
  );
};

export default PopDown;
