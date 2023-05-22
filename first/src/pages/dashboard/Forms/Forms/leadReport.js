import "antd/dist/antd.css";
import React, { useState } from 'react';
import { Typography, DatePicker, Button } from 'antd';
import './leadReport.css'

const { Title } = Typography;

const LeadsReportForm = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const handleSearch = () => {
        // Implement the search logic here
        console.log('Search clicked');
        console.log('From Date:', fromDate);
        console.log('To Date:', toDate);
    };

    return (
        <div className="App">
        <header className="App-header">
            <Title level={4} style={{ textAlign: 'left', marginBottom: 16 }}>
                Leads Report
            </Title>

            <Typography.Text style={{ textAlign: 'left', fontWeight: 'bold' }}>
                From Date
            </Typography.Text>
            <Typography.Text style={{ paddingLeft:'220px', fontWeight: 'bold' }}>
                    To Date
                </Typography.Text>
            <div style={{ marginBottom: 20 }}>
                <DatePicker
                    style={{ width: '25%', marginRight: 10 }}
                    placeholder="From Date"
                    value={fromDate}
                    onChange={(date) => setFromDate(date)}
                />

                
                <DatePicker
                    style={{ width: '25%', marginRight: 10 }}
                    placeholder="To Date"
                    value={toDate}
                    onChange={(date) => setToDate(date)}
                />
            </div>

            <div>
                <Button type="primary" onClick={handleSearch}>
                    Search
                </Button>
            </div>
            </header>
        </div>
    );
};

export default LeadsReportForm;
