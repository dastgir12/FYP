import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message,Input,Form } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Customers = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();

  const [isViewing, setIsViewing] = useState(false);
  const [viewedCustomer, setViewedCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Delete Action Perform here
  const deleteCustomer = (record) => {
    Modal.confirm({
      title: "Are you sure to delete this?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        try {
          // Get the ID of the record to be deleted
          const customerId = record._id;
          // console.log('id is' + customerId);
          // Send delete request to the backend API using the customer ID
          await axios.delete(
            `http://localhost:3001/v1/leads/CustomerInfo/${customerId}`
          );

          // Remove the record from the dataSource state
          setDataSource((prevDataSource) => {
            return prevDataSource.filter(
              (customer) => customer._id !== customerId
            );
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

  // Edit Staff data:
  const editCustomer = (record) => {
    setEditedCustomer(record);
    setIsEditing(true);
  };

  // Handle customer update:
  const handleCustomerUpdate = async (record) => {
    try {
      const customerId = record._id;

      // Send update request to the backend API using the customer ID and updated data
      await axios.put(
        `http://localhost:3001/v1/leads/CustomerInfo/${customerId}`,
        editedCustomer
      );

      // Update the customer record in the dataSource
      setDataSource((prevDataSource) => {
        const updatedDataSource = prevDataSource.map((customer) => {
          if (customer._id === customerId) {
            return editedCustomer;
          }
          return customer;
        });
        return updatedDataSource;
      });

      // Show success message or perform any other actions as needed
      message.success("Customer updated successfully!");

      // Clear the editedCustomer state and exit editing mode
      setEditedCustomer(null);
      setIsEditing(false);
    } catch (error) {
      // Handle error and show error message
      message.error("Failed to update customer. Please try again later.");
      console.log("Update customer error:", error);
    }
  };

  // View staff data:
  const viewCustomer = (record) => {
    setViewedCustomer(record);
    setIsViewing(true);
  };

  //get and show data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/v1/leads/CustomerInfo"
        );

        console.log(res.data.data);
        // const responseData = res.data.data
        // responseData.forEach(item => {
        //   const userId = item._id;
        //   console.log(userId);
        // });

        const list = res.data.data || [];
        const selectedColumns = [
          "CompanyName",
          "Telephone",
          "email",
          "contactPersonName",
          "contactPersonMobileNumber",
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
                  viewCustomer(record);
                }} // Pass the record to viewStaff function
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  editCustomer(record);
                }}
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<DeleteOutlined />}
                onClick={() => {
                  deleteCustomer(record);
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

  //for loading purpose
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

  //handleClicked Button
  const handleClicked = () => {
    nav("AddCustomer");
  };

  const handleFormChange = (changedValues, allValues) => {
    setEditedCustomer({
      ...editedCustomer,
      ...changedValues,
    });
  };
  return (
    <>
      <div className="bg-gray-200 h-screen ">
        <div className="flex justify-between mb-8 p-5">
          <div className=" text-2xl font-semibold">Customers Information</div>
          <div>
            <div>Home / Customers</div>
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
          onOk={() => handleCustomerUpdate(editedCustomer)} // Call handleStaffUpdate on Ok button click
        >
          {editedCustomer && (
            <Form form={form} onValuesChange={handleFormChange}>
            <Form.Item label="Compmnay Name" name="companyName">
              <Input />
            </Form.Item>

            <Form.Item label="Telephone" name="telephone">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Contact Person Name" name="contactPersonName">
              <Input />
            </Form.Item>

            {/* Add more Form.Item components as needed */}
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
          {viewedCustomer && (
            <div>
              <p>Company Name: {viewedCustomer.CompanyName}</p>
              <p>Telephone: {viewedCustomer.mobileNumber}</p>
              <p>Email: {viewedCustomer.email}</p>
              <p>Contact Person Name: {viewedCustomer.contactPersonName}</p>
              <p>Contact Person Number: {viewedCustomer.contactPersonNumber}</p>

            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Customers;
