import Head from 'next/head'
import AppBar from '../components/AppBar'
import { getSession } from 'next-auth/react'

//Components
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import SideBar from '../components/SideBar'
import UserInformation from '../components/UserInformation'
import { useEffect } from 'react';

export default function Home({ session }) {
  useEffect(() => {
    if (!session) {
    } else {
      console.log('Logged in state')
    }
  }, [])

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
  
  const fromFollowingUsers = [
    {name: 'John', uid:3},
    {name: 'ssk414', uid:4},
    {name: 'D Maxwell', uid:2},
  ] //Will be received from the server

  return (
    <div className=''>
      <Head>
        <title>ResearchBook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='h-screen overflow-x-hidden'>
        <Header page='home' searchProp=''/>

        <div className='lg:px-5 mt-5 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between relative'>
          <div className='w-full lg:w-2/12'><UserInformation fromFollowingUsers={fromFollowingUsers} userInfo={userInfo} /></div>
          <div className='my-0 w-full lg:w-7/12'><MainContent uid={userInfo.uid} /></div>
          <div className='hidden lg:w-3/12 lg:inline-flex'><SideBar /></div>
        </div>

        <AppBar currentPage='home' />
      </main>


    </div>
  )
}

export async function getServerSideProps(context) {
  //GET THE USER
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}
