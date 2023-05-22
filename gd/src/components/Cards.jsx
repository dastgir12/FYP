import React from "react";
import Button from "./ButtonC";
import ImageWrapper from "./ImageWrapper";

const Cards = ({ heading, reverseRow, text, paragraph, image, l1, l2, l3 }) => {
  return (
    <div className="relative w-full h-[500px] bg-white shadow-lg flex flex-col items-center">
      <div className=" w-[1100px] h-[50px] flex flex-col mb-12">
        <h2 className="text-3xl font-bold font-sans text-center">{heading}</h2>
        <div
          className={`flex ${
            reverseRow ? "flex-row-reverse" : "flex-row"
          } w-[1100px]`}
        >
          <div>
            <img className=" h-[300px] w-[600px]" src={image} alt="" />
          </div>

          <div className="flex flex-col  w-[720px] h-[370px] pt-9 font-sans ml-[122px]">
            <div className="w-[530px] h-[150px]">
              <h2 className="text-3xl font-bold font-sans">{text}</h2>
              <p className=" text-1xl mb-4 mt-4 font-sans">{paragraph}</p>
            </div>

            <div className="w-[720px] h-[118px] pl-7 mt-2">
              <ul className="list-disc">
                <li className=" mb-4">{l1}</li>
                <li className=" mb-4">{l2}</li>
                <li>{l3}</li>
              </ul>
            </div>
            <div className="mt-4">
              <Button text = 'Tell me more' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
