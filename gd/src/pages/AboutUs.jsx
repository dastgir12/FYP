import React from "react";
import Header from "../container/Header/Header";
import Footer from "../components/Footer";
const AboutUs = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
      <Header />

      <div className="w-[1150px] flex  flex-col justify-center items-center gap-8 mt-6 p-6">
      <div className="flex  flex-col justify-center items-center gap-8 mt-6 p-6">
        <div className="text-4xl font-bold ">
          <h2>What is GAB?</h2>
        </div>
        <div className=" text-center text-xl">
          <p>
            Gab is a leading franchise operations management software serving
            over 400 brands. Founded in 2014 by a multi-location entrepreneur,
            GAB provides a complete and easy-to-use franchise management
            solution. Built by a franchiser for franchisers, Naranga fully
            understands the apprehensions in the area and offers what it takes
            to successfully manage and scale a multi-location franchise
            business.
          </p>
        </div>
      </div>

      <div className="flex  flex-col justify-center items-center gap-8 mt-6 p-6">
        <div className="text-4xl font-bold ">
          <h2>Why do you need GAB?</h2>
        </div>
        <div className=" text-center text-xl">
          <p>
            As a franchise owner who chooses Naranga, you will get an all-in-one
            solution for your business needs. That includes lead management,
            franchise operation management, field audits, online training
            platform, support center, chargeback management. Its fully
            integrated system allows franchise chains to take control of their
            brand with simple, flexible tools to drive sales and improve
            operational efficiency. Also, it allows them to connect with their
            franchisees. Our dynamic enterprise platform is designed to serve
            businesses from 1 to 10,000+ locations. We are proud to offer the
            simplest, robust, and most affordable solution on the market to
            evolve your business.
          </p>
        </div>
      </div>
      </div>
     <Footer/>
    </div>
  );
};

export default AboutUs;
