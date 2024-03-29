import Head from 'next/head'
import Router from 'next/router'
import Image from 'next/image'
import React, { useRef, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import Header from '../components/Header'
import AppBar from '../components/AppBar'
import UserInformation from '../components/UserInformation'
import UserNotLoggedInInfo from '../components/UserNotLoggedInInfo'
import AccentColorPicker from '../components/CreateComponents/AccentColorPicker'
import CategorySelector from '../components/CreateComponents/CategorySelector'

import { getSession, useSession } from 'next-auth/react'

import { db, storage } from '../firebase'
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

function Create({ session, userSettingsData }) {
  //const session = useSession()
  useEffect(() => {
    if (!session) {
      Router.push('/login/create')
    }
    }, [])
	const [accentColor, setAccentColor] = useState(session && userSettingsData ? userSettingsData.appearenceSettingsData.accentColor.color : { name: 'Blue', color: 'bg-blue-500 text-white', primary: 'bg-blue-500', hover: 'hover:bg-blue-600', hoverIcon: 'hover:text-blue-500 focus:text-blue-500', secondary: 'bg-blue-100', secondaryHover: 'hover:bg-blue-200', text: 'text-white', contentText: 'text-black', icon: 'text-blue-500' })
	const [articleAccentColor, setArticleAccentColor] = useState({ name: 'White', articleCardAccent: 'bg-white', articleContentElementAccent: 'text-black', articleInteractiveElementAccent: 'bg-blue-500 text-white', articleInteractiveElementAccentHover: 'hover:bg-blue-600 focus:bg-blue-600', articleBgColor: 'bg-white' })

	let publishToast

	const [thumbnailToArticle, setThumbnailToArticle] = useState(null)

	const contentRef = useRef(null)
	const titleRef = useRef(null)
	const subtitleRef = useRef(null)
	const descriptionRef = useRef(null)
	const thumbnailRef = useRef(null)
	const filePickerRef = useRef(null)
	const tagsRef = useRef(null)

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

	async function addArticleCard(articleId, tags, url = ''){
		const docCardRef = await setDoc(doc(db, 'articleCards', articleId), {
			title: titleRef.current.value,
			description: descriptionRef.current.value,
			date: '27 Jul, 22',
			author: session.user.name,
			uid: session.user.email,
			articleId: articleId,
			thumbnailLink: thumbnailRef.current.value ? thumbnailRef.current.value : url,
			tags: tags,
			articleAccentColor: articleAccentColor
		})
	}

	async function addThumbnailToArticle(articleId, url = ''){
		const docRef = await setDoc(doc(db, 'articles', articleId), {
			thumbnailLink: thumbnailRef.current.value ? thumbnailRef.current.value : url
		  }, { merge: true })
	}

  async function publishArticle(e){
    e.preventDefault()
	
    if(!contentRef.current.value || !titleRef.current.value || !subtitleRef.current.value || (!thumbnailRef.current.value && !thumbnailToArticle)){
		toast.error('Please give the title, subtitle, content, and the thumbnail image', {
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff',
			},
		})
		return
    }
	
	publishToast = toast.loading('Publishing Article...', {
		style: {
			borderRadius: '10px',
			background: '#333',
			color: '#fff',
		},
	})
	const tagsCollection = (tagsRef.current.value).split(',')
	const tags = []
	tagsCollection.map(tag => {
		if(tag[0] == ' '){
			tag = tag.slice(1)
		}
		if(tag[tag.length - 1] == ' '){
			tag = tag.slice(0, tag.length - 1)
		}
		tags.push(tag)
	})

    try {
		const docRef = await addDoc(collection(db, "articles"), {
			content: contentRef.current.value,
			title: titleRef.current.value,
			subtitle: subtitleRef.current.value,
			description: descriptionRef.current.value,
			date: '27 Jul, 22',
			author: session.user.name,
			uid: session.user.email,
			thumbnailLink: thumbnailRef.current.value,
			tags: tags,
			articleAccentColor: articleAccentColor
		})

		if(thumbnailToArticle)
		{
			const uplodaTask = ref(storage, `thumbnails/${docRef.id}`)
			uploadString(uplodaTask, thumbnailToArticle, 'data_url').then((snapshot) => {
				getDownloadURL(ref(storage, snapshot.ref.fullPath))
				.then(url => {

					addArticleCard(docRef.id, tags, url)
					addThumbnailToArticle(docRef.id, url)

					removeThumbnail()
					toast.success('Published!', { id: publishToast, style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff',
					  }, })
					contentRef.current.value = ''
					titleRef.current.value = ''
					subtitleRef.current.value = ''
					descriptionRef.current.value = ''
					thumbnailRef.current.value = ''
					Router.push('/')
				})
			})

		/*
		  uplodaTask.on('state_change', null, err => console.error(err), () => {
			  getDownloadURL(ref(storage, `thumbnails/${docRef.id}`))
			  	.then(url => {
						setThumbnailDownloadURL(url)
					})
		  })
		*/
	  	} else {

			addArticleCard(docRef.id, tags)

			removeThumbnail()
			toast.success('Published!', { id: publishToast,style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff',
			  }, })
			contentRef.current.value = ''
			titleRef.current.value = ''
			subtitleRef.current.value = ''
			descriptionRef.current.value = ''
			thumbnailRef.current.value = ''
			Router.push('/')
		}
    } catch (e) {
      alert('Something went wrong')
      console.log('ERR: DOCADD: ', e)
      return
    }

  }

  	const userInformationMarkup = session ? (<UserInformation accentColor={accentColor} session={session} userInfo={userInfo} />) : (<UserNotLoggedInInfo accentColor={accentColor} />)

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

	const handleCharacterLimit = (e) => {
		if(e.target.name == 'title' && (e.target.value).length > 100)
		{
			e.target.value = (e.target.value).slice(0, -1)
		}
		else if(e.target.name == 'description' && (e.target.value).length > 150)
		{
			e.target.value = (e.target.value).slice(0, -1)
		}
	}

  return (
    <div>
        <Head>
            <title>ResearchBook Editor</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
		<Toaster />

        <main className='h-screen'>
            <Header accentColor={accentColor} home={false} />

              <div className='lg:px-5 mt-5 mb-3 pb-28 max-w-7xl mx-auto'>
                <div className='flex gap-4'>

					<div className='hidden lg:flex w-full lg:w-2/12'>
						{userInformationMarkup}
					</div>
                  
					<form onSubmit={publishArticle} className='flex flex-col w-full h-full lg:w-8/12 pb-5'>
						<div className='flex justify-between items-center lg:w-11/12'>
						<input onChange={handleCharacterLimit} type="text" ref={titleRef} name='title' className='p-2 text-3xl outline-none shadow-none font-bold w-full lg:w-8/12 mb-1' placeholder='Title...' />
						<input type='submit' value='Publish' className={`px-6 h-10 mr-3 lg:mr-0 lg:h-11 text-md ${accentColor.color} ${accentColor.hover} cursor-pointer rounded-md`} />
						</div>
						<input type="text" ref={subtitleRef} name='subtitle' className='p-2 outline-none shadow-none text-2xl font-light opacity-50 w-full lg:w-8/12 mb-5' placeholder='Sub-title...' />

						<textarea onChange={handleCharacterLimit} type="text" ref={descriptionRef} name='description' placeholder='Description...' className='text-md outline-none shadow-none resize-none rounded-xl border-2 border-gray-100 p-2 mb-1 w-full mx-auto lg:mx-0 leading-relaxed font-light flex-wrap' rows={3} />
						<textarea type="text" ref={contentRef} name='content' placeholder='Write your masterpiece...' className='text-xl outline-none shadow-none resize-none p-2 w-full mx-auto lg:mx-0 leading-relaxed font-light flex-wrap' rows={15} />
						

						<div name='Thumbnail' className='border-t-2 mt-2 p-3 w-full'>
							<p className='text-md font-semibold opacity-30 mb-4 cursor-default'>Thumbnail</p>
							<div className='flex flex-col gap-2 justify-between lg:w-full mb-5'>
								<input type="text" ref={thumbnailRef} name='thumbnail' className='p-2 w-11/12 mx-auto rounded-xl outline-none shadow-none text-md font-light opacity-50 border-2' placeholder='Use a link to the thumbnail...' />

								<span className='text-xs cursor-default font-semibold opacity-20 mx-auto'>OR</span>

								{!thumbnailToArticle && <div onClick={() => filePickerRef.current.click()} className='w-11/12 lg:w-7/12 mx-auto p-8 flex items-center justify-center text-sm opacity-50 rounded-lg cursor-pointer bg-gray-100 border-gray-500 border-2 border-dashed'>Click to upload image</div>}
							</div>
							<input ref={filePickerRef} onChange={addThumbnailImageToArticle} type='file' hidden />
							{thumbnailToArticle && (
								<div onClick={removeThumbnail} className=' flex flex-col mx-auto w-4/12 filter hover:brightness-105 transition duration-150 transform cursor-pointer'>
									<Image src={thumbnailToArticle} className="object-contain hidden cursor-pointer rounded-lg mx-auto" width={313} height={176} objectFit='cover' />
									<p className='text-xs text-red-500 text-center'>Remove</p>
								</div>
							)}
						</div>

						<div name='Tags' className='border-t-2 mt-2 p-3 w-full'>
							<div className='w-full'>
								<p className='text-md font-semibold opacity-30 mb-4 cursor-default'>Category</p>
								<div className='flex flex-col gap-2 justify-between lg:w-full mb-5'>
									<CategorySelector />
								</div>
							</div>

							<div className='w-full mt-3 bg-red'>
								<p className='text-md font-semibold opacity-30 mb-4 cursor-default'>Tags</p>
								<div className='flex flex-col gap-2 justify-between lg:w-full mb-5'>
									<input type="text" ref={tagsRef} name='tags' className='p-2 w-11/12 mx-auto rounded-xl outline-none shadow-none text-md font-light opacity-50 border-2' placeholder="Comma (',') seperated..." />
								</div>
							</div>
						</div>

						<div name='ArticleAccent' className='border-t-2 mt-2 p-3 w-full'>
							<p className='text-md font-semibold opacity-30 mb-4 cursor-default'>Accent color</p>
							<AccentColorPicker currentColor={articleAccentColor} setCurrentColorStateFunction={setArticleAccentColor} />
						</div>
					</form>

                </div>
              </div>

              <AppBar accentColor={accentColor} currentPage='create' />
        
        </main>

    </div>
  )
}

export default Create

export async function getServerSideProps(context) {
	//GET THE USER
	const session = await getSession(context)
	const docSnap = await getDoc(doc(db, 'userSettings', session ? session.user.email : 'randomassemailadress@email.com'));
	const userSettingsData = docSnap.exists() ? docSnap.data() : null
  
	return {
	  props: {
		session,
		userSettingsData
	  }
	}
  }