import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

function Login() {
  return (
    <div className='flex items-center h-screen'>
        <Head>
            <title>ResearchBook | Login</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='flex-auto h-screen hidden md:block w-4/12 bg-blue-500'>
            <div className=' h-screen flex flex-col justify-between'>
                <h1 className='text-9xl text-white font-bold p-5 opacity-90'>Rb</h1>
                <p className='text-white text-sm font-light p-5 opacity-90'>© 2021, Researchbook LLC</p>
            </div>
        </div>
        <div className='flex-auto h-screen w-8/12 flex justify-center'>
            <div className='p-2 my-auto w-12/12 md:w-9/12'>
                <h1 className='text-4xl font-bold text-center my-3 mb-10 w-12/12 md:w-6/12 mx-auto'>Never ending stream of <span className='text-indigo-600'>knowledge</span></h1>
                <p className='w-9/12 md:6/12 font-light mx-auto text-center my-3 mb-10'>Connecting curious minds and article lovers together. Constanly get new things <span className='text-indigo-600'>you love to read about</span> in your feed.</p>
                <div className='flex flex-col gap-4'>
                    <Link href={'/'}>
                        <button className='p-4 border-2 mx-auto bg-blue-500 text-white drop-shadow-md hover:border-blue-500 hover:bg-white hover:text-blue-500 rounded-xl w-80'>Sign in with Google</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login