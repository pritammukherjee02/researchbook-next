import Head from 'next/head'
import React from 'react'
import UserInfo from '../components/ArticleComponents/UserInfo'
import Header from '../components/Header'

function Create() {
  return (
    <div>
        <Head>
            <title>ResearchBook Editor</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className='h-screen'>
            <Header home={false} />

              <div className='lg:px-5 mt-5 mb-3 max-w-7xl mx-auto'>
                <div className='flex'>

                  <div className='flex flex-col w-full h-full lg:w-8/12 pb-5'>
                    <input type="text" name='title' className='p-2 text-3xl font-bold w-full lg:w-8/12 mb-1' placeholder='Title...' />
                    <input type="text" name='subtitle' className='p-2 text-2xl font-light opacity-50 w-full lg:w-8/12 mb-5' placeholder='Sub-title...' />

                  </div>

                  <div className='hidden h-min lg:block lg:w-4/12 border-l-2 sticky bottom-0'>
                    <UserInfo />
                  </div>

                </div>
              </div>
        
        </main>

    </div>
  )
}

export default Create