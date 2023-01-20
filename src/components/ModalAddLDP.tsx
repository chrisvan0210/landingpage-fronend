import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button ,message} from "antd";


interface PropsType {
  getTable: Function;
}
interface AddedType {
  title:string;
  url:string;
}

const ModalAddLDP = (props:PropsType) =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handletoggleModal =() => {
    setIsModalOpen(prev => !prev)
  }
  const onFinish = async (values:AddedType) => {
    setLoading(true)
    if (values) {
      try {
        await fetch("http://localhost:5000/api/addldp", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
            setIsModalOpen(false)
            props.getTable();
          });
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false)
    form.resetFields();
    message.success('Successfully added!');
  }

  return (
    <div>
      <Button type="primary" onClick={handletoggleModal}>Add New</Button>
      <Modal title="Create new landing page" open={isModalOpen} footer={null} onCancel={handleCancel}>
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 24 }} onFinish={onFinish}>
          <Form.Item
            label="Domain Name"
            name="title"
            rules={[
              { required: true, message: "Please input your domain name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Domain Url"
            name="url"
            rules={[
              { required: true, message: "Please input your domain url!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalAddLDP;
