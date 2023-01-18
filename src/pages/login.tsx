import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { FormLogin } from "../styled-page/global";
import {UserContext} from "../Provider/MyProvider"
import { useRouter } from "next/router";

interface AddedType {
    username:string;
    password:string;
  }
  

function login() {
  const [form] = Form.useForm();
  const router = useRouter();
  const {user,setUser} = useContext(UserContext);
  const [stateUSer,setStateUser] = useState(null)
  

  useEffect(()=>{
    console.log("user",user)
    setStateUser(user)
    if(stateUSer) router.push("/")
  },[])
  const onFinish = async (values:AddedType) => {
    if (values) {
      try {
        await fetch("http://localhost:5000/api/login", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.user)
            setUser(data.user);
            localStorage.setItem("user",JSON.stringify(data.user))
          });
      } catch (err) {
        console.log(err);
      }
    }
    form.resetFields();
    message.info('Logged');
  }

  
  return (
    <FormLogin>
        {JSON.stringify(stateUSer,null,4)}
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
