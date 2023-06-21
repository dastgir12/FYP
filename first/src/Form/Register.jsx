import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const { Option } = Select;

const Register = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState("");

  const handleStatus = (value) => {
    console.log("Selected value:", value);
  };

  const postForm = async (values) => {
    console.log(values);
    form.resetFields();

    try {
      const formData = {
        username: values.username,
        email: values.email,
        role: values.role,
        secretKey: values.secretKey,
        password: values.password,
      };

      console.log(formData);

      const response = await axios.post(
        "http://localhost:3001/v1/admin/signup",
        formData
      );

      if (response.status === 201) {
        toast.success("Registration successful!");
        // nav("/AdminDashBoard/signIn");
        setTimeout(() => {
          nav("/AdminDashboard/signin"); // Navigate to login after a delay
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="relative flex w-screen h-screen">
        <div>
          <img
            src="https://media.istockphoto.com/id/1305268276/vector/registration-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=nfvUbHjcNDVIPdWkaxGx0z0WZaAEuBK9SyG-aIqg2-0="
            alt=""
            className="h-screen w-screen"
          />
        </div>
        <div className="bg-white h-screen flex flex-col items-center w-screen gap-y-4 justify-center">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
              alt=""
              className="w-10 h-10"
            />
          </div>
          <div className="font-bold text-2xl text-center mb-3">Sign Up</div>
          <Form
            form={form}
            onFinish={postForm}
            className="flex flex-col justify-center w-[450px]"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please enter a username",
                },
              ]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>

            <Form.Item
              name="email"
              hasFeedback
              rules={[
                {
                  type: "email",
                  message: "Invalid email address",
                },
                {
                  required: true,
                  message: "Please enter your email",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item name="role">
              <Select
                placeholder="Select a role"
                onChange={handleStatus}
                value={selectedRole}
              >
                <Option value="Admin">Admin</Option>
                <Option value="Manager">Manager</Option>
                <Option value="LeadManager">Lead Manager</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="secretKey"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please enter the secret key",
                },
              ]}
            >
              <Input placeholder="Enter secret key" />
            </Form.Item>

            <Form.Item
              hasFeedback
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
                {
                  min: 8,
                  message: "Password must contain at least 8 characters",
                },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center">
                  <button
                    className="px-5 cursor-pointer py-2 text-lg font-bold tracking-wider text-white bg-blue-500 rounded-2xl hover:bg-blue-400"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>

                <div className="">
                  <p className="text-sm ">Already have an account?</p>
                  <p className="font-bold">
                    <Link
                      to="/login"
                      className="font-bold text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
