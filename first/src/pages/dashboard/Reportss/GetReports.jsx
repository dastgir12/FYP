import React, { useState, useEffect } from "react";
import { Typography, Table } from "antd";
import axios from "axios";

const { Title } = Typography;

const GetReports = () => {
  const [reportData, setReportData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/v1/leads/reports");
      setReportData(response.data);

      const columnNames = response.data.length > 0 ? Object.keys(response.data[0]) : [];
      const cols = columnNames.map((columnName) => ({
        title: columnName,
        dataIndex: columnName,
        key: columnName,
      }));

      setColumns(cols);
      setDataSource(response.data);
    } catch (error) {
      console.log("Error fetching report data:", error);
    }
  };

  return (
    <div className="App">
      <Title level={4}>Leads Report</Title>

      {columns.length > 0 && dataSource.length > 0 ? (
        <Table dataSource={dataSource} columns={columns} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default GetReports;
