import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Toaster } from 'react-hot-toast'
import { getSession } from 'next-auth/react'

//Components
import Header from '../../components/Header'
import AppBar from '../../components/AppBar'
import SideBar from '../../components/PreferencesComponents/SideBar'

import { db } from '../../firebase'
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import ToggleSetting from '../../components/PreferencesComponents/ToggleSetting'
import ColorPickerSetting from '../../components/PreferencesComponents/ColorPickerSetting'

function Appearance({ session, userAppearanceSettingsData }) {
    useEffect(() => {
        if (!session) {
          Router.push('/login/preferences')
        }
    }, [])

    const [showMenu, setShowMenu]  = useState(false)

    //Setting states
    const [allowCustomAccent, setAllowCustomAccent] = useState(userAppearanceSettingsData ? userAppearanceSettingsData.appearenceSettingsData.accentColor.allowAccentColor : false)
    const [accentColor, setAccentColor] = useState(userAppearanceSettingsData ? userAppearanceSettingsData.appearenceSettingsData.accentColor.color : { name: 'Blue', color: 'bg-blue-500 text-white', primary: 'bg-blue-500', hover: 'hover:bg-blue-600', hoverIcon: 'hover:text-blue-500 focus:text-blue-500', secondary: 'bg-blue-100', secondaryHover: 'hover:bg-blue-200', text: 'text-white', contentText: 'text-black', icon: 'text-blue-500' })

    const appearenceSettingsData = {
        accentColor: {
            allowAccentColor: allowCustomAccent,
            color: accentColor
        }
    }

    const updateSettings = async () => {
        const appearanceSettingsRef = await updateDoc(doc(db, 'userSettings', session ? session.user.email : ''), {
            appearenceSettingsData
        }, { merge: true })
    }
    
    const setSettings = async () => {
        const appearenceSettingsRef = await setDoc(doc(db, 'userSettings', session ? session.user.email : ''), {
            appearenceSettingsData
        }, { merge: true })
    }

    useEffect(() => {
        if(userAppearanceSettingsData == null) setSettings()
        else if (appearenceSettingsData != userAppearanceSettingsData) updateSettings()
    }, [appearenceSettingsData])

    return (
        <div className='flex flex-col gap-14'>
            <Head>
				<title>Preferences | Researchbook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
            <Toaster />

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
    const docSnap = await getDoc(doc(db, 'userSettings', session ? session.user.email : 'randomassemailadress@email.com'));
    const userAppearanceSettingsData = docSnap.exists ? docSnap.data() : null
  
    return {
      props: {
        session,
        userAppearanceSettingsData
      }
    }
  }