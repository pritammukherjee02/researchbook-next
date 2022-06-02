import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { motion } from "framer-motion"

import { getSession } from 'next-auth/react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase'

import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  connectSearchBox,
} from 'react-instantsearch-dom';

//components
import Header from '../../components/Header'
import AppBar from '../../components/AppBar'
import UserInformation from '../../components/UserInformation'
import UserNotLoggedInInfo from '../../components/UserNotLoggedInInfo'
import ArticleCard from '../../components/MainContentComponents/ArticleCard';

const searchfieldVariants = {
    animate: {
        scale: [1.0, 1.05, 1.0]
    },
}

const searchClient = algoliasearch(
    'YLY5A2MO21',
    'a827d5781711d37cccbfab0539cf992a'
  );

function Index({ session, userSettingsData }) {
    const router = useRouter()
    const [accentColor, setAccentColor] = useState(session && userSettingsData ? userSettingsData.appearenceSettingsData.accentColor.color : { name: 'Blue', color: 'bg-blue-500 text-white', primary: 'bg-blue-500', hover: 'hover:bg-blue-600', hoverIcon: 'hover:text-blue-500 focus:text-blue-500', secondary: 'bg-blue-100', secondaryHover: 'hover:bg-blue-200', text: 'text-white', contentText: 'text-black', icon: 'text-blue-500' })
    const [searchFieldContent, setSearchFieldContent] = useState('');

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

    function search(e){
        e.preventDefault()

        const target = e.target
        const inPageSearchField = target.inPageSearchField.value;

        router.push('/search/' + inPageSearchField)
    }

    const onchangeHandler = (e) => {
        setSearchFieldContent(e.target.value)
    }

    const userInformationMarkup = session ? (<UserInformation accentColor={accentColor} page='search' session={session} userInfo={userInfo} />) : (<UserNotLoggedInInfo accentColor={accentColor} page='search' />)

    const SearchBox = ({ currentRefinement, refine }) => (
        <form noValidate action="" role="search">
          <input autoFocus name='inPageSearchField' type='search' onChange={event => refine(event.currentTarget.value)} value={currentRefinement} className='mb-2 lg:mx-9 text-md outline-none shadow-none font-semibold opacity-90 p-3 w-full rounded-full bg-gray-200' placeholder='Search...' />
        </form>
      );
    
    const CustomSearchBox = connectSearchBox(SearchBox);

    return (
        <div>
            <Head>
                <title>Search ResearchBook</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className='h-screen overflow-x-hidden'>
                <Header accentColor={accentColor} home={false} searchProp='' />

                <div className='lg:px-5 mt-5 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between relative'>
                    <InstantSearch indexName="articles" searchClient={searchClient}>
                        <Configure hitsPerPage={8} />
                        <div className='hidden lg:flex w-full lg:w-2/12'>
                            {userInformationMarkup}
                        </div>
                        <div className='my-0 w-full lg:w-10/12'>
                            <div className='lg:px-3 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col justify-around gap-1'>
                                <motion.form animate='animate' variants={searchfieldVariants} onSubmit={e => e.preventDefault()} className='w-11/12 lg:w-7/12 mx-auto lg:mx-0'>
                                    {/*<input name='inPageSearchField' type='text' onChange={onchangeHandler} value={searchFieldContent} className='mb-2 lg:mx-9 text-md outline-none shadow-none font-semibold opacity-90 p-3 w-full rounded-full bg-gray-200' placeholder='Search...' />*/}
                                    <CustomSearchBox />
                                </motion.form>

                                <p className='mx-7 lg:mx-16 text-sm font-light'>What do you want to read today?</p>
                                <div className='w-full lg:w-8/12 lg:m-3 lg:mx-5 flex flex-col'>
                                    <Hits hitComponent={Hit} uid={session.user.email} />
                                </div>
                            </div>
                        </div>
                    </InstantSearch>
                </div>

                <AppBar accentColor={accentColor} currentPage='search' />
            </main>

            {/*<Header home={false} searchProp='' />

            <div className='lg:px-5 mt-5 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col justify-around gap-1'>
                <form onSubmit={search} className='w-11/12 lg:w-7/12 mx-auto lg:mx-0'>
                <input name='inPageSearchField' type='text' onChange={onchangeHandler} value={searchFieldContent} className='mb-2 lg:mx-14 text-md font-semibold opacity-90 p-3 w-full rounded-full bg-gray-200' placeholder='Search...' />
                </form>

                <p className='mx-7 lg:mx-16 text-sm font-light'>What do you want to read today?</p>
            </div>

            <AppBar currentPage='search' />*/}
        </div>
    )
}

function Hit({hit, uid}) {
    return (
        <motion.div initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, zIndex: -10, opacity: 0 }}>
            <ArticleCard title={hit.title} selfOwned={hit.uid == uid} thumbnailLink={hit.thumbnailLink} description={hit.description} author={hit.author} date={hit.date} />
        </motion.div>
    );
  }

export default Index

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
  