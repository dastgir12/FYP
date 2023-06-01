import React, { useState } from "react";
import { DatePicker, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Report = () => {
    const nav = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportData, setReportData] = useState([]);
  


  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:3001/v1/leads/reports", {
        startDate,
        endDate,
      });
      setReportData(response.data);
      nav('GetReports')
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching report data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center  justify-center mt-8">
      <div className="flex items-center justify-center space-x-2 ">
        <DatePicker
          className="w-[500px]"
          placeholder="Start Date"
          value={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          className="w-[500px]"
          placeholder="End Date"
          value={endDate}
          onChange={(date) => setEndDate(date)}
        />
      </div>
      <div className="mt-4">
        <Button onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default Report;
