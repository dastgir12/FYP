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
const DashBoardPage = () => {
 const [pageTitle, setpageTitle] = useState("DashBoard");
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
  if (e.key === "/dashboard") setpageTitle("DashBoard");
  if (e.key === "Admin") setpageTitle("Admin");
  if (e.key === "addLead") setpageTitle("Add Lead");
  if (e.key === "Leadslist") setpageTitle("List Of Leads");
  if (e.key === "addUser") setpageTitle("Add User");
  if (e.key === "userList") setpageTitle("List of user");
  if (e.key === "paymentmethod") setpageTitle("Attach Payment Method");
  nav(e.key);
 };
 const adminItems = [
  {
   label: "DashBoard",
   key: "/dashboard",
   icon: <SettingOutlined />,
   style: { fontSize: "15px" },
  },
  {
    label: "Admin",
    key: "admin",
    icon: <WalletOutlined />,
    style: { fontSize: "15px" },
   },
  {
   label: "Add Lead",
   key: "addLead",
   icon: <UploadOutlined />,
   style: { fontSize: "15px" },
  },

  {
   label: "Lead List",
   key: "Leadslist",
   icon: <SolutionOutlined />,
   style: { fontSize: "15px" },
  },
  {
    label: "Add User",
    key: "addUser",
    icon: <SolutionOutlined />,
    style: { fontSize: "15px" },
   },
  {
   label: "User List",
   key: "userlist",
   icon: <SolutionOutlined />,
   style: { fontSize: "15px" },
  },

 
 ];

 /////////////////
 return (
  <>
   <div className="px-3 py-2 mt-3 flex bg-red-400  text-white">
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

export default DashBoardPage;
