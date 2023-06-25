import React from "react";
import style from "@/components/ui/NovelCardItem.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
interface Props {
  thumbnail: string;
  serializationStatus: string;
  title: string;
  author: string;
  starRating: number;
  genre: string;
  novelId?: number;
  grade: number;
  newChecking: boolean;
  imgSize: string;
  episodeCount: number;
}

const IS_READABLE_BY_All = 0; //전체
const IS_NINETEEN_PLUS = 19; //19

function getGradeText(grade: number) {
  if (grade === IS_NINETEEN_PLUS) {
    return <p className={style.nineteenCheck}>{grade}</p>;
  }
  if (grade === IS_READABLE_BY_All) {
    return <p className={style.allCheck}>All</p>;
  }
  return <p className={style.basicCheck}>{grade}</p>;
}

export default function NovelCardItem({
  thumbnail,
  serializationStatus,
  genre,
  title,
  author,
  starRating,
  novelId,
  grade,
  newChecking,
  imgSize,
  episodeCount,
}: Props) {
  const router = useRouter();

  const handleNovelDetailClick = () => {
    // grade가 0인 경우 나이 체크 없이 바로 이동
    if (grade === 0) {
      localStorage.setItem("scrollPosition", window.pageYOffset.toString());
      localStorage.setItem("previousUrl", router.asPath);
      router.push(`/noveldetail/${novelId}`, undefined, { scroll: false });
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
    router.push(`/noveldetail/${novelId}`, undefined, { scroll: false });
  };

  return (
    <div
      className={style.allNovelCard}
      style={{ width: imgSize }}
      onClick={handleNovelDetailClick}
    >
      <div className={style.allNovelImgContainer}>
        <div className={style.allCardImg}>
          <Image
            src={thumbnail}
            alt={"thumbnailImg"}
            width={384}
            height={384}
            priority
            placeholder="blur"
            blurDataURL="data:image/gif;base64,..."
          />
        </div>
        {newChecking && (
          <div className={style.cardNewIcon}>
            <Image
              src={"/assets/images/icons/NewIcon.svg"}
              alt={"newIcon"}
              width={90}
              height={90}
            />
          </div>
        )}
        <div className={style.ageCheck}>{getGradeText(grade)}</div>
      </div>
      <div>
        <div className={style.allNovelStatus}>{serializationStatus}</div>
        <div className={style.allNovelTitle}>
          <p>{title}</p>
        </div>
        <div className={style.allNovelAuthor}>
          {author} | {genre}
        </div>
        <div className={style.allNovelStarpoint}>
          <Image
            src={"/assets/images/icons/star.svg"}
            alt={"starPointIcon"}
            width={15}
            height={15}
          />
          <span>{starRating}</span>
          <Image
            src={"/assets/images/icons/list.svg"}
            alt={"listIcon"}
            width={15}
            height={15}
          />
          <span>{episodeCount}</span>
        </div>
      </div>
    </div>
  );
}
