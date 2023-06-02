import React from "react";
import DashboardCard from "../../../components/DashboardCard";
import { Button } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Leads from "../Leads/Leads";
const DashboardPage = () => {
  const cardData = [
    {
      text: "1",
      type: "Business in Deals",
      imageUrl:
        "https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-vector-picture-icon-png-image_889847.jpg",
    },
    {
      text: "1",
      type: "Business in Deals",
      imageUrl:
        "https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-vector-picture-icon-png-image_889847.jpg",
    },
    {
      text: "1",
      type: "Business in Deals",
      imageUrl:
        "https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-vector-picture-icon-png-image_889847.jpg",
    },
    {
      text: "1",
      type: "Business in Deals",
      imageUrl:
        "https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-vector-picture-icon-png-image_889847.jpg",
    },
    {
      text: "1",
      type: "Business in Deals",
      imageUrl:
        "https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-vector-picture-icon-png-image_889847.jpg",
    },
  ];

  return (
    <>
      <div className="bg-blue-600 h-auto">
        <div className="flex p-4 gap-6 flex-wrap ">
          {cardData.map((data, index) => (
            <DashboardCard
              key={index}
              text={data.text}
              type={data.type}
              imageUrl={data.imageUrl}
            />
          ))}
        </div>

        <div className="p-4">
            <Leads />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
