import React from "react";
import Button from "../../components/Button";

const Header = () => {
  return (
    <>
    <div className="flex flex-col relative w-[1466px]">
      <div className="relative">
        <div className="absolute w-[1466px] h-[150px]">
          <img
            src="https://naranga.com/wp-content/uploads/2021/05/header-map.svg"
            alt="image"
          />
        </div>
        <div className="absolute w-[1466px] h-[94px]  flex flex-col justify-center items-center">
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
      </div>
      <div className="relative mt-32 h-[50px] bg-white shadow-lg flex justify-between items-center">
        <div className=" mb-8">
          <img
            className=" w-auto sm:h-10"
            src="https://naranga.com/wp-content/uploads/2022/09/Naranga-logo-2022.svg"
            alt="Logo"
          />
        </div>
        <div className="flex items-center mb-8">
          <div className="ml-10 flex space-x-4">
            <a
              href="#"
              className="hover:bg-gray-100 rounded-md px-3 py-2 font-medium text-gray-900"
            >
              Menu Item 1
            </a>
            <a
              href="#"
              className="hover:bg-gray-100 rounded-md px-3 py-2 font-medium text-gray-900"
            >
              Menu Item 2
            </a>
            <a
              href="#"
              className="hover:bg-gray-100 rounded-md px-3 py-2 font-medium text-gray-900"
            >
              Menu Item 3
            </a>
          </div>
          <div>
          <Button />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Header;
