import React, { useEffect, useState } from "react";
import style from "@/components/pages/library/LibraryTop.module.css";
import { mybookMenu } from "@/datas/staticData";
import { useRouter } from "next/router";
export default function LibraryTop() {
  const router = useRouter();
  const { id } = router.query;
  const selectmenuHandler = (index: number) => {
    router.push(`/library?id=${index}`);
  };

  const [userNickname, setUserNickname] = useState<string>();
  useEffect(() => {
    const nickname = localStorage.getItem("nickname") || undefined;
    setUserNickname(nickname);
  }, []);

  return (
    <div className={style.libraryTopWrap}>
      <h1>
        <span className={style.userName}>{userNickname}의 서재</span>
      </h1>
      <ul className={style.menu}>
        {mybookMenu.map((item) => (
          <li
            key={item.id}
            onClick={() => selectmenuHandler(item.id)}
            className={`${
              item.id === Number(id) ? style.titlecative : style.title
            }`}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
