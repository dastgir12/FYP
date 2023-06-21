import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Working = () => {
  const nav = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(null);
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleLeadUpdate = async () => {
    try {
      const leadId = editedLead._id;

      await axios.put(
        `http://localhost:3001/v1/leads/leads-Info/${leadId}`,
        editedLead
      );
      nav('/private/dashboard/leads')
      message.success("Lead updated successfully!");
      setEditedLead(null);
      setIsEditing(false);

      // Fetch updated lead data after successful update
      fetchLeadsData();
    } catch (error) {
      message.error("Failed to update lead. Please try again later.");
      console.log("Update lead error:", error);
    }
  };

  const fetchLeadsData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/v1/leads/leads-Info"
      );

      const list = res.data.data || [];

      const contactedLeads = list.filter((lead) => lead.status === "Working");

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

        return {
          title: key,
          dataIndex: key,
          key: key,
        };
      });

      cols.push(actionColumn);

      setColumns(cols);
      setDataSource(contactedLeads);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeadsData();
  }, []);

  return (
    <>
      <div className="bg-gray-200 h-screen w">
        <div className="flex justify-between mb-8 p-5">
          <div className="text-2xl font-semibold">Working Leads</div>
        </div>

        <Table
          className="rounded p-5 w-full h-full"
          columns={columns}
          dataSource={dataSource}
        />

        <Modal
          title="Edit Lead"
          visible={isEditing}
          onCancel={() => {
            setIsEditing(false);
          }}
          onOk={handleLeadUpdate}
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
export default Working;
