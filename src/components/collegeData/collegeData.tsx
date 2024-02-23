import { useState, useEffect } from "react";

export default function CollegeData(props: any) {
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
				dangerouslySetInnerHTML={{ __html: props?.data }}
				className="font-poppins text-base text-wrap "
				style={{ maxHeight: showFullContent ? 'none' : '200px', overflow: 'hidden' }}>
			</div>
			<div className="py-2 text-primary text-sm">
				{
					showReadMore && !showFullContent && (
						<div onClick={handleReadMoreClick} className="readMore cursor-s-resize">
							Read more
						</div>
					)
				}
				{
					showFullContent && (
						<div onClick={handleReadLessClick} className="cursor-n-resize">
							Read less
						</div>
					)
				}
			</div>
		</>
	)
}