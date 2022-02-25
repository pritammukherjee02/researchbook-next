import React from 'react'

function RecommendedArticleCard() {
  return (
    <div className='w-full p-1 flex'>
        <div className='h-20 w-5/12 border border-blue-500 border-1 cursor-pointer rounded-lg'></div>
        <div className='flex flex-col ml-3 w-7/12 cursor-pointer'>
          <p>Some article name</p>
          <p className='text-sm opacity-50 mt-1'>Lorem, ipsum dolor sit amet consectetur</p>
        </div>
    </div>
  )
}

export default RecommendedArticleCard