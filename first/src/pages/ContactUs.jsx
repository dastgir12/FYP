import React from "react";
import Header from "../container/Header/Header";
import Footer from "../components/Footer";
const ContactUs = () => {
  return (
    <div className=" flex flex-col items-center">
      <Header />
      <div className="w-[9d50px] flex flex-col gap-8 p-10">
      <div className="">
        <div className="text-4xl font-bold">
          <h2>Contact us</h2>
        </div>

        <div className="text-yellow-600">
          <p>+923085818212</p>
        </div>
        <div className="text-yellow-600">ghulamdastgir112233@gmail.com</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">
          <h2>Pakistan Office</h2>
        </div>

        <div>
          <p>Near Shamsabad</p>
        </div>
        <div>MtehHub</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">
          <h2>Support</h2>
        </div>

        <div className="text-xl">
          <h2>Monday - Friday 9 AM 6PM EST</h2>
        </div>

        <div className="text-yellow-600">
          <p>ghulamdastgir112233@gmail.com</p>
        </div>
        <div className="text-yellow-600">ahmad@gmail.com</div>
      </div>
      </div>

      <Footer/>
    </div>
  );
};

export default ContactUs;
