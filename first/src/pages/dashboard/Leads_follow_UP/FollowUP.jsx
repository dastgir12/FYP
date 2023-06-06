import React ,{useState , useEffect} from 'react';
import { Table , Button , Dropdown, Menu } from 'antd';
import axios from 'axios';
import { EyeOutlined, EditOutlined, DeleteOutlined ,DownOutlined } from "@ant-design/icons";

const FollowUP = () => {

  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const [users,setUsers]=useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const handleMenuClick = (e) => {
    setSelectedAction(e.key);
  };

useEffect(() => {
const getData = async ()=>{
  const response =await axios.get('http://localhost:3001/v1/leads/companies/S640/users')
   console.log(response);
   setUsers(response.data.users);

}
getData();
}, [])

const [checkedItems,setCheckedItems]=useState([]);

const usersMenu = (
  <Menu onClick={handleMenuClick}>
    {users.map((item,index)=>{
      return(
<Menu.Item key={index} onClick={()=>{
  
}}>
        {item.fullName}
    </Menu.Item>
      )
    })}
    
  </Menu>
);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/v1/leads/leads-Info"
        );

        const list = res.data.data || [];
        const selectedColumns = [
          "companyName",
          "leadTitle",
          "leadSource",
          "staffName",
          "status",
        ]; // Replace with the desired column keys

        const actionColumn = {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (_, record) => (
            <div className="space-x-1">
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<EyeOutlined />}
                // onClick={() => {
                //   viewLead(record);
                // }}
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<EditOutlined />}
                // onClick={() => {
                //   editLead(record);
                // }}
              />
              <Button
                className="bg-blue-500"
                type="primary"
                icon={<DeleteOutlined />}
                // onClick={() => {
                //   deleteLead(record);
                // }}
              />
            </div>
          ),
        };

        const cols = selectedColumns.map((key) => {
          if (key === "status") {
            return {
              title: key,
              dataIndex: key,
              key: key,
              render: (text) => {
                let colorClass = "bg-gray-500 text-white"; // Default color

                if (text === "Working") {
                  colorClass = "bg-green-500 text-white";
                } else if (text === "Pending") {
                  colorClass = "bg-yellow-500 text-black";
                } else if (text === "Contacted") {
                  colorClass = "bg-yellow-500 text-white";
                } else if (text === "Qualified") {
                  colorClass = "bg-blue-900 text-white";
                } else if (text === "Closed") {
                  colorClass = " bg-red-500 text-white";
                }

                return (
                  <span className={`${colorClass} px-2 py-1 rounded`}>
                    {text}
                  </span>
                );
              },
            };
          }

          return {
            title: key,
            dataIndex: key,
            key: key,
          };
        });

        cols.push(actionColumn);

        setColumns(cols);
        setDataSource(list);
        setIsLoading(false);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchData();
  }, []);

  
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setCheckedItems(selectedRows)
    },

    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', 
      name: record.name,
     
    }),

  };





  return(
    <>
    {checkedItems.length>0&&
    <div className="mb-2">
        <Dropdown overlay={usersMenu}>
          <Button className="bg-blue-500" type="primary" icon={<DownOutlined />}>
            Select Users
          </Button>
        </Dropdown>
        <Button className="bg-red-500 ml-2" type="primary" icon={<DeleteOutlined />}>
          Delete Selected
        </Button>
      </div>
    }  <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
      </>
   
)};

export default FollowUP;
