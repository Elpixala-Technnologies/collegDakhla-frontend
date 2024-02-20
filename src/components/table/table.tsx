import './tableStyle.css'
export default function Table(props: any) {
	return (
		<div dangerouslySetInnerHTML={{ __html: props?.tableData }}
			className="table-auto data-table text-sm"></div>
	)
}

