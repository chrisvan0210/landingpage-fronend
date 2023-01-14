import React from 'react'

interface RecordType {
    record :{
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
}

function SubTable({record}:RecordType) {
  return (
    <div>{record.title}</div>
  )
}

export default SubTable