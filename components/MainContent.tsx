import React from 'react';
import ArticleCard from './MainContentComponents/ArticleCard';
import SignUpPitch from './MainContentComponents/SignUpPitch';

function MainContent() {
  return (
      <div className='flex flex-col justify-around gap-1'>
            <SignUpPitch />

            <div className='m-3 h-14 lg:mx-5 rounded-full cursor-pointer px-3 flex items-center border-2 border-gray-300'>
                <div className='ml-2 border border-blue-500 rounded-full h-8 w-8'></div>
                <p className='mx-4 text-lg text-gray-500'>Create something new</p>
            </div>

            <div className='lg:m-3 lg:mx-5 flex flex-col'>
                <ArticleCard title="A systematic approach to running a business" description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure recusandae iusto error itaque quis quasi nesciunt architecto voluptas tenetur expedita.' author='D Maxwell' date='24 Feb, 22'/>
                <ArticleCard title='Why INTJs are the biggest assholes of all time' description='They just are' author='Clara Maxfield' date='10 Feb, 22' />
            </div>
      </div>
  )
}

export default MainContent;
