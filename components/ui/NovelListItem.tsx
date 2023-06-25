import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "@/components/ui/NovelListItem.module.css";
import { allDetailDatatype } from "@/types/model/mainDataType";
import Swal from "sweetalert2";
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

  const movePage = () => {
    localStorage.setItem("link", router.asPath);
    router.push(`/viewer/${novelData.episodeId}`);
  };
  const handleNovelDetailClick = () => {
    const grade = novelData.grade;

    // grade가 0인 경우 나이 체크 없이 바로 이동
    if (grade === 0) {
      localStorage.setItem("scrollPosition", window.pageYOffset.toString());
      localStorage.setItem("previousUrl", router.asPath);
      router.push(`/noveldetail/${novelData.novelId}`, undefined, {
        scroll: false,
      });
      return;
    }

    const age = localStorage.getItem("age");

    if (!age) {
      router.push("/ageCheck");
      return;
    }

    const ageRange = age.split("~").map((num) => parseInt(num.trim()));
    const minAge = ageRange[0];
    const maxAge = ageRange[1];

    if (minAge >= 10 && maxAge <= 19) {
      Swal.fire({
        toast: true,
        icon: "warning",
        html: `
        <div>
          <span style="font-weight:800">만 ${grade}세 이상</span>
          <br />
          <span>이용 가능한 서비스입니다.</span>
        </div>
      `,
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

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
              width={96}
              height={96}
              priority
              placeholder="blur"
              blurDataURL="data:image/gif;base64,..."
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
