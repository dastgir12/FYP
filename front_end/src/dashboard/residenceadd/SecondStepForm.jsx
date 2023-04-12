import React from "react";
import { Form, Input, Select, Button } from "antd";

const SecondStepForm = ({ props }) => {
 const { current, setCurrent, formValues, setformValues } = props;
 console.log(formValues);
 const [form] = Form.useForm();
 const values = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => ({
  label: e,
  value: `${i + 1}`,
 }));
 const handleSubmit = (e) => {
  setCurrent((prev) => prev + 1);
  setformValues({ ...formValues, ...e });
 };
 return (
  <>
   <div className="grid place-items-center">
    <div className="mt-11">
     <Form form={form} onFinish={handleSubmit}>
      <div className="sm:flex sm:gap-12 sm:justify-center sm:items-center">
       <Form.Item
        name={"bed"}
        rules={[
         {
          type: "string",
          required: true,
          message: "Please Enter Bed Rooms",
         },
        ]}
       >
        <Select
         style={{ width: "300px" }}
         allowClear
         size="large"
         placeholder="Select Beds"
         options={values}
        />
       </Form.Item>
       <Form.Item
        name={"baths"}
        rules={[
         {
          required: true,
          message: "Please Select Bath Rooms",
         },
        ]}
       >
        <Select
         style={{ width: "300px" }}
         allowClear
         size="large"
         placeholder="Select Bath Rooms"
         options={values}
        />
       </Form.Item>
      </div>
      <div className="sm:flex sm:gap-12 sm:justify-center sm:items-center">
       <Form.Item
        name={"guests"}
        rules={[
         {
          required: true,
          message: "Please Select No of Guests",
         },
        ]}
       >
        <Select
         style={{ width: "300px" }}
         allowClear
         size="large"
         placeholder="Select No of Guests"
         options={values}
        />
       </Form.Item>
       <Form.Item
        name={"beds"}
        rules={[
         {
          required: true,
          message: "Please Select No of Beds",
         },
        ]}
       >
        <Select
         style={{ width: "300px" }}
         allowClear
         size="large"
         placeholder="Select No of Beds"
         options={values}
        />
       </Form.Item>
      </div>
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
   </div>
  </>
 );
};

export default SecondStepForm;
