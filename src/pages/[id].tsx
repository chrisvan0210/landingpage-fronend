import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { DataType } from "../models/landingType";
import { Button, Form, Input, message } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { FormContainer } from "../styled-page/global";
import withAuth from "../HOC/WithAuth";
import { GetServerSideProps, GetStaticProps, GetStaticPaths } from "next";
var baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";

export type FieldData = DataType | undefined;

function AnyEdit({ data }: {data:DataType}) {
  const [landing, setLanding] = useState<DataType>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const { id } = router.query;
  //   const [form] = Form.useForm();

  useEffect(() => {
    if (!data || data === null) {
      // landingDetails();
    } else if (data.createdAt && data.updatedAt) {
      delete data.createdAt;
      delete data.updatedAt;
      setLanding(data);
    }
  }, []);
  const landingDetails = async () => {
    try {
      let res = await fetch("http://localhost:5000/api/getldp?id=" + id, {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      });
      let data = await res.json();
      delete data.createdAt;
      delete data.updatedAt;

      setLanding(data);
    } catch (err) {
      console.log(err);
    }
  };

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 24 },
  };

  const makeInitValue = useMemo(() => {
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
  }, [landing]);

  const onFinish = async (values: DataType) => {
    setLoading(true);
    if (values.id) {
      try {
        const result = await fetch(
          "http://localhost:5000/api/updateldp-admin",
          {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(values),
          }
        );
        let data = await result.json();
        delete data.createdAt;
        delete data.updatedAt;
        setLanding(data);
        message.success("Update Successfully!");
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false);
  };
  return (
    <FormContainer>
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

export default withAuth(AnyEdit);


export const getStaticPaths: GetStaticPaths<{id:string}> = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch("http://localhost:5000/api/getldp", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  const data = await res.json();
  
  // Get the paths we want to pre-render based on posts
  const paths = data.map((item:DataType) => ({
    params: { id: item.id?.toString()},
  }))
  return {
    // paths: [{params: { id: "43" }}],
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let id = context.params?.id;
  const res = await fetch("http://localhost:5000/api/getldp?id="+id, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  const data: DataType = await res.json();

  if (!data || data === null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
        // statusCode: 301
      },
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
};
