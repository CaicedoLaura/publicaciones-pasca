import React from "react";
import ReactStars from "react-rating-stars-component";

const CustomReactStars = ({
  count = 5,
  value = 1,
  onChange,
  size = 30,
  activeColor = "#ffd700",
}) => {
  return (
    <ReactStars
      count={count}
      value={value}
      onChange={onChange}
      size={size}
      activeColor={activeColor}
    />
  );
};

export default CustomReactStars;
