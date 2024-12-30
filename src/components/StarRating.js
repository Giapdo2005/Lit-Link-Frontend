import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import "../styles/StarRating.css";

export function StarRating({ initialRating, onRate }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  function handleMouseEnter(star) {
    setHover(star);
  }

  function handleMouseLeave() {
    setHover(0);
  }

  function handleClick(star) {
    setRating(star);
    if (onRate) onRate(star);
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          className={`star ${star <= (hover || rating) ? "star-active" : ""}`}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
}
