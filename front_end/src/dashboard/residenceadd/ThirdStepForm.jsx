import React, { useState } from "react";
import { DatePicker, Form, Input, Select, Button, InputNumber } from "antd";
import { format } from "date-fns";
const ThirdStepForm = ({ props }) => {
 const { current, setCurrent, formValues, setformValues } = props;
 console.log(formValues);
 const [form] = Form.useForm();
 const { RangePicker } = DatePicker;
 const handleSubmit = (e) => {
  if (e.date) {
   const dateRanges = e.date.map((d) => format(new Date(d.$d), "MM/dd/yyy")).join("-");
   console.log(e.price, dateRanges);
   setCurrent((prev) => prev + 1);
  }
 };
 return (
  <>
   <div className="flex justify-center items-center flex-col">
    <div>
     <h1 className="text-center">Enter Price &Dates of availibility</h1>
    </div>

    <Form style={{ marginTop: "20px" }} form={form} onFinish={handleSubmit}>
     <Form.Item
      name={"price"}
      rules={[
       {
        type: "number",
        required: true,
        message: "Please Enter Price",
       },
      ]}
     >
      <InputNumber style={{ padding: "10px", width: "300px" }} placeholder="Enter Price" />
     </Form.Item>
     <Form.Item
      name={"date"}
      rules={[
       {
        required: true,
        message: "Please Enter Date",
       },
      ]}
     >
      {/*  */}
      <RangePicker style={{ width: "300px", padding: "10px" }} />
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

export default ThirdStepForm;
