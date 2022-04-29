import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { getSession } from 'next-auth/react'

//Components
import Header from '../../components/Header'
import ArticleCard from '../../components/MainContentComponents/ArticleCard'
import AppBar from '../../components/AppBar'
import UserInformation from '../../components/UserInformation'
import UserNotLoggedInInfo from '../../components/UserNotLoggedInInfo'

//The { searchField } in the name contains whatever the user searched

function Search({ session }) {
  const router = useRouter()
  const { searchField } = router.query
  const [searchFieldContent, setSearchFieldContent] = useState(searchField ? searchField : '');

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

  const userInformationMarkup = session ? (<UserInformation page='search' session={session} userInfo={userInfo} />) : (<UserNotLoggedInInfo page='search' />)

  return (
    <div>
      <Head>
        <title>{searchField} | Search ResearchBook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      	<main className='h-screen overflow-x-hidden'>
			<Header home={false} searchProp='' />

			<div className='lg:px-5 mt-5 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between relative'>
				<div className='w-full hidden lg:block lg:w-2/12'>
					{userInformationMarkup}
				</div>
				<div className='my-0 w-full lg:w-10/12'>
					<div className='lg:px-3 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col justify-around gap-1'>
						<form onSubmit={search} className='w-11/12 lg:w-7/12 mx-auto lg:mx-0'>
							<input name='inPageSearchField' type='text' onChange={onchangeHandler} value={searchFieldContent} className='mb-2 lg:mx-9 text-md outline-none shadow-none font-semibold opacity-90 p-3 w-full rounded-full bg-gray-200' placeholder='Search...' />
						</form>

						<p className='mx-7 lg:mx-16 text-sm font-light'>Searching for "{searchField}"</p>
						<div className='w-full lg:w-8/12 lg:m-3 lg:mx-5 flex flex-col'>
							<ArticleCard title="A systematic approach to running a business" thumbnailLink="https://images.unsplash.com/photo-1619760563678-02e23d15f69f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure recusandae iusto error itaque quis quasi nesciunt architecto voluptas tenetur expedita.' author='D Maxwell' date='24 Feb, 22'/>
							<ArticleCard title='Why INTJs are the biggest assholes of all time' thumbnailLink="https://images.unsplash.com/photo-1619760563678-02e23d15f69f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" description='They just are' author='Clara Maxfield' date='10 Feb, 22' />
						</div>
					</div>
				</div>
			</div>

			<AppBar currentPage='search' />
    	</main>

      {/*<Header home={false} searchProp='' />

      <div className='lg:px-5 mt-5 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col justify-around gap-1'>
        <form onSubmit={search} className='w-11/12 lg:w-7/12 mx-auto lg:mx-0'>
          <input name='inPageSearchField' type='text' onChange={onchangeHandler} value={searchFieldContent} className='mb-2 lg:mx-14 text-md font-semibold opacity-90 p-3 w-full rounded-full bg-gray-200' placeholder='Search...' />
        </form>

			  <p className='mx-7 lg:mx-16 text-sm font-light'>Searching for "{searchField}"</p>
        <div className='lg:m-3 lg:mx-16 w-full lg:w-7/12 flex flex-col'>
          <ArticleCard title="A systematic approach to running a business" description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure recusandae iusto error itaque quis quasi nesciunt architecto voluptas tenetur expedita.' author='D Maxwell' date='24 Feb, 22'/>
          <ArticleCard title='Why INTJs are the biggest assholes of all time' description='They just are' author='Clara Maxfield' date='10 Feb, 22' />
        </div>
      </div>

  		<AppBar currentPage='search' />*/}
    </div>
  )
}

export default Search

export async function getServerSideProps(context) {
    //GET THE USER
    const session = await getSession(context)
  
    return {
      props: {
        session
      }
    }
  }
  