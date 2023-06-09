import axios from "@/configs/axiosConfig";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import style from "@/components/pages/point/order-history.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { pointPayType } from "@/types/user/paymentType";

export default function OrderHistory() {
  const router = useRouter();
  const pg_token = router.query.pg_token;
  const [cookies] = useCookies(["uuid"]);
  const [payData, setPayData] = useState<pointPayType>();

  useEffect(() => {
    const tid = localStorage.getItem("tid");
    const partnerOrderId = localStorage.getItem("partnerOrderId");
    if (pg_token !== undefined) {
      const getOrderHistory = async () => {
        const res = await axios.post(`/payments-service/v1/payments/approve`, {
          tid: tid,
          partnerOrderId: partnerOrderId,
          uuid: cookies.uuid,
          pgToken: pg_token,
        });
        localStorage.removeItem("tid");
        localStorage.removeItem("partnerOrderId");

        const replaceStr = res.data.replace("data:", "");

        const data = JSON.parse(
          replaceStr.replace("event:chargePointResult", "")
        );

        setPayData({
          total: data.total,
          point: data.point,
          chargeDate: data.chargeDate,
        });
        localStorage.setItem("point", data.total);
      };
      getOrderHistory();
    }
  }, [pg_token]);

  const goBack = () => {
    const link = localStorage.getItem("link") || "/";
    router.push(link);
  };

  return (
    <>
      <Head>
        <title> {`충전내역 | ReadMe`}</title>
        <meta name="description" content="충전내역 페이지 입니다." />
      </Head>
      {payData ? (
        <div className={style.container}>
          <div className={style.billArea}>
            <div className={style.bill}>
              <div className={style.billContent}>
                <div className={style.billImg}>
                  <Image
                    src="/assets/images/icons/greenCheck.svg"
                    alt="pay"
                    width={80}
                    height={80}
                  />
                </div>
                <div className={style.content}>
                  <div className={style.top}>
                    <p>충전내역</p>
                    <span>{payData?.chargeDate}</span>
                  </div>

                  <div className={style.box}>
                    <p>{payData?.point}</p>
                    <span>카카오페이</span>
                  </div>

                  <div className={style.textbox}>
                    <p>충전한 포인트</p>
                    <span>P {payData?.point.toLocaleString("en")}</span>
                  </div>

                  <LineSeparator colorline="grayline" />
                  <div className={style.textbox}>
                    <p>보유 포인트</p>
                    <span className={`${style["purple"]}`}>
                      P {payData?.total.toLocaleString("en")}
                    </span>
                  </div>
                  <div className={style.bottom} onClick={goBack}>
                    <p>Go Back</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.loader}>
          <SyncLoader color="#6E48EB" />
        </div>
      )}
    </>
  );
}
