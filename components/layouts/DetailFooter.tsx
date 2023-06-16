import React, { useCallback, useEffect, useState } from "react";
import style from "@/components/layouts/DetailFooter.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "@/configs/axiosConfig";
import useKakaoInit from "@/hooks/useKakaoInit";
import { useQuery } from "react-query";
import Link from "next/link";
import Swal from "sweetalert2";
interface Props {
  title: string;
  description: string;
  thumbnail: string;
}
export default function DetailFooter({ title, description, thumbnail }: Props) {
  const [clickLike, setClickLike] = useState<boolean>(false);
  const [cookies] = useCookies(["uuid"]);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  const router = useRouter();
  const { novelId } = router.query;
  const getLike = useCallback(async () => {
    if (novelId) {
      const res = await axios.get(`/utils-service/v1/pick/${novelId}`);
      if (res.data.data.checked === true) setClickLike(true);
      else setClickLike(false);
    }
  }, [novelId]);

  const [isIosDevice, setIsIosDevice] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIos = /iPad|iPhone|iPod/.test(userAgent);
    setIsIosDevice(isIos);
  }, []);

  useEffect(() => {
    if (cookies.uuid) {
      setLoginCheck(true);
      getLike();
    } else {
      setLoginCheck(false);
    }
  }, [novelId]);

  const likeBtnHandle = async () => {
    //login 돼있을 때
    if (loginCheck) {
      setClickLike(!clickLike);
      const res = axios.post(`/utils-service/v1/pick`, {
        novelsId: `${novelId}`,
      });
    } else {
      localStorage.setItem("link", router.asPath);
      router.push("/login");
    }
  };

  useKakaoInit();
  const shareToKakao = () => {
    if (isIosDevice) {
      Swal.fire({
        toast: true,
        icon: "warning",
        title: "iOS에서 지원하지 않는 서비스입니다.",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          description: description,
          imageUrl: thumbnail,
          link: {
            mobileWebUrl: `http://15.165.198.145:3000/noveldetail/${novelId}`,
            webUrl: `http://15.165.198.145:3000/noveldetail/${novelId}`,
          },
        },
      });
    }
  };

  const searchEpisodeFetch = async () => {
    const response = await axios.get(`/novels-service/v1/episodes/getFirst/${novelId}`);
    return response.data.data;
  };
  const searchEpisodeQuery = useQuery(["searchEpisodeId", novelId], searchEpisodeFetch, {
    cacheTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const episodeId=searchEpisodeQuery.data.episodeId

  return (
    <div className={style.detailFooter}>
      <div className={style.novelBuyBtn}>
        <Image
          src={
            clickLike
              ? "/assets/images/icons/fillHeartBtn.svg"
              : "/assets/images/icons/blankHeartBtn.svg"
          }
          alt="logo"
          width={30}
          height={30}
          priority
          onClick={likeBtnHandle}
        />
      </div>
      <div className={style.novelShareBtn} onClick={shareToKakao}>
        <Image
          alt="share btn"
          width={20}
          height={20}
          src="/assets/images/icons/share.svg"
        />
      </div>
      <div className={style.novelReadBtn}>
        <Image
          src="/assets/images/icons/bookwhite.svg"
          alt="logo"
          width={30}
          height={30}
          priority
        />
        <Link href={`/viewer/${episodeId}`}>
          <div className={style.freeTitle}>무료로 첫편보기</div>
        </Link>
      </div>
    </div>
  );
}
