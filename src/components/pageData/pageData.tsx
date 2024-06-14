import { useState, useEffect } from "react";
import "../../utils/css/tableStyle.css";

export default function PageData({ data }: any) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showReadMore, setShowReadMore] = useState(true);

  const handleReadMoreClick = () => {
    setShowFullContent(true);
  };

  const handleReadLessClick = () => {
    setShowFullContent(false);
  };

  useEffect(() => {
    const content = document.getElementById("content")!;
    const readMore = document.getElementById("readMore")!;

    if (content?.scrollHeight > content?.clientHeight) {
      setShowReadMore(true);
    }
  }, []);
  const tableRegex = /<table[^>]*>[\s\S]*?<\/table>/;
  const tableMatch = data?.content?.match(tableRegex);
  const extractedTableHtml = tableMatch ? tableMatch[0] : "";
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: data?.content }}
        className="font-poppins text-base text-wrap !overflow-x-auto"
        style={{
          maxHeight: showFullContent ? "none" : "200px",
          overflow: "hidden",
        }}
      ></div>
      <div className="py-2 text-primary hover:font-semibold text-sm">
        {showReadMore && !showFullContent && (
          <div
            onClick={handleReadMoreClick}
            className="readMore cursor-s-resize"
          >
            Read more
          </div>
        )}
        {showFullContent && (
          <div onClick={handleReadLessClick} className="cursor-n-resize">
            Read less
          </div>
        )}
      </div>
    </>
  );
}
