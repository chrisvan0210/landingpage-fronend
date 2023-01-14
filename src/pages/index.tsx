import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";


import styles from '../styles/Home.module.css'
import MainTable from '@/components/MainTable'

const inter = Inter({ subsets: ['latin'] })


type Data = {
  data:Response
};
export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <MainTable data={data.data}/>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
  context
) => {
  const res = await fetch("http://localhost:5000/api/landingpage");
  const data: Data = await res.json();

  return {
    props: {
      data,
    },
  };
};
