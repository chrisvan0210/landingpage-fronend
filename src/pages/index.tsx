import Head from 'next/head'
import { GetServerSideProps } from "next";
import { useEffect, useState, } from 'react';
import { useRouter } from "next/router";

import { DataParent,DataType} from '@/models/landingType'
import styles from '../styles/Home.module.css'
import MainTable from '@/components/MainTable'
import ErrorPage from './errorpage'


const Home = ({data}: DataParent)  =>{
  const [user,setUser] = useState(false);
  const router = useRouter();
 
  useEffect(()=>{
    if(!user) router.push("/login")
  },[])
 
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {user &&  <MainTable data={data}/>}
      </main>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  try{
    const res = await fetch("http://localhost:5000/api/getldp");
    const data : Array<DataType> = await res.json();
    return {
      props: {
        data:data,
      },
    };
  }catch(error){
    return { props: {
      data : null
    }};
  }
};

