import React from "react";
import Navbar from "../../components/Navbar";
const Header = () => {
  return (
    <div className="relative w-full">
      <div className="absolute w-full h-[150px]">
        <img
          src="https://naranga.com/wp-content/uploads/2021/05/header-map.svg"
          alt="image"
        />
      </div>
      <div className="absolute w-[1152px] h-[94px]  flex flex-col justify-center items-center">
        <div>
          <p className=" text-yellow-400 font-sans font-bold text-lg">
            Lead generation service to grow your franchise
          </p>
        </div>
        <div>
          <p className=" font-sans text-white">
            We know how to bring B2B leads
          </p>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
