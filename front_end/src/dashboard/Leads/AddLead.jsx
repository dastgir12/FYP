import React from "react";
import { Form, Input, Select } from "antd";
import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
const { Option } = Select;

const AddLead = () => {
  return (
    <>
      <div className=" bg-gray-300 h-screen">
        <div className="flex justify-between mb-8 p-5">
          <div className=" text-2xl font-semibold">Lead Category</div>
          <div>
            <div>Home / Leads / AddLead</div>
          </div>
        </div>

        <div className="bg-white h-auto w-auto">
          <Form className="flex flex-col">
            <div className="flex">
              <div className="flex justify-center p-4 space-x-2">
                <label for="">Company Name</label>

                <div className="w-[550px] ">
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
              <div>
                <label for="">Company Name</label>
                <div className="w-[550px] ">
                  <Form.Item name="Category Name">
                    <Input placeholder="Enter Ctegory Name" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div>
          <Button
            className="bg-blue-700 flex justify-center items-center"
            type="primary"
            icon={<PlusSquareOutlined />}
          />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddLead;
