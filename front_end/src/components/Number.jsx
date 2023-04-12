import React from "react";

const Number = () => {
  return (
    <div className=" w-full h-[700px] bg-white shadow-lg flex justify-center">
      <div className=" w-full h-[700px] flex flex-col items-center">
        <div className=" w-[1100px] mb-4">
          <h2 className="text-5xl font-bold font-sans text-center p-4">
            Gab in Number . Feel the Difference
          </h2>
        </div>
        <div>
          <div className="absolute w-[672px] h-[180px] mt-4">
            <img
              src="https://naranga.com/wp-content/themes/naranga/static/img/svg/statistics.svg"
              alt=""
            />
          </div>
          <div className="relative flex flex-row justify-center items-center w-[672px] h-[200px] gap-[100px]">
            <div className=" font-bold text-3xl font-sans text-slate-700 mt-2">
              <p>13088</p>
            </div>
            <div className=" font-bold text-3xl font-sans text-slate-700 mt-2">
              <p>60 %</p>
            </div>
            <div className=" font-bold text-3xl font-sans text-slate-700 mt-2">
              <p>400 +</p>
            </div>
            <div className=" font-bold text-3xl font-sans text-slate-700 mt-2">
              <p>20 $</p>
            </div>
          </div>
        </div>

        <div className="text-1xl font-bold w-[720px] h-[46px] flex mt-4 gap-[70px] ml-6 mb-4">
          <p>Active Location</p>
          <p>Client Anual Growth</p>
          <p>Frunchise Brand</p>
          <p>Less Expense</p>
        </div>

        <div className="text-2xl mt-9 mb-3">
          <p>Read about us in trusted media</p>
        </div>

        <div className="flex w-[1050px] h-[66px] gap-8 items-center mt-4">
          <div className="w-[240px] h-[48px]">
            <img
              src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/fsr.png.webp"
              alt=""
            />
          </div>
          <div className="w-[240px] h-[48px]">
            <img
              src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/business-insider.png.webp"
              alt=""
            />
          </div>
          <div className="w-[240px] h-[48px]">
            <img
              src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/entrepreneur.png.webp"
              alt=""
            />
          </div>
          <div className="w-[240px] h-[48px]">
            <img
              src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/IFA.png.webp"
              alt=""
            />
          </div>

          <div className="w-[240px] h-[48px]">
            <img
              src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/franchising.png.webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Number;
