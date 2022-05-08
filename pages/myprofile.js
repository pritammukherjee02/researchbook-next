import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Image from 'next/image'

import { getSession } from 'next-auth/react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase'

//Components
import Header from '../components/Header'
import ArticleCard from '../components/MainContentComponents/ArticleCard'
import RecommendedArticleCard from '../components/ArticleComponents/RecommendedArticleCard'
import UserInformation from '../components/UserInformation'
import UserNotLoggedInInfo from '../components/UserNotLoggedInInfo'
import AppBar from '../components/AppBar'

function MyProfile({ session, articles }) {
    useEffect(() => {
        if (!session) {
          Router.push('/login/myprofile')
        }
    }, [])

    const [following, setFollowing] = useState(false)

    const userInfo = {
        uid: 1,
        name: 'James Anderson',
        fieldOfExpertise: 'Comp sci',
        jobDesignation: 'Research Fellow',
        username: '@janderson11',
        articles: 0,
        followers: 2,
        following: 98
    }

    const name = session ? session.user.name : 'Your name'
    const followers = '0'
    const bio = "Bio"
    /*
    let articles = [
        {title: 'God is dead', description: 'And we killed him. You and I', author: 'D Maxwell', date: '12 Apr, 22'},
        {title: 'Don\'t walk in front of me', description: 'I may not follow. Don\'t walk behind me… I may not lead. Walk beside me… just be my friend', author: 'D Maxwell', date: '15 Apr, 22'},
        {title: 'You will never be happy', description: 'if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life', author: 'D Maxwell', date: '24 Apr, 22'},
    ]
    */

    const articlesMarkup = articles.map((article, index) => {
        return <ArticleCard key={index} uid={article.uid} title={article.title} thumbnailLink={article.thumbnailLink} description={article.description} author={article.author} date={article.date} />
    })

    const toggleFollowing = () => {
        if(following) setFollowing(false)
        else setFollowing(true)
    }

    const userInformationMarkup = session ? (<UserInformation page='myprofile' session={session} userInfo={userInfo} />) : (<UserNotLoggedInInfo page='myprofile' />)

    return (
        <div>
            <Head>
                <title>Profile | ResearchBook</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header home={false} searchProp='' />

            <div className='lg:px-5 lg:mt-5 pb-14 lg:pb-0 max-w-7xl mx-auto gap-3 flex flex-col lg:flex-row justify-between relative'>
                
                <div className='w-full hidden lg:flex lg:w-2/12'>
                    {userInformationMarkup}
                </div>
                
                <div className='w-full h-full lg:w-7/12 pb-5'>
                    {/* USER BANNER AND POSTS */}

                    <div className='h-40 lg:h-52 lg:rounded-xl relative flex items-end'>
                        <Image src='https://images.unsplash.com/photo-1619760563678-02e23d15f69f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' className='object-cover lg:rounded-xl' layout='fill' />

                        <div className='absolute translate-x-6 lg:translate-x-12 translate-y-1/2'>
                            <Image src={session ? session.user.image : 'https://images.unsplash.com/bruh'} className="object-contain border-2 border-blue-600 rounded-full h-28 w-28 lg:h-34 lg:w-34" width={112} height={112} layout='fixed' objectFit='cover' />
                        </div>
                        <div className='relative flex flex-col lg:flex-row lg:items-center lg:gap-2 text-lg pl-36 lg:pl-48 -translate-y-1/4 lg:-translate-y-1/2 text-white'>
                            <span className='text-2xl font-semibold'>{name}</span>
                            <span> {followers} Followers</span>
                        </div>
                        <button onClick={toggleFollowing} className={'px-6 py-3 lg:px-5 lg:py-2 mt-4 text-md lg:text-sm absolute right-6 bottom-24 lg:bottom-3 text-white rounded-full transition-all ' + (following ? 'bg-gray-700 hover:bg-gray-900' : 'bg-blue-500 hover:bg-blue-600')}>{following ? 'FOLLOWING' : 'FOLLOW'}</button>
                    </div>

                    <div className='lg:hidden p-3 mt-16 bg-gray-100 rounded-2xl w-11/12 mx-auto'>
                        <p className='text-md font-bold opacity-40'>About</p>
                        <p className='text-sm font-light'>{bio}</p>
                    </div>

                    <div className='lg:p-3 lg:mt-16'>
                        {/* ARTICLE CARDS BELONGING TO THE USER */}

                        {articlesMarkup}
                    </div>
                </div>

                <div className='hidden lg:w-3/12 lg:inline-flex flex-col'>
                    {/* SIDE PANE FOR BIO AND MORE */}

                    <div className='p-3 bg-gray-100 rounded-2xl max-h-44 w-11/12 mx-auto flex flex-col align-middle'>
                        <p className='text-md font-bold opacity-40'>About</p>
                        <p className='text-sm font-light'>{bio}</p>
                    </div>

                    <div className='mt-5 p-3 w-11/12 mx-auto align-middle'>
                        <div className=''>
                            <p className='text-md font-bold opacity-40'>Top Articles</p>

                            <div className='flex flex-col gap-5 mt-3'>
                                <RecommendedArticleCard />
                                <RecommendedArticleCard />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <AppBar />

        </div>
    )
}

export default MyProfile

export async function getServerSideProps(context) {
    //GET THE USER
    const session = await getSession(context)

    const q = query(collection(db, "articles"), where("uid", "==", session ? session.user.email : 'someemailaddress@email.com'));
    const querySnapshot = await getDocs(q);

    let articles = []
    querySnapshot?.forEach((doc) => {
        articles.push(doc.data())
    });
  
    return {
      props: {
        session,
        articles
      }
    }
  }