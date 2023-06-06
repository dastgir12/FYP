import React from "react";
import { Form, Input, InputNumber } from "antd";
// import { apiHeader } from "../../services/authHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CompanyProfile = () => {
  const nav = useNavigate()
  const [form] = Form.useForm();

  const postForm = async (values) => {
    try {
      const formData = {
        name: values.name,
        numberOfUsers: values.numberOfUsers,
        maxAllowedUsers: values.maxAllowedUsers,
      };
      const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDdjZWNiZWJkZjAwYjhiNGFkMmQ5MTkiLCJpYXQiOjE2ODYwODQxMzMsImV4cCI6MTY4NjA4NzczM30.IBH7uHtaxbLr9s3VOyM4cvnF1AWWZrEoBozy5EeQbwg";
      const { data, status } = await axios.post(
        "http://localhost:3001/v1/admin/companies",
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (status === 201) {
        console.log(data);
        nav('/AdminDashboard/UserProfile')
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  return (
    <>
      <div className="mt-11 flex  justify-center">
        <div className="w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[35vw] p-10 rounded-3xl border shadow-md">
          <div className="font-bold text-2xl text-center mb-3">
            Company Profile{" "}
          </div>
          <Form
            form={form}
            onFinish={postForm}
            className="flex flex-col justify-center "
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please Enter your Name",
                },
              ]}
            >
              <Input placeholder="Enter Your Comapny Name" />
            </Form.Item>

            <Form.Item
              label="No Of User"
              name="numberOfUsers"
              rules={[{ required: true, message: "Please enter number 1" }]}
            >
              <Input type="number" placeholder="numberOfUsers" />
            </Form.Item>

            <Form.Item
              label="Max Allow User"
              name="maxAllowedUsers"
              rules={[{ required: true, message: "Please enter number 2" }]}
            >
              <Input type="number" placeholder="maxAllowedUsers" />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-center items-center">
                <button
                  className="px-5 cursor-pointer py-2 text-lg font-bold tracking-wider text-white bg-blue-500 rounded-3xl hover:bg-blue-400"
                  type="submit"
                >
                  save
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
