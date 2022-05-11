import Link from 'next/link';
import React from 'react';

import Image from 'next/image'

import ArticleCardMenuDropdown from './ArticleCardMenuDropdown'

interface Props {
    title: string,
    description: string,
    author: string,
    date: string,
    articleId: any,
    articleCardId: any,
    uid: any,
    thumbnailLink: string,
    selfUid: any,
    session: any,
    selfOwned: boolean
}

function ArticleCard({ title, description, author, date, articleId, articleCardId, uid, thumbnailLink, selfOwned, selfUid, session }:Props) {

  return (
    <div className='flex p-5 flex-col justify-around border-0 lg:border-b-2 transition duration-150 ease-in-out rounded-sm'>
        <Link href={`/article/${articleId}`}>
            <h2 className='text-3xl lg:text-2xl font-semibold cursor-pointer'>{title}</h2>
        </Link>
        <div className='flex flex-col md:flex-row gap-3 mt-4 md:items-center'>
            <Link href={`/article/${articleId}`}>
                {/*<div className='w-full h-44 md:h-32 md:w-4/12 lg:h-32 lg:w-4/12 border border-blue-500 border-1 cursor-pointer rounded-lg mx-auto'></div>*/}
                <Image src={thumbnailLink} className="object-contain w-full hidden md:block h-44 md:h-32 md:w-4/12 lg:h-32 lg:w-4/12 cursor-pointer rounded-lg mx-auto" width={313} height={176} objectFit='cover' />
            </Link>
            <div className='flex flex-col h-full md:w-8/12 w-12/12 lg:w-8/12 p-3 px-5'>
                <Link href={`/article/${articleId}`}>
                    <p className='  cursor-pointer'>{description}</p>
                </Link>
                <div className='flex justify-between items-end'>
                    <div className='w-full'>
                        <div className='flex gap-1 items-center mt-2'>
                            <p>~</p>
                            <div className='ml-2 border border-blue-500 rounded-full h-6 w-6'></div>
                            <Link href={'/profile/' + uid}>
                                <p className='cursor-pointer text-sm absolute ml-[50px] hover:font-semibold'>{author}</p>
                            </Link>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <p>~</p>
                            <p className='text-sm'>{date}</p>
                        </div>
                    </div>

                    {/* <div className='p-2 w-36 bg-purple-100'></div> */}
                    <ArticleCardMenuDropdown selfUid={selfUid} session={session} selfOwned={selfOwned} articleCardId={articleCardId} articleId={articleId} title={title} desc={description} author={author} thumbnailLink={thumbnailLink} />
                </div>
            </div>
        </div>
        <div className='h-1 w-full bg-blue-500 rounded-full mt-2'></div>
    </div>
  )
}

export default ArticleCard;
