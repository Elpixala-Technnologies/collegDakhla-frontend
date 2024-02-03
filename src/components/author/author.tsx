import Image from "next/image";

export default function Author() {
	return (
		<div className="author-wrapper flex gap-4 items-center pb-2">
			<div className="author-avatar border-50">
				<Image src="/author.webp" alt="author avatar" height={35} width={35}></Image>
			</div>
			<div className="author-desc">
				<p className="name text-primary">
					Agam Mishra
				</p>
				<p className="description text-xs">
					Content Writer | Jan 31, 2024
				</p>
			</div>
		</div>
	)
}