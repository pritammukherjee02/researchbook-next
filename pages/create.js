import Head from 'next/head'
import React, { useRef } from 'react'
import UserInfo from '../components/ArticleComponents/UserInfo'
import Header from '../components/Header'
import AppBar from '../components/AppBar'

import { db } from '../firebase'
import { collection, addDoc } from "firebase/firestore";

function Create() {
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  async function publishArticle(e){
    e.preventDefault()

    if(!contentRef.current.value || !titleRef.current.value || !subtitleRef.current.value){
      alert('Please type the title, the subtitle and content')
      return
    }

    try {
      const docRef = await addDoc(collection(db, "articles"), {
        content: contentRef.current.value,
        title: titleRef.current.value,
        subtitle: subtitleRef.current.value,
        description: 'Random description for now',
        date: '27 Jul, 22',
        author: 'D Maxwell',
        uid: 2
      })
    } catch (e) {
      alert('Something went wrong')
      console.log('ERR: DOCADD: ', e)
      return
    }

    contentRef.current.value = ''
    titleRef.current.value = ''
    subtitleRef.current.value = ''
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
                <div className='flex'>
                  
                  <form onSubmit={publishArticle} className='flex flex-col w-full h-full lg:w-8/12 pb-5'>
                    <div className='flex justify-between lg:w-11/12'>
                      <input type="text" ref={titleRef} name='title' className='p-2 text-3xl font-bold w-full lg:w-8/12 mb-1' placeholder='Title...' />
                      <input type='submit' value='Publish' className='px-6 h-10 mr-3 lg:mr-0 lg:h-11 text-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-md' />
                    </div>
                    <input type="text" ref={subtitleRef} name='subtitle' className='p-2 text-2xl font-light opacity-50 w-full lg:w-8/12 mb-5' placeholder='Sub-title...' />

                    <textarea type="text" ref={contentRef} name='content' placeholder='Write your masterpiece...' className='text-xl p-2 w-full mx-auto lg:mx-0 leading-relaxed font-light flex-wrap' rows={15} />
                  </form>

                  <div className='hidden h-min lg:block lg:w-4/12 border-l-2 sticky bottom-0'>
                    <UserInfo name="D Maxwell" followers={19} uid={2} />
                  </div>

                </div>
              </div>

              <AppBar currentPage='create' />
        
        </main>

    </div>
  )
}

export default Create