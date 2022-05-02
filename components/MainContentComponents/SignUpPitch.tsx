import Link from 'next/link';
import React from 'react';

function SignUpPitch() {
  return (
    <div className='m-3 mt-6 lg:mt-3 lg:m-5 rounded-lg bg-blue-500'>
        <div className='p-5 text-white'>
            <p className='text-2xl'>Read articles that you'll come to love<br/>Only on <span className='text-4xl'>Researchbook</span></p>
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
