import React, { useState } from "react";

const Card = ({ text, icon }) => {
 const [clicked, setclicked] = useState(true);
 const handleClick = () => {
  setclicked((prev) => !prev);
 };
 return (
  <div
   className={`bg-green-200 ${!clicked && "border-green-400 border-2"}  w-36 rounded-2xl`}
   onClick={handleClick}
  >
   <div className="p-4 grid place-items-center border-2 rounded-2xl w-36 text-center h-36">
    <img className="w-20" src={icon} alt="" />
   </div>
   {clicked ? 1 : 0}
  </div>
 );
};

export default Card;
