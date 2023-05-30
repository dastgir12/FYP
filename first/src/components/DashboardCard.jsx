import React from "react";

const DashboardCard = ({ text, type, imageUrl }) => {
  return (
    <>
      <div className="flex justify-between items-center w-[350px] h-[150px] bg-white p-6 rounded">
        <div className="h-[50px] w-[50px]">
          <img src={imageUrl} alt="image " />
        </div>

        <div className="flex flex-col justify-center items-center ">
          <div>
            <p>{text}</p>
          </div>
          <div>{type}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardCard;
