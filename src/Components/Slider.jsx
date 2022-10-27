import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const images = [
  "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80",
  "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80",
  "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80",
];
let count = 0;
function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    startSlider();
  }, []);

  const startSlider = () => {
    setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % images.length;
    setCurrentIndex(count);
  };

  const handleOnPrevClick = () => {
    const productLength = images.length;
    count = (currentIndex + productLength - 1) % productLength;
    setCurrentIndex(count);
  };

  return (
    <div className="w-full select-none relative flex justify-center ">
      <div className="aspect-w-16 aspect-h-9">
        <img src={images[currentIndex]} />
      </div>
      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
        <button onClick={handleOnPrevClick}>
          <ArrowBackIosIcon />
        </button>
        <button onClick={handleOnNextClick}>
          {" "}
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
}

export default Slider;
