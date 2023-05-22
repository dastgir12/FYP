import React from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const AddStaff = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
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
          <Form onFinish={onFinish} className="flex flex-col p-4">
            <div className="flex justify-center space-x-2">
              <div>
                <label htmlFor="" className=" font-semibold">
                  Staff ID
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="staffID">
                    <Input placeholder="enter id" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label htmlFor="" className=" font-semibold">
                  Staff name
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="Staff Name">
                    <Input placeholder="Enter Staff Name" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <div>
                <label htmlFor="" className=" font-semibold">
                  Telephone
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="Telephone">
                    <Input placeholder="Enter Telephone number" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label htmlFor="" className=" font-semibold">
                  Designation
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="Designation">
                    <Input placeholder="Enter Designation" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <div>
                <label htmlFor="" className=" font-semibold">
                  Department
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="Department">
                    <Input placeholder="Enter Department" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label htmlFor="" className=" font-semibold">
                  Category Name
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="Category Name">
                    <Input placeholder="Enter Ctegory Name" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="ml-20 mb-4">
                <button
                  type="submit"
                  className="bg-red-500 text-white hover:bg-red-700 rounded px-4 py-2"
                >
                  Close
                </button>
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-700 rounded px-4 py-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddStaff;
