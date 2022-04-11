import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

//Components
import Header from '../../components/Header'

function Profile() {
    const router = useRouter()
    const { userId } = router.query

    const name = 'D Maxwell'
    const followers = '1.1M'

    return (
        <div>
            <Head>
                <title>Profile | ResearchBook</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header home={false} searchProp='' />

            <div className='lg:px-5 lg:mt-5 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between relative'>
                
                <div className='w-full h-full lg:w-8/12 pb-5'>
                    {/* USER BANNER AND POSTS */}

                    <div className='h-40 lg:h-56 bg-blue-400 rounded-xl relative flex items-end'>
                        <div className='absolute rounded-full border-2 border-blue-600 bg-blue-100 h-28 w-28 lg:h-36 lg:w-36 translate-x-6 lg:translate-x-12 translate-y-1/2'></div>
                        <div className='relative flex flex-col lg:flex-row items-center lg:gap-2 text-lg pl-36 lg:pl-52 -translate-y-1/4 lg:-translate-y-1/2 text-white'>
                            <span className='text-2xl font-semibold'>{name}</span>
                            <span> {followers} Followers</span>
                        </div>
                        <button className='px-6 py-3 mt-4 text-md absolute right-6 bottom-24 lg:bottom-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full'>FOLLOW</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Profile