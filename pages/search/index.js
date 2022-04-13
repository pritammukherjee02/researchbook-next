import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

//components
import Header from '../../components/Header'
import AppBar from '../../components/AppBar'

function Index() {
    const router = useRouter()
    const [searchFieldContent, setSearchFieldContent] = useState('');

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
                <title>Search ResearchBook</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header home={false} searchProp='' />

            <div className='lg:px-5 mt-5 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col justify-around gap-1'>
                <form onSubmit={search} className='w-11/12 lg:w-7/12 mx-auto lg:mx-0'>
                <input name='inPageSearchField' type='text' onChange={onchangeHandler} value={searchFieldContent} className='mb-2 lg:mx-14 text-md font-semibold opacity-90 p-3 w-full rounded-full bg-gray-200' placeholder='Search...' />
                </form>

                <p className='mx-7 lg:mx-16 text-sm font-light'>What do you want to read today?</p>
            </div>

            <AppBar currentPage='search' />
        </div>
    )
}

export default Index