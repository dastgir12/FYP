import React from "react";
import { Table, Button } from "antd";

import { useNavigate } from "react-router-dom";

const HotelList = () => {
  const navigate = useNavigate();

  const handleRoomButtonClick = () => {
    navigate('/dashboard/roomlist');
  };

  const newCols = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Kind",
      dataIndex: "kind",
      key: "kind",
    },
    {
      title: "Approval",
      dataIndex: "approval",
      key: "approval",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Rooms",
      dataIndex: "rooms",
      key: "rooms",
      render: (text, record) => (
        <Button onClick= {handleRoomButtonClick}>View Rooms</Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  // sample data
  const data = [
    {
      id: 1,
      name: "Hotel A",
      type: "Luxury",
      kind: "Resort",
      approval: "Approved",
      location: "New York",
      rooms: 100,
      action: "Edit",
    },
    {
      id: 2,
      name: "Hotel B",
      type: "Budget",
      kind: "Hotel",
      approval: "Pending",
      location: "Los Angeles",
      rooms: 50,
      action: "Edit",
    },
    {
      id: 3,
      name: "Hotel C",
      type: "Mid-range",
      kind: "Motel",
      approval: "Rejected",
      location: "Chicago",
      rooms: 75,
      action: "Edit",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="mt-10">Hotel List</h1>
        <div className="border-[1.5px] mt-7 border-gray-300 w-[95vw] sm:w-[80vw] ">
          <Table columns={newCols} dataSource={data} scroll={{ x: 600 }} />
        </div>
      </div>
    </>
  );
};

export default HotelList;
