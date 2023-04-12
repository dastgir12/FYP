import React, { useState } from "react";
import ServiceCards from "./services/ServiceCards";
import Checkbox from "antd/es/checkbox/Checkbox";

const SixthStepForm = ({ props }) => {
 const { current, setCurrent } = props;
 console.log(current);

 const cardsDetails = ["wifi", "camera", "parking", "doorLock"];
 const carddetails = cardsDetails.map((e) => ({
  text: e,
  icon: "https://cdn-icons-png.flaticon.com/512/2859/2859724.png",
 }));
 const mappingCards = carddetails.map((e, i) => (
  <ServiceCards key={i} text={e.text} icon={e.icon} />
 ));
 return (
  <>
   <div className="flex gap-5 flex-col justify-center items-center">
    <h1>Select Services</h1>
    <div className="flex flex-wrap justify-center items-center gap-3">{mappingCards}</div>
    <div className="flex gap-2 justify-center items-center ">
     <button
      onClick={() => setCurrent(current - 1)}
      className="bg-green-400 w-24 px-3 py-2 rounded-2xl text-white"
     >
      Back
     </button>
     <button
      onClick={() => setCurrent(current + 1)}
      className="bg-green-400 w-24 px-3 py-2 rounded-2xl text-white"
      type="submit"
     >
      Next
     </button>
    </div>
   </div>
  </>
 );
};
export default SixthStepForm;