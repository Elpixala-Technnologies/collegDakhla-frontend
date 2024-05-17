import Link from "next/link";

type Props = {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  filled?: Boolean;
  filledColor?: string;
  outline?: boolean;
  color?: string;
  outlineColor?: string;
  rounded?: boolean;
  fontSize?: string;
  fontWeight?: string;
  width?: string;
  align?: string;
  bgColor?: string;
  fontColor?: string;
  paddingX?: string;
  paddingY?: string;
  onClick?: () => void; 
  textColor?: string;
  
};
export default function Button({
  href,
  text,
  icon,
  filled,
  filledColor = "bg-primary",
  outline = false,
  color,
  outlineColor = "border-secondary-text",
  rounded = false,
  fontSize = "text-sm",
  fontWeight = "font-normal",
  width = "min-w-max",
  align = "text-left",
  bgColor = "bg-primary",
  fontColor = "text-white",
  paddingX = "px-2",
  paddingY = "py-2",
  textColor="",
  onClick
}: Props) {
  const ButtonContent = (
    <>
      {outline ? (
        <>
          <div
            className={`gap-x-1 button flex cursor-pointer ${width} ${bgColor} items-center ${paddingX} ${paddingY} border ${fontSize} ${fontWeight} ${outlineColor} ${fontColor} hover:border-secondary hover:${textColor} ${
              rounded ? "rounded-full" : "rounded-md"
            }`}
            onClick={onClick}
          >
            <div className={`flex-1 ${align}`}>{text}</div>
            {icon ? <div className="mr-2">{icon}</div> : <></>}
          </div>
        </>
      ) : (
        <>
          <div
            className={`button flex cursor-pointer ${width} items-center ${paddingX} ${paddingY}   ${fontSize} ${fontWeight} ${bgColor} ${fontColor} ${
              rounded ? "rounded-full" : "rounded-md"
            }`}
            onClick={onClick}
          >
            {icon ? <div className="mr-2">{icon}</div> : <></>}
            <div className={`flex-1 ${align}`}>{text}</div>
          </div>
        </>
      )}
    </>
  );
  return (
    <>
      {href ? (
        <Link href={`${href}`}>{ButtonContent}</Link>
      ) : (
        <>{ButtonContent}</>
      )}
    </>
  );
}
