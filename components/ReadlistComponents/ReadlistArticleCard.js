import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function ReadlistArticleCard({ title, author, description, thumbnailLink='/bruh', articleId }) {
  return (
    <div className='flex w-full lg:w-9/12 gap-2 p-3 justify-around border-0 lg:border-b-2'>
        <Link href={`/article/${articleId}`}>
            <div className='w-4/12 mt-2 flex justify-center items-start rounded-lg'>
                <Image src={thumbnailLink} className="object-contain cursor-pointer rounded-lg mx-auto" width={157} height={88} objectFit='cover' />
            </div>
        </Link>

        <div className='flex flex-col w-7/12 lg:w-11/12 gap-2'>
            <Link href={`/article/${articleId}`}>
                <h2 className='text-2xl cursor-pointer'>{title}</h2>
            </Link>

            <Link href={`/article/${articleId}`}>
                <p className='cursor-pointer'>{description}</p>
            </Link>

            <div className='flex gap-1 items-center'>
                <p>~</p>
                <div className='ml-2 border border-blue-500 rounded-full h-6 w-6'></div>
                <p className='cursor-pointer'>{author}</p>
            </div>
        </div>
    </div>
  )
}

export default ReadlistArticleCard