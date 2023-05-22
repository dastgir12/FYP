import React from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const AddLeadCategory = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
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
          <Form onFinish={onFinish} className="flex flex-col">
            <div className="flex justify-center p-4 space-x-2">
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

              <div>
                <label for="" className=" font-semibold">
                  Change Status
                </label>
                <div className="w-[550px] ">
                  <Form.Item name="dropdownField">
                    <Select placeholder="Select an option">
                      <Option value="option1">Active</Option>
                      <Option value="option2">InActive</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="ml-28 mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2"
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
