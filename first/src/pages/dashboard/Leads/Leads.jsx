import React from "react";
import { Table, Button } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Leads = () => {
    const nav = useNavigate()
  const newCols = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
      key: "staffName",
    },
    {
      title: "Lead Title",
      dataIndex: "leadTitle",
      key: "leadTitle",
    },
    {
      title: "Lead Source",
      dataIndex: "leadSource",
      key: "leadSource",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <div className=" space-x-1">
          <Button
            className="bg-blue-900"
            type="primary"
            icon={<EyeOutlined />}
          />
          <Button
            className="bg-blue-900"
            type="primary"
            icon={<EditOutlined />}
          />
          <Button
            className="bg-blue-900"
            type="primary"
            icon={<DeleteOutlined />}
          />
        </div>
      ),
    },
  ];


  const handleClicked = ()=>{
    nav('AddLead')
  }
  const data = [
    {
      key: 1,
      companyName: "ABC Company",
      staffName: "John Doe",
      leadTitle: "New Lead",
      leadSource: "Website",
    },
    // Add more data objects as needed
  ];

  return (
    <>
      <div className="bg-gray-200 h-screen ">
        <div className="flex justify-between mb-8 p-5">
          <div className=" text-2xl font-semibold">
            Leads Information
          </div>
          <div>
            <div>Home / Lead</div>
          </div>
        </div>

        <div className="bg-blue-500 rounded flex justify-center items-centr w-[80px] h-[40px] ml-32 ">
          <button className="text-white" onClick={handleClicked}>Add New</button>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="border-[1.5px] mt-7 border-gray-300 w-[95vw] sm:w-[80vw] ">
            <Table
              columns={newCols}
              dataSource={data}
              scroll={{ x: 600 }}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Leads;
