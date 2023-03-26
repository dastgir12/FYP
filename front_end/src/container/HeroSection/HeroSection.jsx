import React from "react";
import Button from "../../components/Button";
import Explaination from "../../components/Explaination";
import ImageWrapper from "../../components/ImageWrapper";
const HeroSection = () => {
  return (
    <>
      <div className="relative flex flex-col">
        <div className="w-[1466px] h-[500px]">
          <img
            src="https://naranga.com/wp-content/uploads/2021/04/bg-2.jpg"
            alt=""
          />
        </div>
        <div className="w-[1440px] h-[721px] absolute">
          <div className=" flex flex-col justify-center items-center">
            <div className="text-5xl text-center text-slate-800 font-bold flex items-center justify-center p-4 max-w-[850px] mb-4">
              <h2>
                GAB Leads <br />
                <span className="mt-4">Management Software</span>
              </h2>
            </div>
            <div className="text-center  max-w-[760px] mb-[73px]">
              <p>
                Your all-in-one lead management and franchise sales CRM for a
                hassle-free process. Capture, <br />{" "}
                <span>nurture and convert business leads into sales</span>
              </p>
            </div>
            <div className=" mb-6">
              <Button />
            </div>
          </div>

          <div className="absolute bg-white shadow-md h-[150px] w-[1466px] pt-[18px]">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2 mt-0 p-3">
                <p>400+ companies who perform better with Naranga</p>
              </div>
              <div className="flex gap-6 ">
                <img
                  src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/teriyaki.png.webp"
                  alt=""
                />
                <img
                  src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/urban.png.webp"
                  alt=""
                />
                <img
                  src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/arbys.png.webp"
                  alt=""
                />
                <img
                  src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/buffalo.png.webp"
                  alt=""
                />
                <img
                  src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/olb.png.webp"
                  alt=""
                />
                <img
                  src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/paint.png.webp"
                  alt=""
                />
                <img
                  src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/edible.png.webp"
                  alt=""
                />
                <img
                  src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/floyds.png.webp"
                  alt=""
                />
                <img
                  src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/honey.png.webp"
                  alt=""
                />
                <img
                  src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/toro-taxes.png.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" relative flex flex-col items-center w-[1466px] h-[800px] bg-white shadow-lg">
        <div className="mb-3">
          <h2 className="text-3xl font-bold font-sans">
            Your Automated Mangement Solution
          </h2>
        </div>
        <div className="w-[858px] h-[596px]">
          <div className="w-[858px] h-[596px] absolute">
            <img
              src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2022/10/advantages_1.jpg.webp"
              alt=""
            />
          </div>
          <Explaination
            marginTop="32%"
            marginLeft="-2%"
            text1="Efficient lead capturing mechanism"
            text2="Capture"
          />
          <Explaination
            marginTop="-33%"
            marginLeft="15%"
            text1="Quick Tracking of Critical Information"
            text2="Search"
          />
          <Explaination
            marginTop="-22%"
            marginLeft="35%"
            text1="Detailed report and extensive list"
            text2="Organize"
          />
          <Explaination
            marginTop="-10%"
            marginLeft="56%"
            text1="Automated text and email replied"
            text2="Follow Up"
          />
          <Explaination
            marginTop="0%"
            marginLeft="72%"
            text1="Centerlized Location for lead tracking"
            text2="Track"
          />
        </div>
        <ImageWrapper />
      </div>
    </>
  );
};

export default HeroSection;
