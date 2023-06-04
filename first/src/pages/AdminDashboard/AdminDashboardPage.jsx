import React, { useState } from "react";
import { Menu, Drawer, Button } from "antd";
import {
 SettingOutlined,
 SolutionOutlined,
 UploadOutlined,
 FundViewOutlined,
 AlignLeftOutlined,
 WalletOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const AdminDashBoardPage = () => {
 const [pageTitle, setpageTitle] = useState("Admin DashBoard");
 const [open, setOpen] = useState(false);
 const nav = useNavigate();
 const showDrawer = () => {
  setOpen(true);
 };

 const onClose = () => {
  setOpen(false);
 };

 const handleMenuItem = (e) => {
  setOpen(false);
  if (e.key === "/AdminDashboard") setpageTitle("Admin DashBoard");
  if (e.key === "CompanyProfile") setpageTitle("Company Profile");
  if (e.key === "UserProfile") setpageTitle("User Profile");
  // if (e.key === "Addresidence") setpageTitle("Add Residence");

  nav(e.key);
 };
 const adminItems = [
  {
   label: "Admin DashBoard",
   key: "/AdminDashboard",
   icon: <SettingOutlined />,
   style: { fontSize: "15px" },
  },
  {
    label: "Company Profile",
    key: "CompanyProfile",
    icon: <WalletOutlined />,
    style: { fontSize: "15px" },
   },
  {
   label: "User Profile",
   key: "UserProfile",
   icon: <UploadOutlined />,
   style: { fontSize: "15px" },
  },
 ];

 /////////////////
 return (
  <>
   <div className="px-3 py-2 mt-3 flex bg-blue-400  text-white">
    <div className="cursor-pointer">
     <AlignLeftOutlined onClick={showDrawer} style={{ fontSize: "20px" }} />
    </div>
    <div className="flex justify-center items-center w-screen text-2xl">{pageTitle}</div>
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
  </>
 );
};

export default AdminDashBoardPage;
