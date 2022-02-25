import React from 'react'
import RecommendedArticleCard from './RecommendedArticleCard'

function Recommended() {
  return (
    <div className='mt-5 w-11/12 mx-auto'>
        <p className='text-sm opacity-70'>Recommended:</p>

        <div className='flex flex-col gap-5 mt-3'>
          <RecommendedArticleCard />
          <RecommendedArticleCard />
          <RecommendedArticleCard />
          <RecommendedArticleCard />
        </div>
    </div>
  )
}

export default Recommended