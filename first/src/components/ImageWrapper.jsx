import React from "react";
import { useNavigate } from "react-router-dom";
const ImageWrapper = ({ width, height }) => {
  const nav = useNavigate();
const handleClicked = ()=>{
nav('/contact')
}

  return (
    <div className="flex justify-center items-center">
      <div className="absolute w-full h-[120px] flex flex-col justify-center items-center">
        <img
          src="https://naranga.com/wp-content/themes/naranga/static/img/svg/line.svg"
          alt=""
        />
      </div>
      <div className="relative text-white bg-yellow-600 rounded-full w-[150px] h-[45px] p-4 flex justify-center items-center cursor-pointer" onClick={handleClicked}>
        <p>More Details</p>
      </div>
    </div>
  );
};

export default ImageWrapper;
