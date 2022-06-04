import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'

//Components
import Header from '../components/Header'
import AppBar from '../components/AppBar'
import UserInformation from '../components/UserInformation'
import UserNotLoggedInInfo from '../components/UserNotLoggedInInfo'
import NotificationCard from '../components/NotificationsComponents/NotificationCard'

function Notifications({ session, userSettingsData }) {
    useEffect(() => {
        if (!session) {
          Router.push('/login/readlist')
        }
        }, [])

	const [accentColor, setAccentColor] = useState(session && userSettingsData ? userSettingsData.appearenceSettingsData.accentColor.color : { name: 'Blue', color: 'bg-blue-500 text-white', primary: 'bg-blue-500', hover: 'hover:bg-blue-600', hoverIcon: 'hover:text-blue-500 focus:text-blue-500', secondary: 'bg-blue-100', secondaryHover: 'hover:bg-blue-200', text: 'text-white', contentText: 'text-black', icon: 'text-blue-500' })

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

	const userInformationMarkup = session ? (<UserInformation accentColor={accentColor} page='notifications' session={session} userInfo={userInfo} />) : (<UserNotLoggedInInfo accentColor={accentColor} page='notifications' />)

	const notifications = [
		{
			href: '##',
			name: 'D Maxwell wrote a new Article',
			description: "'Nuke'",
			type: 'newArticle'
		},
		{
			href: '##',
			name: 'sks910 upvoted your Article',
			description: "'Heaven will be nuked'",
			type: 'upvote'
		},
		{
			href: '##',
			name: 'Reports',
			description: "God was banned",
			type: 'reports'
		},
		{
			href: '##',
			name: 'Reports',
			description: "God reported you",
			type: 'reports'
		},
		{
			href: '##',
			name: 'Minion of Demonlord wrote a new Article',
			description: "'Heaven sucks'",
			type: 'newArticle'
		},
	]

	return (
		<div className='flex flex-col gap-14'>
			<Head>
				<title>Notifications | Researchbook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='h-screen overflow-x-hidden'>
				<Header accentColor={accentColor} home={false} page='notifications' searchProp='' />

				<div className='lg:px-5 mt-5 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col gap-12 lg:flex-row relative'>
					<div className='hidden lg:flex w-full lg:w-2/12'>
						{userInformationMarkup}
					</div>

					<div className='my-0 w-full lg:w-6/12'>
						<div className='lg:px-3 pb-14  lg:pb-0 max-w-7xl mx-auto flex flex-col justify-around gap-1'>
							{notifications.length == 0 && <p className='text-sm text-center font-light p-10 opacity-70'>You have no notifications</p>}

							<div className="p-4 bg-gray-50 rounded-lg">
								<Link
								href="##">
									<div className='flow-root px-2 py-2 transition duration-150 ease-in-out cursor-pointer rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'>
										<span className="flex items-center">
											<span className="text-sm font-medium text-gray-900">
											Notification History
											</span>
										</span>
										<span className="block text-sm text-gray-500">
											Your past notifications
										</span>
									</div>
								</Link>
							</div>
							
							<div className='overflow-hidden rounded-lg ring-1 ring-black ring-opacity-5'>
								<div className='flex flex-col gap-12 bg-white p-7'>
									{notifications.map((notification, index) => (
										<NotificationCard key={index} href={notification.href} name={notification.name} description={notification.description} type={notification.type} />
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				<AppBar accentColor={accentColor} currentPage='notifications' />
			</main>

		</div>
	)
}


export default Notifications

export async function getServerSideProps(context) {
	//GET THE USER
	const session = await getSession(context)
	const docSnap = await getDoc(doc(db, 'userSettings', session ? session.user.email : 'randomassemailadress@email.com'));
	const userSettingsData = docSnap.exists() ? docSnap.data() : null
  
	return {
	  props: {
		session,
		userSettingsData
	  }
	}
  }