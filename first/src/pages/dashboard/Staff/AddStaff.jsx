import React from "react";
import { Form, Input, Select } from "antd";
import axios from "axios";
const { Option } = Select;

const AddStaff = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const formData = {
        staffId: values.staffId,
        staffName: values.staffName,
        mobileNo: values.mobileNo,
        email: values.email,        
        designation: values.designation,
        department: values.department,
      };

      const { status, data } = await axios.post(
        "http://localhost:3001/v1/leads/staff-info",
        formData
      );
      if(status == 200)
      {
      console.log(data);
      }
      else
      {
        console.log('error is here bru');
      }
    } catch (e) {
      console.log(e);
      return; // return early to prevent redirect
    }
  };

  return (
    <>
      <div className="bg-gray-200 h-screen w-full">
        <div className="flex justify-between p-5">
          <div className=" text-2xl font-semibold">Staff Information</div>
          <div>
            <div>Home / Staff / AddStaff</div>
          </div>
        </div>

        <div className="mt-8 w-auto h-auto bg-white m-4 ">
          <Form form={form} onFinish={onFinish} className="flex flex-col p-4">
            <div className="flex justify-center space-x-2">
              <div>
                <label htmlFor="" className=" font-semibold">
                  Staff ID
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="staffId">
                    <Input placeholder="enter id" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label htmlFor="" className=" font-semibold">
                  Staff name
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="staffName">
                    <Input placeholder="Enter Staff Name" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <div>
                <label htmlFor="" className=" font-semibold">
                  MobileNo
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="mobileNo">
                    <Input placeholder="Enter Telephone number" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label htmlFor="" className=" font-semibold">
                  email
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="email">
                    <Input placeholder="Enter Email" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <div>
                <label htmlFor="" className=" font-semibold">
                  Designation
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="designation">
                    <Input placeholder="Enter Department" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label htmlFor="" className=" font-semibold">
                  Depatatment Name
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="department">
                    <Input placeholder="Enter Department Name" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-700 rounded px-4 py-2"
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddStaff;
