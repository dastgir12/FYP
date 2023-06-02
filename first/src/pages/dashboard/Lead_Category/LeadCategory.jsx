import React, { useState, useEffect } from "react";
import { Table, Button, Space, Input, message, Modal } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { Search } = Input;

const LeadCategory = () => {
  const nav = useNavigate();

  const [isViewing, setIsViewing] = useState(false);
  const [viewedLeadCategory, setViewedLeadCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLeadCategory, setEditedLeadCategory] = useState(null);
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //delete LeadCategory
  const deleteLeadCategory = (record) => {
    Modal.confirm({
      title: "Are you sure to delete this?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        try {
          // Get the ID of the record to be deleted
          const categoryId = record._id;
          console.log("id is" + categoryId);
          // Send delete request to the backend API using the customer ID
          await axios.delete(
            `http://localhost:3001/v1/leads/leadsCategory/${categoryId}`
          );

          // Remove the record from the dataSource state
          setDataSource((prevDataSource) => {
            return prevDataSource.filter(
              (leadCategory) => leadCategory._id !== categoryId
            );
          });

          // Show success message or perform any other actions as needed
          message.success("LeadCategory deleted successfully!");
        } catch (error) {
          // Handle error and show error message
          message.error("Failed to delete . Please try again later.");
          console.log("Delete error:", error);
        }
      },
    });
  };

  //Edited LeadCatagory
  const editLeadCategory = (record) => {
    setEditedLeadCategory(record);
    setIsEditing(true);
  };

  //Update LeadCategory
  const handleLeadCategoryUpdate = async (record) => {
    try {
      const categoryId = record._id;
      // Send delete request to the backend API using the customer ID
      await axios.put(
        `http://localhost:3001/v1/leads/leadsCategory/${categoryId}`,
        editedLeadCategory
      );

      // Update the customer record in the dataSource
      setDataSource((prevDataSource) => {
        const updatedDataSource = prevDataSource.map((leadCategory) => {
          if (leadCategory._id === categoryId) {
            return editedLeadCategory;
          }
          return leadCategory;
        });
        return updatedDataSource;
      });

      // Show success message or perform any other actions as needed
      message.success("Customer updated successfully!");

      // Clear the editedCustomer state and exit editing mode
      setEditedLeadCategory(null);
      setIsEditing(false);
    } catch (error) {
      // Handle error and show error message
      message.error("Failed to update customer. Please try again later.");
      console.log("Update customer error:", error);
    }
  };


 //View LeadCategory
 const viewLeadCategory = (record) => {
  setViewedLeadCategory(record);
  setIsViewing(true);
};

const handleClicked = () => {
  nav("AddLeadCategory");
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/v1/leads/leadsCategory"
        );

        console.log(res.data.data);
        // const responseData = res.data.data
        // responseData.forEach(item => {
        //   const userId = item._id;
        //   console.log(userId);
        // });

        const list = res.data.data || [];
        const selectedColumns = ["category", "status"]; // Replace with the desired column keys

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
                onClick={() => {
                  viewLeadCategory(record);
                }} // Pass the record to viewStaff function
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  editLeadCategory(record);
                }}
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<DeleteOutlined />}
                onClick={() => {
                  deleteLeadCategory(record);
                }}
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
          <button className="text-white" onClick={handleClicked}>
            Add New
          </button>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          className="rounded p-5 w-full h-full"
        />


        <Modal
          title="Edit Staff"
          visible={isEditing}
          onCancel={() => {
            setIsEditing(false);
          }}
          onOk={() => handleLeadCategoryUpdate(editedLeadCategory)} // Call handleStaffUpdate on Ok button click
        >
          {editedLeadCategory && (
            <form>
              {/* Render input fields for editing */}
              <label>
                Status:
                <input
                  type="text"
                  value={editedLeadCategory.status}
                  onChange={(e) =>
                    setEditedLeadCategory({
                      ...editedLeadCategory,
                      status: e.target.value,
                    })
                  }
                />
              </label>
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
          {viewedLeadCategory && (
            <div>
              <p>Status: {viewedLeadCategory.status}</p>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default LeadCategory;
