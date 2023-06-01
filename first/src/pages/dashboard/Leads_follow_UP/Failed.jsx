import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Contacted = () => {
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
          await axios.delete(`http://localhost:3001/v1/leads/leads-Info/${leadId}`);

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
      await axios.put(`http://localhost:3001/v1/leads/leads-Info/${leadId}`, editedLead);

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

  const viewLead = (record) => {
    setViewedLead(record);
    setIsViewing(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/v1/leads/leads-Info");

        const list = res.data.data || [];

        const contactedLeads = list.filter((lead) => lead.status === "Failed");

        const selectedColumns = [
          "companyName",
          "leadTitle",
          "status",
          "leadSource",
          "referralName",
          "staffName",
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

        const cols = selectedColumns.map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
        }));

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

  const handleClicked = () => {
    nav("AddLead");
  };

  return (
    <>
      <div className="bg-gray-200 h-screen w">
        <div className="flex justify-between mb-8 p-5">
          <div className="text-2xl font-semibold">Leads Information</div>
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
              <p>Company Name: {viewedLead.companyName}</p>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Contacted;
