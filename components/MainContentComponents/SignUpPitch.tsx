import Link from 'next/link';
import React from 'react';

function SignUpPitch() {
  return (
    <div className='m-3 mt-6 lg:mt-3 lg:m-5 rounded-lg bg-blue-500'>
        <div className='p-5 text-white'>
            <p className='text-2xl'><span className='text-4xl'>ResearchBook</span> is like a hub, a hall where you and your favorite creators come to share their thoughts with others.</p>
        </div>
        <div className='flex my-3 mb-6 h-10 justify-between w-11/12 mx-auto items-center'>
            <p className='text-white'>Join us today for free</p>
            <Link href={'/login'}>
              <button className='bg-gray-50 text-black rounded-full py-2 px-4'>Sign Up</button>
            </Link>
        </div>
    </div>
  )
}

export default SignUpPitch;
