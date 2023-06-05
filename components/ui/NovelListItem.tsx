import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "@/components/ui/NovelListItem.module.css";
import { allDetailDatatype } from "@/types/model/mainDataType";
import axios from "@/configs/axiosConfig";
import { recentReadType } from "@/types/user/libraryType";

const IS_READABLE_BY_All = 0;
const IS_NINETEEN_PLUS = 19;

function getGradeText(grade: number) {
  if (grade === IS_NINETEEN_PLUS) {
    return <p className={style.nineteenCheck}>{grade}</p>;
  }
  if (grade === IS_READABLE_BY_All) {
    return <p className={style.allCheck}>All</p>;
  }
  return <p className={style.basicCheck}>{grade}</p>;
}

export default function NovelListItem({
  novelData,
}: {
  novelData: allDetailDatatype;
}) {
  const router = useRouter();
  //const [recentReadData, SetRecentReadData] = useState<recentReadType>();
  const readAtData = async () => {
    const res = await axios.get(`/novels-service/v1/history`);
    const recentReadData = res.data.data.contents.find(
      (item: recentReadType) => item.episodeId === novelData.episodeId
    );
    console.log("recentReadData ", recentReadData);
    console.log("recentReadData.readAt ", recentReadData.readAt);
    return recentReadData.readAt;
  };
  const movePage = () => {
    const readY = readAtData();
    console.log("readY ", readY);
    router.push(`/viewer/${novelData.episodeId}`).then(async () => {
      //window.scrollTo(0, await readY);
      console.log("readY1111111111111111 ", readY);
      window.scrollTo(0, 1000);
    });
  };
  const handleNovelDetailClick = () => {
    localStorage.setItem("scrollPosition", window.pageYOffset.toString());
    localStorage.setItem("previousUrl", router.asPath);
    router.push(`/noveldetail/${novelData.novelId}`, undefined, {
      scroll: false,
    });
  };

  return (
    <div className={style.allNovelList}>
      <div className={style.allNovelContainer} onClick={handleNovelDetailClick}>
        <div className={style.allNovelImgContainer}>
          <div className={style.allListImg}>
            <Image
              src={novelData.thumbnail}
              alt="Novel Image"
              width={500}
              height={500}
            />
          </div>
          {novelData.newChecking && (
            <div className={style.listNewIcon}>
              <Image
                src={"/assets/images/icons/NewIcon.svg"}
                alt="New Icon"
                width={30}
                height={30}
              />
            </div>
          )}
          <div className={style.ageCheck}>{getGradeText(novelData.grade)}</div>
        </div>
        <div className={style.allNovelInfo}>
          <div className={style.allNovelsubInfo}>
            <div className={style.allNovelStatus}>
              {novelData.serializationStatus}
            </div>
            <div className={style.allNovelTitle}>
              <p>{novelData.title}</p>
            </div>
            <div className={style.allNovelAuthor}>
              {novelData.author} | {novelData.genre}
            </div>
            <div className={style.allNovelStarpoint}>
              <Image
                src={"/assets/images/icons/star.svg"}
                alt="Star Icon"
                width={15}
                height={15}
              />
              <span>{novelData.starRating}</span>
              <Image
                src={"/assets/images/icons/list.svg"}
                alt={"List Icon"}
                width={15}
                height={15}
              />
              <span>{novelData.episodeCount}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <Image
          src={"/assets/images/icons/close.svg"}
          alt="close Icon"
          width={20}
          height={20}
        />
        {router.asPath === "/library?id=1" && (
          <div className={style.allNovelContinue} onClick={movePage}>
            <span>이어보기</span>
            <Image
              src={"/assets/images/icons/chevron-right.svg"}
              alt="Chevron-right Icon"
              width={15}
              height={15}
            />
          </div>
        )}
      </div>
    </div>
  );
}
