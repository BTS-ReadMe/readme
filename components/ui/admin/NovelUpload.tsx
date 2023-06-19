import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { novelInputType } from "@/types/admin/novelType";
import axios from "axios";
import Config from "@/configs/config.export";

export default function NovelUpload(props: {
  inputData: novelInputType;
  setInputData: React.Dispatch<React.SetStateAction<novelInputType>>;
}) {
  const getBase64 = async (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);

    const formData = new FormData();
    formData.append("multipartFile", img);
    //const baseUrl = Config().baseUrl;
    try {
      //
      const imageRes = await axios.post(
        `/novels-service/s3/file`,
        formData
      );
      const image_URL = imageRes.data;

      props.setInputData({
        ...props.inputData,
        thumbnail: image_URL,
      });
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        name="thumbnail"
        listType="picture-card"
        className="thumbnail-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {props.inputData.thumbnail ? (
          <img
            src={props.inputData.thumbnail}
            alt="thumbnail"
            style={{ width: "200%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
}
