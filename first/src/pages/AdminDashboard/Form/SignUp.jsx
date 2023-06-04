import React , {useState} from "react";
import { Form, Input, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const SignUp = () => {

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

      const data = await axios.post(
        "http://localhost:3001/v1/admin/signup",
        formData
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-11 flex items-center justify-center">
        <div className="w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[35vw] p-10 rounded-3xl border shadow-md">
          <div className="font-bold text-2xl text-center mb-3">Sign Up </div>
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


            <Form.Item
              name="secretKey"   //gabisbag
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please Enter secretKey",
                },
              ]}
            >
              <Input placeholder="Enter secretKey" />
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

            <Form.Item>
              <div className="flex justify-center items-center">
                <button
                  className="px-5 cursor-pointer py-2 text-lg font-bold tracking-wider text-white bg-blue-500 rounded-3xl hover:bg-blue-400"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
