import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { getSession } from 'next-auth/react'

//Components
import Header from '../../components/Header'
import AppBar from '../../components/AppBar'
import SideBar from '../../components/PreferencesComponents/SideBar'

import ToggleSetting from '../../components/PreferencesComponents/ToggleSetting'
import ColorPickerSetting from '../../components/PreferencesComponents/ColorPickerSetting'

function Appearance({ session }) {
    useEffect(() => {
        if (!session) {
          Router.push('/login/preferences')
        }
    }, [])

    const [showMenu, setShowMenu]  = useState(false)

    //Setting states
    const [allowCustomAccent, setAllowCustomAccent] = useState(false)
    const [accentColor, setAccentColor] = useState({ name: 'Blue', color: 'bg-blue-500 text-white' })

    return (
        <div className='flex flex-col gap-14'>
            <Head>
				<title>Preferences | Researchbook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

            <main className='h-screen overflow-x-hidden'>
                <Header home={false} page='preferences' searchProp='' />

                <div className='lg:pr-5 pb-14 lg:pb-0 max-w-7xl mx-auto flex flex-col lg:flex-row relative'>
                    <div className={'lg:flex border-r-2 w-full h-screen lg:w-2/12 absolute z-10 left-0 bg-white ' + (showMenu ? ' ' : 'hidden ')}>
                        <p className='text-4xl lg:hidden absolute right-8 top-4 cursor-pointer' onClick={() => setShowMenu(false)}>X</p>

                        <SideBar />
                    </div>

                    <div className='my-0 lg:mt-5 w-full z-0 lg:ml-[20%] lg:w-7/12'>
                        
                        <div onClick={() => setShowMenu(true)} className='h-7 w-8 flex justify-center m-5 lg:hidden cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 text-gray-700 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>

                        <div name='MainContent' className='mt-3'>
                            <p className='text-md px-5 font-bold opacity-50 cursor-default'>Colors</p>

                            <ToggleSetting settingName='Custom Accent Color' settingDesc='Make Researchbook look the way you want' current={allowCustomAccent} setCurrentStateFunction={setAllowCustomAccent} accentColor={accentColor} />
                            {allowCustomAccent && <ColorPickerSetting settingName='Accent Color' settingDesc='Personalize Researchbook according to your tastes' currentColor={accentColor} setCurrentColorStateFunction={setAccentColor} />}
                        </div>

                    </div>
                </div>

                <AppBar currentPage='preferences' />
            </main>
        </div>
    )
}

export default Appearance

export async function getServerSideProps(context) {
    //GET THE USER
    const session = await getSession(context)
  
    return {
      props: {
        session
      }
    }
  }