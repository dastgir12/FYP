import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const postForm = async (values) => {
    console.log(values);
    // form.resetFields();
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      // formData.append("repassword", values.repassword);
      formData.append("name", values.name);
      formData.append("number", values.number);
      formData.append("address", values.address);
      formData.append("companyName", values.companyName);


      const { data, status } = await axios.post(
        "http://localhost:3001/v1/user",
        formData
      );
      if (status === 200) {
        console.log(data);
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
  //// Number Validation
  const numberValidation = async (rule, value) => {
    if (!value) {
      return Promise.reject(new Error("Please Enter Your Phone Number "));
    }
    console.log(value);
    const count = value.toString();

    if (count.length < 11) {
      return Promise.reject(new Error("Number Length must be 11"));
    }
  };
  return (
    <>
      <div className="relative mt-14 flex gap-4 w-[1400px] h-screen">
        <div className=" h-screen mr-4 mt-14">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            alt=""
            className="w-[700px] h-[450px]"
          />
        </div>
        <div className="h-[450px] gap-y-4  flex flex-col items-center w-[700px] justify-around p-10 ml-6 mt-14">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
              alt=""
              className="w-10 h-10 "
            />
          </div>
          <div className="font-bold text-2xl text-center mb-3">Sign Up </div>
          <Form
            form={form}
            onFinish={postForm}
            className="flex flex-col justify-center  w-[450px]"
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
              <Input placeholder="Enter Your Name" />
            </Form.Item>

            <Form.Item
              name="companyName"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please Enter your companyName",
                },
              ]}
            >
              <Input placeholder="Enter Your companyName" />
            </Form.Item>

            <Form.Item
              name="address"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please Enter your address",
                },
              ]}
            >
              <Input placeholder="Enter Your address" />
            </Form.Item>

            <Form.Item
              hasFeedback
              name="number"
              rules={[
                {
                  validator: numberValidation,
                },
              ]}
            >
              <InputNumber
                controls={false}
                className="w-full"
                placeholder="Enter Your Number"
              />
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
            {/* </Form.Item> */}
            {/* <Form.Item
              hasFeedback
              dependencies={["password"]}
              name="repassword"
              rules={[
                {
                  required: true,
                  message: "Please Enter your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confrim Your password" /> */}
            </Form.Item>
            <Form.Item>
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center">
                  <button
                    className="px-5 cursor-pointer py-2 text-lg font-bold tracking-wider text-white bg-blue-500 rounded-2xl hover:bg-blue-400"
                    type="submit"
                  >
                    Register
                  </button>
                </div>

                <div>
                  <p class="text-sm">
                    Already have an account?
                    <Link
                      to="/login"
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
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
