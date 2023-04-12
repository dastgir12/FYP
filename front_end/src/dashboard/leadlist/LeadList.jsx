import { Table, Space, Button } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const LeadList = () => {
  // ...

  const handleEdit = (record) => {
    // Handle edit action
  };
  
  const handleDelete = (record) => {
    // Handle delete action
  };
  
  const newCols = [
    "LeadName",
    "Phone",
    "Email",
    "Interested in",
    "Source",
    "Status",
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}><EditFilled /></Button>
          <Button onClick={() => handleDelete(record)}><DeleteFilled /></Button>
        </Space>
      ),
    },
  ].map((e) => {
    return {
      title: e.title || e,
      dataIndex: (typeof e === 'object') ? e.key : e.toLocaleLowerCase(),
      key: (typeof e === 'object') ? e.key : e.toLocaleLowerCase(),
      render: e.render,
    }
  });

  const data = [
    {
      key: '1',
      LeadName: 'John Brown',
      phone: '1234567890',
      email: 'john.brown@example.com',
      interestedin: 'Property A',
      source: 'Website',
      status: 'New',
    },
    {
      key: '2',
      LeadName: 'Jim Green',
      phone: '0987654321',
      email: 'jim.green@example.com',
      interestedin: 'Property B',
      source: 'Referral',
      status: 'Contacted',
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="mt-10">Leads List</h1>
        <div className="border-[1.5px] mt-7 border-gray-300 w-[95vw] sm:w-[80vw] ">
          <Table
            columns={newCols}
            dataSource={data}
            scroll={{
              x: 600,
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  // Handle row click event
                },
              };
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LeadList;
