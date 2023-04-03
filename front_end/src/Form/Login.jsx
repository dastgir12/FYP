import React, { useEffect } from "react";
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Form, Input } from "antd";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const nav = useNavigate();
  const [cookies, setCookie, removeToken] = useCookies(["user"]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const postForm = async (values) => {
    try {
    //   const formData = new FormData();
    //   formData.append("email", values.email);
    //   formData.append("password", values.password);

	const formData = {
		email : values.email,
		password  : values.password
	}
      const { status, data } = await axios.post(
        "http://localhost:5000/api/auth",
        formData
      );
      if (status === 200) {
		toast.success('Login successful!', {
			position: toast.POSITION.TOP_CENTER,
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		  });
		console.log(data);
        setCookie("user", data.token);
        if (data) {
          form.resetFields();
          setTimeout(() => {

			// here i will have to change wher we maove after login
            nav("/");
          }, 1000);
        }
      }
    }catch (e) {
		if (e) {
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
		  } else {
			toast.error("Invalid input", {
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

  return (
    <>
	<ToastContainer />
      <div className="relative mt-14 flex gap-4 w-[1400px] h-screen">
        <div className=" h-screen mr-4 mt-14">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            alt=""
            className="w-[700px] h-[450px]px]"
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
        <div className="text-4xl text-center font-bold ">Login</div>
          <Form form={form} onFinish={postForm} className="flex flex-col justify-between w-[350px]">
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
                    SignIn
                  </button>
                </div>
                <div>
                  <a
                    href="#!"
                    class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                  >
                    Forgot password?
                  </a>
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
