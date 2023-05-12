import React from "react";
import { Input } from "antd";
import { Dispatch, SetStateAction } from "react";
import { inputNovelType } from "@/types/admin/novelType";
import { episodeInputType } from "@/types/admin/episodeType";

export default function NovelInput(props: {
  type: string;
  inputData: inputNovelType;
  setInputData: React.Dispatch<React.SetStateAction<inputNovelType>>;
}) {
  const changeInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.setInputData({
      ...props.inputData,
      [props.type]: e.target.value,
    });
  };
  let value;
  if (props.type === "title") {
    value = props.inputData.title;
  }
  if (props.type === "author") {
    if (props.inputData) value = props.inputData.author;
  }
  if (props.type === "authorComment") {
    value = props.inputData.authorComment;
  }

  return (
    <>
      <Input value={value} onChange={changeInputHandle} />
    </>
  );
}
