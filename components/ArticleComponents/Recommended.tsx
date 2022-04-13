import React from 'react'
import RecommendedArticleCard from './RecommendedArticleCard'

function Recommended() {

  const recommendedArticles = [
    {articleId:'', title:'Some article title', description:'Lorem, ipsum dolor sit amet consectetur'},
    {articleId:'', title:'Some article title', description:'Lorem, ipsum dolor sit amet consectetur'},
    {articleId:'', title:'Some article title', description:'Lorem, ipsum dolor sit amet consectetur'},
    {articleId:'', title:'Some article title', description:'Lorem, ipsum dolor sit amet consectetur'},
  ]

  const recommendedArticlesMarkup = recommendedArticles.map((article, index) => {
    return <RecommendedArticleCard key={index} articleId={article.articleId} title={article.title} shortDescription={article.description} />
  })

  return (
    <div className='mt-5 w-11/12 mx-auto'>
        <p className='text-sm font-semibold opacity-40 cursor-default'>Recommended:</p>

        <div className='flex flex-col gap-5 mt-3'>
          {recommendedArticlesMarkup}
        </div>
    </div>
  )
}

export default Recommended