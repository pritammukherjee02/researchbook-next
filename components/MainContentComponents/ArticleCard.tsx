import Link from 'next/link';
import React from 'react';

interface Props {
    title: string,
    description: string,
    author: string,
    date: string
}

function ArticleCard({ title, description, author, date }:Props) {
  return (
    <div className='flex p-5 my-2 flex-col justify-around border-0 border-x-2'>
        <Link href={'/article'}>
            <h2 className='text-3xl cursor-pointer'>{title}</h2>
        </Link>
        <div className='flex flex-col md:flex-row gap-3 mt-4 md:items-center'>
            <Link href={'/article'}>
                <div className='w-full h-44 md:h-32 md:w-4/12 lg:h-32 lg:w-4/12 border border-blue-500 border-1 cursor-pointer rounded-lg mx-auto'></div>
            </Link>
            <div className='flex flex-col h-full md:w-8/12 w-12/12 lg:w-8/12 p-3 px-5'>
                <Link href={'/article'}>
                    <p className='cursor-pointer'>{description}</p>
                </Link>
                <div className='flex gap-1 items-center mt-2'>
                    <p>~</p>
                    <div className='ml-2 border border-blue-500 rounded-full h-6 w-6'></div>
                    <p className='cursor-pointer'>{author}</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <p>~</p>
                    <p className='text-sm'>{date}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ArticleCard;
