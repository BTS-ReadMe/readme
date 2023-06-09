import React from "react";
import style from "@/components/ui/ReviewRating.module.css";
import { FiStar } from "react-icons/fi";
interface RatingProps {
  clicked: boolean[];
  onStarClick: Function;
}
export default function StarRating({ clicked, onStarClick }: RatingProps) {
  const starArray = [0, 1, 2, 3, 4];
  const rating = clicked.filter(Boolean).length;

  return (
    <div className={style.stars}>
      <div className={style.starContainer}>
        {starArray.map((count) => {
          return (
            <FiStar
              fontSize={25}
              key={count}
              id={`${count}`}
              onClick={() => onStarClick(count)}
              className={`${clicked[count] && style.yellowStars}`}
            />
          );
        })}
      </div>
      <div className={style.ratingText}>
        {rating === 5
          ? "5.0"
          : rating === 4
          ? "4.0"
          : rating === 3
          ? "3.0"
          : rating === 2
          ? "2.0"
          : rating === 1
          ? "1.0"
          : "0"}
      </div>
    </div>
  );
}
