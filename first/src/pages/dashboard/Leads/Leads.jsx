import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// const API = "http://localhost:3001/v1/leads/status-based-filter?status=Working";
const Leads = () => {
  const [isViewing, setIsViewing] = useState(false);
  const [viewedLead, setViewedLead] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(null);
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const nav = useNavigate();

  //delete Lead
  const deleteLead = (record) => {
    Modal.confirm({
      title: "Are you sure to delete this?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        try {
          // Get the ID of the record to be deleted
          const leadId = record._id;
          // console.log('id is' + customerId);
          // Send delete request to the backend API using the customer ID
          await axios.delete(
            `http://localhost:3001/v1/leads/leads-Info/${leadId}`
          );

          // Remove the record from the dataSource state
          setDataSource((prevDataSource) => {
            return prevDataSource.filter((lead) => lead._id !== leadId);
          });

          // Show success message or perform any other actions as needed
          message.success("Customer deleted successfully!");
        } catch (error) {
          // Handle error and show error message
          message.error("Failed to delete customer. Please try again later.");
          console.log("Delete customer error:", error);
        }
      },
    });
  };

  //Edit Lead
  const editLead = (record) => {
    setEditedLead(record);
    setIsEditing(true);
  };

  //Update Lead
  const handleLeadUpdate = async (record) => {
    try {
      const leadId = record._id;

      // Send update request to the backend API using the customer ID and updated data
      await axios.put(
        `http://localhost:3001/v1/leads/leads-Info/${leadId}`,
        editedLead
      );

      // Update the customer record in the dataSource
      setDataSource((prevDataSource) => {
        const updatedDataSource = prevDataSource.map((lead) => {
          if (lead._id === leadId) {
            return editedLead;
          }
          return lead;
        });
        return updatedDataSource;
      });

      // Show success message or perform any other actions as needed
      message.success("Customer updated successfully!");

      // Clear the editedCustomer state and exit editing mode
      setEditedLead(null);
      setIsEditing(false);
    } catch (error) {
      // Handle error and show error message
      message.error("Failed to update customer. Please try again later.");
      console.log("Update customer error:", error);
    }
  };

  //View Lead
  const viewLead = (record) => {
    setViewedLead(record);
    setIsViewing(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/v1/leads/leads-Info"
        );

        console.log(res);
        // const responseData = res.data.data
        // responseData.forEach(item => {
        //   const userId = item._id;
        //   console.log(userId);
        // });

        const list = res.data.data || [];
        const selectedColumns = [
          "companyName",
          "leadTitle",
          "status",
          "leadSource",
          "referralName",
          "staffName",
        ]; // Replace with the desired column keys

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
                  viewLead(record);
                }} // Pass the record to viewStaff function
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  editLead(record);
                }}
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<DeleteOutlined />}
                onClick={() => {
                  deleteLead(record);
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

  const handleClicked = () => {
    nav("AddLead");
  };

  return (
    <>
      <div className="bg-gray-200 h-screen w">
        <div className="flex justify-between mb-8 p-5">
          <div className=" text-2xl font-semibold">Leads Information</div>
          <div>
            <div>Home / Lead</div>
          </div>
        </div>

        <div className="bg-blue-500 rounded flex justify-center items-center w-[80px] h-[40px] mb-2 ml-6">
          <button className="text-white" onClick={handleClicked}>
            Add New
          </button>
        </div>


            <Table
          className="rounded p-5 w-full h-full"
            
              columns={columns}
              dataSource={dataSource}

            />


        <Modal
          title="Edit Staff"
          visible={isEditing}
          onCancel={() => {
            setIsEditing(false);
          }}
          onOk={() => handleLeadUpdate(editedLead)} // Call handleStaffUpdate on Ok button click
        >
          {editedLead && (
            <form>
              {/* Render input fields for editing */}
              <label>
                Company Name:
                <input
                  type="text"
                  value={editedLead.CompanyName}
                  onChange={(e) =>
                    setEditedLead({
                      ...editedLead,
                      CompanyName: e.target.value,
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
          {viewedLead && (
            <div>
              <p>Company Name: {viewedLead.CompanyName}</p>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Leads;
