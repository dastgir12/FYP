import "antd/dist/antd.css";
//import "./App.css";
import "./WorkTableStat.css"
import { Button, Table, Modal, Form, Input, Row, Col } from "antd";
import { useState } from "react";

import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
    const [isEditing, setIsEditing] = useState(false);
    const [editingLead, setEditingLead] = useState(null);
    const [viewModalVisible, setViewModalVisible] = useState(false);




    const [dataSource, setDataSource] = useState([
        {
            id: 1,
            leadName: "John",
            phone: 1234567890,
            email: "john@gmail.com",
            country: "Australia",
            interestedIn: "KFC",
            source: "DataBase",
            status: "New",
        },
        {
            id: 2,
            leadName: "Abraham",
            phone: 1234567890,
            email: "abraham@gmail.com",
            country: "London",
            interestedIn: "Mc Donald",
            source: "DataBase",
            status: "New",
        },

    ]);

    const [lastId, setLastId] = useState(2);

    const showViewModal = (item) => {
        setEditingLead(item);
        setViewModalVisible(true);
    };

    const columns   = [
        {
            key: "1",
            title: "ID",
            dataIndex: "id",
        },
        {
            key: "2",
            title: "Lead Name",
            dataIndex: "leadName",
        },
        {
            key: "3",
            title: "Phone",
            dataIndex: "phone",
        },
        {
            key: "4",
            title: "Email",
            dataIndex: "email",
        },
        {
            key: "5",
            title: "Country",
            dataIndex: "country",
        },
        {
            key: "6",
            title: "Interested In",
            dataIndex: "interestedIn",
        },
        {
            key: "7",
            title: "Source",
            dataIndex: "source",
        },
        {
            key: "8",
            title: "Status",
            dataIndex: "status",
        },
        {
            key: "9",
            title: "Action",
            render: (record, item) => {
                
                return (
                    <>
                     
                        <Button className="edit-button"
                            style={{ color: "white"  }}
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => onEditLead(record)}
                        />
                        <Button className="delete-button"
                            style={{ color: "white" }}
                            type="link"
                            icon={<DeleteOutlined />}
                            onClick={() => onDeleteLead(record)}
                        />


                        <Button className="view-button"
                            style={{ color: "white" }}
                            type="link"
                            icon={<EyeOutlined />}
                            onClick={() => showViewModal(item)}
                        />
                    </>
                );
            },
        },
    ];

    const onAddLead = () => {

        const newId = lastId + 1;
        const newLead = {

            id: newId,
            leadName: "Name",
            phone: 1234567890,
            email: "Name@gmail.com",
            country: "Country ",
            interestedIn: "Interest",
            source: "DataBase",
            status: "New",

        };

        setLastId(newId);


        setDataSource((pre) => {
            return [...pre, newLead];
        });
    };
    const onDeleteLead = (record) => {
        Modal.confirm({
        
            title: "Are you sure, you want to delete this Lead record?",
            okText: "Yes" ,
            okType: "danger",
            
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((lead) => lead.id !== record.id);
                });
            },
        });
    };
    const onEditLead = (record) => {
        setIsEditing(true);
        setEditingLead({ ...record });

    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingLead(null);
    };
    const handleViewCancel = () => {
        setViewModalVisible(false);

    };
    return (
        <div className="App">
            <header className="App-header">
                <Button 
                style={{ borderColor:"black",  color: "white",backgroundColor:"#1890ff" ,width: "500dp" }}
                onClick={onAddLead}>Add New Lead  </Button>
                <Table columns={columns} dataSource={dataSource}></Table>

                <Modal
                    title="View Details"
                    visible={viewModalVisible}
                    onCancel={handleViewCancel}
                    footer={"Disclaimer:  Read Only "}
                >
                     
                    {editingLead && (
                        <Form className="edit-form">
                           
              
                            <Row span={18}>
                                <Col span={12}>
                                    <Form.Item label="ID">
                                    
                                        <Input value={editingLead.id} />
                                    </Form.Item></Col>
                                <Col span={12}>
                                    <Form.Item label="Name">
                                        <Input value={editingLead.leadName} />
                                    </Form.Item></Col>
                                <Col span={12}>
                                    <Form.Item label="Phone No">
                                        <Input value={editingLead.phone} />
                                    </Form.Item></Col>
                                <Col span={12}>
                                    <Form.Item label="Email">
                                        <Input value={editingLead.email} />
                                    </Form.Item></Col>
                                <Col span={12}>
                                    <Form.Item label="Country">
                                        <Input value={editingLead.country} />
                                    </Form.Item></Col>
                                <Col span={12}>
                                    <Form.Item label="Interested In">
                                        <Input value={editingLead.interestedIn} />
                                    </Form.Item></Col>
                                <Col span={12}>
                                    <Form.Item label="Source">
                                        <Input value={editingLead.source} />
                                    </Form.Item></Col>
                                <Col span={12}>
                                    <Form.Item label="Status">
                                        
                                        <Input value={editingLead.status} />
                                    </Form.Item></Col>
                            </Row>

                        </Form>
                    )}
                </Modal>

                <Modal
                    title="Edit Details"
                    visible={isEditing}
                    okText="Save"
                    onCancel={() => {
                        resetEditing();
                    }}
                    onOk={() => {
                        setDataSource((pre) => {
                            return pre.map((lead) => {
                                if (lead.id === editingLead.id) {
                                    return editingLead;
                                } else {
                                    return lead;
                                }
                            });
                        });
                        resetEditing();
                    }}
                >

                    <Form >

                        <Row span={18}>
                            <Col span={12}>
                                <Form.Item label="Name">
                                    <Input

                                        value={editingLead?.LeadName}
                                        onChange={(e) => {
                                            setEditingLead((pre) => {
                                                return { ...pre, leadName: e.target.value };
                                            });
                                        }}
                                    />

                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="Phone">
                                    <Input
                                        value={editingLead?.phone}
                                        onChange={(e) => {
                                            setEditingLead((pre) => {
                                                return { ...pre, phone: e.target.value };
                                            });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email">
                                    <Input
                                        value={editingLead?.email}
                                        onChange={(e) => {
                                            setEditingLead((pre) => {
                                                return { ...pre, email: e.target.value };
                                            });
                                        }}
                                    />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label="Country">
                                    <Input
                                        value={editingLead?.country}
                                        onChange={(e) => {
                                            setEditingLead((pre) => {
                                                return { ...pre, country: e.target.value };
                                            });
                                        }}
                                    />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label="Interested In">
                                    <Input
                                        value={editingLead?.interestedIn}
                                        onChange={(e) => {
                                            setEditingLead((pre) => {
                                                return { ...pre, interestedIn: e.target.value };
                                            });
                                        }}
                                    />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label="Source">
                                    <Input
                                        value={editingLead?.source}
                                        onChange={(e) => {
                                            setEditingLead((pre) => {
                                                return { ...pre, source: e.target.value };
                                            });
                                        }}
                                    />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label="Status">
                                    <Input
                                        value={editingLead?.status}
                                        onChange={(e) => {
                                            setEditingLead((pre) => {
                                                return { ...pre, status: e.target.value };
                                            });
                                        }}
                                    />
                                </Form.Item></Col>
                        </Row>
                    </Form>

                </Modal>
            </header>

        </div>
    );
}

export default App;












