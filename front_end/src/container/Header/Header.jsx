import React from "react";
import { Link } from "react-router-dom";
import {log} from '../../assets'
import Button from "../../components/Button";

import { useNavigate } from "react-router-dom";

const Header = () => {
const navigate = useNavigate();

  return (
    <div className="flex flex-col relative w-full">
      <div className="absolute w-full h-[150px] ">
        <img
          src="https://naranga.com/wp-content/uploads/2021/05/header-map.svg"
          alt="image"
        />
      </div>
      <div className="absolute w-full h-[94px]  flex flex-col justify-center items-center">
        <div>
          <p className="text-yellow-400 font-sans font-bold text-4xl">
            Lead generation service to grow your franchise
          </p>
        </div>
        <div>
          <p className="text-2xl mt-2 font-sans text-white">
            We know how to bring B2B leads
          </p>
        </div>
      </div>
      <div className="relative mt-32 h-[50px] bg-white shadow-lg flex justify-between items-center p-4">
        <div className="mb-8">
          <img
            className="w-[250px] h-[250px]"
            src={log}
            alt="Logo"
          />
        </div>
        <div className="flex items-center mb-8">
          <div className="ml-10 flex space-x-4 mr-2">
            <Link
              to="/"
              className="hover:bg-gray-100 rounded-md px-3 py-2 font-medium text-gray-900"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="hover:bg-gray-100 rounded-md px-3 py-2 font-medium text-gray-900"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="hover:bg-gray-100 rounded-md px-3 py-2 font-medium text-gray-900"
            >
              About Us
            </Link>
          </div>
          <div className="mt-1" onClick={() => navigate("/login")}>
            <Button text="Login" />
          </div>
          <div className="mt-1 ml-3" onClick={() => navigate("/register")}>
            <Button text="Register" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
