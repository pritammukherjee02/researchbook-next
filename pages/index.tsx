import Head from 'next/head'
import AppBar from '../components/AppBar'

//Components
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import SideBar from '../components/SideBar'
import UserInformation from '../components/UserInformation'

export default function Home() {
  return (
    <div className=''>
      <Head>
        <title>ResearchBook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='h-screen'>
        <Header page='home' searchProp=''/>

        <div className='lg:px-5 mt-5 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between relative'>
          <div className='w-full lg:w-2/12'><UserInformation /></div>
          <div className='my-0 w-full lg:w-7/12'><MainContent /></div>
          <div className='hidden lg:w-3/12 lg:inline-flex'><SideBar /></div>
        </div>

        <AppBar currentPage='home' />
      </main>


    </div>
  )
}
