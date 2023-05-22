import React, { useState } from "react";
import { Menu, Drawer, Button } from "antd";
import {
  DashboardOutlined,
   ContactsOutlined ,
   SolutionOutlined,
 UploadOutlined,
 FilterOutlined,
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
  if (e.key === "Staff") setpageTitle("Staff");
  if (e.key === "Customers") setpageTitle("Customer");
  if (e.key === "LeadCategory") setpageTitle("Lead Category");
  if (e.key === "Leads") setpageTitle("Leads");
  if (e.key === "FollowUP") setpageTitle("Leads Follow-UP");
  if (e.key === "Deals") setpageTitle("Deals");
  if (e.key === "Reports") setpageTitle("Reports");
  nav(e.key);
 };
 const adminItems = [
  {
   label: "DashBoard",
   key: "/dashboard",
   icon: <DashboardOutlined />,
   style: { fontSize: "15px" },
  },
  {
    label: "Staff",
    key: "Staff",
    icon: <ContactsOutlined />,
    style: { fontSize: "15px" },
   },
  {
   label: "Customers",
   key: "Customers",
   icon: <UploadOutlined />,
   style: { fontSize: "15px" },
  },

  {
   label: "Lead Category",
   key: "LeadCategory",
   icon: <SolutionOutlined />,
   style: { fontSize: "15px" },
  },
  {
    label: "Leads",
    key: "Leads",
    icon: <FilterOutlined />,
    style: { fontSize: "15px" },
   },
  {
    label: "Leads Follow-UP",
    key: "FollowUP",
    icon: <FilterOutlined />,
    style: { fontSize: "15px" },
   },
  {
   label: "Deals",
   key: "Deals",
   icon: <SolutionOutlined />,
   style: { fontSize: "15px" },
  },
  {
    label: "Reports",
    key: "Reports",
    icon: <SolutionOutlined />,
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

export default DashBoardPage;
