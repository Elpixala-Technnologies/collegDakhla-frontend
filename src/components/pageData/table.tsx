import { useEffect, useState } from 'react';
import './tableStyle.css'
export default function Table(props: any) {
	const [showFullContent, setShowFullContent] = useState(false);
	const [showReadMore, setShowReadMore] = useState(true);

	const handleReadMoreClick = () => {
		setShowFullContent(true);
	};

	const handleReadLessClick = () => {
		setShowFullContent(false);
	};

	useEffect(() => {
		const content = document.getElementById('content')!;
		const readMore = document.getElementById('readMore')!;

		if (content?.scrollHeight > content?.clientHeight) {
			setShowReadMore(true);
		}
	}, []);
	return (
		<>
			<div
				dangerouslySetInnerHTML={{ __html: props?.tableData }}
				className="table-auto data-table font-poppins text-sm text-wrap"
				style={{ maxHeight: showFullContent ? 'none' : '200px', overflow: 'hidden' }}></div>
		</>
	)
}

