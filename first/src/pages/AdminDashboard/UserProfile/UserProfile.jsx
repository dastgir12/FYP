import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const UserProfile = () => {
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState("");
  const handleStatus = (value) => {
    console.log("Selected value:", value);
  };
  const postForm = async (values) => {
    try {
      const formData = {
        companyId: values.companyId,

        fullName: values.fullName,
        email: values.email,
        contactNumber: values.contactNumber,

        userLevel: values.userLevel,
        password: values.password,
      };
      console.log(formData);
      const data = await axios.post(
        "http://localhost:3001/v1/admin/registration",
        formData
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        {/* Card */}
        <div className="border gap-y-4 mt-14 flex flex-col sm:w-[55vw] md:w-[45vw] lg:w-[30vw] rounded-3xl shadow-md  p-10">
          <div className="font-bold text-2xl text-center mb-3">
            User Profile{" "}
          </div>

          <Form
            form={form}
            onFinish={postForm}
            className="flex flex-col justify-center "
          >
            <Form.Item
              label="companyId"
              name="companyId" //S547
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please Enter Company Id",
                },
              ]}
            >
              <Input placeholder="Enter copmpanyId" />
            </Form.Item>

            <Form.Item
              label="companyName"
              name="companyName"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please Enter Full companyName",
                },
              ]}
            >
              <Input placeholder="Enter companyName" />
            </Form.Item>

            <Form.Item
              label="password"
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

            <Form.Item name="userLevel" label="userLevel">
              <Select
                placeholder="Select an option"
                onChange={handleStatus}
                value={selectedRole}
              >
                {/* <Option value="Admin">Admin</Option> */}
                <Option value="Manager">Manager</Option>
                <Option value="leadManager">Lead Manager</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="email"
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

            <Form.Item name="contactNumber" label="contactNumber">
              <Input placeholder="Enter Your Phone Number" />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-center items-center">
                <button
                  className="px-5 cursor-pointer py-2 text-lg font-bold tracking-wider text-white bg-blue-500 rounded-3xl hover:bg-blue-400"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
