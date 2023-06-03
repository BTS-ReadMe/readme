import React, { useEffect } from "react";
import style from "@/components/layouts/MenuSlide.module.css";
import Image from "next/image";
import { useState } from "react";
import SlideWebViewList from "../ui/SlideWebViewList";
import { useCookies } from "react-cookie";
type Props = {
  onClose: () => void;
};
export default function MenuSlide(props: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
    props.onClose();
  };
  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  //const [welcomeText, setWelcomeText] = useState<string>("");
  const [cookies] = useCookies(["uuid"]);

  const [userPoint, setUserPoint] = useState<number>();
  useEffect(() => {
    if (cookies.uuid) setLoginCheck(true);

    //user의 보유 포인트를 받는 api 추가하기
    //setUserPoint
  }, [cookies.uuid]);

  useEffect(() => {
    const jsKey = "cd2447cf90f5929ed98bc599d51f323d";
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(jsKey);
      console.log(window.Kakao.isInitialized());
    }
  }, []);

  const kakaoLogin = () => {
    localStorage.setItem("link", "/");
    if (!window.Kakao.isInitialized()) return;
    //console.log(window.Kakao.Auth);
    window.Kakao.Auth.authorize({
      //redirectUri: `https://readme.life/kakao`,
      redirectUri: `http://localhost:3000/kakao`,
    });
  };

  return (
    <>
      {isOpen && (
        <div className={style.container}>
          <div className={style.blackContainer} onClick={handleClose}></div>
          <div className={style.menuList}>
            <div className={style.menuListHeader} onClick={handleClose}>
              <Image
                src="/assets/images/icons/close.svg"
                alt="logo"
                width={50}
                height={50}
                priority
              />
            </div>
            {loginCheck ? (
              <div className={style.menuListInfo}>
                <div className={style.mainInfoTitle}>
                  <p className={style.mainWelcomeTitle}>Welcome !</p>
                  <p className={style.subInfoTitle}>
                    ReadMe에 오신것을 <br />
                    환영합니다!
                  </p>
                  <div className={style.pointContainer}>
                    <p>잔여 포인트 : 10,000p</p>
                    <div className={style.pointBtn}>+충전</div>
                  </div>
                </div>
                <SlideWebViewList />
              </div>
            ) : (
              <div className={style.menuListInfo}>
                <div className={style.mainTitle}>
                  <p>
                    다양한 서비스를
                    <br /> 이용하고 싶으시다면
                    <br /> 로그인을 해주세요
                  </p>
                  <div className={style.kakaoLoginBtn}>
                    <Image
                      src="/assets/images/kakaoLogin.png"
                      alt="kakaologin"
                      width={250}
                      height={50}
                      onClick={kakaoLogin}
                    />
                  </div>
                </div>
                <SlideWebViewList />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
