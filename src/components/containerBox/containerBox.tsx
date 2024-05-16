import { ReactNode } from "react";

export default function ContainerBox({
  children,
  title = "",
  titlePrimary = false,
  titleBorder = false,
  bgColor,
  rounded = "rounded-md",
}: {
  children: ReactNode;
  title?: string;
  titlePrimary?: boolean;
  titleBorder?: boolean;
  bgColor?: string;
  rounded?: string;
}) {
  return (
    <>
      <div
        className={`${
          bgColor ? `${bgColor}` : "border border-primary-text-light"
        } ${rounded}`}
      >
        {title ? (
          <div className={`flex justify-between items-center `}>
            <p
              className={`flex-1 ${
                titlePrimary
                  ? `text-primary text-[25px] font-semibold px-5 ${
                      titleBorder ? "py-4" : "pt-5"
                    }`
                  : "text-secondary text-base p-2"
              }   ${titleBorder ? "border-b border-primary-text-light" : ""}`}
            >
              {title}
            </p>
          </div>
        ) : (
          <></>
        )}

        <div className="p-5">{children}</div>
      </div>
    </>
  );
}
