import React from "react";
import { useState } from "react";
import { DatePicker, TimePicker, Modal } from "antd";
import { Form, Input, Select, Upload } from "antd";
import { Button } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { PlusSquareOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddLead = () => {
  const [content, setContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any actions with the submitted content
    console.log(content);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="bg-gray-300 h-[770px]">
        <div className="flex justify-between mb-4 p-2">
          <div className="text-2xl font-semibold">Lead Category</div>
          <div>
            <div>Home / Leads / AddLead</div>
          </div>
        </div>

        <div className="bg-white m-6 h-auto rounded">
          <Form className="flex flex-col p-6">
            <div className="flex justify-center space-x-2">
              <div className="w-[550px]">
                <label for="">Company Name</label>

                <Form.Item name="dropdownField">
                  <Select placeholder="Select an option">
                    <Option value="option1">MCDONALD</Option>
                    <Option value="option2">KFC</Option>
                  </Select>
                  <Button
                    className="bg-blue-500 justify-center items-center flex mt-2"
                    type="primary"
                    icon={<PlusSquareOutlined />}
                    onClick={openModal}
                  />
                </Form.Item>
              </div>

              <div className="w-[550px] ">
                <label for="">Lead Title</label>

                <Form.Item name="Category Name">
                  <Input placeholder="Enter Lead Title" />
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-center space-x-2 m-2">
              <div className="w-[550px] ">
                <label for="">Lead Source</label>

                <Form.Item name="dropdownField">
                  <Select placeholder="Select an option">
                    <Option value="option1">Facbook</Option>
                    <Option value="option2">Twitter</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="w-[550px] ">
                <label for="">Refferal Name</label>

                <Form.Item name="Refferal Name">
                  <Input placeholder="Enter Refferal Name" />
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-center space-x-2 m-2">
              <div className="w-[550px] ">
                <label htmlFor="">Description</label>
                <Form.Item>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={handleContentChange}
                  />
                </Form.Item>
              </div>
              <div>
                <label for="">Attach File</label>
                <Form.Item
                  name="attachments"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload name="attachments" multiple={true} maxCount={5}>
                    <Button className="w-[550px]" icon={<UploadOutlined />}>
                      Select File
                    </Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-center space-x-2 m-2">
              <div className="w-[550px] ">
                <label for="">Staff Name</label>

                <Form.Item name="dropdownField">
                  <Select placeholder="Select an option">
                    <Option value="option1">any</Option>
                    <Option value="option2">any</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="w-[550px] ">
                <label for="">Other Details</label>

                <Form.Item name="Detail">
                  <Input placeholder="Enter Other Name" />
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-center space-x-2 m-2">
              <div>
                <label htmlFor="">Date</label>
                <Form.Item name="date">
                  <DatePicker className="w-[550px]" />
                </Form.Item>

                <div className="bg-blue-500 rounded flex justify-center items-center w-[80px] h-[40px] ">
                  <button className="text-white">Submit</button>
                </div>
              </div>
              <div>
                <label htmlFor="">Time</label>
                <Form.Item name="time">
                  <TimePicker className="w-[550px]" />
                </Form.Item>
              </div>-
            </div>
          </Form>
        </div>

        <Modal
          title="Add New Company Name"
          visible={modalVisible}
          onCancel={closeModal}
          footer={[
            <Button
              className=" bg-blue-500 text-white"
              key="close"
              onClick={closeModal}
            >
              close
            </Button>,
            <Button
              className=" bg-blue-500 text-white "
              key="save changes"
              onClick={handleSubmit}
            >
              save changes
            </Button>,
          ]}
        >
          <Form>
            {/* Add your additional input fields for the pop-up form here */}
            <label for="">Name</label>
            <Form.Item name="name">
              <Input />
            </Form.Item>

            <div className="flex justify-between">
              <div>
                <label for="">Telephone</label>
                <Form.Item name="telephone" className="w-[200px]">
                  <Input />
                </Form.Item>
              </div>

              <div>
                <label for="">Email</label>
                <Form.Item name="email" className="w-[200px]">
                  <Input />
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <label for="">Website</label>
                <Form.Item name="website" className="w-[200px]">
                  <Input />
                </Form.Item>
              </div>

              <div>
                <label for="">Contact Person Name</label>
                <Form.Item name="name" className="w-[200px]">
                  <Input />
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <label for="">Contact Person Telephone</label>
                <Form.Item name="telephone" className="w-[200px]">
                  <Input />
                </Form.Item>
              </div>

              <div>
                <label for="">Contact person name</label>
                <Form.Item name="email" className="w-[200px]">
                  <Input />
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <label for="">Other Detail</label>
                <Form.Item name="telephone" className="w-[200px]">
                  <Input />
                </Form.Item>
              </div>
            </div>

            {/* ... */}
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AddLead;
