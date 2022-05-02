import React from 'react'

function ReadlistArticleCardLoading() {
  return (
    <div className='flex w-full lg:w-9/12 gap-2 p-3 justify-around border-0 lg:border-b-2'>

            <div className='w-4/12 h-[88px] flex justify-center items-start bg-gray-100 border-1 cursor-default rounded-lg'>
            </div>

        <div className='flex flex-col w-7/12 lg:w-11/12 gap-2'>

                <h2 className='text-2xl bg-gray-100 h-16 lg:h-8 w-full'></h2>

                <p className='bg-gray-100 h-20 lg:h-12 w-full'></p>

            <div className='flex gap-1 items-center'>
                    <div className='ml-2 border bg-gray-100 rounded-full h-6 w-6'></div>
                    <p className='cursor-default bg-gray-100 h-4 w-1/3'></p>
            </div>
        </div>
    </div>
  )
}

export default ReadlistArticleCardLoading