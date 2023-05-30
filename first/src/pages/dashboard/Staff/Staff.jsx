import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
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


  // const navigate = useNavigate();

  // useEffect(() => {
    // Replace the current route with the new route after component mount
    // navigate('/dashboard', { replace: true });
  // }, []);

  // Delete Action Perform here
  const deleteStaff = (record) => {
    Modal.confirm({
      title: "Are you sure to delete this?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        try {
          // Send delete request to the backend API
          await axios.delete(
            `http://localhost:3001/v1/leads/staff-info/${record.staffId}`
          );

          // Remove the record from dataSource state
          setDataSource((prevDataSource) => {
            return prevDataSource.filter(
              (staff) => staff.staffId !== record.staffId
            );
          });

          // Show success message or perform any other actions as needed
          message.success("Staff deleted successfully!");
        } catch (error) {
          // Handle error and show error message
          message.error("Failed to delete staff. Please try again later.");
          console.log("Delete staff error:", error);
        }
      },
    });
  };

  // Edit Staff data:
  const editStaff = (record) => {
    setEditedStaff(record);
    setIsEditing(true);
  };

  // Handle staff update:
  const handleStaffUpdate = async () => {
    try {
      // Send update request to the backend API
      await axios.put(
        `http://localhost:3001/v1/leads/staff-info/${editedStaff.staffId}`,
        editedStaff
      );

      // Find the index of the updated staff record in the dataSource
      const updatedIndex = dataSource.findIndex(
        (staff) => staff.staffId === editedStaff.staffId
      );

      // Update the staff record in the dataSource
      if (updatedIndex !== -1) {
        setDataSource((prevDataSource) => {
          const updatedDataSource = [...prevDataSource];
          updatedDataSource[updatedIndex] = editedStaff;
          return updatedDataSource;
        });
      }

      // Show success message or perform any other actions as needed
      message.success("Staff updated successfully!");

      // Clear the editedStaff state and exit editing mode
      setEditedStaff(null);
      setIsEditing(false);
    } catch (error) {
      // Handle error and show error message
      message.error("Failed to update staff. Please try again later.");
      console.log("Update staff error:", error);
    }
  };

  // View staff data:
  const viewStaff = (record) => {
    setViewedStaff(record);
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
                onClick={() => viewStaff(record)} // Pass the record to viewStaff function
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<EditOutlined />}
                onClick={() => editStaff(record)}
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<DeleteOutlined />}
                onClick={() => deleteStaff(record)}
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



  return (
    <>
      <div className="bg-gray-200 h-screen">
        <div className="flex justify-between mb-8 p-5">
          <div className="text-2xl font-semibold">Staff Information</div>
          <div>
            <div>Home / Staff</div>
          </div>
        </div>

          <div className="bg-blue-500 rounded flex justify-center items-center w-[80px] h-[40px] mb-2 ml-6">
            <button className="text-white" onClick={handleClicked}>
              Add New
            </button>
          </div>

                <Table
                  columns={columns}
                  dataSource={dataSource}
                  className="rounded p-5 w-full h-full"

                />


            <Modal
              title="Edit Staff"
              visible={isEditing}
              onCancel={() => {
                setIsEditing(false);
              }}
              onOk={handleStaffUpdate} // Call handleStaffUpdate on Ok button click
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

            <Modal
              title="View Staff"
              visible={isViewing}
              onCancel={() => {
                setIsViewing(false);
              }}
              footer={null}
            >
              {viewedStaff && (
                <div>
                  <p>Staff Name: {viewedStaff.staffName}</p>
                  <p>Mobile No: {viewedStaff.mobileNo}</p>
                  <p>Email: {viewedStaff.email}</p>
                  {/* Add more details as needed */}
                </div>
              )}
            </Modal>
          </div>


    </>
  );
};

export default Staff;
