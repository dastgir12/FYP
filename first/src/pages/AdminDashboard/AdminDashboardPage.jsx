import React, { useState } from "react";
import { Menu, Drawer, Button, Modal } from "antd";
import { SettingOutlined, WalletOutlined, UploadOutlined, LogoutOutlined, AlignLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios from "axios";

const AdminDashBoardPage = () => {
  const [pageTitle, setpageTitle] = useState("Admin DashBoard");
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const nav = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleMenuItem = (e) => {
    setOpen(false);
    if (e.key === "/private/AdminDashboard") setpageTitle("Admin DashBoard");
    if (e.key === "/private/AdminDashboard/CompanyProfile") setpageTitle("Company Profile");
    if (e.key === "/private/AdminDashboard/UserProfile") setpageTitle("User Profile");
    nav(e.key);
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = async () => {
    try {
      // Make the logout API request
      await axios.delete("http://localhost:3001/v1/admin/logoutA", {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      });
      // Clear the access token from local storage or state
      localStorage.removeItem("Token");
      // Redirect the user to the login page or any other desired page
      nav("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  const adminItems = [
    {
      label: "Admin DashBoard",
      key: "/private/AdminDashboard",
      icon: <SettingOutlined />,
      style: { fontSize: "15px" },
    },
    {
      label: "Company Profile",
      key: "/private/AdminDashboard/CompanyProfile",
      icon: <WalletOutlined />,
      style: { fontSize: "15px" },
    },
    {
      label: "User Profile",
      key: "/private/AdminDashboard/UserProfile",
      icon: <UploadOutlined />,
      style: { fontSize: "15px" },
    },
  ];

  return (
    <>
      <div className="px-3 py-2 mt-3 flex bg-blue-400  text-white">
        <div className="cursor-pointer ">
          <AlignLeftOutlined onClick={showDrawer} style={{ fontSize: "20px" }} />
        </div>
        <div className="flex justify-center items-center w-screen text-2xl">{pageTitle}</div>
        <div className="ml-auto">
          <Button type="text" onClick={handleLogout}>
            <LogoutOutlined style={{ fontSize: "20px", color: "red" }} />
          </Button>
        </div>
      </div>
      <Drawer
        onClose={onClose}
        open={open}
        placement="left"
        width={300}
        extra={<Button onClick={onClose}>Cancel</Button>}
        closeIcon
      >
        <Menu
          defaultSelectedKeys={"1"}
          style={{ padding: 0, border: "none" }}
          onClick={handleMenuItem}
          theme="light"
          mode="vertical"
          items={adminItems}
        ></Menu>
      </Drawer>
      <Outlet />

      <Modal
        title="Logout Confirmation"
        visible={showModal}
        onOk={handleConfirmLogout}
        onCancel={handleCancelLogout}
        okText="Logout"
        cancelText="Cancel"
        okButtonProps={{ danger: true, type: "primary" }}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
};

export default AdminDashBoardPage;
