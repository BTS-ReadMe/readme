import React, { useEffect, useState } from "react";
import style from "@/components/pages/point/PointTop.module.css";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";

export default function PointTop() {
  const router = useRouter();
  const closeHandle = () => {
    router.back();
  };
  const [point, setPoint] = useState<number>(0);
  const getPoint = async () => {
    const pointRes = await axios.get(`/users-service/v1/user/getPoint`);
    setPoint(Number(pointRes.data.data.point));
  };
  useEffect(() => {
    getPoint();
  }, []);

  const notServiceHandle = () => {
    Swal.fire("지원하지 않는 서비스 입니다.");
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.top}>
          <p>충전하기</p>
          <div className={style.closeButton}>
            <Image
              src="/assets/images/icons/close.svg"
              alt="close"
              width={30}
              height={30}
              onClick={closeHandle}
            />
          </div>
        </div>
        <div className={style.middle}>
          <p>보유포인트</p>
          <span>P {point.toLocaleString("en")}</span>
        </div>
        <div className={style.bottom}>
          <Image
            src="/assets/images/wallet.png"
            alt="close"
            width={60}
            height={60}
            onClick={notServiceHandle}
          />
          <Image
            src="/assets/images/switch.png"
            alt="close"
            width={60}
            height={60}
            onClick={notServiceHandle}
          />
          <Image
            src="/assets/images/cash.png"
            alt="close"
            width={60}
            height={60}
            onClick={notServiceHandle}
          />
          <Image
            src="/assets/images/qr.png"
            alt="close"
            width={60}
            height={60}
            onClick={notServiceHandle}
          />
        </div>
      </div>
    </>
  );
}
