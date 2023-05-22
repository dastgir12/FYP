import "antd/dist/antd.css";
import React from 'react';
import { useState } from 'react';
import { Form, Table, Select, Modal, Input, DatePicker, TimePicker, Typography } from 'antd';
import "./DealsFom.css"



const LeadsTable = () => {

    const [isAddRemarkModalVisible, setIsAddRemarkModalVisible] = useState(false);
    const [isAddStaffModalVisible, setIsAddStaffModalVisible] = useState(false);
    const [isAddDateTimeModalVisible, setIsAddDateTimeModalVisible] = useState(false);
    const [isChangeStatusModalVisible, setIsChangeStatusModalVisible] = useState(false);
    const [remarkInputValue, setRemarkInputValue] = useState('');
    const [selectedLead, setSelectedLead] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);


    const { Option } = Select;
    const { Title } = Typography;

    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: 'Lead Title',
            dataIndex: 'leadTitle',
            key: 'leadTitle',
        },
        {
            title: 'Lead Source',
            dataIndex: 'leadSource',
            key: 'leadSource',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Select
                    style={{ width: 200 }}
                    placeholder="Select Action"
                    onChange={(value) => handleActionChange(value, record)}
                >
                    <Option value="addRemarks">Add Remarks</Option>
                    <Option value="addStaff">Add Staff</Option>
                    <Option value="addDateTime">Add Date & Time</Option>
                    <Option value="changeStatus">Change Status</Option>
                </Select>
            ),
        },
    ];

    const data = [];
    for (let i = 1; i <= 5; i++) {
        data.push({
            key: i,
            companyName: `Company ${i}`,
            leadTitle: `Lead ${i}`,
            leadSource: `Source ${i}`,
        });
    }

    const statusOptions = [
        'Qualifications',
        'Detailing/Requirements Confirmations',
        'Proposal/Quotation',
        'Negotiation/Review',
        'Won',
        'Lost',
    ];

    const staffOptions = ['Staff 1', 'Staff 2', 'Staff 3', 'Staff 4'];

    const handleActionChange = (value, record) => {
        if (value === 'addRemarks') {
            setSelectedLead(record);
            setIsAddRemarkModalVisible(true);
        } else if (value === 'addStaff') {
            setSelectedLead(record);
            setIsAddStaffModalVisible(true);
        } else if (value === 'addDateTime') {
            setSelectedLead(record);
            setIsAddDateTimeModalVisible(true);
        } else if (value === 'changeStatus') {
            setSelectedLead(record);
            setIsChangeStatusModalVisible(true);
        }
        // Implement logic for other action options here
    };

    const handleAddRemarkCancel = () => {
        setIsAddRemarkModalVisible(false);
        setRemarkInputValue('');
        setSelectedLead(null);
    };

    const handleAddRemarkSave = () => {
        // Implement logic to save the remark here
        console.log('Saving remark:', remarkInputValue);
        setIsAddRemarkModalVisible(false);
        setRemarkInputValue('');
        setSelectedLead(null);
    };

    const handleAddStaffCancel = () => {
        setIsAddStaffModalVisible(false);
        setSelectedLead(null);
        setSelectedStaff(null);
    };

    const handleAddStaffSave = () => {
        // Implement logic to save the staff here
        console.log('Saving staff:', selectedStaff);
        setIsAddStaffModalVisible(false);
        setSelectedLead(null);
        setSelectedStaff(null);
    };
    const handleAddDateTimeCancel = () => {
        setIsAddDateTimeModalVisible(false);
        setSelectedLead(null);
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const handleAddDateTimeSave = () => {
        // Implement logic to save the date and time here
        console.log('Saving date:', selectedDate);
        console.log('Saving time:', selectedTime);
        setIsAddDateTimeModalVisible(false);
        setSelectedLead(null);
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const handleChangeStatusCancel = () => {
        setIsChangeStatusModalVisible(false);
        setSelectedLead(null);
        setSelectedStatus(null);
    };

    const handleChangeStatusSave = () => {
        // Implement logic to save the status here
        console.log('Saving status:', selectedStatus);
        setIsChangeStatusModalVisible(false);
        setSelectedLead(null);
        setSelectedStatus(null);
    };


    return (


        <div className="App">
            <header className="App-header">
                <Title level={4} style={{ textAlign: 'left', marginBottom: 16 }}>
                    Lead Information
                </Title>


                <Table columns={columns} dataSource={data} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                    <span>{`${data.length} entries`}</span>
                </div>

                <Modal
                    title="Add Remark"
                    visible={isAddRemarkModalVisible}
                    onCancel={handleAddRemarkCancel}
                    onOk={handleAddRemarkSave}
                    cancelText="Close"
                    okText="Save Changes"

                >
                    {selectedLead && (
                        <Form.Item label="Add Remark">
                            <Input
                                placeholder="Add remark"
                                value={remarkInputValue}
                                onChange={(e) => setRemarkInputValue(e.target.value)}
                            />
                        </Form.Item>
                    )

                    }

                </Modal>

                <Modal
                    title="Add Staff"
                    visible={isAddStaffModalVisible}
                    onCancel={handleAddStaffCancel}
                    onOk={handleAddStaffSave}
                    cancelText="Cancel"
                    okText="Save Changes"
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select Staff"
                        onChange={(value) => setSelectedStaff(value)}
                        value={selectedStaff}
                    >
                        {staffOptions.map((staff) => (
                            <Option key={staff} value={staff}>
                                {staff}
                            </Option>
                        ))}
                    </Select>
                </Modal>


                <Modal
                    title="Add Date & Time"
                    visible={isAddDateTimeModalVisible}
                    onCancel={handleAddDateTimeCancel}
                    onOk={handleAddDateTimeSave}
                    cancelText="Cancel"
                    okText="Save Changes"
                >
                    <Form.Item label="Date">
                        <DatePicker
                            style={{ width: '100%', marginBottom: 16 }}
                            placeholder="Select Date"
                            value={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                        /></Form.Item>

                    <Form.Item label="Time">
                        <TimePicker
                            style={{ width: '100%' }}
                            placeholder="Select Time"
                            value={selectedTime}
                            onChange={(time) => setSelectedTime(time)}
                        /></Form.Item>
                </Modal>


                <Modal
                    title="Change Status"
                    visible={isChangeStatusModalVisible}
                    onCancel={handleChangeStatusCancel}
                    onOk={handleChangeStatusSave}
                    cancelText="Cancel"
                    okText="Save Changes"
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select Status"
                        value={selectedStatus}
                        onChange={(status) => setSelectedStatus(status)}
                    >
                        {statusOptions.map((status) => (
                            <Option key={status} value={status}>
                                {status}
                            </Option>
                        ))}
                    </Select>
                </Modal>

            </header>
        </div>
    );
};

export default LeadsTable;
