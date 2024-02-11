import Link from "next/link";

type Props = {
	href: string,
	text: string,
	icon?: React.ReactNode,
	filled?: Boolean,
	outline?: boolean,
	color?: string,
	outlineColor?: string,
	rounded?: boolean,
	fontSize?: string,
	fontWeight?: string,
	width?: string,
	align?: string,
	bgColor?: string,
	fontColor?: string
}
export default function Button({
	href,
	text,
	icon,
	filled,
	outline = false,
	color,
	outlineColor,
	rounded = false,
	fontSize = "text-sm",
	fontWeight = "font-normal",
	width = "min-w-max",
	align = "text-left",
	bgColor = "bg-primary",
	fontColor = "text-white"
}: Props) {
	return (
		<>
			<Link href={`${href}`}>
				{
					outline ? <>
						<div className={`button flex ${width} items-center px-2 py-1 border ${fontSize} ${fontWeight} border-secondary-text hover:border-primary hover:text-primary ${rounded ? "rounded-full" : "rounded-md"}`}>
							{icon ? <div className="mr-2">{icon}</div> : <></>}
							<div className={`flex-1 ${align}`}>{text}</div>
						</div>
					</>
						: <>
							<div className={`button flex ${width} items-center px-2 py-2  ${fontSize} ${fontWeight} ${bgColor} ${fontColor} ${rounded ? "rounded-full" : "rounded-md"}`}>
								{icon ? <div className="mr-2">{icon}</div> : <></>}
								<div className={`flex-1 ${align}`}>{text}</div>
							</div>
						</>
				}
			</Link>
		</>
	)

}