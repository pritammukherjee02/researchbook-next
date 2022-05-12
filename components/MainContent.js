import Link from 'next/link';
import Image from 'next/image'
import React, { } from 'react';
import ArticleCard from './MainContentComponents/ArticleCard';
import ArticleCardLoading from './MainContentComponents/ArticleCardLoading';
import SignUpPitch from './MainContentComponents/SignUpPitch';


import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from "firebase/firestore";
import { db } from '../firebase'

function MainContent({ session }) {
    
    const [realtimeArticles, loading, error] = useCollection(
        collection(db, 'articleCards')
    )
    
    const randomData = [
        {}, {}, {}
    ]
    error && console.log(error)
    const articles = !loading && realtimeArticles ? realtimeArticles.docs : randomData

    const articlesMarkup = articles.map((article) => {
        if (loading){
            return <ArticleCardLoading />
        } else {
            return <ArticleCard key={article.id} session={session} selfUid={session ? session.user.email : ''} articleCardId={article.id} articleId={article.data().articleId} title={article.data().title} thumbnailLink={article.data().thumbnailLink} description={article.data().description} uid={article.data().uid} articleAccentColor={article.data().articleAccentColor} selfOwned={session && (article.data().uid == session.user.email ? true : false)} author={article.data().author} date={article.data().date} />
        }
    })

    const signUpPitchLayout = (!session) ? <SignUpPitch /> : (<div />)

    return (
        <div className='flex flex-col justify-around gap-1 pb-14'>
                {signUpPitchLayout}

                <Link href={'/create'}>
                    <div className='m-3 h-14 lg:mx-5 rounded-full cursor-text px-3 flex items-center border-2 border-gray-300'>
                        {/*<div className='ml-2 border border-blue-500 rounded-full h-8 w-8'></div>*/}
                        {/*<Image src={session ? session.user.image : ''} className="object-contain border-2 rounded-full h-10 w-10 mt-2 ml-3 lg:ml-0" width={32} height={32} layout='fixed' objectFit='cover' />*/}
                        {session ? (<Image src={session.user.image} className="object-contain border-2 rounded-full h-10 w-10 mt-2 ml-3 lg:ml-0" width={32} height={32} layout='fixed' objectFit='cover' />) : (<div className='ml-2 border border-blue-500 rounded-full h-8 w-8'></div>)}
                        <p className='mx-4 text-lg text-gray-500'>Create something new</p>
                    </div>
                </Link>

                <div className='lg:m-3 lg:mx-5 flex flex-col'>
                    {articlesMarkup}
                </div>
        </div>
    )
}

export default MainContent;
