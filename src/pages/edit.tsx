import React, { useEffect, useState, useMemo} from "react";
import { useRouter } from "next/router";
import { DataType } from "../models/landingType";
import { Button, Form, Input,message } from "antd";
import { DoubleLeftOutlined  } from '@ant-design/icons';
import { FormContainer } from "../styled-page/global";
import withAuth from "../HOC/auth"
var baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";

export type FieldData = DataType | undefined;

function edit() {
  const [landing, setLanding] = useState<DataType>();
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const [form] = Form.useForm();
  const { id } = router.query;
  //   const [form] = Form.useForm();

  useEffect(() => {
    landingDetails();
  }, [id]);

  const landingDetails = async () => {
   
    try {
      await fetch("http://localhost:5000/api/getldp?id=" + id, {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          delete data.createdAt;
          delete data.updatedAt;
          setLanding(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 24 },
  };
  
  const makeInitValue = useMemo(
    ()=>{
      let initValue: any = [];
      if (landing) {
        let arrayKeys = Object.keys(landing);
        let arrayValues = Object.values(landing);
        for (let i = 0; i < arrayKeys.length; i++) {
          let accObject = {
            name: [arrayKeys[i]],
            value: arrayValues[i],
          };
          initValue.push(accObject);
        }
      }
      return initValue;
    },[landing])

  const onFinish = async (values: DataType) => {
    setLoading(true)
    if (values.id) {
      try {
        const result = await fetch("http://localhost:5000/api/updateldp-admin", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(values),
        });
        let data = await result.json();
        delete data.createdAt;
        delete data.updatedAt;
        setLanding(data);
        message.success("Update Successfully!")
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false)
  };
  return (
    <FormContainer>
        <div className="edit_header">
            <Button type="primary" onClick={()=>router.push("/")}><DoubleLeftOutlined />Home Page</Button>
        </div>
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        fields={makeInitValue}
      >
        <Form.Item name="id" label="id" hidden={true}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="url" label="Url">
          <Input />
        </Form.Item>
        <Form.Item name="keyword" label="keyword">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="analytics" label="analytics">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="affid" label="affid">
          <Input />
        </Form.Item>
        <Form.Item name="facebookcode" label="facebookcode">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="noscript" label="noscript">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="mainurl" label="mainurl">
          <Input />
        </Form.Item>
        <Form.Item name="redirect" label="redirect">
          <Input />
        </Form.Item>
        <Form.Item name="h1" label="h1">
          <Input />
        </Form.Item>
        <Form.Item name="h2" label="h2">
          <Input />
        </Form.Item>
        <Form.Item name="button1" label="button1">
          <Input />
        </Form.Item>
        <Form.Item name="button2" label="button2">
          <Input />
        </Form.Item>
        <Form.Item name="button3" label="button3">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
}

export default withAuth(edit);
