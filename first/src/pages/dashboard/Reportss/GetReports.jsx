import React, { useState, useEffect } from "react";
import { Typography, Table } from "antd";
import axios from "axios";

const { Title } = Typography;

const GetReports = () => {
  const [reportData, setReportData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/v1/leads/reports");
      setReportData(response.data);

      if (response.data.length > 0) {
        const filteredData = response.data.map((item) => ({
          status: item.status,
        }));

        const columnNames = Object.keys(filteredData[0]);

        const cols = columnNames.map((columnName) => ({
          title: columnName,
          dataIndex: columnName,
          key: columnName,
        }));

        setColumns(cols);
        setDataSource(filteredData);
      }

      setLoading(false);
    } catch (error) {
      console.log("Error fetching report data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Title level={4}>Leads Report</Title>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
    </div>
  );
};

export default GetReports;
