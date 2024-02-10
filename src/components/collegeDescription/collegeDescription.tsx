export default function CollegeDescription(props: { name: any }) {
	return (
		<div className="college-desc-wrapper py-5">
			<h2 className="text-lg font-bold">{props.name}</h2>
		</div>
	)
}