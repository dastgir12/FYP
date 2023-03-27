import React from "react";
import { useState } from "react";
import { FaAngleDown, FaTimes } from "react-icons/fa";
import Button from "./Button";
const Question = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" w-[1466px] h-[900px] bg-slate-100 shadow-lg flex justify-center">
      <div className=" w-[1100px] h-[900px] flex flex-col items-center">
        <div className=" w-[1100px] ">
          <h2 className=" text-6xl font-bold font-sans text-center p-4">
            Frequently Asked Question
          </h2>
        </div>
        <div className="mb-12 text-center text-2xl">
          <p>Grow your business and ensure brand consistency</p>
        </div>

        <div className="w-[810px] bg-white shadow-xl flex justify-between h-[84px] p-6 mb-6">
          <div className="font-bold">
            <h3>Does Naranga have single sign off</h3>
          </div>
          <div
            className="flex items-center cursor-pointer border border-gray-200 bg-white rounded-full shadow-md py-2 px-2"
            onClick={handleToggleClick}
          >
            <FaAngleDown />
          </div>
        </div>

        <div className="w-[810px] bg-white shadow-xl flex justify-between h-[84px] p-6 mb-6">
          <div className="font-bold">
            <h3>Does Naranga have single sign off</h3>
          </div>
          <div
            className="flex items-center cursor-pointer border border-gray-200 bg-white rounded-full shadow-md py-2 px-2"
            onClick={handleToggleClick}
          >
            <FaAngleDown />
          </div>
        </div>

        <div className="w-[810px] bg-white shadow-xl flex justify-between h-[84px] p-6 mb-6">
          <div className="font-bold">
            <h3>Does Naranga have single sign off</h3>
          </div>
          <div
            className="flex items-center cursor-pointer border border-gray-200 bg-white rounded-full shadow-md py-2 px-2"
            onClick={handleToggleClick}
          >
            <FaAngleDown />
          </div>
        </div>

        <div className="w-[810px] bg-white shadow-xl flex justify-between h-[84px] p-6 mb-6">
          <div className="font-bold">
            <h3>Does Naranga have single sign off</h3>
          </div>
          <div
            className="flex items-center cursor-pointer border border-gray-200 bg-white rounded-full shadow-md py-2 px-2"
            onClick={handleToggleClick}
          >
            <FaAngleDown />
          </div>
        </div>


        <Button/>

      </div>
    </div>
  );
};

export default Question;
