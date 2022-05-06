import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import ReadlistCardMenuDropdown from './ReadlistCardMenuDropdown'

function ReadlistCard({ title, author, description, thumbnailLink='/bruh', articleId, session, selfUid }) {
  return (
    <div className='flex p-5 flex-col justify-around border-0 lg:border-b-2 transition duration-150 ease-in-out rounded-sm hover:shadow-md'>
        <Link href={`/article/${articleId}`}>
            <h2 className='text-3xl cursor-pointer'>{title}</h2>
        </Link>
        <div className='flex flex-col md:flex-row gap-3 mt-4 md:items-center'>
            <Link href={`/article/${articleId}`}>
                {/*<div className='w-full h-44 md:h-32 md:w-4/12 lg:h-32 lg:w-4/12 border border-blue-500 border-1 cursor-pointer rounded-lg mx-auto'></div>*/}
                <Image src={thumbnailLink} className="object-contain w-full hidden md:block h-44 md:h-32 md:w-4/12 lg:h-32 lg:w-4/12 cursor-pointer rounded-lg mx-auto" width={313} height={176} objectFit='cover' />
            </Link>
            <div className='flex flex-col h-full md:w-8/12 w-12/12 lg:w-8/12 p-3 px-5'>
                <Link href={`/article/${articleId}`}>
                    <p className='cursor-pointer'>{description}</p>
                </Link>
                <div className='flex justify-between items-end'>
                    <div className='w-full'>
                        <div className='flex gap-1 items-center mt-2'>
                            <p>~</p>
                            <div className='ml-2 border border-blue-500 rounded-full h-6 w-6'></div>
                            <p className='cursor-pointer absolute ml-14 hover:font-semibold'>{author}</p>
                        </div>
                    </div>

                    <ReadlistCardMenuDropdown selfUid={selfUid} session={session} articleId={articleId} title={title} desc={description} author={author} thumbnailLink={thumbnailLink} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReadlistCard