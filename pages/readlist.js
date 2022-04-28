import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { getSession } from 'next-auth/react'

//components
import Header from '../components/Header'
import AppBar from '../components/AppBar'

function Readlist({ session }) {
  useEffect(() => {
    if (!session) {
      Router.push('/login/readlist')
    }
    }, [])

    console.log(session)


  return (
    <div className='flex flex-col gap-14'>
        <Head>
            <title>My Readlist | Researchbook</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className='pb-14'>
            <Header page='readlist' searchProp='' />

            <div className='lg:px-5 mt-5 mb-3 max-w-7xl mx-auto flex flex-col justify-between gap-2'>
                <p className='text-sm font-light p-5 opacity-70'>You have nothing in your Readlist yet</p>
            </div>

        </main>

        <AppBar />
    </div>
  )
}

export default Readlist

export async function getServerSideProps(context) {
  //GET THE USER
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}