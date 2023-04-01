import React, { useEffect } from "react";
// import axios from "axios";
import { Form, Input } from "antd";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
	const nav = useNavigate();
	const [cookies, setCookie, removeToken] = useCookies(["user"]);
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();
	///// {email: 'ahadimran720@gmail.com', password: 'ahad1234'}
	// const postForm = async (values) => {
	// 	try {
	// 		const formData = new FormData();
	// 		formData.append("email", values.email);
	// 		formData.append("password", values.password);
	// 		const { status, data } = await axios.post(
	// 			"https://test.hotelkey.pk/api/user-login",

	// 		);

	// 		if (status === 200) {
	// 			setCookie("user", data.token);
	// 			console.log(user);
	// 			if (user) {
	// 				form.resetFields();
	// 				setTimeout(() => {
	// 					nav("/");
	// 				}, 1000);
	// 			}
	// 		}
	// 	} catch (e) {
	// 		if (e) {
	// 			const err = e.response.data.error;
	// 			if (err) {
	// 				messageApi.open({
	// 					type: "error",
	// 					content: err,
	// 					duration: 3,
	// 				});
	// 			}
	// 		}
		// }
	// };

	return (
		<>
			{contextHolder}
			<div className="mt-16 flex  justify-center">
				{/* Card */}
				<div className="border gap-y-4 w-[85vw] flex flex-col sm:w-[55vw] md:w-[45vw] lg:w-[30vw] rounded-3xl shadow-md justify-center p-10">
					<div className="text-3xl text-center font-bold">Login</div>
					<Form form={form} onFinish=''>
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
							<div className="flex justify-center items-center">
								<button
									className="px-5 cursor-pointer py-2 text-lg font-bold tracking-wider text-white bg-blue-500 rounded-3xl hover:bg-blue-400"
									type="submit"
								>
									SignIn
								</button>
							</div>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
};
export default Login;