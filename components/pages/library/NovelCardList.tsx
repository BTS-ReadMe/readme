import React, { useState } from "react";

import {
  allDetailDatatype,
  allNovelCardType,
} from "@/types/model/mainDataType";

import style from "@/components/pages/library/NovelCardList.module.css";
import NovelListItem from "@/components/ui/NovelListItem";

import { useRouter } from "next/router";
import { purchasedNovelType } from "@/types/user/libraryType";
import PurchasedListItem from "./PurchasedListItem";
interface Props {
  data: allDetailDatatype[] | purchasedNovelType[];
  totalElements: number;
}
export default function NovelCardList({ data, totalElements }: Props) {
  const router = useRouter();
  const currentTap = router.query.id;
  let info = "최근 본 소설이 없습니다";
  if (currentTap === "2") info = "좋아요 한 소설이 없습니다";
  if (currentTap === "3") info = "구매한 소설이 없습니다";

  return (
    <>
      <div className={style.container}>
        <span>소설 {totalElements}건</span>
      </div>
      <div className={style.novelContainer}>
        {/* {data ? currentTap==="3" ? :(
          data.map((item, index) => (
            <NovelListItem key={index} novelData={item} />
          ))
        ) : (
          <div className={style.empty}>
            <p>{info}</p>
          </div>
        )} */}
      </div>
    </>
  );
}
