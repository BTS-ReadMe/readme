import React from "react";
import Image from "next/image";
import style from "@/components/pages/noveldetail/NovelDetailinfo.module.css";
import CountViewUi from "@/components/ui/CountViewUi";

export default function NovelDetailInfo(props: {
  views: number;
  starRating: number;
  episodeCount: number;
  thumbnail: string;
}) {
  return (
    <div className={style.novelMainInfo}>
      <div className={style.novelMainImageInfo}>
        <Image
          src={props.thumbnail}
          alt="thumbnail Img"
          width={1000}
          height={1000}
          placeholder="blur"
          blurDataURL="data:image/gif;base64,..."
        />
      </div>
      <div className={style.detailnovellikes}>
        <CountViewUi
          icon="/assets/images/icons/eye.svg"
          count={props.views}
          color="black"
          flexDirection="column"
        />
        <CountViewUi
          icon="/assets/images/icons/star.svg"
          count={props.starRating}
          color="black"
          flexDirection="column"
        />
        <CountViewUi
          icon="/assets/images/icons/list.svg"
          count={props.episodeCount}
          color="black"
          flexDirection="column"
        />
      </div>
    </div>
  );
}
