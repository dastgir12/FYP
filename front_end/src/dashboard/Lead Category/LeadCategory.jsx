import React, { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import { DeleteOutlined, EditOutlined, SyncOutlined } from "@ant-design/icons";
import  { useNavigate }  from "react-router-dom";
const { Search } = Input;

const LeadCategory = () => {
    const nav = useNavigate();
  const [dataSource, setDataSource] = useState([
    { id: 1, name: "Ghulam Dastgir", status: "Active" },
    { id: 2, name: "Ahmad Bilal", status: "Active" },
    { id: 3, name: "Afnan Bangash", status: "InActive" },
  ]);

  const handleDelete = (id) => {
    const updatedDataSource = dataSource.filter((item) => item.id !== id);
    setDataSource(updatedDataSource);
  };

  const handleUpdate = (id) => {
    // Perform update logic here
    console.log("Update clicked for item ID:", id);
  };

  const handleEdit = (id) => {
    // Perform edit logic here
    console.log("Edit clicked for item ID:", id);
  };

  const handleSearch = (value) => {
    // Perform search logic here
    console.log("Search value:", value);
    // Update dataSource based on search value if needed
  };

  const handleClicked = () => {
  nav("AddLeadCategory")
  }

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div className="w-[50px] bg-green-400 text-cyan-50 rounded-lg flex justify-center items-center">
          {text}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
          <Button
            icon={<SyncOutlined />}
            onClick={() => handleUpdate(record.id)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="bg-gray-200 h-auto w-auto">
        <div className="flex justify-between mb-8 p-5">
          <div className=" text-2xl font-semibold">
            Lead Category Information
          </div>
          <div>
            <div>Home / LeadCategory</div>
          </div>
        </div>
        <div className="bg-blue-500 rounded flex justify-center items-center w-[80px] h-[40px] mb-2 ml-6">
          <button className="text-white" onClick={handleClicked}>Add New</button>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          className="rounded p-5 w-full h-full"
        />
      </div>
    </>
  );
};

export default LeadCategory;
