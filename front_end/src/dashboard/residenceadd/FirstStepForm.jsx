import React from "react";
import { Form, Input, Select, Button } from "antd";
const  FirstStepForm = ({ props }) => {
 const { current, setCurrent, setformValues, formValues } = props;
 console.log(formValues);
 const [form] = Form.useForm();
 const residenceTypeArray = ["House", "Hotel", "Hostel", "Tent", "Banglo"].map((e, i) => ({
  label: e,
  value: `${i + 1}`,
 }));
 const placesKind = ["Entire Place", "Private Room", "Shared Room"].map((e, i) => ({
  label: e,
  value: `${i + 1}`,
 }));
 const handleSubmit = (e) => {
  setCurrent((prev) => prev + 1);
  setformValues({ ...formValues, ...e });
 };
 
 return (
  <>
   <div className="flex flex-col gap-y-4 justify-center items-center">
    <div className="text-2xl text-center">Add Name ,Kind & Type of Residence</div>
    <Form form={form} onFinish={handleSubmit}>
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
      <Input style={{ padding: "10px", width: "300px" }} placeholder="Enter Residence Name" />
     </Form.Item>
     <Form.Item
      name={"type"}
      rules={[
       {
        type: "string",
        required: true,
        message: "Please Enter Residence Type",
       },
      ]}
     >
      <Select
       style={{ width: "300px" }}
       allowClear
       size="large"
       placeholder="Select Residence Type"
       options={residenceTypeArray}
      />
     </Form.Item>
     <Form.Item
      name={"kind"}
      rules={[
       {
        required: true,
        message: "Please Enter Kind of Palace",
       },
      ]}
     >
      <Select
       style={{ width: "300px" }}
       allowClear
       size="large"
       placeholder="Select Kind of Palace"
       options={placesKind}
      />
     </Form.Item>
     <Form.Item>
      <div className="grid place-items-center">
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

export default FirstStepForm;
