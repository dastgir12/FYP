import React from "react";
import { Form, Input } from "antd";

const FirstStep = ({ props }) => {
  const { current, setCurrent, setformValues, formValues } = props;
console.log(formValues);
  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    setCurrent((prev) => prev + 1);
    setformValues({ ...formValues, ...e });
  };

  return (
    <div className="flex flex-col gap-y-4 justify-center items-center">
      <div className="flex flex-col gap-y-4 justify-center items-start">
        <div className="text-2xl text-center">
          Add Name ,Kind & Type of Residence
        </div>
        <Form form={form} onFinish={handleSubmit}>
          <label htmlFor="name" className="mt-2 mb-2">
            Name
          </label>
          <Form.Item
            name={"name"}
            rules={[
              {
                type: "string",
                required: true,
                message: "Please input Name",
              },
            ]}
          >
            <Input
              style={{ padding: "10px", width: "300px" }}
              placeholder="Enter Name"
            />
          </Form.Item>
          <div className="grid place-items-center">
            <button
              className="bg-green-400 w-24 px-3 py-2 rounded-2xl text-white"
              type="submit"
            >
              Next
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FirstStep;
