import React from "react";
import { Input } from "antd";
import Button from "./Button";
import { useNavigate } from 'react-router-dom';
// import { logo } from "../assets";
import { socialMedia, footerLinks } from "../constant";

const Footer = () => {
  const nav = useNavigate();

  const LinkClickHandler = (url) => {
    nav(url);
  }

  return (
    <div className=" w-full h-[700px] flex flex-col bg-slate-100 shadow-lg p-6">
      <div className="flex justify-between items-center p-6 border-b-2 border-slate-400">
        <div className="gap-4 p-1">
          <div>
            <h2 className="font-bold">Subscribe to our NewsLetter</h2>
          </div>
          <div>
            <p>weekly news letter , news ,articles & resources</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-full w-[600px] h-[45px] border-[1px] border-red-500"></div>
      </div>

      <div className="w-[1433px] h-[450px] pt-7 pl-5 pr-9 pb-24 mb-4 border-b-2 border-slate-400">
        <div className="flex ">
          <div className="flex flex-col gap-6 p-2">
            <div className="w-[75px] h-[86px]">
              <img
                src="https://naranga.com/wp-content/uploads/2022/09/Naranga-logo-mini.svg"
                alt=""
              />
            </div>
            <div className="flex flex-row md:mt-0 mt-6 ">
              {socialMedia.map((social, index) => (
                <img
                  key={social.id}
                  src={social.icon}
                  alt="icon"
                  className={`w-[22px] h-[22px] object-contain cursor-pointer bg-slate-500 rounded-full hover:bg-blue-400 ${
                    index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-around gap-4">
              <div className="w-[80px] h-[80px]">
                <img
                  src="https://naranga.com/wp-content/webp-express/webp-images/uploads/2021/04/ifpg-member-seal.png.webp"
                  alt=""
                />
              </div>
              <div className="w-[80px] h-[80px]">
                <img
                  src="https://naranga.com/wp-content/uploads/2021/04/light-partner.svg"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center p-2 w-[670px] h-[400px] gap-40 ml-[356px]">
            {footerLinks.map((i) => (
              <div
                key={i.key}
                className=" flex flex-col ss:my-0 my-4 min-w-[150px]"
              >
                <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-dimWhite">
                  {i.title}
                </h4>
                <ul className="mt-4">
                  {i.links.map((link, index) => (
                    <li
                    onClick={() => LinkClickHandler(link.url)} 
                      key={link.name}
                      className={`${
                        index !== i.links.length - 1 ? "mb-4" : "mb-0"
                      } font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-orange-300 cursor-pointer `}
                    >
                      {link.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center md:flex-row flex-col ">
        <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
          @2022 GAB ! All rights reserved 
        </p>
        <div className="flex flex-row md:mt-0 mt-6 mr-10">
          {socialMedia.map((social, index) => (
            <img
              key={social.id}
              src={social.icon}
              alt="icon"
              className={`w-[22px] h-[22px] object-contain cursor-pointer bg-slate-500 rounded-full hover:bg-blue-400  ${
                index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Footer;
