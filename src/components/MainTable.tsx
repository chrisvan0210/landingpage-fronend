import React, { useState, useEffect,useContext } from "react";
import { useRouter } from "next/router";
import { Button, Table, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";

import { AdminTblItem, DataParent } from "../models/landingType";
import AddNewModal from "./ModalAddLDP";
import { TotalWrapper, ButtonWrapper } from "./styled";

var baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";

function MainTable({ data }: DataParent) {
  const [tableData, setTableData] = useState(data);
  const router = useRouter();


  const getTable = async () => {
    const res = await fetch("http://localhost:5000/api/getldp");
    const data = await res.json();
    setTableData(data);
  };
  const handleEdit = async (id: number) => {
    // let editLDP = tableData.filter(item=> item.id === id)[0];
    router.push({
      pathname: "/edit",
      query: { id: id },
    });
  };
  const handleDelete = async (id: number) => {
    try {
      let response = await fetch(baseUrl + "api/deleteldp", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        // mode : "no-cors",
        body: JSON.stringify({ id: id }),
      }).then((res) => {
        getTable();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const totalRow = () => {
    return (
      <TotalWrapper>
        <div>Total:</div>
        <div>{tableData?.length}</div>
      </TotalWrapper>
    );
  };
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
      render: (_: any, record: AdminTblItem) => {
        return (
          <a href={record.url} target="_blank">
            {record.url}
          </a>
        );
      },
    },
    {
      title: totalRow(),
      dataIndex: "action",
      width: "15%",
      render: (_: any, record: AdminTblItem) => {
        return (
          <ButtonWrapper>
            <Button type="primary" onClick={() => handleEdit(record.id)} size="small">
              Edit
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="primary" danger size="small">
                Delete
              </Button>
            </Popconfirm>
          </ButtonWrapper>
        );
      },
    },
  ];

  const dataWithKeys = tableData?.map((item: any, index: number) => {
    item.key = index;
    return item;
  });

  /* This will only get columns that need to show */
  // const dataAdminTable = dataWithKeys?.reduce((acc, item) => {
  //   let newItem = {} as AdminTblItem;
  //   newItem.id = item.id;
  //   newItem.title = item.title;
  //   newItem.url = item.url;
  //   newItem.key = item.key;
  //   acc.push(newItem);
  //   return acc;
  // }, [] as Array<object>);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button type="dashed" size='large' style={{backgroundColor:"yellow",fontWeight:"bold"}}>LANDING PAGES</Button>
        <AddNewModal getTable={getTable} />
      </div>
      <Table
        columns={columnsAdminTbl}
        dataSource={dataWithKeys}
        bordered
        pagination={{
          total: tableData?.length - 1,
          pageSize: 10,
        }}
      />
    </div>
  );
}

export default MainTable;
