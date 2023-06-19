import { Button, Form, Space } from "antd";
import React, { useEffect, useState } from "react";
import Noveltag from "@/components/ui/admin/NovelTag";
import style from "@/components/pages/admin/NovelForm.module.css";
import dayjs, { Dayjs } from "dayjs";

import NovelInput from "@/components/ui/admin/NovelInput";
import NovelSelect from "@/components/ui/admin/NovelSelect";
import NovelCheckbox from "@/components/ui/admin/NovelCheckbox";
import NovelDatePicker from "@/components/ui/admin/NovelDatePicker";
import NovelTextArea from "@/components/ui/admin/NovelTextArea";
import NovelUpload from "@/components/ui/admin/NovelUpload";
import { novelInputType } from "@/types/admin/novelType";
import { useRouter } from "next/router";
import axios from "@/configs/axiosConfig";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
export default function NovelForm() {
  const router = useRouter();
  const novelId = router.query.id;

  const [inputData, setInputData] = useState<novelInputType>({
    title: "",
    author: "",
    grade: -1,
    genre: "",
    serializationStatus: "",
    authorComment: "",
    serializationDay: [],
    startDate: dayjs(),
    description: "",
    thumbnail: "",
    tags: [],
  });

  useEffect(() => {
    if (!router.isReady) return;

    const getNovelData = async () => {
      const res = await axios.get(`http://15.165.198.145:8000/novels-service/v1/admin/novels/${novelId}`);
      setInputData({
        title: res.data.data.title,
        author: res.data.data.author,
        grade: res.data.data.grade,
        genre: res.data.data.genre,
        serializationStatus: res.data.data.serializationStatus,
        authorComment: res.data.data.authorComment,
        serializationDay: res.data.data.serializationDay,
        startDate: res.data.data.startDate,
        description: res.data.data.description,
        thumbnail: res.data.data.thumbnail,
        tags: res.data.data.tags,
      });
    };
    if (novelId !== undefined) {
      getNovelData();
    }
  }, [router.isReady]);

  const postHandle = () => {
    axios
      .post(`http://15.165.198.145:8000/novels-service/v1/admin/novels`, {
        title: inputData.title,
        author: inputData.author,
        grade: inputData.grade,
        genre: inputData.genre,
        serializationStatus: inputData.serializationStatus,
        authorComment: inputData.authorComment,
        serializationDay: inputData.serializationDay,
        startDate: inputData.startDate,
        description: inputData.description,
        thumbnail: inputData.thumbnail,
        tags: inputData.tags,
      })
      .then((res) => {
        router.push("/admin/main");
      });
  };

  const cancelHandle = () => {
    router.push("/admin/main");
  };

  const putHandle = () => {
    axios
      .put(`http://15.165.198.145:8000/novels-service/v1/admin/novels/${novelId}`, {
        title: inputData.title,
        author: inputData.author,
        grade: inputData.grade,
        genre: inputData.genre,
        serializationStatus: inputData.serializationStatus,
        authorComment: inputData.authorComment,
        serializationDay: inputData.serializationDay,
        startDate: inputData.startDate,
        description: inputData.description,
        thumbnail: inputData.thumbnail,
        tags: inputData.tags,
      })
      .then((res) => {
        router.push("/admin/main");
      });
  };

  return (
    <>
      <div className={style.container}>
        <Form
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          style={{ maxWidth: 1500 }}
        >
          <div className={style.horizontal}>
            <Form.Item
              label="작품명"
              style={{ width: 600 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <NovelInput
                type={"title"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
            <Form.Item
              label="작가"
              style={{ width: 600 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <NovelInput
                type={"author"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>
          <div className={style.horizontal}>
            <Form.Item
              label="관람등급"
              style={{ width: 300 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <NovelSelect
                type={"grade"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
            <Form.Item
              label="장르"
              style={{ width: 300 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <NovelSelect
                type={"genre"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
            <Form.Item
              label="연재상태"
              style={{ width: 300 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <NovelSelect
                type={"serializationStatus"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item
              label="작가의 말"
              style={{ width: 640 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <NovelInput
                type={"authorComment"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item
              label="연재 요일"
              name="disabled"
              valuePropName="checked"
              style={{ width: 640 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <NovelCheckbox
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item
              label="연재 시작일"
              style={{ width: 300 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <NovelDatePicker
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>
          <div className={style.horizontal}>
            <Form.Item
              label="작품소개"
              style={{ width: 700 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <NovelTextArea
                rows={20}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
            <Form.Item
              label="대표 이미지"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <NovelUpload inputData={inputData} setInputData={setInputData} />
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item
              label="태그 (최대 3개)"
              style={{ width: 640 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <Noveltag inputData={inputData} setInputData={setInputData} />
            </Form.Item>
          </div>
          <div className={style.button}>
            <Form.Item>
              <Space>
                {novelId === undefined ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => postHandle()}
                  >
                    등록
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => putHandle()}
                  >
                    수정
                  </Button>
                )}

                <Button htmlType="button" onClick={cancelHandle}>
                  취소
                </Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
}
