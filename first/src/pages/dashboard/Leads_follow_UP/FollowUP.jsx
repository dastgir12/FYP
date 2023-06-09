import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu } from 'antd';
import axios from 'axios';
import { EyeOutlined, EditOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FollowUP = () => {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleMenuClick = async (e) => {
    const selectedUserId = e.key;
    const selectedUser = users.find((user) => user._id === selectedUserId);
    setSelectedUser(selectedUser);
    console.log("Selected User:", selectedUser);

    if (selectedUser) {
      try {
        const selectedRowKeys = checkedItems.map((key) => key.toString());

        const payload = {
          leadInfoIds: selectedRowKeys,
          userId: selectedUser.userID,
          companyID: "S920"
        };

        const response = await axios.post(
          "http://localhost:3001/v1/leads/assign-lead",
          payload
        );

        console.log("Data saved successfully:", response.data);
        toast.success("Lead assigned successfully!"); // Show success notification
      } catch (error) {
        console.log("Error saving data:", error);
        toast.error("Failed to assign lead!"); // Show failure notification
      }
    }
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
        console.log(res.data);
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

        const dataSourceWithKeys = list.map((row) => ({
          ...row,
          key: row._id,
        }));

        setColumns(cols);
        setDataSource(dataSourceWithKeys);
        setIsLoading(false);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchData();
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("selectedRows:", selectedRows);
      const selectedLeadInfoIds = selectedRows.map((row) => row.leadInfoId);
      setCheckedItems(selectedLeadInfoIds);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <>
      <ToastContainer />
      <div className='p-4 h-auto w-auto'>
        <div className="mb-2 flex flex-row-reverse">
          <Dropdown overlay={usersMenu} trigger={['click']} >
            <Button className="bg-blue-500" type="primary w-[130px] h-[50px]" icon={<DownOutlined />}>
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
