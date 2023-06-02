import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const AddCustomer = () => {
  const [form] = Form.useForm();
  const [selectedCity, setSelectedCity] = useState("");

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
    // You can perform further actions with the selected value here
  };

  const onFinish = async (values) => {
    try {
      const formData = {
        CompanyName: values.CompanyName,
        Telephone: values.Telephone,
        email: values.email,
        website: values.website,
        contactPersonName: values.contactPersonName,
        contactPersonMobileNumber: values.contactPersonMobileNumber,
        contactPersonEmail: values.contactPersonEmail,
        otherDetails: values.otherDetails,
        country: values.country,
        State: values.State,
        city: values.city,
      };

      const { status, data } = await axios.post(
        "http://localhost:3001/v1/leads/CustomerInfo",
        formData
      );
      if (status == 200) {
        console.log(data);
      } else {
        console.log("error is here bru");
      }
    } catch (e) {
      console.log(e);
      return; // return early to prevent redirect
    }
  };

  return (
    <>
      <div className="bg-gray-200 h-screen w-full ">
        <div className="flex justify-between p-5">
          <div className=" text-2xl font-semibold">Customer Information</div>
          <div>
            <div>Home / Customers / AddCustomer</div>
          </div>
        </div>

        <div className="mt-8 w-auto h-auto bg-white m-4 ">
          <Form form={form} onFinish={onFinish} className="flex flex-col p-4">
            <div className="flex justify-center space-x-2">
              <div>
                <label htmlFor="" className=" font-semibold">
                  Company Name
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="CompanyName">
                    <Input placeholder="enter company name" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label htmlFor="" className=" font-semibold">
                  Telphone
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="Telephone">
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
                  Email
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="contactPersonEmail">
                    <Input placeholder="example@gmail.com" />
                  </Form.Item>
                </div>
              </div>

              <div className="w-[550px] ">
                <label for="">City</label>

                <Form.Item name="city">
                  <Select
                    className="bg-white text-black"
                    placeholder="Select an option"
                    onChange={handleSelectChange}
                    value={selectedCity}
                  >
                    <Option value="Rawalpindi">Rawalpindi</Option>
                    <Option value="Islamabad">Islamabad</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <div>
                <label htmlFor="" className=" font-semibold">
                  Contact Person Name
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="contactPersonName">
                    <Input placeholder="Enter Contact person name" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label htmlFor="" className=" font-semibold">
                  Contact person Phone
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="contactPersonMobileNumber">
                    <Input placeholder="Enter Contact person phone" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <div className="w-[550px] ">
                <label for="">Country</label>

                <Form.Item name="country">
                  <Select placeholder="Select an option">
                    <Option value="Pakistan">Pakistan</Option>
                    <Option value=" Bangladesh">Bangladesh</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="w-[550px] ">
                <label for="">State</label>

                <Form.Item name="State">
                  <Select placeholder="Select an option">
                    <Option value="America">America</Option>
                    <Option value="Asia">Asia</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-[80px] ml-8 bg-blue-500 text-white hover:bg-blue-700 rounded px-4 py-2"
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

export default AddCustomer;
