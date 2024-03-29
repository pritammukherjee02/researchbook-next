import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Router from 'next/router'
import Image from 'next/image';

import ArticleCardLoading from '../../components/MainContentComponents/ArticleCardLoading';

import { getSession } from 'next-auth/react'
import { db } from '../../firebase'
import { collection, query, where, getDoc, doc } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

//Components
import Header from '../../components/Header'
import ArticleCard from '../../components/MainContentComponents/ArticleCard'
import RecommendedArticleCard from '../../components/ArticleComponents/RecommendedArticleCard'
import AppBar from '../../components/AppBar'
import UserInformation from '../../components/UserInformation'
import UserNotLoggedInInfo from '../../components/UserNotLoggedInInfo'

function Profile({ session, userSettingsData }) {
    const router = useRouter()
    const { userId } = router.query

    const [accentColor, setAccentColor] = useState(session && userSettingsData ? userSettingsData.appearenceSettingsData.accentColor.color : { name: 'Blue', color: 'bg-blue-500 text-white', primary: 'bg-blue-500', hover: 'hover:bg-blue-600', hoverIcon: 'hover:text-blue-500 focus:text-blue-500', secondary: 'bg-blue-100', secondaryHover: 'hover:bg-blue-200', text: 'text-white', contentText: 'text-black', icon: 'text-blue-500' })

    useEffect(() => {
        if (session && userId == session.user.email) {
          Router.push('/myprofile')
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

    const [realtimeArticles, loading, error] = useCollection(
        query(collection(db, "articles"), where("uid", "==", !userId ? 'official.researchbook@gmail.com' : userId))
    )

    /*
    const randomData = [
        {title: 'God is dead', description: 'And we killed him. You and I', author: 'D Maxwell', date: '12 Apr, 22'},
        {title: 'Don\'t walk in front of me', description: 'I may not follow. Don\'t walk behind me… I may not lead. Walk beside me… just be my friend', author: 'D Maxwell', date: '15 Apr, 22'},
        {title: 'You will never be happy', description: 'if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life', author: 'D Maxwell', date: '24 Apr, 22'},
    ]
    */

    const randomData = [
        {}, {}, {}
    ]

    error && console.log('React Firebase Hook err: ', error)
    const articles = !loading && realtimeArticles ? realtimeArticles.docs : randomData

   /*
    const getArticles = async () => {
        console.log('User ID: ', userId)
        const q = query(collection(db, "articles"), where("uid", "==", 'itfreekpm@gmail.com'));
        const querySnapshot = await getDocs(q);
        querySnapshot?.forEach((doc) => {
            articles.push(doc.data())
        });
        console.log("Articles: ", articles)
    }
    */

    /*
    useEffect(() => {
        console.log('Ran bitch')
        articlesMarkup = articles.map((article, index) => {
            return <ArticleCard key={index} title={article.title} description={article.description} author={article.author} date={article.date} />
        })
    }, [articles])

    if(articles != []){
        articlesMarkup = articles.map((article, index) => {
            return <ArticleCard key={index} title={article.title} description={article.description} author={article.author} date={article.date} />
        })
    }
    */

    const name = loading ? (<p className='w-44 bg-blue-200 h-5'></p>) : articles[0].data() ? articles[0].data().author : 'BRUH'
    const followers = '...'
    const bio = "Loading..."

    const articlesMarkup = articles.map((article, index) => {
        if (loading){
            return <ArticleCardLoading />
        } else {
            return <ArticleCard accentColor={accentColor} key={article.id} articleId={article.id} title={article.data().title} thumbnailLink={article.data().thumbnailLink} description={article.data().description} uid={article.data().uid} author={article.data().author} date={article.data().date} />
        }
    })

    const toggleFollowing = () => {
        if(following) setFollowing(false)
        else setFollowing(true)
    }

    const userInformationMarkup = session ? (<UserInformation accentColor={accentColor} page='profile' session={session} userInfo={userInfo} />) : (<UserNotLoggedInInfo accentColor={accentColor} page='profile' />)

    return (
        <div>
            <Head>
                <title>Profile | ResearchBook</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header accentColor={accentColor} home={false} searchProp='' />

            <div className='lg:px-5 lg:mt-5 pb-14 gap-3 lg:pb-0 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between relative'>
                
                <div className='w-full hidden lg:flex lg:w-2/12'>
                    {userInformationMarkup}
                </div>
                
                <div className='w-full h-full lg:w-7/12 pb-20'>
                    {/* USER BANNER AND POSTS */}

                    <div className='h-40 lg:h-52 lg:rounded-xl relative flex items-end'>
                    <Image src='https://images.unsplash.com/photo-1619760563678-02e23d15f69f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' className='object-cover lg:rounded-xl' layout='fill' />

                        <div className='absolute rounded-full border-2 border-blue-600 bg-blue-100 h-28 w-28 lg:h-34 lg:w-34 translate-x-6 lg:translate-x-12 translate-y-1/2'></div>
                        <div className='relative flex flex-col lg:flex-row items-center lg:gap-2 text-lg pl-36 lg:pl-48 -translate-y-1/4 lg:-translate-y-1/2 text-white'>
                            <span className='text-2xl font-semibold'>{name}</span>
                            <span> {followers} Followers</span>
                        </div>
                        <button onClick={toggleFollowing} className={'px-6 py-3 lg:px-5 lg:py-2 mt-4 text-md lg:text-sm absolute right-6 bottom-24 lg:bottom-3 text-white rounded-full transition-all ' + (following ? 'bg-gray-700 hover:bg-gray-900' : 'bg-blue-500 hover:bg-blue-600')}>{following ? 'FOLLOWING' : 'FOLLOW'}</button>
                    </div>

                    <div className='lg:hidden py-3 pb-5 mt-12 border-b-2 w-12/12 mx-auto'>
                        {/* <p className='text-md font-bold opacity-40'>About</p> */}
                        <p className='text-md font-light w-11/12 mx-auto'>{bio}</p>
                    </div>

                    <div className='lg:p-3 lg:mt-20 border-t-2 lg:border-t-4'>
                        {/* ARTICLE CARDS BELONGING TO THE USER */}
                        {!loading && <p className='text-xl opacity-70 px-5 lg:px-3 pt-3 pb-1 lg:pb-3 font-semibold'>Articles by {name}</p>}

                        {articlesMarkup}
                    </div>
                </div>

                <div className='hidden lg:w-3/12 lg:inline-flex flex-col'>
                    {/* SIDE PANE FOR BIO AND MORE */}

                    <div className='p-3 pb-6 w-11/12 max-h-44 border-b-4 mx-auto flex flex-col align-middle'>
                        <p className='text-md w-full mx-auto font-bold opacity-40 mb-2'>Bio</p>
                        <p className='text-sm w-full mx-auto font-light'>{bio}</p>
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

            <AppBar accentColor={accentColor} />

        </div>
    )
}

export default Profile

export async function getServerSideProps(context) {
    //GET THE USER
    const session = await getSession(context)
    const docSnap = await getDoc(doc(db, 'userSettings', session ? session.user.email : 'randomassemailadress@email.com'));
    const userSettingsData = docSnap.exists ? docSnap.data() : null
  
    return {
      props: {
        session,
        userSettingsData
      }
    }
}

/*
export async function getStaticPaths() {
    const articlesSnapshot = await getDocs(collection(db, "articles"))

    let uniqueUsers = []
    
    const q = query(collection(db, "articles"), where("uid", "not-in", uniqueUsers));
    const querySnapshot = await getDocs(q);

    let paths = []

    articlesSnapshot?.forEach((doc) => {
        paths.push({
            params: {
                userId: doc.data().uid.toString()
            }
        })
    });

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params }) => {

    //const docSnap = await getDoc(doc(db, 'articles', params?.usetId));
    const q = query(collection(db, "articles"), where("uid", "==", params?.userId));
    const querySnapshot = await getDocs(q);

    if(!querySnapshot.exists) return {
        notFound: true
    }

    let articles = []
    querySnapshot?.forEach((doc) => {
        articles.push(doc.data())
    });
    console.log('Articles: ', articles)

    return {
        props: {
            articles
        }
    }
}
*/