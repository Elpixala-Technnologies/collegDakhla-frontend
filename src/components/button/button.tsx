import Link from "next/link";

type Props = {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  filled?: Boolean;
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
  
};
export default function Button({
  href,
  text,
  icon,
  filled,
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
  onClick
}: Props) {
  const ButtonContent = (
    <>
      {outline ? (
        <>
          <div
            className={`button flex ${width} items-center ${paddingX} ${paddingY} border ${fontSize} ${fontWeight} ${outlineColor} ${fontColor} hover:border-primary hover:text-primary ${
              rounded ? "rounded-full" : "rounded-md"
            }`}
            onClick={onClick}
          >
            {icon ? <div className="mr-2">{icon}</div> : <></>}
            <div className={`flex-1 ${align}`}>{text}</div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`button flex ${width} items-center ${paddingX} ${paddingY}   ${fontSize} ${fontWeight} ${bgColor} ${fontColor} ${
              rounded ? "rounded-full" : "rounded-md"
            }`}
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
