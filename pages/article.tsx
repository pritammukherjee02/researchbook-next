import Head from 'next/head'
import React from 'react'
import Recommended from '../components/ArticleComponents/Recommended'
import UserInfo from '../components/ArticleComponents/UserInfo'
import Header from '../components/Header'
import ArticleCard from '../components/MainContentComponents/ArticleCard'

function Article() {
  return (
    <div>
        <Head>
            <title>How and why is the demonlord so menacing? | Researchbook</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className='h-screen'>
            <Header home={false} />

            <div className='lg:px-5 mt-5 mb-3 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between h-screen gap-2'>
                <div className='w-full h-full lg:w-8/12 pb-5'>
                    <h1 className="text-3xl pt-4 font-bold w-11/12 lg:w-10/12 mx-auto">How and why is the demonlord so menacing?</h1>
                    <h2 className='text-2xl pt-1 font-light w-11/12 lg:w-10/12 mx-auto opacity-50'>Demonlord's pursuits</h2>

                    <p className='text-xl pt-8 w-11/12 lg:w-10/12 mx-auto leading-relaxed font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem asperiores facere id est adipisci nesciunt totam odit, cum dolores non ipsam aut eius similique repudiandae assumenda. Non asperiores ipsum consequuntur officiis. Voluptas placeat vel similique sapiente quasi dolorum, cum nostrum, perferendis veniam quibusdam doloribus, dolorem aperiam suscipit temporibus iste? Consectetur hic saepe cupiditate qui accusantium corporis? Sunt in dolorum esse obcaecati, consequuntur aliquid natus eum quis doloremque quibusdam vel praesentium corporis quasi non facilis quia possimus. Iste exercitationem amet cumque ab, illum, et quaerat enim asperiores excepturi rerum quos aspernatur veritatis ducimus ipsam soluta corrupti deleniti quisquam autem deserunt earum.</p>

                    <div className='w-full lg:w-10/12 mx-auto bg-slate-50 mt-16 pt-4'>
                        <ArticleCard title='How to nuke a country effectively?' description='You have to be vigilant about prying eyes when it comes to nuking...' author='Demonlord' date='14 Feb, 22' />    
                        <ArticleCard title='Nuking heaven is the best thing that will happen to us' description='It has been a while since the heaven has been nuked. Those gods need to be fucked...' author='Minion of demonlord' date='15 Feb, 22' />    
                    </div>                   
                </div>

                <div className='hidden h-min lg:block lg:w-4/12 border-l-2'>
                    <div className='pt-4 w-11/12 lg:w-10/12 mx-auto'>
                        <UserInfo />
                        <Recommended />
                        <div className='my-8 mb-4 w-11/12'>
                            <p className='text-sm opacity-50'>Researchbook | Massive information network</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Article