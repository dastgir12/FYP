import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import { useState } from "react";

/////
const getBase64 = (file) =>
 new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
 });
//////
const FifthStepForm = ({ props }) => {
 const { current, setCurrent } = props;
 console.log(current);
 const [previewOpen, setPreviewOpen] = useState(false);
 const [previewImage, setPreviewImage] = useState("");
 const [previewTitle, setPreviewTitle] = useState("");
 const [fileList, setFileList] = useState([]);
 console.log(fileList);
 const handleCancel = () => setPreviewOpen(false);
 const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
   file.preview = await getBase64(file.originFileObj);
  }
  setPreviewImage(file.url || file.preview);
  setPreviewOpen(true);
  setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
 };
 const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
 const uploadButton = (
  <div>
   <PlusOutlined />
   <div
    style={{
     marginTop: 8,
    }}
   >
    Upload
   </div>
  </div>
 );
 const handleNextClick = () => {
  //   if (fileList.length === 0) {
  //    message.error("Please Upload Images");
  //    return;
  //   }
  setCurrent((prev) => prev + 1);
 };
 return (
  <>
   <div className="flex justify-center items-center flex-col">
    <h3>Upload Pictures</h3>
    <p className="text-center">Please upload images clear and size less then 2 MB.</p>
    <div className="mt-20 sm:mt-5">
     <div className="grid place-items-center">
      <Upload
       multiple
       action={"https://run.mocky.io/v3/625080cd-994a-4e80-b564-6c4dc48533f8"}
       listType="picture-card"
       fileList={fileList}
       onPreview={handlePreview}
       onChange={handleChange}
      >
       {fileList.length >= 8 ? null : uploadButton}
      </Upload>
     </div>
     <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
      <img
       alt="example"
       style={{
        width: "100%",
       }}
       src={previewImage}
      />
     </Modal>
    </div>
    <div className="flex gap-2 mt-7 justify-center items-center ">
     <button
      onClick={() => setCurrent(current - 1)}
      className="bg-green-400 w-24 px-3 py-2 rounded-2xl text-white"
     >
      Back
     </button>
     <button
      onClick={handleNextClick}
      className="bg-green-400 w-24 px-3 py-2 rounded-2xl text-white"
      type="submit"
     >
      Next
     </button>
    </div>
   </div>
   {/* Image Upload Checker */}
   <input type="file" onChange={(e) => console.log(e.target.files[0])} placeholder="Upload Image" />
  </>
 );
};

export default FifthStepForm;
