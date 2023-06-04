import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Qualified = () => {
  const [isViewing, setIsViewing] = useState(false);
  const [viewedLead, setViewedLead] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(null);
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const nav = useNavigate();

  const deleteLead = (record) => {
    Modal.confirm({
      title: "Are you sure to delete this?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        try {
          const leadId = record._id;
          await axios.delete(
            `http://localhost:3001/v1/leads/leads-Info/${leadId}`
          );

          setDataSource((prevDataSource) => {
            return prevDataSource.filter((lead) => lead._id !== leadId);
          });

          message.success("Customer deleted successfully!");
        } catch (error) {
          message.error("Failed to delete customer. Please try again later.");
          console.log("Delete customer error:", error);
        }
      },
    });
  };

  const editLead = (record) => {
    setEditedLead(record);
    setIsEditing(true);
  };

  const handleLeadUpdate = async (record) => {
    try {
      const leadId = record._id;
      await axios.put(
        `http://localhost:3001/v1/leads/leads-Info/${leadId}`,
        editedLead
      );
      nav('/dashboard/leads')
      message.success("Lead updated successfully!");
      setDataSource((prevDataSource) => {
        const updatedDataSource = prevDataSource.map((lead) => {
          if (lead._id === leadId) {
            return editedLead;
          }
          return lead;
        });
        return updatedDataSource;
      });

      message.success("Customer updated successfully!");

      setEditedLead(null);
      setIsEditing(false);
    } catch (error) {
      message.error("Failed to update customer. Please try again later.");
      console.log("Update customer error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/v1/leads/leads-Info"
        );

        const list = res.data.data || [];

        const contactedLeads = list.filter((lead) => lead.status === "Qualified");

        const selectedColumns = ["companyName", "leadTitle", "status"];

        const actionColumn = {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (_, record) => (
            <div className="space-x-1">
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
              render: (text) => (
                <span className="bg-green-500 text-white px-2 py-1 rounded">
                  {text}
                </span>
              ),
            };
          }
        

        
        // Rest of your code...
        
        
          return {
            title: key,
            dataIndex: key,
            key: key,
          };
        });
        
        // Rest of your code...
        
        

        cols.push(actionColumn);

        setColumns(cols);
        setDataSource(contactedLeads);
        setIsLoading(false);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <div className="bg-gray-200 h-screen w">
        <div className="flex justify-between mb-8 p-5">
          <div className="text-2xl font-semibold">Qualified Leads</div>
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
          onOk={() => handleLeadUpdate(editedLead)}
        >
          {editedLead && (
            <form>
            <label>
              Company Name:
              <input
                type="text"
                value={editedLead.companyName}
                onChange={(e) =>
                  setEditedLead({
                    ...editedLead,
                    companyName: e.target.value,
                  })
                }
              />
            </label>
            <label>
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
            </label>
          </form>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Qualified;
