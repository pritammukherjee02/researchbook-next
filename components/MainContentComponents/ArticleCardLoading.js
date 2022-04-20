import React from 'react'

function ArticleCardLoading() {
  return (
    <div className='flex p-5 flex-col justify-around border-0 lg:border-b-2 '>
        <h2 className='text-3xl cursor-default bg-gray-100 h-9 w-full'></h2>
        <div className='flex flex-col md:flex-row gap-3 mt-4 md:items-center'>
            <div className='w-full h-44 md:h-32 md:w-4/12 lg:h-32 lg:w-4/12 border bg-gray-100 border-1 cursor-default rounded-lg mx-auto'></div>
            <div className='flex flex-col h-full md:w-8/12 w-12/12 lg:w-8/12 p-3 px-5'>
                <p className='cursor-default bg-gray-100 h-12 w-full'></p>
                <div className='flex gap-1 items-center mt-2'>
                    <div className='ml-2 border bg-gray-100 rounded-full h-6 w-6'></div>
                    <p className='cursor-default bg-gray-100 h-4 w-1/3'></p>
                </div>
                <div className='flex gap-1 items-center mt-3 ml-2'>
                    <p className='text-sm h-4 bg-gray-100 w-1/3'></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ArticleCardLoading