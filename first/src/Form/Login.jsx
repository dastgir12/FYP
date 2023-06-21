import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState("");
  const handleStatus = (value) => {
    setSelectedRole(value);
  };

  const postForm = async (values) => {
    try {
      const formData = {
        username: values.username,
        role: values.role,
        password: values.password,
      };
      const response = await axios.post(
        "http://localhost:3001/v1/admin/loginA",
        formData
      );
      localStorage.setItem("Token", response.data.token);

      // Check the selected role and navigate accordingly
      if (values.role === "Admin") {
        navigate("/private/AdminDashboard");
      } else {
        navigate("/private/dashboard");
      }

      // Show success toast notification
      toast.success("Login successful!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (error) {
      // Show error toast notification
      toast.error("Login failed. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
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
          <div className="text-4xl text-center font-bold ">Sign In</div>
          <Form
            form={form}
            onFinish={postForm}
            className="flex flex-col justify-between w-[350px]"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please Enter userName",
                },
              ]}
            >
              <Input placeholder="Enter userName" />
            </Form.Item>

            <Form.Item
              hasFeedback
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please Enter Your Password",
                },
                {
                  min: 8,
                  message: "Password must contain at least 8 characters",
                },
              ]}
            >
              <Input.Password
                className="placeholder:text-slate-700 placeholder:border-slate-700"
                placeholder="Enter Your Password"
              />
            </Form.Item>

            <Form.Item name="role">
              <Select
                placeholder="Select an option"
                onChange={handleStatus}
                value={selectedRole}
              >
                <Option value="Admin">Admin</Option>
                <Option value="Manager">Manager</Option>
                <Option value="leadManager">Lead Manager</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <div className="flex justify-center items-center">
                <button
                  className="px-5 cursor-pointer py-2 text-lg font-bold tracking-wider text-white bg-blue-500 rounded-3xl hover:bg-blue-400"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </Form.Item>
          </Form>
          <div className="flex justify-center text-sm">
            <p>copyright @ GabLms 2022</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
