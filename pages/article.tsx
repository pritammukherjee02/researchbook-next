import Head from 'next/head'
import React from 'react'
import Header from '../components/Header'

function Article() {
  return (
    <div>
        <Head>
            <title>ResearchBook</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className='h-screen'>
            <Header />

            <div className='lg:px-5 mt-5 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between h-screen gap-2'>
                <div className='w-full h-screen lg:w-8/12'>
                    <h1 className="text-3xl pt-4 font-bold w-11/12 lg:w-10/12 mx-auto">How and why is the demonlord so menacing?</h1>
                    <h2 className='text-2xl pt-1 font-light w-11/12 lg:w-10/12 mx-auto opacity-50'>Demonlord's persuits</h2>

                    <p className='text-xl pt-8 w-11/12 lg:w-10/12 mx-auto leading-relaxed font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem asperiores facere id est adipisci nesciunt totam odit, cum dolores non ipsam aut eius similique repudiandae assumenda. Non asperiores ipsum consequuntur officiis. Voluptas placeat vel similique sapiente quasi dolorum, cum nostrum, perferendis veniam quibusdam doloribus, dolorem aperiam suscipit temporibus iste? Consectetur hic saepe cupiditate qui accusantium corporis? Sunt in dolorum esse obcaecati, consequuntur aliquid natus eum quis doloremque quibusdam vel praesentium corporis quasi non facilis quia possimus. Iste exercitationem amet cumque ab, illum, et quaerat enim asperiores excepturi rerum quos aspernatur veritatis ducimus ipsam soluta corrupti deleniti quisquam autem deserunt earum.</p>                   
                </div>

                <div className='hidden lg:block lg:w-4/12'>
                    <div className='pt-4 w-11/12 lg:w-10/12 mx-auto'>
                        Author details and more to read
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Article