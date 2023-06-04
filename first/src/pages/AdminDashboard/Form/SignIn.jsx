import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const SignIn = () => {
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState("");
  const handleStatus = (value) => {
    console.log("Selected value:", value);
  };
  const postForm = async (values) => {
    try {
      const formData = {
        username: values.username,
        role: values.role,
        password: values.password,
      };
      console.log(formData);
      const data = await axios.post(
        "http://localhost:3001/v1/admin/signIn",
        formData
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="mt-28 flex items-center justify-center">
        {/* Card */}
        <div className="border gap-y-4 w-[85vw] flex flex-col sm:w-[55vw] md:w-[45vw] lg:w-[30vw] rounded-3xl shadow-md justify-center p-10">
          <Form
            form={form}
            onFinish={postForm}
            className="flex flex-col justify-center "
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
                  message: "Password must contains 8 characters",
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
        </div>
      </div>
    </>
  );
};
export default SignIn;
