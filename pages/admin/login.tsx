import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import style from "@/components/pages/admin/Login.module.css";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "@/configs/axiosConfig";

export default function Login() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "uuid",
  ]);

  const onFinish = (values: any) => {
    const adminId = values.userId;
    const adminPassword = values.password;
    LoginHandle(adminId, adminPassword);
  };

  const LoginHandle = async (adminId: string, adminPassword: string) => {
    try {
      const res = await axios.post(`/users-service/v1/admin/login`, {
        id: adminId,
        password: adminPassword,
      });
      removeCookie("uuid", { path: "/" });
      localStorage.clear();
      setCookie("accessToken", res.headers.accesstoken, {
        path: "/",
      });
      localStorage.setItem("nickname", res.data.data.nickname);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.headers.accesstoken}`;

      router.push("/admin/main");
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div className={style.container}>
      <Image
        src="/assets/images/logo.svg"
        alt="logo"
        width={180}
        height={100}
      />
      <Form
        name="normal_login"
        className={style.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userId"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="UserId"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={style.loginFormButton}
          >
            Admin Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
