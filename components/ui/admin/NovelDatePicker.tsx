import React from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { novelInputType } from "@/types/admin/novelType";

export default function NovelDatePicker(props: {
  inputData: novelInputType;
  setInputData: React.Dispatch<React.SetStateAction<novelInputType>>;
}) {
  const changeDateHandle: DatePickerProps["onChange"] = (date) => {
    if (date !== null) {
      props.setInputData({
        ...props.inputData,
        startDate: date,
      });
    }
  };
  const strDate = props.inputData.startDate.toString();
  const substringDate = strDate.substring(0, 10);
  return (
    <>
      <DatePicker onChange={changeDateHandle} placeholder={substringDate} />
    </>
  );
}
