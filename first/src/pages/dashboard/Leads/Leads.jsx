import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input } from "antd";

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
  const [form] = Form.useForm();

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
      console.log(leadId);
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

  const handleFormChange = (changedValues, allValues) => {
    setEditedLead({
      ...editedLead,
      ...changedValues,
    });
  };

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
                }}
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

        <div style={{ height: "500px", overflow: "auto" }}>
          <Table
            className="rounded p-5 w-full"
            columns={columns}
            dataSource={dataSource}
            pagination={true}
          />
        </div>

        <Modal
          title="Edit Staff"
          visible={isEditing}
          onCancel={() => {
            setIsEditing(false);
          }}
          onOk={() => handleLeadUpdate(editedLead)} // Call handleStaffUpdate on Ok button click
        >
          {editedLead && (
            <Form form={form} onValuesChange={handleFormChange}>
              <Form.Item label="Company Name" name="companyName">
                <Input />
              </Form.Item>
              <Form.Item label="Staff Name" name="staffName">
                <Input />
              </Form.Item>
              <Form.Item label="Lead Title" name="leadTitle">
                <Input />
              </Form.Item>
              Lead Status:
              <select
                value={editedLead.status}
                onChange={(e) =>
                  setEditedLead({
                    ...editedLead,
                    status: e.target.value,
                  })
                }
              >
                <option value="Working">Working</option>
                <option value="Failed">Failed</option>
                <option value="Contacted">Contacted</option>
              </select>
            </Form>
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
              <p>Company Name: {viewedLead.companyName}</p>
              <p>Staff Name: {viewedLead.staffName}</p>
              <p>Lead Source: {viewedLead.leadSource}</p>
              <p>Status: {viewedLead.status}</p>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Leads;
