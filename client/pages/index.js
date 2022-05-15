import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Router from 'next/router'

export default function Home() {
   const [res, setRes] = useState(null)
   const [resStatus, setResStatus] = useState(null)
   useEffect(() => {
      const { pathname } = Router
      const fetchData = async () => {
         const res = await fetch('http://127.0.0.1:4000/dj/api/users/me', { method: 'GET', credentials: 'include' })
         console.log(res)
         const data = await res.json()
         setResStatus(res.status)
         setRes(data)
      }
      fetchData()
   }, [])
   useEffect(() => {
      if (resStatus === 403) Router.push(`/dj/accounts/login`)
   }, [resStatus])
   return (
      <div className={styles.container}>
         <Head>
            <title>Create Next App</title>
            <meta name='description' content='Generated by create next app' />
            <link rel='icon' href='/favicon.ico' />
         </Head>

         <main className={styles.main}>
            <p className={styles.description}>
               Get <code className={styles.code}>pages/index.js</code>
            </p>

            <div className={styles.grid}>
               <a href='https://nextjs.org/docs' className={styles.card}>
                  <h2> &rarr;</h2>
                  <p>Find in-depth information about Next.js features and API.</p>
               </a>

               <a href='https://nextjs.org/learn' className={styles.card}>
                  <h2>Learn &rarr;</h2>
                  <p>Learn about Next.js in an interactive course with quizzes!</p>
               </a>

               <a href='https://github.com/vercel/next.js/tree/canary/examples' className={styles.card}>
                  <h2>Examples &rarr;</h2>
                  <p>Discover and boilerplate example Next.js projects.</p>
               </a>

               <a
                  href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                  className={styles.card}
               >
                  <h2>Deploy &rarr;</h2>
                  <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
               </a>
            </div>
         </main>

         <footer className={styles.footer}>
            <a
               href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
               target='_blank'
               rel='noopener noreferrer'
            >
               <span className={styles.logo}>
                  <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
               </span>
            </a>
         </footer>
      </div>
   )
}

export async function getServerSideProps(context) {
   // const res = await fetch('http://127.0.0.1:4000/dj/api/users/me', { method: 'GET', credentials: 'include' })
   // const data = await res.json()

   return { props: {} }
}
