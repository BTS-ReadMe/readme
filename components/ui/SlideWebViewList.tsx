import React from "react";
import style from "@/components/ui/SlideWebViewList.module.css";
import Image from "next/image";
import Link from "next/link";
export default function SlideWebViewList() {
  return (
    <div className={style.mainWebNovelContainer}>
      <p>웹소설</p>
      <div className={style.mainWebNovelGenre}>
        <Link href={"/novel?category=판타지&subCategory=연재중&viewerType=card"}>
          <div className={style.mainWebNovelImg}>
            <Image
              src="/assets/images/novelImg_hj.jpg"
              alt="kakaologin"
              width={75}
              height={75}
              loading="lazy"
              placeholder="empty"
            ></Image>
            <p>판타지</p>
          </div>
        </Link>
        <Link href={"novel?category=현판&subCategory=연재중&viewerType=card"}>
          <div className={style.mainWebNovelImg}>
            <Image
              src="/assets/images/novelImg_jy.jpg"
              alt="kakaologin"
              width={75}
              height={75}
              loading="lazy"
              placeholder="empty"
            ></Image>
            <p>현판</p>
          </div>
        </Link>
        <Link href={"/novel?category=로맨스&subCategory=연재중&viewerType=card"}>
          <div className={style.mainWebNovelImg}>
            <Image
              src="/assets/images/novelImg_mk.jpg"
              alt="kakaologin"
              width={75}
              height={75}
              loading="lazy"
              placeholder="empty"
            ></Image>
            <p>로맨스</p>
          </div>
        </Link>
      </div>
      <div className={style.mainWebNovelGenre}>
        <Link href={"/novel?category=로판&subCategory=연재중&viewerType=card"}>
          <div className={style.mainWebNovelImg}>
            <Image
              src="/assets/images/novelImg_sh.jpg"
              alt="kakaologin"
              width={75}
              height={75}
              loading="lazy"
              placeholder="empty"
            ></Image>
            <p>로판</p>
          </div>
        </Link>
        <Link href={"novel?category=무협&subCategory=연재중&viewerType=card"}>
          <div className={style.mainWebNovelImg}>
            <Image
              src="/assets/images/novelImg_ym.jpg"
              alt="kakaologin"
              width={75}
              height={75}
              loading="lazy"
              placeholder="empty"
            ></Image>
            <p>무협</p>
          </div>
        </Link>
        <Link href={"/novel?category=드라마&subCategory=연재중&viewerType=card"}>
          <div className={style.mainWebNovelImg}>
            <Image
              src="/assets/images/novelImg_ym2.jpg"
              alt="kakaologin"
              width={75}
              height={75}
              loading="lazy"
              placeholder="empty"
            ></Image>
            <p>드라마</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
