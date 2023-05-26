import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Staff = () => {
  const nav = useNavigate();
  const [isViewing, setIsViewing] = useState(false);
  const [viewedStaff, setViewedStaff] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStaff, setEditedStaff] = useState(null);
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Delete Action Perform here
  const deleteStaff = (record) => {
    Modal.confirm({
      title: "Are you sure to dlete this",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((staff) => staff.id !== record.id);
        });
      },
    });
  };

  //Edit Staff data:

  const editStaff = (record) => {
    setEditedStaff(record);
    setIsEditing(true);
  };

  //View staff data :

  const viewStaff = () => {
    setViewedStaff();
    setIsViewing(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/v1/leads/staff-info"
        );
        const list = res.data.staff || [];
        const selectedColumns = ["staffId", "staffName", "mobileNo", "email"]; // Replace with the desired column keys

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
                onClick={viewStaff}
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<EditOutlined />}
                onClick={editStaff}
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<DeleteOutlined />}
                onClick={deleteStaff}
              />
            </div>
          ),
        };

        const cols = selectedColumns.map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
        }));

        cols.push(actionColumn);

        setColumns(cols);
        setDataSource(list);
        setIsLoading(false);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchData();
  }, []);

  const handleClicked = () => {
    nav("AddStaff");
  };

  useEffect(() => {
    if (!isLoading) {
      const handleResize = () => {
        window.requestAnimationFrame(() => {
          // Handle resize logic here
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isLoading]);

  return (
    <>
      <div className="bg-gray-200 h-screen">
        <div className="flex justify-between mb-8 p-5">
          <div className="text-2xl font-semibold">Staff Information</div>
          <div>
            <div>Home / Staff</div>
          </div>
        </div>
        <div className="flex flex-col item-center">
          <div className="bg-blue-500 rounded flex justify-center items-center w-[80px] h-[40px]">
            <button className="text-white" onClick={handleClicked}>
              Add New
            </button>
          </div>

          <div className="border-[1.5px] mt-7 border-gray-300 w-[95vw] sm:w-[80vw]">
            <div style={{ height: "500px" }}>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  scroll={{ x: 600 }}
                  pagination={false}
                />
              )}
            </div>

            <Modal
              title="Edit Staff"
              visible={isEditing}
              onCancel={() => {
                setIsEditing(false);
              }}
              onOk={() => {
                setIsEditing(false);
                // Perform save or update logic here
              }}
            >
              {editedStaff && (
                <form>
                  {/* Render input fields for editing */}
                  <label>
                    Staff Name:
                    <input
                      type="text"
                      value={editedStaff.staffName}
                      onChange={(e) =>
                        setEditedStaff({
                          ...editedStaff,
                          staffName: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Mobile No:
                    <input
                      type="mobileNo"
                      value={editedStaff.mobileNo}
                      onChange={(e) =>
                        setEditedStaff({
                          ...editedStaff,
                          mobileNo: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Email:
                    <input
                      type="email"
                      value={editedStaff.email}
                      onChange={(e) =>
                        setEditedStaff({
                          ...editedStaff,
                          email: e.target.value,
                        })
                      }
                    />
                  </label>
                  {/* Add more input fields as needed */}
                </form>
              )}
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staff;
