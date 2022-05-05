import Head from 'next/head'
import Router from 'next/router'
import Image from 'next/image'
import React, { useRef, useEffect, useState } from 'react'
import Header from '../components/Header'
import AppBar from '../components/AppBar'
import UserInformation from '../components/UserInformation'
import UserNotLoggedInInfo from '../components/UserNotLoggedInInfo'

import { getSession, useSession } from 'next-auth/react'

import { db } from '../firebase'
import { collection, addDoc } from "firebase/firestore";

function Create({ session }) {
  //const session = useSession()
  useEffect(() => {
    if (!session) {
      Router.push('/login/create')
    }
    }, [])

	const [thumbnailToArticle, setThumbnailToArticle] = useState(null)

	const contentRef = useRef(null)
	const titleRef = useRef(null)
	const subtitleRef = useRef(null)
	const descriptionRef = useRef(null)
	const thumbnailRef = useRef(null)
	const filePickerRef = useRef(null)

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

  async function publishArticle(e){
    e.preventDefault()

    if(!contentRef.current.value || !titleRef.current.value || !subtitleRef.current.value){
      alert('Please give the title, the subtitle, the content, and the thumbnail image link')
      return
    }

    try {
      const docRef = await addDoc(collection(db, "articles"), {
        content: contentRef.current.value,
        title: titleRef.current.value,
        subtitle: subtitleRef.current.value,
        description: descriptionRef.current.value,
        date: '27 Jul, 22',
        author: session.user.name,
        uid: session.user.email,
        thumbnailLink: thumbnailRef.current.value
      })

      const docCardRef = await addDoc(collection(db, "articleCards"), {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        date: '27 Jul, 22',
        author: session.user.name,
        uid: session.user.email,
        articleId: docRef.id,
        thumbnailLink: thumbnailRef.current.value
      })
    } catch (e) {
      alert('Something went wrong')
      console.log('ERR: DOCADD: ', e)
      return
    }

    contentRef.current.value = ''
    titleRef.current.value = ''
    subtitleRef.current.value = ''
    descriptionRef.current.value = ''
    thumbnailRef.current.value = ''
  }

  	const userInformationMarkup = session ? (<UserInformation session={session} userInfo={userInfo} />) : (<UserNotLoggedInInfo />)

	const addThumbnailImageToArticle = (e) => {
		const reader = new FileReader()

		if(e.target.files[0])
		{
			reader.readAsDataURL(e.target.files[0])
		}

		reader.onload = (readerEvent) => {
			setThumbnailToArticle(readerEvent.target.result)
		}
	}

	const removeThumbnail = () => {
		setThumbnailToArticle(null)
	}

  return (
    <div>
        <Head>
            <title>ResearchBook Editor</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className='h-screen'>
            <Header home={false} />

              <div className='lg:px-5 mt-5 mb-3 pb-14 lg:pb-0 max-w-7xl mx-auto'>
                <div className='flex gap-4'>

                  <div className='hidden lg:flex w-full lg:w-2/12'>
                	{userInformationMarkup}
                  </div>
                  
                  <form onSubmit={publishArticle} className='flex flex-col w-full h-full lg:w-8/12 pb-5'>
                    <div className='flex justify-between items-center lg:w-11/12'>
                      <input type="text" ref={titleRef} name='title' className='p-2 text-3xl outline-none shadow-none font-bold w-full lg:w-8/12 mb-1' placeholder='Title...' />
                      <input type='submit' value='Publish' className='px-6 h-10 mr-3 lg:mr-0 lg:h-11 text-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-md' />
                    </div>
                    <input type="text" ref={subtitleRef} name='subtitle' className='p-2 outline-none shadow-none text-2xl font-light opacity-50 w-full lg:w-8/12 mb-5' placeholder='Sub-title...' />

                    <textarea type="text" ref={descriptionRef} name='description' placeholder='Description...' className='text-md outline-none shadow-none resize-none rounded-xl border-2 border-gray-100 p-2 mb-1 w-full mx-auto lg:mx-0 leading-relaxed font-light flex-wrap' rows={3} />
                    <textarea type="text" ref={contentRef} name='content' placeholder='Write your masterpiece...' className='text-xl outline-none shadow-none resize-none p-2 w-full mx-auto lg:mx-0 leading-relaxed font-light flex-wrap' rows={15} />
					<div className='flex gap-2 justify-between h-12 lg:w-8/12 mb-5'>
                    	<input type="text" ref={thumbnailRef} name='thumbnail' className='p-1 w-9/12 outline-none shadow-none text-md font-light opacity-50 border-t-2' placeholder='Link to thumbnail image...' />
						<div onClick={() => filePickerRef.current.click()} className='w-3/12 h-full flex items-center justify-center text-sm opacity-50 rounded-xl cursor-pointer bg-gray-200 hover:bg-gray-400'>Upload Image</div>
					</div>
                    <input ref={filePickerRef} onChange={addThumbnailImageToArticle} type='file' hidden />
					{thumbnailToArticle && (
						<div onClick={removeThumbnail} className=' flex flex-col w-4/12 filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'>
							<Image src={thumbnailToArticle} className="object-contain hidden cursor-pointer rounded-lg mx-auto" width={313} height={176} objectFit='cover' />
							<p className='text-xs text-red-500 text-center'>Remove</p>
						</div>
					)}
                  </form>

                </div>
              </div>

              <AppBar currentPage='create' />
        
        </main>

    </div>
  )
}

export default Create

export async function getServerSideProps(context) {
  //GET THE USER
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}