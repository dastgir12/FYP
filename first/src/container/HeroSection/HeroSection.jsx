import React from "react";
import Button from "../../components/ButtonC";
import Cards from "../../components/Cards";
import Explaination from "../../components/Explaination";
import ImageWrapper from "../../components/ImageWrapper";
import ProblemSolving from "../../components/ProblemSolving";
import Number from "../../components/Number";
import Question from "../../components/Question";
import Footer from "../../components/Footer";
const HeroSection = () => {
  return (
    <>
      <div className="w-full relative flex flex-col h-auto ">
        <div className="mb-4">
          <img
            src="https://naranga.com/wp-content/uploads/2021/04/bg-2.jpg"
            alt=""
            className="w-full h-[580px]"
          />
        </div>
        <div className="w-full h-[550px] absolute">
          <div className=" flex flex-col justify-center items-center">
            <div className="text-7xl text-center text-slate-900 font-bold flex items-center justify-center p-4 max-w-[850px] mb-4">
              <h2>
                GAB
                <br />
                <span className="mt-4 ">Frunchise Software</span>
              </h2>
            </div>
            <div className="max-w-[760px] mb-[73px]">
              <p className="text-center text-lg">
                Your all-in-one lead management and franchise sales CRM for a
                hassle-free process. Capture, <br />{" "}
                <span>nurture and convert business leads into sales</span>
              </p>
            </div>
            <div className=" mb-6">
              <Button text='I am Intrested' />
            </div>
          </div>

          <div className="absolute bg-white shadow-md h-[150px] w-full pt-[18px]">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2 mt-0 p-3 text-2xl">
                <p>400+ companies who perform better with GAB</p>
              </div>
              <div className="flex gap-10">
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

        <div className=" relative flex flex-col items-center w-full mt-8 h-[800px] bg-white shadow-lg">
          <div className="mb-6 mt-2">
            <h2 className="text-5xl text-slate-900 font-bold font-sans">
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
        <Cards
          heading="Enhance The Efficiency of Sales Team With a Marketing Automation Tool"
          image="https://naranga.com/wp-content/webp-express/webp-images/uploads/2022/01/e-max-1.jpg.webp"
          text="Smart Lead Capturing"
          paragraph="Naranga provides you with automated lead processing. The details of interested franchisees are fetched and maintained in a centralized list. Manage leads the way you want to with the help of flexible lead tracking features."
          l1="Easy to use CRM dashboard"
          l2="One-to-one leads assignment"
          l3="Lead scoring and automated tracking of leads pipeline"
        />
        <Cards
          reverseRow
          image="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/e-max-2.jpg.webp"
          text="From Lead to Franchisee"
          paragraph="Naranga enables lead tracking status in the sales funnel and allows pipeline management. The system caters to all the queued-up leads through personalized follow-up reminders and prioritizes leads through lead scoring techniques."
          l1="Scheduled email follow-ups through blast or drip campaigns"
          l2="Customizable email templates for personalization"
          l3="Automated workflows and lead prioritization, auto-text replies"
        />
        <Cards
          image="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/02/e-max-3.jpg.webp"
          text="Automated Handoff From Sales to Operations"
          paragraph="Naranga allows you to focus on business growth through efficient pipeline management and automatic task tracking. Save time by investing more on making deals rather than exhausting yourself with data entries."
          l1="Automatic and customized email replies"
          l2="Real time alerts on sales and marketing activity, ROI tracking"
          l3="Integration between emaximation and ncompass"
        />
        <ProblemSolving />
        <Question />
        <Number />
        <Footer />
      </div>
    </>
  );
};

export default HeroSection;
