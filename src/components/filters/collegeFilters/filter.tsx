import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Filter(props: any) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(open ? false : true);
  return (
    <>
      <div className=" sm:py-4 py-1">
        <div
          className=" px-2 py-2 flex items-center justify-between border border-zinc-300 rounded-md"
          onClick={handleOpen}
        >
          <span className="text-gray-700">{props.name}</span>{" "}
          <span>{open ? <FaAngleDown /> : <FaAngleUp />}</span>
        </div>
        {open ? (
          <>
            <div className="px-2 py-1">
              {/* <input
                type="text"
                className="border border-extra-light-text p-2 text-sm focus:border-primary w-full my-2 rounded outline-none"
                placeholder={`Search ${props.name}`}
              /> */}
              <div className="h-full max-h-48  overflow-y-auto">
                {props.name === "Stream" ? (
                  // Stream 
                  <>
                    {props?.filters?.map((filter: any) => {                     
                      return (
                        <div
                          key={filter.id}
                          className="flex gap-1 items-center my-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            id={filter.id}
                            name={filter.attributes.streamName}
                            checked={
                              props.checked === filter.attributes.streamName
                            }
                            className=""
                            onChange={() =>
                              props.handleFilter(filter.attributes.streamName)
                            }
                          />
                          <label
                            className="text-base font-medium text-secondary-text hover:text-primary cursor-pointer"
                            htmlFor={filter.id}
                          >
                            {filter.attributes.streamName}
                          </label>
                        </div>
                      );
                    })}
                  </>
                ) : props.name === "CollegeType" ? (
                  // CollegeType 
                  <>
                    {props?.filters?.map((filter: any) => {
                      return (
                        <div
                          key={filter.id}
                          className="flex gap-1 items-center my-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            id={filter.id}
                            name={filter.attributes.collegeTypeName}
                            checked={
                              props.checked === filter.attributes.type
                            }
                            className=""
                            onChange={() =>
                              props.handleFilter(filter.attributes.type)
                            }
                          />
                          <span className="text-base font-medium text-secondary-text hover:text-primary">
                            {filter.attributes.type}
                          </span>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  // State | Course
                  <>
                    {props?.filters?.map((filter: any) => {
                      return (
                        <div
                          key={filter?.id}
                          className="flex gap-1 items-center my-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            id={filter.name}
                            name={filter.name}
                            checked={props.checked === filter?.attributes?.name}
                            className=""
                            onChange={() =>
                              props.handleFilter(filter?.attributes?.name)
                            }
                          />
                          <span className="text-base font-medium text-secondary-text hover:text-primary">
                            {filter?.attributes?.name}
                          </span>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
