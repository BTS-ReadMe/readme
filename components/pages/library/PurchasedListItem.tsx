import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "@/components/ui/NovelListItem.module.css";
import { purchasedNovelType } from "@/types/user/libraryType";

const IS_READABLE_BY_All = 0;
const IS_NINETEEN_PLUS = 19;

// function getGradeText(grade: number) {
//   if (grade === IS_NINETEEN_PLUS) {
//     return <p className={style.nineteenCheck}>{grade}</p>;
//   }
//   if (grade === IS_READABLE_BY_All) {
//     return <p className={style.allCheck}>All</p>;
//   }
//   return <p className={style.basicCheck}>{grade}</p>;
// }

export default function PurchasedLstItem({
  novelData,
}: {
  novelData: purchasedNovelType;
}) {
  const router = useRouter();
  // const movePage = () => {
  //   router.push(`/viewer/${novelData.episodeId}`).then(() => {
  //     window.scrollTo(0, 0);
  //   });
  // };
  const handleNovelDetailClick = () => {
    localStorage.setItem("scrollPosition", window.pageYOffset.toString());
    localStorage.setItem("previousUrl", router.asPath);
    router.push(`/noveldetail/${novelData.novelId}`, undefined, {
      scroll: false,
    });
  };

  return (
    <div className={style.allNovelList}>
      {/* <div className={style.allNovelContainer} onClick={handleNovelDetailClick}>
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
      )} */}
    </div>
  );
}
