import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

//Components
import Header from '../../components/Header'
import ArticleCard from '../../components/MainContentComponents/ArticleCard'
import AppBar from '../../components/AppBar'

//The { searchField } in the name contains whatever the user searched

function Search() {
  const router = useRouter()
  const { searchField } = router.query
  const [searchFieldContent, setSearchFieldContent] = useState(searchField ? searchField : '');

  function search(e){
    e.preventDefault()

    const target = e.target
    const inPageSearchField = target.inPageSearchField.value;

    router.push('/search/' + inPageSearchField)
  }

  const onchangeHandler = (e) => {
    setSearchFieldContent(e.target.value)
  }

  return (
    <div>
      <Head>
        <title>{searchField} | Search ResearchBook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header home={false} searchProp='' />

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

      <AppBar currentPage='search' />
    </div>
  )
}

export default Search