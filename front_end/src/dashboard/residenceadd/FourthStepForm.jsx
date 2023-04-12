import React from "react";
import { Form, Input, Select, InputNumber } from "antd";
const FourthStepForm = ({ props }) => {
 const [form] = Form.useForm();
 const { current, setCurrent } = props;
 console.log(current);
 const { TextArea } = Input;
 const provinces = ["KPK", "Punjab", "Balochistan", "Sindh", "Islamabad", "Kashmir", "Gilgit"].map(
  (e) => ({ label: e, value: e })
 );
 return (
  <>
   <div className="flex justify-center items-center flex-col">
    <h1 className="text-center">Enter Address & Rules regulations</h1>
    <p className="text-center">
     Please write complete address and full details of rules regulation (Allowed & Disallowed )
    </p>
    <Form form={form} onFinish={(e) => setCurrent((prev) => prev + 1)}>
     <div className=" sm:flex gap-x-10">
      <Form.Item
       name={"provience"}
       rules={[
        {
         type: "string",
         required: true,
         message: "Please Enter Provience",
        },
       ]}
      >
       <Select
        style={{ width: "300px" }}
        allowClear
        size="large"
        placeholder="Select Province"
        options={provinces}
       />
      </Form.Item>
      <Form.Item
       name={"provience"}
       rules={[
        {
         type: "string",
         required: true,
         message: "Please Enter Provience",
        },
       ]}
      >
       <Select
        style={{ width: "300px" }}
        allowClear
        size="large"
        placeholder="Select City"
        options={provinces}
       />
      </Form.Item>
     </div>
     <Form.Item
      name={"phone"}
      rules={[
       {
        type: "number",
        required: true,
        message: "Please Enter Phone Number",
       },
      ]}
     >
      <InputNumber style={{ padding: "10px", width: "300px" }} placeholder="Enter Phone Number" />
     </Form.Item>
     <Form.Item
      //   label="Address"
      name={"address"}
      rules={[
       {
        type: "string",
        required: true,
        message: "Please Enter Address",
       },
      ]}
     >
      <TextArea
       rows={4}
       placeholder="Provide more information for travelers to find your starting point easily, for example, opposite to the xyz landmark building"
      />
     </Form.Item>
     <Form.Item
      //   label="Address"
      name={"rules"}
      rules={[
       {
        type: "string",
        required: true,
        message: "Please Enter Rules/Details",
       },
      ]}
     >
      <TextArea rows={3} placeholder="Write all the rules regualations and details ..." />
     </Form.Item>
     <Form.Item>
      <div className="flex gap-2 justify-center items-center ">
       <button
        onClick={() => setCurrent(current - 1)}
        className="bg-green-400 w-24 px-3 py-2 rounded-2xl text-white"
       >
        Back
       </button>
       <button className="bg-green-400 w-24 px-3 py-2 rounded-2xl text-white" type="submit">
        Next
       </button>
      </div>
     </Form.Item>
    </Form>
   </div>
  </>
 );
};

export default FourthStepForm;
