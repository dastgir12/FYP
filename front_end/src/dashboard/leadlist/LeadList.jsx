import React, { useState } from 'react';
import { Table, Popconfirm, message, Modal, Form, Input ,Button} from 'antd';
// import 'antd/dist/antd.css'
// import { Table, Popconfirm, message, Modal, Form, Input, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const LeadList = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([
    
    { key: '1', name: 'John', email: 'john@example.com' },
    { key: '2', name: 'Jane', email: 'jane@example.com' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    message.success('Lead deleted successfully');
  };

  const handleEdit = (record) => {
    setCurrentEditId(record.key);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleCancel = () => {
    setCurrentEditId('');
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleUpdate = (values) => {
    const newData = [...data];
    const index = newData.findIndex((item) => item.key === currentEditId);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...values });
      setData(newData);
      setIsModalVisible(false);
      message.success('Lead updated successfully');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this lead?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="danger" icon={<DeleteOutlined />} style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <>
      <Table dataSource={data} columns={columns} />
      <Modal
        title="Edit Lead"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item name="name" label="Name">
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item>
            <button type="submit" className="ant-btn ant-btn-primary">
              Update Lead
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default LeadList;
