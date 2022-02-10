import React from 'react';

interface Props {
    title: string,
    description: string,
    author: string,
    date: string
}

function ArticleCard({ title, description, author, date }:Props) {
  return (
    <div className='flex p-5 my-2 flex-col justify-around border border-0 border-x-2'>
        <h2 className='text-3xl cursor-pointer'>{title}</h2>
        <div className='flex gap-3 mt-4 items-center'>
            <div className='w-24 h-24 md:w-28 md:h-28 lg:h-32 lg:w-32 border border-blue-500 border-1 cursor-pointer rounded-lg'></div>
            <div className='flex flex-col h-full w-8/12 p-3 px-5'>
                <p className='cursor-pointer'>{description}</p>
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
