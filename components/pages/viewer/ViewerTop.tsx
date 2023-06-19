import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "@/components/pages/viewer/ViewerTop.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useSendViewerPositionMutation } from "@/pages/api/novel-service";

interface Props {
  title: string;
  novelsTitle: string;
  registration: string;
  novelId: number;
}

export default function ViewerTop({
  title,
  novelsTitle,
  registration,
  novelId,
}: Props) {
  const router = useRouter();
  const [cookies] = useCookies(["uuid"]);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  const episodeId = Number(router.query.episodeId);
  const sendViewerPosition = useSendViewerPositionMutation();
  const movePage = useCallback(() => {
    if (!loginCheck) {
      localStorage.setItem("link", router.asPath);
      router.push("/login");
    }
  }, [loginCheck, router]);

  const readAt = Number(localStorage.getItem("viewerPosition"));

  const handleArrowClick = useCallback(() => {
    if (!loginCheck) {
      router.push(`/noveldetail/${novelId}`);
      return;
    }
    sendViewerPosition.mutate(
      {
        readAt: readAt,
        episodeId: episodeId,
      },
      {
        onSuccess: (data: any) => {
          router.push(`/noveldetail/${novelId}`);
        },
      }
    );
  }, [router, episodeId, readAt, loginCheck]);
  
  const handleButtonClick = useCallback(() => {
    if (!loginCheck) {
      return;
    }
    sendViewerPosition.mutate(
      {
        readAt: readAt,
        episodeId: episodeId,
      },
      {
        onSuccess: (data: any) => {
          console.log("데이터 보내기성공!", data);
        },
      }
    );
  }, [loginCheck, readAt, episodeId, sendViewerPosition]);


  // 마이페이지,홈,뒤로가기
  const handleMypageClick = handleButtonClick;
  const handleHomeClick = handleButtonClick;

  useEffect(() => {
    setLoginCheck(cookies.uuid);
  }, [cookies.uuid]);

  return (
    <div className={style.Container}>
      <div className={style.titleContainer}>
        <Link href="/">
          <div className={style.homeImg} onClick={handleHomeClick}>
            <Image
              src={"/assets/images/icons/home_black.svg"}
              alt={"homeicon"}
              width={25}
              height={25}
            />
          </div>
        </Link>
        <p>{novelsTitle}</p>
        {loginCheck ? (
          <Link href="/mypage">
            <div className={style.myImg} onClick={handleMypageClick}>
              <Image
                src={"/assets/images/icons/my.svg"}
                alt={"myicon"}
                width={30}
                height={30}
              />
            </div>
          </Link>
        ) : (
          <div className={style.loginImg}>
            <Image
              src={"/assets/images/icons/login.svg"}
              alt={"loginicon"}
              width={50}
              height={50}
              onClick={movePage}
            />
          </div>
        )}
      </div>
      <LineSeparator colorline="grayline" />
      <div className={style.episodeContainer}>
        <div className={style.leftArrowImg} onClick={handleArrowClick}>
          <Image
            src={"/assets/images/icons/left-chevron.svg"}
            alt={"leftarrowicon"}
            width={25}
            height={25}
          />
        </div>
        <div className={style.episodeInfo}>
          <div className={style.episodeTitle}>{title}</div>
          <div className={style.episodeDay}>{registration}</div>
        </div>
      </div>
      <LineSeparator colorline="grayline" />
    </div>
  );
}
