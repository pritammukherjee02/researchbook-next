import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { getSession } from 'next-auth/react'

import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'

//components
import Header from '../components/Header'
import AppBar from '../components/AppBar'
import UserInformation from '../components/UserInformation'
import UserNotLoggedInInfo from '../components/UserNotLoggedInInfo'
import ArticleCardLoading from '../components/MainContentComponents/ArticleCardLoading'
import ReadlistCard from '../components/ReadlistComponents/ReadlistCard';

function Readlist({ session, userSettingsData }) {
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

	const [value, loading, error] = useDocument(
		doc(db, 'readlists', session ? session.user.email : 'someemailaddress@email.com'),
		{
		  snapshotListenOptions: { includeMetadataChanges: true },
		}
	  );
    
    const randomData = [
        {}, {}, {}
    ]
    error && console.log(error)
    const articles = !loading && value ? value.data().info : randomData

    const articlesMarkup = articles.map((article) => {
        if (loading){
            return <ArticleCardLoading />
        } else {
            return <ReadlistCard accentColor={accentColor} key={article.id} selfUid={session.user.email} session={session} articleId={article.articleId} title={article.title} thumbnailLink={article.thumbnailLink} description={article.description} author={article.author} />
        }
    })

	const userInformationMarkup = session ? (<UserInformation accentColor={accentColor} page='readlist' session={session} userInfo={userInfo} />) : (<UserNotLoggedInInfo accentColor={accentColor} page='readlist' />)

	return (
		<div className='flex flex-col gap-14'>
			<Head>
				<title>My Readlist | Researchbook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='h-screen overflow-x-hidden'>
				<Header accentColor={accentColor} home={false} page='readlist' searchProp='' />

				<div className='lg:px-5 mt-5 pb-20 lg:pb-0 max-w-7xl mx-auto flex flex-col lg:flex-row relative'>
					<div className='hidden lg:flex w-full lg:w-2/12'>
						{userInformationMarkup}
					</div>
					<div className='my-0 w-full lg:w-7/12'>
						<div className='lg:px-3 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col justify-around gap-1'>
							
							{articlesMarkup == [] && <p className='text-sm font-light p-5 opacity-70'>You have nothing in your Readlist yet</p>}

							<div className='lg:m-3 lg:mx-5 flex flex-col gap-1'>
								<p className='text-4xl lg:text-3xl opacity-70 font-semibold px-5 mb-1'>Readlist</p>
								{articlesMarkup}
							</div>
						</div>
					</div>
				</div>

				<AppBar accentColor={accentColor} currentPage='readlist' />
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
  const docSnap = await getDoc(doc(db, 'userSettings', session ? session.user.email : 'randomassemailadress@email.com'));
  const userSettingsData = docSnap.exists() ? docSnap.data() : null

  return {
    props: {
      session,
	  userSettingsData
    }
  }
}