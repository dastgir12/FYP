import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// const API = "http://localhost:3001/v1/leads/status-based-filter?status=Working";
const Leads = () => {
  const [coloums, setColoums] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const nav = useNavigate();
  // const getData = async (url) => {
  //   try {
  //     const res = await axios.get(url);
  //     if (res.data.length > 0) {
  //       setDataSource(res.data);
  //     }
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/v1/leads/status-based-filter?status=Working"
      );
      const list = res.data.leads || [];
      const firstObj = list[0] || {};
      const selectedColumns = ["companyName", "staffName", "leadTitle"]; // Replace with the desired column keys

      const cols = selectedColumns.map((key) => {
        const col = {
          title: key,
          dataIndex: key,
        };
        return col;
      });

      setColoums(cols);
      setDataSource(
        list.map((obj) => {
          const newObj = {};
          selectedColumns.forEach((key) => {
            newObj[key] = obj[key];
          });
          return newObj;
        })
      );
    } catch (error) {
      console.log("error:", error);
    }
  }, []);

  // const newCols = [

  //   {
  //     title: "action",
  //     dataIndex: "action",
  //     key: "action",
  //     render: () => (
  //       <div className=" space-x-1">
  //         <Button
  //           className="bg-blue-900"
  //           type="primary"
  //           icon={<EyeOutlined />}
  //         />
  //         <Button
  //           className="bg-blue-900"
  //           type="primary"
  //           icon={<EditOutlined />}
  //         />
  //         <Button
  //           className="bg-blue-900"
  //           type="primary"
  //           icon={<DeleteOutlined />}
  //         />
  //       </div>
  //     ),
  //   },
  // ];

  const handleClicked = () => {
    nav("AddLead");
  };

  return (
    <>
      <div className="bg-gray-200 h-screen ">
        <div className="flex justify-between mb-8 p-5">
          <div className=" text-2xl font-semibold">Leads Information</div>
          <div>
            <div>Home / Lead</div>
          </div>
        </div>

        <div className="bg-blue-500 rounded flex justify-center items-centr w-[80px] h-[40px] ml-32 ">
          <button className="text-white" onClick={handleClicked}>
            Add New
          </button>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="border-[1.5px] mt-7 border-gray-300 w-[95vw] ">
            <Table
              columns={coloums}
              dataSource={dataSource}
              scroll={{ y: 500 }}
              // pagination={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Leads;
