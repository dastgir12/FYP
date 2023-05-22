import React from 'react'
import { Outlet } from "react-router-dom";
import sizeConfigs from '../sizeConfigs';
import Sidebar from './Sidebar'
import ThemeSetting from './ThemeSetting';
const Dashboard = () => {
  return (
      <div style={{ display: "flex" }}>
      <div
        component="nav"
        style={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0,
        }}
      >
        <ThemeSetting />
      </div>

      <div
        component="main"
        style={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          minHeight: "100vh",
          backgroundColor: "lightgray",
        }}
      >
       
        <Outlet />
      </div>

    </div>
  )
}

export default Dashboard
