import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

const StarRating = ({
  rating = 0,
  totalStars = 5,
}: {
  rating: number;
  totalStars?: number;
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      const filled = i <= Math.floor(rating); // Full stars for integer part
      const partial = i === Math.ceil(rating); // Partial star for decimal part
      stars.push(
        <span key={i} className={`text-2xl cursor-pointer`}>
          {filled ? (
            <Image src={"/starFilled.svg"} alt="" width={20} height={20} />
          ) : partial ? (
            <Image src={"/starPartial.svg"} alt="" width={20} height={20} />
          ) : (
            <Image src={"/starOutline.svg"} alt="" width={20} height={20} />
          )}
        </span>
      );
    }
    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired,
};

export default StarRating;
