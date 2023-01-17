import React, { useState,useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from 'next/router'
import { Space, Table, Tag,Modal } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

import { DataType, AdminTblItem, DataParent } from "../models/landingType";
import AddNewModal from "./AddNewModal"

var baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";


function MainTable({data} : DataParent) {
  const [tableData,setTableData] = useState(data)
  const [isLoad,setIsLoad] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  const getTable = async() =>{
    const res = await fetch("http://localhost:5000/api/getldp");
    const data = await res.json();
    setTableData(data);
  }
  const handleEdit = async (id:number) =>{
      // let editLDP = tableData.filter(item=> item.id === id)[0];
      router.push({
        pathname:'/edit',
        query : {id:id},
      });
  }
  const handleDelete = async (id:number) =>{
    try{
      let response = await fetch(baseUrl + "api/deleteldp",{
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        // mode : "no-cors",
        body: JSON.stringify({id:id})
      })
      .then((res) =>{
        getTable();
      })
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

  const dataWithKeys = tableData?.map((item: any, index: number) => {
    item.key = index;
    return item;
  });
  const dataAdminTable = dataWithKeys?.reduce((acc, item) => {
    let newItem = {} as AdminTblItem;
    newItem.id = item.id;
    newItem.title = item.title;
    newItem.url = item.url;
    newItem.key = item.key;
    acc.push(newItem);
    return acc;
  }, [] as Array<object>);

  console.log("1",isOpen)
  return (
    <div style={{ width: "100%" }}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <div>MainTable</div>
        <div>
          <button onClick={()=>setIsOpen(true)}>Add New</button>
        </div>
      </div>
      <Table
        columns={columnsAdminTbl}
        dataSource={dataAdminTable}
        bordered
        pagination={{
          total: tableData.length-1,
          pageSize: 5,
        }}
        // expandable={{
        //   expandedRowRender: (record) => <p style={{ margin: 0 }}><SubTable record = {record}/></p>,
        // }}
      />
      <AddNewModal isOpen={isOpen}/>
    </div>
  );
}

export default MainTable;
