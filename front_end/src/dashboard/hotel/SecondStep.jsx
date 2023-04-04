import React from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";
const SecondStep = ({ props }) => {
  const { current, setCurrent, setformValues, formValues } = props;
  console.log(formValues);
  const [form] = Form.useForm();

  const ProvinceArray = ["KPK", "PUNJAB", "BALOCHISTAN", "SINDH"].map(
    (e, i) => ({
      label: e,
      value: `${i + 1}`,
    })
  );

  const CityArray = ["LAHORE", "ISLAMABAD", "GILGAT", "MURREE"].map((e, i) => ({
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
        <div className="text-2xl text-center">
          Enter Adress & Rules regulations
        </div>
        <p>
          please write full address and full details of rules and regulations{" "}
        </p>
        <Form form={form} onFinish={handleSubmit}>
          <div className="flex justify-between gap-6">
            <div className="flex flex-col">
              <label for="province" className="mb-1">
                Province
              </label>
              <Form.Item
                name={"type"}
                rules={[
                  {
                    type: "string",
                    required: true,
                    message: "Please Enter Province",
                  },
                ]}
              >
                <Select
                  style={{ width: "150px" }}
                  allowClear
                  size="large"
                  placeholder="Select Province"
                  options={ProvinceArray}
                />
              </Form.Item>
            </div>

            <div className="flex flex-col">
              <label for="city" className="mb-1">
                City
              </label>
              <Form.Item
                name={"kind"}
                rules={[
                  {
                    required: true,
                    message: "Please Enter City",
                  },
                ]}
              >
                <Select
                  style={{ width: "150px" }}
                  allowClear
                  size="large"
                  placeholder="Select City"
                  options={CityArray}
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <label htmlFor="" className="mb-1">
              PhoneNumber
            </label>
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
              <InputNumber
                style={{width: "300px"}}
                placeholder="Enter Phone Number"
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="">Adress</label>
            <Form.Item name="address">
              <Input.TextArea placeholder="Address" />
            </Form.Item>
          </div>

          <div>
            <label htmlFor="">Rules/Details</label>
            <Form.Item name="address">
              <Input.TextArea placeholder="Rules/Details" />
            </Form.Item>
          </div>

      <div className="grid place-items-center">
       <button className="bg-green-400 w-24 px-3 py-2 rounded-2xl text-white" type="submit">
        Next
       </button>
      </div>
    
        
        </Form>
      </div>
    </>
  );
};

export default SecondStep;
