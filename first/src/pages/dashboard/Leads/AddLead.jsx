import React from "react";
import { useState } from "react";
import { DatePicker, TimePicker, Modal } from "antd";
import { Form, Input, Select, Upload } from "antd";
import { Button } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { PlusSquareOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const AddLead = () => {
  const [form] = Form.useForm();
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

  const onFinish = async (values) => {
    try {
      const formData = {
        companyName: values.companyName,
        leadTitle: values.leadTitle,
        leadSource: values.leadSource,
        referralName: values.referralName,
        status: values.status,
        description: values.description,
        attachment: values.attachment,
        staffName: values.staffName,
        otherDetails: values.otherDetails,
        followUpDate: values.followUpDate,
        followUpTime: values.followUpTime,
      };

      const { status, data } = await axios.post(
        "http://localhost:3001/v1/leads/leads-Info",
        formData
      );
      if (status == 200) {
        console.log(data);
      } else {
        console.log("error is here bru");
      }
    } catch (e) {
      console.log(e);
      return; // return early to prevent redirect
    }
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
          <Form form={form} onFinish={onFinish} className="flex flex-col p-6">
            <div className="flex justify-center space-x-2">
              <div className="w-[550px]">
                <label for="">Company Name</label>

                <Form.Item name="companyName">
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

                <Form.Item name="leadTitle">
                  <Input placeholder="Enter Lead Title" />
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-center space-x-2 m-2">
              <div className="w-[550px] ">
                <label for="">Lead Source</label>

                <Form.Item name="leadSource">
                  <Select placeholder="Select an option">
                    <Option value="option1">1</Option>
                    <Option value="option2">3</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="w-[550px] ">
                <label for="">Refferal Name</label>

                <Form.Item name="referralName">
                  <Input placeholder="Enter Refferal Name" />
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-center space-x-2 m-2">
              <div className="w-[550px] ">
                <label htmlFor="">Description</label>
                <Form.Item name="description">
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
                  name="attachment"
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

                <Form.Item name="staffName">
                  <Select placeholder="Select an option">
                    <Option value="option1">any</Option>
                    <Option value="option2">any</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="w-[550px] ">
                <label for="">Statuse</label>

                <Form.Item name="status">
                  <Select placeholder="Select an option">
                    <Option value="option1">Contacted</Option>
                    <Option value="option2">Failed</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="w-[550px] ">
                <label for="">Other Details</label>

                <Form.Item name="otherDetails">
                  <Input placeholder="Enter Other Name" />
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-center space-x-2 m-2">
              <div>
                <label htmlFor="">followUpDate</label>
                <Form.Item name="followUpDate">
                  <DatePicker className="w-[550px]" />
                </Form.Item>
              </div>
              <div>
                <label htmlFor="">followUpTime</label>
                <Form.Item name="followUpTime">
                  <TimePicker className="w-[550px]" />
                </Form.Item>
              </div>
              -
            </div>

            <div className="flex space-x-2">
              <div className="mb-4 ml-24">
                <button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-700 rounded px-4 py-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        </div>

        <Modal
          title="Add New Company Name"
          open={modalVisible}
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
