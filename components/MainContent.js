import Link from 'next/link';
import React from 'react';
import ArticleCard from './MainContentComponents/ArticleCard';
import SignUpPitch from './MainContentComponents/SignUpPitch';

function MainContent(props) {

    const uid = props.uid

    const articles = [
        {title: 'A systematic approach to running a business', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure recusandae iusto error itaque quis quasi nesciunt architecto voluptas tenetur expedita.', author: 'D Maxwell', date: '24 Feb, 22'},
        {title: 'Why INTJs are the biggest assholes of all time', description: 'They just are', author: 'Clara Maxfield', date: '10 Feb, 22'},
        {title: 'Why INTJs are the biggest assholes of all time', description: 'They just are', author: 'Clara Maxfield', date: '10 Feb, 22'},
    ]

    const articlesMarkup = articles.map((article, index) => {
        return <ArticleCard key={index} title={article.title} description={article.description} author={article.author} date={article.date} />
    })

    return (
        <div className='flex flex-col justify-around gap-1'>
                <SignUpPitch />

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
