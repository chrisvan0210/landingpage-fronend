import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { FormLogin } from "../styled-page/global";
import { useRouter } from "next/router";
import {setCookie} from 'nookies'
interface AddedType {
    username:string;
    password:string;
  }
  

function login() {
  const [form] = Form.useForm();
  const router = useRouter();
  

  const onFinish = async (values:AddedType) => {
    if (values) {
      const result = await fetch("/api/login",{
        method: "POST",
        body:JSON.stringify(values) 
      })
      let data = await result.json();
      let expires = new Date();

    
      data.expires = expires.getTime();
      console.log("result",data);
      data = JSON.stringify(data);
      setCookie(null, 'auth', data, {
        maxAge: 60 * 60,
        path: '/',
      })
    }
    form.resetFields();
    message.info('Logged');
    router.push("/")
  }

  
  return (
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
          rules={[{ required: true, message: "Please input your domain url!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </FormLogin>
  );
}

export default login;
