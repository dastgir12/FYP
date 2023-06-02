import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const AddLeadCategory = () => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const [form] = Form.useForm();

  const handleStatus = (value) => {
    console.log("Selected value:", value);
  };
  const onFinish = async (values) => {
    try {
      const formData = {
        category: values.category,
        status: values.status,
      };

      const { status, data } = await axios.post(
        "http://localhost:3001/v1/leads/leadsCategory",
        formData
      );
      if (status == 200) {
        console.log(data);
      } else {
        console.log("error is here");
      }
    } catch (e) {
      console.log(e);
      return; // return early to prevent redirect
    }
  };
  return (
    <>
      <div className="bg-gray-200 h-screen w-full">
        <div className="flex justify-between mb-8 p-5">
          <div className=" text-2xl font-semibold">Lead Category</div>
          <div>
            <div>Home / LeadCategory / LeadCategoryAdd</div>
          </div>
        </div>

        <div className="mt-8 w-auto h-auto bg-white m-4 ">
          <Form form={form} onFinish={onFinish} className="flex flex-col">
            <div className="flex justify-center p-4 space-x-2">
              <div>
                <label htmlFor="" className=" font-semibold">
                  Category Name
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="category">
                    <Input placeholder="Enter Ctegory Name" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <label for="" className=" font-semibold">
                  Change Status
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="status">
                    <Select
                      placeholder="Select an option"
                      onChange={handleStatus}
                      value={selectedStatus}
                    >
                      <Option value="active">active</Option>
                      <Option value="non active">non active</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2 w-[80px]"
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

export default AddLeadCategory;
