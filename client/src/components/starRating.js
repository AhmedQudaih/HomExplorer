import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

import {RatingInput,Star} from './Styles/ratingStyle'
const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const Ratingvalue = i + 1;
        return (
          <label>
            <RatingInput>
              <input
              type="radio"
              name  ="rating"
              value={Ratingvalue}
              onClick={() => setRating(Ratingvalue)}
              />
            </RatingInput>
            <Star>
            <FaStar
              
              color={Ratingvalue <= (hover || rating )? "#ffc107" : "#e4e5e9"}
              size={20}
              onMouseEnter={() => setHover(Ratingvalue)}
              onMouseLeave={() => setHover(null)}
            />
            </Star>
          </label>
        );
      })}
    </div>
  );
};
export default StarRating;
