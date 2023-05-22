import React from "react";
import { Outlet } from "react-router-dom";
import sizeConfigs from "../sizeConfigs";
import Sidebar from "./Sidebar";
import ThemeSetting from "./ThemeSetting";
const Dashboard = () => {
  return (
    <>
      <ThemeSetting />
      <div
        style={{
          display: "flex        ",
          flexDirection: "row",
        }}
      >
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
