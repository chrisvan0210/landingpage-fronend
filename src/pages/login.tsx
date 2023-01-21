import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { FormLogin, LoginPage } from "../styled-page/global";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import userHook from "hooks/userHook";
interface AddedType {
  username: string;
  password: string;
}

function login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const { user } = userHook();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  const onFinish = async (values: AddedType) => {
    setLoading(true);
    
    if (values) {
      try {
        const result = await fetch("http://localhost:5000/api/login", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(values),
        });
        
        let data = await result.json();
        console.log(data)
        if (!data || data.error) {
          message.warning("Wrong username or password");
          setLoading(false);
          return;
        } else {
          let expires = new Date();
          data.expires = expires.getTime();
          data = JSON.stringify(data);
          setCookie(null, "authLDP", data, {
            maxAge: 60 * 60 * 10,
            path: "/",
          });
          router.push("/");
          message.success("Welcome back Admin");
        }
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false);
    form.resetFields();
  };

  return (
    <LoginPage>
      <FormLogin>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your domain name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your domain url!" },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </FormLogin>
    </LoginPage>
  );
}

export default login;
