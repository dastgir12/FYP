import React from "react";
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { Form, Input, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const postForm = async (values) => {
    form.resetFields();
    try {
      const formData = {
        email: values.email,
        name: values.name,
        company: values.company,
        phone: values.phone,
        password: values.password,
        address: values.address,
      };
  
      const { status, data } = await axios.post(
        "http://localhost:3001/v1/user/register",
        formData
      );
  
      console.log(status); // Log the actual status received from the server
  
      if (status === 201) { // Update the status code based on the server response
        toast.success('Registered successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          nav('/login'); // Navigate to login after a delay
        }, 2000);
      }
    } catch (e) {
      if (e.response) {
        const err = e.response.data.error;
        if (err) {
          toast.error(err, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else if (e.response.status === 409) {
          toast.error("Already Registered", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error("An error occurred", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
      console.log(e);
    }
  };
  
  
  
  //// Number Validation
  const numberValidation = async (rule, value) => {
    if (!value) {
      return Promise.reject(new Error("Please Enter Your Phone Number "));
    }
    // console.log(value);
    const count = value.toString();

    if (count.length < 11) {
      return Promise.reject(new Error("Number Length must be 11"));
    }
  };
  return (
    <>
    <ToastContainer/>
      <div className="relative flex w-screen h-screen">
        <div >
          <img
            src="https://media.istockphoto.com/id/1305268276/vector/registration-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=nfvUbHjcNDVIPdWkaxGx0z0WZaAEuBK9SyG-aIqg2-0="
            alt=""
            className=" h-screen w-screen "
          />
        </div>
        <div className="bg-white h-screen flex flex-col items-center w-screen gap-y-4 justify-center">
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
            className="flex flex-col justify-center w-[450px]"
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
              name="company"
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
              name="phone"
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
            </Form.Item>
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
            {/* </Form.Item> */}
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

                <div className="">
                  <p className="text-sm ">
                    Already have an account? 
                    </p>
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
