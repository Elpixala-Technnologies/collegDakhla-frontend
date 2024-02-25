// export default function YoutubeVideo = ({
// 	videoId,
// 	width,
// 	height,
// }: {
// 	videoId: string;
// 	width?: string;
// 	height?: string;
// }) => {
// 	return (
// 		<div className="">
// 			<iframe
// 				className={⁠ ${width} ${height} ⁠}
// 			src={⁠ https://www.youtube.com/embed/${videoId} ⁠}
// 			title="YouTube video player"
// 			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       ></iframe>
//     </div >
//   );
// };

type Props = {
	videoId: string,
	width: string,
	height: string
}
export default function YoutubeVideo({
	videoId,
	width,
	height
}: Props) {
	return (
		<div className="">
			<iframe
				className={`${width} `}
				height={height}
				width={width}
				src={`https://www.youtube.com/embed/${videoId}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			></iframe>
		</div >
	);
};

