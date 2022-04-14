import React from 'react'
import Head from 'next/head'

//components
import Header from '../components/Header'
import AppBar from '../components/AppBar'

function Readlist() {
  return (
    <div className='flex flex-col gap-14'>
        <Head>
            <title>Your Readlist | Researchbook</title>
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