import { Form, Input, Button } from "antd";
import React from "react";

function LeadAdd() {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form onFinish={onFinish} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-center text-2xl font-bold mb-6">Add Lead Information</h2>

      <div className="mb-4">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
          ]}
        >
          <Input
            placeholder="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Form.Item>
      </div>

      <div className="mb-4">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input
            placeholder="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Form.Item>
      </div>
             
      <div className="mb-4">
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              pattern: /^[0-9]*$/,
              message: "Please enter a valid phone number",
            },
          ]}
        >
          <Input
            placeholder="(123) 456-7890"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Form.Item>
      </div>

      <div className="mb-4">
        <Form.Item name="company" label="Company">
          <Input
            placeholder="company"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Form.Item>
      </div>

      <div className="mb-4">
        <Form.Item name="message" label="Message">
          <Input.TextArea
            rows={4}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your message here"
          />
        </Form.Item>
      </div>

      <div className="flex items-center justify-center">
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default LeadAdd;
