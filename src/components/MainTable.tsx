import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { Button, Table, Popconfirm, Input, Space, InputRef } from "antd";
import type { ColumnsType } from "antd/es/table";

import { AdminTblItem, DataParent } from "../models/landingType";
import AddNewModal from "./ModalAddLDP";
import { TotalWrapper, ButtonWrapper, MainTableWrapper } from "./styled";
import userHook from "hooks/userHook";
import { SearchOutlined } from "@ant-design/icons";

var baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";

function MainTable({ data }: DataParent) {
  const [tableData, setTableData] = useState(data);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const { user } = userHook();
  const searchInput = useRef<InputRef>(null);

  const getTable = async () => {
    const res = await fetch("http://localhost:5000/api/getldp");
    const data = await res.json();
    setTableData(data);
  };
  const handleEdit = async (id: number) => {
    // let editLDP = tableData.filter(item=> item.id === id)[0];
    if (!user) {
      alert("pls login first");
      return;
    }
    router.push({
      pathname: "/edit",
      query: { id: id },
    });
  };
  const handleDelete = async (id: number) => {
    if (!user) {
      alert("pls login first");
      return;
    }
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

  useEffect(() => {
    searchInput.current?.focus();
    if(!data){
      setLoading(true)
    }else{
      setLoading(false)
    }
  }, [visible]);

  const FilterByNameInput = (
    <div className="search-title">
      {visible ? (
        <Input
          placeholder="Title"
          value={search}
          ref={searchInput}
          onBlur={()=>setVisible(prev=>!prev)}
          onChange={(e) => {
            const currValue = e.target.value;
            setSearch(currValue);
            const filteredData = data.filter((entry) =>
              entry.title?.includes(currValue)
            );
            setTableData(filteredData);
          }}
        />
      ) : (
        <>
          <div>Title</div>
          <SearchOutlined onClick={()=>setVisible((prev) => !prev)} />
        </>
      )}
    </div>
  );

  const columnsAdminTbl: ColumnsType<AdminTblItem> = [
    {
      title: "ID",
      dataIndex: "id",
      width: "12%",
      key: "id",
      fixed: 'left',
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
    },
    {
      title: FilterByNameInput,
      dataIndex: "title",
      width: "35%",
      key: "title",
    },
    {
      title: "URL",
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
      width: "130px",
      render: (_: any, record: AdminTblItem) => {
        return (
          <ButtonWrapper>
            <Button
              type="primary"
              onClick={() => handleEdit(record.id)}
              size="small"
            >
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
    <MainTableWrapper>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="dashed"
          size="large"
          style={{ backgroundColor: "yellow", fontWeight: "bold" }}
        >
          LANDING PAGES
        </Button>
        <AddNewModal getTable={getTable} />
      </div>
      <Table
      scroll={{ x: 700 }}
        columns={columnsAdminTbl}
        dataSource={dataWithKeys}
        bordered
        loading={loading}
        pagination={{
          total: tableData?.length - 1,
          pageSize: 10,
        }}
      />
    </MainTableWrapper>
  );
}

export default MainTable;
