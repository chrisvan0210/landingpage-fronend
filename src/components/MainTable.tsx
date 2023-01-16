import React, { useState,useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Space, Table, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

import { DataType, AdminTblItem, DataParent } from "../models/landingType";
import SubTable from "./SubTable";

var baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";


function MainTable({data} : DataParent) {
  const [tableData,setTableData] = useState(data)
  const [isLoad,setIsLoad] = useState(false)

  useEffect(() => {
    const getTable = async() =>{
      const res = await fetch("http://localhost:5000/api/getldp");
      const data = await res.json();
      setTableData(data.data);
    }
    getTable();
    
  },[isLoad])
  const handleEdit = async (id:number) =>{
   
  }
  const handleDelete = async (id:number) =>{
    console.log("handleDelete",JSON.stringify({id:id}));
    try{
      let response = await fetch(baseUrl + "api/deleteldp",{
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        // mode : "no-cors",
        body: JSON.stringify({id:id})
      })
      .then((res) =>console.log("deleted",res))
      .then(()=> setIsLoad(prev => !prev));
    }
    catch(err){
      console.log(err);
    }
  }

  const columnsAdminTbl: ColumnsType<AdminTblItem> = [
    {
      title: "id",
      dataIndex: "id",
      width: "15%",
      key: "id",
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
    },
    {
      title: "title",
      dataIndex: "title",
      width: "35%",
      key: "title",
    },
    {
      title: "url",
      dataIndex: "url",
      width: "35%",
      key: "url",
    },
    {
      title: "action",
      dataIndex: "action",
      width: "15%",
      render: (_: any, record: AdminTblItem) => {
        return (
          <div>
            <button type="button" onClick={()=>handleEdit(record.id)}>Edit</button>
            <button type="button" onClick={()=>handleDelete(record.id)}>Delete</button>
          </div>
        );
      },
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "url",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "keyword",
      dataIndex: "keyword",
      key: "keyword",
    },
    {
      title: "analytics",
      dataIndex: "analytics",
      key: "analytics",
    },
    {
      title: "affid",
      dataIndex: "affid",
      key: "affid",
    },
    {
      title: "facebookcode",
      dataIndex: "facebookcode",
      key: "facebookcode",
    },
    {
      title: "noscript",
      dataIndex: "noscript",
      key: "noscript",
    },
    {
      title: "mainurl",
      dataIndex: "mainurl",
      key: "mainurl",
    },
    {
      title: "redirect",
      dataIndex: "redirect",
      key: "redirect",
    },
    {
      title: "h1",
      dataIndex: "h1",
      key: "h1",
    },
    {
      title: "h2",
      dataIndex: "h2",
      key: "h2",
    },
    {
      title: "button1",
      dataIndex: "button1",
      key: "button1",
    },
    {
      title: "button2",
      dataIndex: "button2",
      key: "button2",
    },
    {
      title: "button3",
      dataIndex: "button3",
      key: "button3",
    },
  ];
  const dataWithKeys = tableData.map((item: any, index: number) => {
    item.key = index;
    return item;
  });
  const dataAdminTable = dataWithKeys.reduce((acc, item) => {
    let newItem = {} as AdminTblItem;
    newItem.id = item.id;
    newItem.title = item.title;
    newItem.url = item.url;
    newItem.key = item.key;
    acc.push(newItem);
    return acc;
  }, [] as Array<object>);
  return (
    <div style={{ width: "100%" }}>
      <div>MainTable</div>
      <Table
        columns={columnsAdminTbl}
        dataSource={dataAdminTable}
        bordered
        pagination={{
          total: data.length-1,
          pageSize: 5,
        }}
        // expandable={{
        //   expandedRowRender: (record) => <p style={{ margin: 0 }}><SubTable record = {record}/></p>,
        // }}
      />
    </div>
  );
}

export default MainTable;
