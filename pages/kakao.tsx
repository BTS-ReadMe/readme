import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import style from "@/components/ui/Kakao.module.css";
import { SyncLoader } from "react-spinners";
import dayjs from "dayjs";

export default function Kakao() {
  const router = useRouter();
  const code = router.query.code;

  const [cookies, setCookie] = useCookies(["accessToken", "uuid"]);

  useEffect(() => {
    if (code !== undefined) {
      axios
        .post(
          `/users-service/v1/user/login?code=${code}`
        )
        .then((res) => {
          localStorage.setItem("nickname", res.data.data.nickname);
          localStorage.setItem("point", res.data.data.point);
          localStorage.setItem("profileImg", res.data.data.profileImg);
          localStorage.setItem("age", res.data.data.age_range);

          console.log("headers = ", res.headers);
          console.log("data = ", res.data);

          setCookie("accessToken", res.headers.accesstoken, {
            path: "/",
            expires: dayjs(res.headers.expiration).toDate(),
          });
          setCookie("uuid", res.headers.uuid, {
            path: "/",
            expires: dayjs(res.headers.expiration).toDate(),
          });

          const link = localStorage.getItem("link");
          if (link === null) {
            router.push("/");
          } else {
            router.push(link);
          }
        });
    }
  }, [code]);

  return (
    <div className={style.container}>
      <SyncLoader color="#6E48EB" />
    </div>
  );
}
