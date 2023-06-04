import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Form, Input } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const postForm = async (values) => {
    try {
      const formData = {
        email: values.email,
        password: values.password,
      };
  
      const { data } = await axios.post(
        "http://localhost:3001/v1/user/login",
        formData
      );
  
      if (data.success) {
        localStorage.setItem("accessToken", data.accessJWT);
        toast.success("Login successful!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
  
        form.resetFields();
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log(error);
    }
  };
  

  return (
    <>
      <ToastContainer />
      <div className="relative flex w-screen h-screen">
        <div>
          <img
            src="https://st2.depositphotos.com/1001599/43046/v/450/depositphotos_430460192-stock-illustration-sign-page-abstract-concept-vector.jpg"
            alt=""
            className="w-screen h-screen"
          />
        </div>
        <div className="h-screen  bg-white flex flex-col justify-center items-center w-screen gap-y-6 p-10 ">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
              alt=""
              className="w-10 h-10 "
            />
          </div>
          <div className="text-4xl text-center font-bold ">Login</div>
          <Form
            form={form}
            onFinish={postForm}
            className="flex flex-col justify-between w-[350px]"
          >
            <Form.Item
              name="email"
              hasFeedback
              rules={[
                {
                  type: "email",
                  message: "This is not a valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="Enter Your Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please Enter Your Password",
                },
              ]}
            >
              <Input.Password
                className="placeholder:text-slate-700 placeholder:border-slate-700"
                placeholder="Enter Your Password"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center">
                  <button
                    className="px-5 cursor-pointer py-2 text-lg font-bold text-white bg-blue-500 rounded-2xl hover:bg-blue-400"
                    type="submit"
                  >
                    LogIn
                  </button>
                </div>
                <div>
                  <Link
                    to="/forgot"
                    className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                  >
                    Forgot password
                  </Link>
                </div>
              </div>
            </Form.Item>
          </Form>
          <div className="flex justify-center text-sm">
            <p>copyright @ GabLms 2023</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
