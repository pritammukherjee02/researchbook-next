import Link from 'next/link';
import React, {  } from 'react';
import ArticleCard from './MainContentComponents/ArticleCard';
import ArticleCardLoading from './MainContentComponents/ArticleCardLoading';
import SignUpPitch from './MainContentComponents/SignUpPitch';


import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from "firebase/firestore";
import { db } from '../firebase'

function MainContent({ session }) {

    const [realtimeArticles, loading, error] = useCollection(
        collection(db, 'articles')
    )
    
    const randomData = [
        {}, {}, {}
    ]
    error && console.log(error)
    const articles = !loading && realtimeArticles ? realtimeArticles.docs : randomData

    const articlesMarkup = articles.map((article, index) => {
        if (loading){
            return <ArticleCardLoading />
        } else {
            return <ArticleCard key={article.id} articleId={article.id} title={article.data().title} description={article.data().description} uid={article.data().uid} author={article.data().author} date={article.data().date} />
        }
    })

    const signUpPitchLayout = (!session) ? <SignUpPitch /> : (<div />)

    return (
        <div className='flex flex-col justify-around gap-1'>
                {signUpPitchLayout}

                <Link href={'/create'}>
                    <div className='m-3 h-14 lg:mx-5 rounded-full cursor-pointer px-3 flex items-center border-2 border-gray-300'>
                        <div className='ml-2 border border-blue-500 rounded-full h-8 w-8'></div>
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
