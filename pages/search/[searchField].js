import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

//Components
import Header from '../../components/Header'
import ArticleCard from '../../components/MainContentComponents/ArticleCard'

//The { searchField } in the name contains whatever the user searched

function Search() {
  const router = useRouter()
  const { searchField } = router.query

  return (
    <div>
		<Head>
			<title>{searchField} | Search ResearchBook</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

        <Header home={false} searchProp={searchField} />

        <div className='lg:px-5 mt-5 max-w-7xl mx-auto flex flex-col justify-around gap-1'>
			<p className='mx-5 lg:mx-16 text-sm font-light'>Searching for "{searchField}"</p>
            <div className='lg:m-3 lg:mx-16 w-full lg:w-7/12 flex flex-col'>
				<ArticleCard title="A systematic approach to running a business" description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure recusandae iusto error itaque quis quasi nesciunt architecto voluptas tenetur expedita.' author='D Maxwell' date='24 Feb, 22'/>
				<ArticleCard title='Why INTJs are the biggest assholes of all time' description='They just are' author='Clara Maxfield' date='10 Feb, 22' />
            </div>
        </div>
    </div>
  )
}

export default Search