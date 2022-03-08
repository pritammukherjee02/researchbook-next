import Head from 'next/head'
import Image from 'next/image'
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

            <div className='lg:px-5 mt-5 mb-3 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between h-screen relative gap-2'>
                <div className='w-full h-full lg:w-8/12 pb-5'>
                    <div className='flex w-11/12 lg:w-10/12 mx-auto mt-8'>
                        <div className='ml-2 border my-auto border-blue-500 rounded-full h-14 w-14'></div>
                        <div className='flex flex-col pl-5 my-auto justify-between'>
                            <div className='flex items-center'>
                                <p className='text-lg'>D Maxwell</p>
                                <button className='px-3 py-1 ml-3 text-sm lg:hidden bg-blue-500 hover:bg-blue-600 text-white rounded-full'>Follow</button>
                            </div>
                            <p className='text-sm opacity-60'>20 Feb, 22</p>
                        </div>
                    </div>

                    <h1 className="text-3xl pt-8 font-bold w-11/12 lg:w-10/12 mx-auto">How and why is the demonlord so menacing?</h1>
                    <h2 className='text-2xl pt-1 font-light w-11/12 lg:w-10/12 mx-auto opacity-50'>Demonlord's pursuits</h2>

                    <div className='mt-8 w-full mx-auto'>
                        <Image src={'https://images.unsplash.com/photo-1448772917253-74bbbe249b30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'} className="object-contain inline mx-auto mt-24" width={850} height={478} />
                    </div>

                    <p className='text-xl pt-8 w-11/12 lg:w-10/12 mx-auto leading-relaxed font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem asperiores facere id est adipisci nesciunt totam odit, cum dolores non ipsam aut eius similique repudiandae assumenda. Non asperiores ipsum consequuntur officiis. Voluptas placeat vel similique sapiente quasi dolorum, cum nostrum, perferendis veniam quibusdam doloribus, dolorem aperiam suscipit temporibus iste? Consectetur hic saepe cupiditate qui accusantium corporis? Sunt in dolorum esse obcaecati, consequuntur aliquid natus eum quis doloremque quibusdam vel praesentium corporis quasi non facilis quia possimus. Iste exercitationem amet cumque ab, illum, et quaerat enim asperiores excepturi rerum quos aspernatur veritatis ducimus ipsam soluta corrupti deleniti quisquam autem deserunt earum.</p>

                    <div className='w-full lg:w-10/12 mx-auto bg-slate-50 mt-16 pt-4'>
                        <ArticleCard title='How to nuke a country effectively?' description='You have to be vigilant about prying eyes when it comes to nuking...' author='Demonlord' date='14 Feb, 22' />    
                        <ArticleCard title='Nuking heaven is the best thing that will happen to us' description='It has been a while since the heaven has been nuked. Those gods need to be fucked...' author='Minion of demonlord' date='15 Feb, 22' />    
                    </div>                   
                </div>

                <div className='hidden h-min lg:block lg:w-4/12 border-l-2 sticky bottom-0'>
                    <div className='pt-4 w-11/12 lg:w-10/12 mx-auto'>
                        <UserInfo />
                        <Recommended />
                        <div className='my-8 mb-4 w-11/12'>
                            <p className='text-sm opacity-50'>ResearchBook | Massive information network</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Article