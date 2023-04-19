import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'


function Home() {
  return (
    <>
  test
    </>
  )
}
export async function getServerSideProps(context) {


  if (true) {
    return {
      redirect: {
        destination: '/gb/',
        permanent: false,
      },
    }
  }

  const data = {
      test: "hello"
  }

  // Pass data to the page via props
  return { props: { data } }
}

export default Home