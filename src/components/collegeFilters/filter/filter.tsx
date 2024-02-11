import { useEffect, useState } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Filter(props: any) {
	const [open, setOpen] = useState(true);
	const [Search, setSearch] = useState("");
	const [MatchingFilter, setMatchingFilter] = useState([])

	const handleOpen = () => setOpen(open ? false : true);

	useEffect(() => { }, [MatchingFilter])
	return (
		<>
			<div className="border-b border-b-slate-400">
				<div className="bg-gray-200 px-2 py-2 flex items-center justify-between border-l border-l-primary" onClick={handleOpen}><span>{props.name}</span> <span>{open ? <FaAngleDown /> : <FaAngleUp />}</span></div>
				{open ? <>
					<div className="px-2 py-1">
						<div className="h-full max-h-48 overflow-x-auto">
							{props.name === "Stream" ? (
								<>
									{
										Search.trim.length === 0 && props?.filters?.map((filter: any) => {
											return (
												<div key={filter.id} className="flex gap-1 items-center my-2 cursor-pointer">
													<input
														type="radio"
														id={filter.id}
														name={filter.attributes.streamName}
														checked={props.checked === filter.attributes.streamName}
														className=""
														onChange={() => props.handleFilter(filter.attributes.streamName)}
													/>
													<span className="text-xxs font-semibold text-secondary-text hover:text-primary">{filter.attributes.streamName}</span>
												</div>
											)
										})
									}
								</>
							) : (
								<>
									{Search.trim.length === 0 && props?.filters?.map((filter: any) => {
										return (
											<div key={filter.name} className="flex gap-1 items-center my-2 cursor-pointer">
												<input
													type="radio"
													id={filter.name}
													name={filter.name}
													checked={props.checked === filter.name}
													className=""
													onChange={() => props.handleFilter(filter.name)}
												/>
												<span className="text-xxs font-semibold text-secondary-text hover:text-primary">{filter.name}</span>
											</div>
										)
									})}
								</>
							)}
						</div>
					</div>
				</> :
					<></>}
			</div>


		</>
	)
}