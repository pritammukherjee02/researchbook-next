import React from 'react';

function News() {
  return (
    <div className='flex flex-col w-full h-60 my-2 px-2 p-2 border-t-2'>
        <div className='flex gap-2'>
          <p className='text-sm mt-3 font-semibold opacity-40 cursor-default'>In the news</p>

          <div className='bg-red-500 cursor-default text-white px-2 flex justify-center items-center mt-3 rounded-full'>
            <p className='text-xs font-semibold rounded-full'>LIVE</p>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center h-full'>
          <p className='text-sm font-thin cursor-default'>Coming soon</p>
        </div>
    </div>
  )
}

export default News;
