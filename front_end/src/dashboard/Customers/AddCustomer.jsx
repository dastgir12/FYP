import React from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const AddCustomer = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <>
      <div className="bg-gray-200 h-screen w-full">
        <div className="flex justify-between p-5">
          <div className=" text-2xl font-semibold">Customer Information</div>
          <div>
            <div>Home / Customers / AddCustomer</div>
          </div>
        </div>

        <div className="mt-8 w-auto h-auto bg-white m-4 ">
          <Form onFinish={onFinish} className="flex flex-col p-4">
            <div className="flex justify-center space-x-2">
              <div>
                <label htmlFor="" className=" font-semibold">
                  Company Name
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="companyName">
                    <Input placeholder="enter company name" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label htmlFor="" className=" font-semibold">
                  Telphone
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="telephone">
                    <Input placeholder="Enter Telphone" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <div>
                <label htmlFor="" className=" font-semibold">
                  Email
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="email">
                    <Input placeholder="example@gmail.com" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label htmlFor="" className=" font-semibold">
                  Website
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="website">
                    <Input placeholder="http://www.exapmle.com" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <div>
                <label htmlFor="" className=" font-semibold">
                  Contact Person Name
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="personName">
                    <Input placeholder="Enter Contact person name" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label htmlFor="" className=" font-semibold">
                  Contact person Phone
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="personPhone">
                    <Input placeholder="Enter Contact person phone" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <div className="w-[550px] ">
                <label for="">Country</label>

                <Form.Item name="dropdownField">
                  <Select placeholder="Select an option">
                    <Option value="option1">Pakistan</Option>
                    <Option value="option2">Bangladesh</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="w-[550px] ">
                <label for="">State</label>

                <Form.Item name="dropdownField">
                  <Select placeholder="Select an option">
                    <Option value="option1">America</Option>
                    <Option value="option2">Asia</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="flex space-x-2">


              <div className="mb-4 ml-24">
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

export default AddCustomer;
