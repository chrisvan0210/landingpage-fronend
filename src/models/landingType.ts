
export interface DataParent {
    data: Array<DataType>
  }

export interface DataType {
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
    createdAt: string;
}

export interface AdminTblItem {
    id: number;
    title: string;
    url: string;
    key:string;
  }
