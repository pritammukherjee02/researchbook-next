import React from 'react'
import Link from 'next/link'

function RecommendedArticleCard(props) {
  const [articleId, title, shortDescription] = [props.articleId, props.title, props.shortDescription]

  return (
    <Link href={'/article/' + articleId}>
      <div className='w-full p-1 flex'>
          <div className='h-20 w-5/12 border border-blue-500 border-1 cursor-pointer rounded-lg'></div>
          <div className='flex flex-col ml-3 w-7/12 cursor-pointer'>
            <p>{title}</p>
            <p className='text-sm opacity-50 mt-1'>{shortDescription}</p>
          </div>
      </div>
    </Link>
  )
}

export default RecommendedArticleCard