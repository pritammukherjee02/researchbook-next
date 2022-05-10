import Head from 'next/head'
import AppBar from '../components/AppBar'
import { getSession } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'

//Components
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import SideBar from '../components/SideBar'
import UserInformation from '../components/UserInformation'
import UserNotLoggedInInfo from '../components/UserNotLoggedInInfo'
import { useEffect, useState } from 'react';

export default function Home({ session, userSettingsData }) {
	const [accentColor, setAccentColor] = useState(session && userSettingsData ? userSettingsData.appearenceSettingsData.accentColor.color : { name: 'Blue', color: 'bg-blue-500 text-white', primary: 'bg-blue-500', secondary: 'bg-blue-200', text: 'text-white', icon: 'text-blue-500' })

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

  const userInformationMarkup = session ? (<UserInformation accentColor={accentColor} page='home' session={session} fromFollowingUsers={fromFollowingUsers} userInfo={userInfo} />) : (<UserNotLoggedInInfo accentColor={accentColor} page='home' />)

  return (
    <div className=''>
      <Head>
        <title>ResearchBook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />

      <main className='h-screen overflow-x-hidden'>
        <Header accentColor={accentColor} page='home' searchProp=''/>

        <div className='lg:px-5 mt-5 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between relative'>
          <div className='w-full lg:w-2/12'>
            {userInformationMarkup}
          </div>
          <div className='my-0 w-full lg:w-7/12'><MainContent accentColor={accentColor} session={session} /></div>
          <div className='hidden lg:w-3/12 lg:block'><SideBar accentColor={accentColor} /></div>
        </div>

        <AppBar accentColor={accentColor} currentPage='home' />
      </main>


    </div>
  )
}

export async function getServerSideProps(context) {
  //GET THE USER
  const session = await getSession(context)
  const docSnap = await getDoc(doc(db, 'userSettings', session ? session.user.email : 'randomassemailadress@email.com'));
  const userSettingsData = docSnap.exists ? docSnap.data() : null

  return {
    props: {
      session,
	  userSettingsData
    }
  }
}
