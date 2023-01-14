import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Space, Table, Tag } from 'antd';
import type { ColumnsType ,TableProps} from 'antd/es/table';

import SubTable from "./SubTable";


type Data = {
  data:any
};
interface DataType {
  id: number;
  title: string;
  url: string;
  keyword: string;
  analytics: string;
  affid: string;
  facebookcode: string;
  noscript: string;
  mainurl: string;
  redirect: string;
  h1: string;
  h2: string;
  button1: string;
  button2: string;
  button3: string;
  createdAt:string
}


const columns: ColumnsType<DataType> = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    sorter: (a : {id:number}, b :{id:number}) => a.id - b.id,
  },
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'url',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'keyword',
    dataIndex: 'keyword',
    key: 'keyword',
  },
  {
    title: 'analytics',
    dataIndex: 'analytics',
    key: 'analytics',
  },
  {
    title: 'affid',
    dataIndex: 'affid',
    key: 'affid',
  },
  {
    title: 'facebookcode',
    dataIndex: 'facebookcode',
    key: 'facebookcode',
  },
  {
    title: 'noscript',
    dataIndex: 'noscript',
    key: 'noscript',
  },
  {
    title: 'mainurl',
    dataIndex: 'mainurl',
    key: 'mainurl',
  },
  {
    title: 'redirect',
    dataIndex: 'redirect',
    key: 'redirect',
  },
  {
    title: 'h1',
    dataIndex: 'h1',
    key: 'h1',
  },
  {
    title: 'h2',
    dataIndex: 'h2',
    key: 'h2',
  },
  {
    title: 'button1',
    dataIndex: 'button1',
    key: 'button1',
  },
  {
    title: 'button2',
    dataIndex: 'button2',
    key: 'button2',
  },
  {
    title: 'button3',
    dataIndex: 'button3',
    key: 'button3',
  },
]

function MainTable({data}:Data) {

  const dataWithKeys = data.map((item:any,index : number) => {
    item.key = index;
    return item;
  }) 
  console.log(dataWithKeys)
  const dataTable : DataType[] = dataWithKeys;
  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      <div>MainTable</div>
      <Table
        columns={columns}
        dataSource={dataTable}
        bordered
        pagination={{
          total: data.length,
          pageSize: 5,
        }}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}><SubTable record = {record}/></p>,
        }}
      />
    </div>
  );
}


export default MainTable;
