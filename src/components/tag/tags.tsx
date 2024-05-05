import Link from "next/link";

type Props = {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  bgcolor?: string;
  color?: string;
  outlineColor?: string;
  rounded?: boolean;
  fontSize?: string;
  fontWeight?: string;
  width?: string;
  align?: string;
  borderColor?: string;
  big?: boolean;
};
export default function Tag({
  href,
  text,
  icon,
  bgcolor = "bg-extra-light-text",
  color = "text-primary-text",
  rounded = false,
  fontSize = "text-xs",
  fontWeight = "font-normal",
  width = "max-w-max",
  borderColor,
  big = false,
  outlineColor,
}: Props) {
  return (
    <div className="cursor-pointer ">
      {href ? (
        <>
          <Link href={`${href}`}>
            <>
              <div
                className={`
                        button flex 
                        ${width} ${color} ${bgcolor}
                        items-center border
                        ${outlineColor}
                        ${
                          big
                            ? `px-3 py-2 text-sm`
                            : `px-2 py-1 ${fontSize} ${fontWeight}`
                        }
                        ${borderColor ? `border ${borderColor}` : null}
                        ${
                          rounded ? "rounded-full" : "rounded-md"
                        } hover:text-primary`}
              >
                {icon ? <div className="mr-2">{icon}</div> : <></>}
                <div className={`flex-1 text-nowrap`}>{text}</div>
              </div>
            </>
          </Link>
        </>
      ) : (
        <>
          <div
            className={`
                        button flex 
                        ${width} ${color} ${bgcolor}
                        items-center border
                        ${outlineColor}
                        ${
                          big
                            ? `px-3 py-2 text-sm`
                            : `px-2 py-1 ${fontSize} ${fontWeight}`
                        }
                        ${borderColor ? `border ${borderColor}` : null}
                        ${
                          rounded ? "rounded-full" : "rounded-md"
                        } hover:text-primary`}
          >
            {icon ? <div className="mr-2">{icon}</div> : <></>}
            <div className={`flex-1 text-nowrap`}>{text}</div>
          </div>
        </>
      )}
    </div>
  );
}
