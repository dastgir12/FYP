import React, { useState } from "react";
import axios from "axios";

const LeadAdds = () => {
  const [leadData, setLeadData] = useState({
    leadName: "",
    sender: "",
    subject: "",
    wealth: "",
    experience: "",
    currentBusinesses: "",
    mostPreferedBusinesses: "",
    source: "",
    assignedTo: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve the access token from storage
      const response = await axios.post(
        "http://localhost:3001/v1/leads",
        leadData,
        {
          headers: {
            Authorization: `${token}`, // Include the access token in the request headers
          },
        }
      );
      console.log(response.data);
      // Handle success response, display a success message, or perform other actions
    } catch (error) {
      console.error(error);
      // Handle error response, display an error message, or perform other actions
    }
  };

  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="leadName" className="block font-medium">
            Lead Name
          </label>
          <input
            type="text"
            id="leadName"
            name="leadName"
            value={leadData.leadName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="sender" className="block font-medium">
            Sender Email
          </label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={leadData.sender}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={leadData.subject}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="wealth" className="block font-medium">
            Wealth
          </label>
          <input
            type="text"
            id="wealth"
            name="wealth"
            value={leadData.wealth}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="experience" className="block font-medium">
            Experience
          </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={leadData.experience}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="currentBusinesses" className="block font-medium">
            Current Businesses
          </label>
          <input
            type="text"
            id="currentBusinesses"
            name="currentBusinesses"
            value={leadData.currentBusinesses}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="mostPreferedBusinesses" className="block font-medium">
            Most Prefered Businesses
          </label>
          <input
            type="text"
            id="mostPreferedBusinesses"
            name="mostPreferedBusinesses"
            value={leadData.mostPreferedBusinesses}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="source" className="block font-medium">
            Source
          </label>
          <input
            type="text"
            id="source"
            name="source"
            value={leadData.source}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="assignedTo" className="block font-medium">
            Assigned To
          </label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={leadData.assignedTo}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={leadData.message}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadAdds;








import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu } from 'antd';
import axios from 'axios';
import { EyeOutlined, EditOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";

const FollowUP = () => {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleMenuClick = (e) => {
    const selectedUserId = e.key;
    const selectedUser = users.find((user) => user._id === selectedUserId);
    setSelectedUser(selectedUser);
    console.log("Selected User:", selectedUser);
  };
  

  const usersMenu = (
    <Menu onClick={handleMenuClick}>
      {users.map((item, index) => {
        return (
          <Menu.Item key={item._id}>
            {item.fullName}
          </Menu.Item>
        )
      })}
    </Menu>
  );

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('http://localhost:3001/v1/leads/companies/S920/users');
      console.log(response);
      setUsers(response.data.users);
    }
    getData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/v1/leads/leads-Info"
        );
  
        const list = res.data.data || [];
        const selectedColumns = [
          "companyName",
          "leadTitle",
          "leadSource",
          "staffName",
          "status",
        ];
  
        const actionColumn = {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (_, record) => (
            <div className="space-x-1">
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<EyeOutlined />}
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<EditOutlined />}
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<DeleteOutlined />}
              />
            </div>
          ),
        };
  
        const cols = selectedColumns.map((key) => {
          if (key === "status") {
            return {
              title: key,
              dataIndex: key,
              key: key,
              render: (text) => {
                let colorClass = "bg-gray-500 text-white"; // Default color
  
                if (text === "Working") {
                  colorClass = "bg-green-500 text-white";
                } else if (text === "Pending") {
                  colorClass = "bg-yellow-500 text-black";
                } else if (text === "Contacted") {
                  colorClass = "bg-yellow-500 text-white";
                } else if (text === "Qualified") {
                  colorClass = "bg-blue-900 text-white";
                } else if (text === "Closed") {
                  colorClass = " bg-red-500 text-white";
                }
  
                return (
                  <span className={`${colorClass} px-2 py-1 rounded`}>
                    {text}
                  </span>
                );
              },
            };
          }
  
          return {
            title: key,
            dataIndex: key,
            key: key,
          };
        });
  
        cols.push(actionColumn);
  
        // Assign unique identifier as key property for each row
        // const dataSourceWithKeys = list.map((row) => ({
          // ...row,
          // key: row.leadInfoId, // Assuming you have a unique identifier called leadInfoId
        // }));
  
        setColumns(cols);
        setDataSource(dataSourceWithKeys);
        setIsLoading(false);
      } catch (error) {
        console.log("error:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleCheckboxChange = async (selectedRowKeys) => {
    setCheckedItems(selectedRowKeys);
    console.log("Selected Row Keys:", selectedRowKeys); // Console log the selected row keys

    // if (selectedUser) {
    //   try {
    //     // Construct the payload with the selectedRowKeys and selectedUser ID
    //     const payload = {
    //       leadInfoIds: selectedRowKeys,
    //       userID: selectedUser._id, // Corrected the code here to use selectedUser._id
    //     };
  
    //     // Send the payload to the backend using axios or any other method
    //     const response = await axios.post(
    //       "http://localhost:3001/v1/leads/assign-lead",
    //       payload
    //     );
  
    //     console.log("Data saved successfully:", response.data);
    //   } catch (error) {
    //     console.log("Error saving data:", error);
    //   }
    // }
  };
  

  const rowSelection = {
    onChange: handleCheckboxChange,
    getCheckboxProps: (record) => ({
      // disabled: record.id === 'Disabled User',
      selectedUser: selectedUser,
      checked: checkedItems.includes(record.key)
    }),
  };
  

  return (
    <>
      <div className='p-4 h-auto w-auto'>
        <div className="mb-2 flex flex-row-reverse">
          <Dropdown overlay={usersMenu} trigger={['click']} >
            <Button className="bg-blue-500" type="primary w-[130px] h-[50px]"  icon={<DownOutlined />}>
              Select Users
            </Button>
          </Dropdown>
        </div>
        <div className='mt-2'>
          <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </>
  );
};

export default FollowUP;
