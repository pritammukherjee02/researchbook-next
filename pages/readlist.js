import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { getSession } from 'next-auth/react'

//components
import Header from '../components/Header'
import AppBar from '../components/AppBar'
import UserInformation from '../components/UserInformation'
import UserNotLoggedInInfo from '../components/UserNotLoggedInInfo'

function Readlist({ session }) {
  useEffect(() => {
    if (!session) {
      Router.push('/login/readlist')
    }
    }, [])

    console.log(session)

	const userInfo = {
        uid: 1,
        name: 'James Anderson',
        fieldOfExpertise: 'Comp sci',
        jobDesignation: 'Research Fellow',
        username: '@janderson11',
        articles: 0,
        followers: 2,
        following: 98
    }

	const userInformationMarkup = session ? (<UserInformation page='readlist' session={session} userInfo={userInfo} />) : (<UserNotLoggedInInfo page='readlist' />)

	return (
		<div className='flex flex-col gap-14'>
			<Head>
				<title>My Readlist | Researchbook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='h-screen overflow-x-hidden'>
				<Header home={false} searchProp='' />

				<div className='lg:px-5 mt-5 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between relative'>
					<div className='hidden lg:flex w-full lg:w-2/12'>
						{userInformationMarkup}
					</div>
					<div className='my-0 w-full lg:w-10/12'>
						<div className='lg:px-3 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col justify-around gap-1'>
							<p className='text-sm font-light p-5 opacity-70'>You have nothing in your Readlist yet</p>
						</div>
					</div>
				</div>

				<AppBar currentPage='readlist' />
			</main>

			{/*<main className='pb-14'>
				<Header page='readlist' searchProp='' />

				<div className='lg:px-5 mt-5 mb-3 max-w-7xl mx-auto flex flex-col justify-between gap-2'>
					<p className='text-sm font-light p-5 opacity-70'>You have nothing in your Readlist yet</p>
				</div>

			</main>

			<AppBar />*/}
		</div>
	)
}

export default Readlist

export async function getServerSideProps(context) {
  //GET THE USER
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}