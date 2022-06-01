import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from "framer-motion"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import toaster from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

import Recommended from '../../components/ArticleComponents/Recommended'
import UserInfo from '../../components/ArticleComponents/UserInfo'
import Header from '../../components/Header'
import ArticleCard from '../../components/MainContentComponents/ArticleCard'
import AppBar from '../../components/AppBar'

import { doc, collection, getDocs, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase'


const articleActionsVariants = {
    hidden: { left: -300, opacity: 0 },
    visible: { left: 0, opacity: 1 },
  }

function Article({ article }) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { id } = router.query

    // const [session, loading] = useSession()
    const [accentColor, setAccentColor] = useState({ name: 'Blue', color: 'bg-blue-500 text-white', primary: 'bg-blue-500', hover: 'hover:bg-blue-600', secondary: 'bg-blue-100', secondaryHover: 'hover:bg-blue-200', text: 'text-white', contentText: 'text-black', icon: 'text-blue-500' })
    const [fullBgTheme, setFullBgTheme] = useState(true)
    
    const [following, setFollowing] = useState(false)

    let loadingUserAccents

    const [articleDetails, setArticleDetails] = useState({
        uid: 2,
        author: 'D Maxwell',
        date: '20 Feb, 22',
        title: "How and why is the demonlord so menacing?",
        subtitle: "Demonlord's pursuits",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem asperiores facere id est adipisci nesciunt totam odit, cum dolores non ipsam aut eius similique repudiandae assumenda. Non asperiores ipsum consequuntur officiis. Voluptas placeat vel similique sapiente quasi dolorum, cum nostrum, perferendis veniam quibusdam doloribus, dolorem aperiam suscipit temporibus iste? Consectetur hic saepe cupiditate qui accusantium corporis? Sunt in dolorum esse obcaecati, consequuntur aliquid natus eum quis doloremque quibusdam vel praesentium corporis quasi non facilis quia possimus. Iste exercitationem amet cumque ab, illum, et quaerat enim asperiores excepturi rerum quos aspernatur veritatis ducimus ipsam soluta corrupti deleniti quisquam autem deserunt earum.",
        thumbnailLink: 'https://images.unsplash.com/photo-1448772917253-74bbbe249b30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        articleAccentColor: {
            articleBgColor: 'bg-white',
            articleInteractiveElementAccent: 'bg-blue-500',
            articleInteractiveElementAccentHover: 'bg-blue-600'
        }
    })

    useEffect(() => {
        if(article) setArticleDetails(article)
    }, [article])

    useEffect(() => {
        setArticleAccentColor(articleDetails.articleAccentColor)
    }, [articleDetails])

    useEffect(async () => {
        // GET THE ACCENT PREFERENCE OF THE USER IF IT EXISTS
        if(session)
        {
            loadingUserAccents = toast.loading('Loading Accents', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
            const docSnap = await getDoc(doc(db, 'userSettings', session ? session.user.email : 'randomassemailadress@email.com'));
	        const userSettingsData = docSnap.exists ? docSnap.data() : null
            setAccentColor(userSettingsData.appearenceSettingsData.accentColor.color)
            setFullBgTheme(userSettingsData.appearenceSettingsData.theming.fullPageTheming)

            toast.success('Personalized!', { id: loadingUserAccents, style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              }, })
        }
    }, [session])

    const addToReadlist = async (e) => {
        if (!session){
            const toast = toaster.error('Log in to add the article to your readlist', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
            return
        }

        const toast = toaster.loading('Adding to Readlist', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        })
                  
        
        try {
            const articleCardSnap = await getDoc(doc(db, 'articleCards', id))

            await updateDoc(doc(db, 'readlists', session ? session.user.email : 'somerandomemail@email.com'), {
                info: arrayUnion({
                  articleId: id,
                  title: articleDetails.title,
                  description: articleCardSnap.exists() ? articleCardSnap.data().description : '',
                  author: articleDetails.author,
                  thumbnailLink: articleDetails.thumbnailLink
                })
            });
    
            toaster.success('Added to Readlist', {
              id: toast
            })
        } catch (error) {
          alert('Something went wrong')
          console.log('ERR: READLISTADD: ', e)
          return
        }
    }

    const [articleAccentColor, setArticleAccentColor] = useState((articleDetails.articleAccentColor && articleDetails.articleAccentColor.articleBgColor != 'bg-white') ? articleDetails.articleAccentColor : {
        articleBgColor: 'bg-white',
        articleCardAccent: "bg-white",
        articleInteractiveElementAccent: accentColor.primary,
        articleInteractiveElementAccentHover: accentColor.hover,
        articleContentElementAccent: "text-black"
    })
    useEffect(() => {
        setArticleAccentColor((articleDetails.articleAccentColor && articleDetails.articleAccentColor.articleBgColor != 'bg-white') ? articleDetails.articleAccentColor : {
            articleBgColor: 'bg-white',
            articleCardAccent: "bg-white",
            articleInteractiveElementAccent: accentColor.primary,
            articleInteractiveElementAccentHover: accentColor.hover,
            articleContentElementAccent: "text-black"
        })
    }, [accentColor])

    const recommendedArticles = [
        {title: 'How to nuke a country effectively?', description: 'You have to be vigilant about prying eyes when it comes to nuking...', author: 'Demonlord', date: '14 Feb, 22', thumbnailLink: articleDetails.thumbnailLink},
        {title: 'Nuking heaven will be the best thing that will happen to us', description: 'It has been a while since the heaven has been nuked. Those gods need to be fucked...', author: 'Minion of demonlord', date: '15 Feb, 22', thumbnailLink: articleDetails.thumbnailLink},
    ]

    const recommendedArticlesMarkup = recommendedArticles.map((article, index) => {
        return <ArticleCard thumbnailLink={article.thumbnailLink} key={index} title={article.title} description={article.description} author={article.author} date={article.date} />
    })

    const toggleFollowing = () => {
        if(following) setFollowing(false)
        else setFollowing(true)
    }

    

  return (
    <div className='flex h-[1&#37;] after:content-none after:hidden after:clear-both after:h-0 flex-col gap-14'>
        <Head>
            <title>{articleDetails.title} | Researchbook</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toaster />

        <main className='h-screen'>
            <div className={articleAccentColor.articleBgColor}>
                <Header accentColor={accentColor} bgColor={articleAccentColor.articleBgColor} page='article' searchProp='' />
            </div>

            <div className={`${articleAccentColor.articleBgColor} overflow-scroll`}>
                <div className='lg:px-5 pb-14 mt-5 mb-3 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between h-screen relative gap-2'>
                    <div className='w-full h-full lg:w-8/12 mb-20 relative'>
                        <div className='flex w-11/12 lg:w-10/12 mx-auto mt-8'>
                            <Link href={'/profile/' + articleDetails.uid}>
                                <div className='ml-2 cursor-pointer border my-auto border-blue-500 rounded-full h-14 w-14'></div>
                            </Link>
                            <div className='flex flex-col flex-grow pl-5 my-auto justify-between'>
                                <div className='flex items-center'>
                                    <Link href={'/profile/' + articleDetails.uid}>
                                        <p className='text-lg cursor-pointer'>{articleDetails.author}</p>
                                    </Link>
                                    <button onClick={toggleFollowing} className={'px-3 py-1 ml-3 text-sm lg:hidden text-white rounded-full ' + (following ? 'bg-gray-700 hover:bg-gray-900' : `${articleAccentColor.articleInteractiveElementAccent} ${articleAccentColor.articleInteractiveElementAccentHover}`)}>{following ? 'Following' : 'Follow'}</button>
                                </div>
                                <p className='text-sm opacity-60'>{articleDetails.date}</p>
                            </div>
                            <div className='flex items-center justify-center my-auto'>
                                <svg onClick={addToReadlist} className='h-7 text-gray-500 opacity-75 w-7 hover:scale-110 cursor-pointer' version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <defs>
                                    <symbol id="v" overflow="visible">
                                    <path d="m18.766-1.125c-0.96875 0.5-1.9805 0.875-3.0312 1.125-1.043 0.25781-2.1367 0.39062-3.2812 0.39062-3.3984 0-6.0898-0.94531-8.0781-2.8438-1.9922-1.9062-2.9844-4.4844-2.9844-7.7344 0-3.2578 0.99219-5.8359 2.9844-7.7344 1.9883-1.9062 4.6797-2.8594 8.0781-2.8594 1.1445 0 2.2383 0.13281 3.2812 0.39062 1.0508 0.25 2.0625 0.625 3.0312 1.125v4.2188c-0.98047-0.65625-1.9453-1.1406-2.8906-1.4531-0.94922-0.3125-1.9492-0.46875-3-0.46875-1.875 0-3.3516 0.60547-4.4219 1.8125-1.0742 1.1992-1.6094 2.8555-1.6094 4.9688 0 2.1055 0.53516 3.7617 1.6094 4.9688 1.0703 1.1992 2.5469 1.7969 4.4219 1.7969 1.0508 0 2.0508-0.14844 3-0.45312 0.94531-0.3125 1.9102-0.80078 2.8906-1.4688z"/>
                                    </symbol>
                                    <symbol id="c" overflow="visible">
                                    <path d="m13.734-11.141c-0.4375-0.19531-0.87109-0.34375-1.2969-0.4375-0.41797-0.10156-0.83984-0.15625-1.2656-0.15625-1.2617 0-2.2305 0.40625-2.9062 1.2188-0.67969 0.80469-1.0156 1.9531-1.0156 3.4531v7.0625h-4.8906v-15.312h4.8906v2.5156c0.625-1 1.3438-1.7266 2.1562-2.1875 0.82031-0.46875 1.8008-0.70312 2.9375-0.70312 0.16406 0 0.34375 0.011719 0.53125 0.03125 0.19531 0.011719 0.47656 0.039062 0.84375 0.078125z"/>
                                    </symbol>
                                    <symbol id="a" overflow="visible">
                                    <path d="m17.641-7.7031v1.4062h-11.453c0.125 1.1484 0.53906 2.0078 1.25 2.5781 0.70703 0.57422 1.7031 0.85938 2.9844 0.85938 1.0312 0 2.082-0.14844 3.1562-0.45312 1.082-0.3125 2.1914-0.77344 3.3281-1.3906v3.7656c-1.1562 0.4375-2.3125 0.76562-3.4688 0.98438-1.1562 0.22656-2.3125 0.34375-3.4688 0.34375-2.7734 0-4.9297-0.70312-6.4688-2.1094-1.5312-1.4062-2.2969-3.3789-2.2969-5.9219 0-2.5 0.75391-4.4609 2.2656-5.8906 1.5078-1.4375 3.582-2.1562 6.2188-2.1562 2.4062 0 4.332 0.73047 5.7812 2.1875 1.4453 1.4492 2.1719 3.3828 2.1719 5.7969zm-5.0312-1.625c0-0.92578-0.27344-1.6719-0.8125-2.2344-0.54297-0.57031-1.25-0.85938-2.125-0.85938-0.94922 0-1.7188 0.26562-2.3125 0.79688s-0.96484 1.2969-1.1094 2.2969z"/>
                                    </symbol>
                                    <symbol id="k" overflow="visible">
                                    <path d="m9.2188-6.8906c-1.0234 0-1.793 0.17188-2.3125 0.51562-0.51172 0.34375-0.76562 0.85547-0.76562 1.5312 0 0.625 0.20703 1.1172 0.625 1.4688 0.41406 0.34375 0.98828 0.51562 1.7188 0.51562 0.92578 0 1.7031-0.32812 2.3281-0.98438 0.63281-0.66406 0.95312-1.4922 0.95312-2.4844v-0.5625zm7.4688-1.8438v8.7344h-4.9219v-2.2656c-0.65625 0.92969-1.3984 1.6055-2.2188 2.0312-0.82422 0.41406-1.8242 0.625-3 0.625-1.5859 0-2.8711-0.45703-3.8594-1.375-0.99219-0.92578-1.4844-2.1289-1.4844-3.6094 0-1.7891 0.61328-3.1016 1.8438-3.9375 1.2383-0.84375 3.1797-1.2656 5.8281-1.2656h2.8906v-0.39062c0-0.76953-0.30859-1.332-0.92188-1.6875-0.61719-0.36328-1.5703-0.54688-2.8594-0.54688-1.0547 0-2.0312 0.10547-2.9375 0.3125-0.89844 0.21094-1.7305 0.52344-2.5 0.9375v-3.7344c1.0391-0.25 2.0859-0.44141 3.1406-0.57812 1.0625-0.13281 2.125-0.20312 3.1875-0.20312 2.7578 0 4.75 0.54688 5.9688 1.6406 1.2266 1.0859 1.8438 2.8555 1.8438 5.3125z"/>
                                    </symbol>
                                    <symbol id="b" overflow="visible">
                                    <path d="m7.7031-19.656v4.3438h5.0469v3.5h-5.0469v6.5c0 0.71094 0.14062 1.1875 0.42188 1.4375s0.83594 0.375 1.6719 0.375h2.5156v3.5h-4.1875c-1.9375 0-3.3125-0.39844-4.125-1.2031-0.80469-0.8125-1.2031-2.1797-1.2031-4.1094v-6.5h-2.4219v-3.5h2.4219v-4.3438z"/>
                                    </symbol>
                                    <symbol id="j" overflow="visible">
                                    <path d="m12.766-13.078v-8.2031h4.9219v21.281h-4.9219v-2.2188c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2969 1.8125-5.7969 1.207-1.5 2.7539-2.25 4.6406-2.25 1.0625 0 2 0.21484 2.8125 0.64062 0.82031 0.42969 1.5664 1.0859 2.2344 1.9688zm-3.2188 9.9219c1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406z"/>
                                    </symbol>
                                    <symbol id="i" overflow="visible">
                                    <path d="m10.5-3.1562c1.0508 0 1.8516-0.37891 2.4062-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3555-1.1562-2.4062-1.1562-1.0547 0-1.8594 0.38672-2.4219 1.1562-0.55469 0.77344-0.82812 1.8828-0.82812 3.3281 0 1.4492 0.27344 2.5586 0.82812 3.3281 0.5625 0.77344 1.3672 1.1562 2.4219 1.1562zm-3.25-9.9219c0.67578-0.88281 1.4219-1.5391 2.2344-1.9688 0.82031-0.42578 1.7656-0.64062 2.8281-0.64062 1.8945 0 3.4453 0.75 4.6562 2.25 1.207 1.5 1.8125 3.4336 1.8125 5.7969 0 2.3555-0.60547 4.2812-1.8125 5.7812-1.2109 1.5-2.7617 2.25-4.6562 2.25-1.0625 0-2.0078-0.21094-2.8281-0.625-0.8125-0.42578-1.5586-1.0859-2.2344-1.9844v2.2188h-4.8906v-21.281h4.8906z"/>
                                    </symbol>
                                    <symbol id="h" overflow="visible">
                                    <path d="m0.34375-15.312h4.8906l4.125 10.391 3.5-10.391h4.8906l-6.4375 16.766c-0.64844 1.6953-1.4023 2.8828-2.2656 3.5625-0.86719 0.6875-2 1.0312-3.4062 1.0312h-2.8438v-3.2188h1.5312c0.83203 0 1.4375-0.13672 1.8125-0.40625 0.38281-0.26172 0.67969-0.73047 0.89062-1.4062l0.14062-0.42188z"/>
                                    </symbol>
                                    <symbol id="g" overflow="visible">
                                    <path d="m0.82812-20.406h5.0469l3.5312 14.828 3.5-14.828h5.0781l3.5 14.828 3.5156-14.828h5.0156l-4.8125 20.406h-6.0781l-3.7031-15.516-3.6562 15.516h-6.0781z"/>
                                    </symbol>
                                    <symbol id="d" overflow="visible">
                                    <path d="m9.6406-12.188c-1.0859 0-1.9141 0.39062-2.4844 1.1719-0.57422 0.78125-0.85938 1.9062-0.85938 3.375s0.28516 2.5938 0.85938 3.375c0.57031 0.77344 1.3984 1.1562 2.4844 1.1562 1.0625 0 1.875-0.38281 2.4375-1.1562 0.57031-0.78125 0.85938-1.9062 0.85938-3.375s-0.28906-2.5938-0.85938-3.375c-0.5625-0.78125-1.375-1.1719-2.4375-1.1719zm0-3.5c2.6328 0 4.6914 0.71484 6.1719 2.1406 1.4766 1.418 2.2188 3.3867 2.2188 5.9062 0 2.5117-0.74219 4.4805-2.2188 5.9062-1.4805 1.418-3.5391 2.125-6.1719 2.125-2.6484 0-4.7148-0.70703-6.2031-2.125-1.4922-1.4258-2.2344-3.3945-2.2344-5.9062 0-2.5195 0.74219-4.4883 2.2344-5.9062 1.4883-1.4258 3.5547-2.1406 6.2031-2.1406z"/>
                                    </symbol>
                                    <symbol id="f" overflow="visible">
                                    <path d="m2.1875-5.9688v-9.3438h4.9219v1.5312c0 0.83594-0.007813 1.875-0.015625 3.125-0.011719 1.25-0.015625 2.0859-0.015625 2.5 0 1.2422 0.03125 2.1328 0.09375 2.6719 0.070313 0.54297 0.17969 0.93359 0.32812 1.1719 0.20703 0.32422 0.47266 0.57422 0.79688 0.75 0.32031 0.16797 0.69141 0.25 1.1094 0.25 1.0195 0 1.8203-0.39062 2.4062-1.1719 0.58203-0.78125 0.875-1.8672 0.875-3.2656v-7.5625h4.8906v15.312h-4.8906v-2.2188c-0.74219 0.89844-1.5234 1.5586-2.3438 1.9844-0.82422 0.41406-1.7344 0.625-2.7344 0.625-1.7617 0-3.1055-0.53906-4.0312-1.625-0.92969-1.082-1.3906-2.6602-1.3906-4.7344z"/>
                                    </symbol>
                                    <symbol id="u" overflow="visible">
                                    <path d="m10.75-12.516c0.82031 0 1.4453-0.17969 1.875-0.54688 0.4375-0.36328 0.65625-0.89844 0.65625-1.6094 0-0.69531-0.21875-1.2266-0.65625-1.5938-0.42969-0.375-1.0547-0.5625-1.875-0.5625h-2.9219v4.3125zm0.17188 8.9375c1.0625 0 1.8594-0.22266 2.3906-0.67188 0.53125-0.44531 0.79688-1.125 0.79688-2.0312 0-0.88281-0.26562-1.5469-0.79688-1.9844-0.52344-0.4375-1.3203-0.65625-2.3906-0.65625h-3.0938v5.3438zm4.8906-7.3438c1.1328 0.32422 2.0078 0.92969 2.625 1.8125 0.625 0.88672 0.9375 1.9688 0.9375 3.25 0 1.9688-0.66797 3.4375-2 4.4062-1.3359 0.96875-3.3555 1.4531-6.0625 1.4531h-8.7344v-20.406h7.8906c2.832 0 4.8828 0.42969 6.1562 1.2812 1.2812 0.85547 1.9219 2.2266 1.9219 4.1094 0 1-0.23438 1.8516-0.70312 2.5469-0.46875 0.6875-1.1484 1.2031-2.0312 1.5469z"/>
                                    </symbol>
                                    <symbol id="e" overflow="visible">
                                    <path d="m17.75-9.3281v9.3281h-4.9219v-7.1406c0-1.3203-0.03125-2.2344-0.09375-2.7344s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-15.312h4.8906v2.2344c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z"/>
                                    </symbol>
                                    <symbol id="t" overflow="visible">
                                    <path d="m2.3594-15.312h4.8906v15.312h-4.8906zm0-5.9688h4.8906v4h-4.8906z"/>
                                    </symbol>
                                    <symbol id="s" overflow="visible">
                                    <path d="m12.766-2.5938c-0.66797 0.88672-1.4062 1.543-2.2188 1.9688-0.8125 0.41797-1.7578 0.625-2.8281 0.625-1.8672 0-3.4062-0.73438-4.625-2.2031-1.2188-1.4766-1.8281-3.3516-1.8281-5.625 0-2.2891 0.60938-4.1641 1.8281-5.625 1.2188-1.4688 2.7578-2.2031 4.625-2.2031 1.0703 0 2.0156 0.21484 2.8281 0.64062 0.8125 0.41797 1.5508 1.0742 2.2188 1.9688v-2.2656h4.9219v13.766c0 2.457-0.77734 4.3359-2.3281 5.6406-1.5547 1.3008-3.8086 1.9531-6.7656 1.9531-0.94922 0-1.8711-0.074219-2.7656-0.21875-0.89844-0.14844-1.7969-0.37109-2.7031-0.67188v-3.8125c0.86328 0.48828 1.7031 0.85156 2.5156 1.0938 0.82031 0.23828 1.6484 0.35938 2.4844 0.35938 1.6016 0 2.7734-0.35156 3.5156-1.0469 0.75-0.69922 1.125-1.7969 1.125-3.2969zm-3.2188-9.5312c-1.0117 0-1.8047 0.375-2.375 1.125-0.5625 0.74219-0.84375 1.7969-0.84375 3.1719 0 1.3984 0.26953 2.4609 0.8125 3.1875 0.55078 0.71875 1.3516 1.0781 2.4062 1.0781 1.0195 0 1.8125-0.36719 2.375-1.1094 0.5625-0.75 0.84375-1.8008 0.84375-3.1562 0-1.375-0.28125-2.4297-0.84375-3.1719-0.5625-0.75-1.3555-1.125-2.375-1.125z"/>
                                    </symbol>
                                    <symbol id="r" overflow="visible">
                                    <path d="m12.422-21.281v3.2188h-2.7031c-0.6875 0-1.1719 0.125-1.4531 0.375-0.27344 0.25-0.40625 0.6875-0.40625 1.3125v1.0625h4.1875v3.5h-4.1875v11.812h-4.8906v-11.812h-2.4375v-3.5h2.4375v-1.0625c0-1.6641 0.46094-2.8984 1.3906-3.7031 0.92578-0.80078 2.3672-1.2031 4.3281-1.2031z"/>
                                    </symbol>
                                    <symbol id="q" overflow="visible">
                                    <path d="m16.547-12.766c0.61328-0.94531 1.3477-1.6719 2.2031-2.1719 0.85156-0.5 1.7891-0.75 2.8125-0.75 1.7578 0 3.0977 0.54688 4.0156 1.6406 0.92578 1.0859 1.3906 2.6562 1.3906 4.7188v9.3281h-4.9219v-7.9844-0.35938c0.007813-0.13281 0.015625-0.32031 0.015625-0.5625 0-1.082-0.16406-1.8633-0.48438-2.3438-0.3125-0.48828-0.82422-0.73438-1.5312-0.73438-0.92969 0-1.6484 0.38672-2.1562 1.1562-0.51172 0.76172-0.77344 1.8672-0.78125 3.3125v7.5156h-4.9219v-7.9844c0-1.6953-0.14844-2.7852-0.4375-3.2656-0.29297-0.48828-0.8125-0.73438-1.5625-0.73438-0.9375 0-1.6641 0.38672-2.1719 1.1562-0.51172 0.76172-0.76562 1.8594-0.76562 3.2969v7.5312h-4.9219v-15.312h4.9219v2.2344c0.60156-0.86328 1.2891-1.5156 2.0625-1.9531 0.78125-0.4375 1.6406-0.65625 2.5781-0.65625 1.0625 0 2 0.25781 2.8125 0.76562 0.8125 0.51172 1.4258 1.2305 1.8438 2.1562z"/>
                                    </symbol>
                                    <symbol id="p" overflow="visible">
                                    <path d="m17.75-9.3281v9.3281h-4.9219v-7.1094c0-1.3438-0.03125-2.2656-0.09375-2.7656s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-21.281h4.8906v8.2031c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z"/>
                                    </symbol>
                                    <symbol id="o" overflow="visible">
                                    <path d="m2.5781-20.406h5.875l7.4219 14v-14h4.9844v20.406h-5.875l-7.4219-14v14h-4.9844z"/>
                                    </symbol>
                                    <symbol id="n" overflow="visible">
                                    <path d="m2.5781-20.406h8.7344c2.5938 0 4.582 0.57812 5.9688 1.7344 1.3945 1.1484 2.0938 2.7891 2.0938 4.9219 0 2.1367-0.69922 3.7812-2.0938 4.9375-1.3867 1.1562-3.375 1.7344-5.9688 1.7344h-3.4844v7.0781h-5.25zm5.25 3.8125v5.7031h2.9219c1.0195 0 1.8047-0.25 2.3594-0.75 0.5625-0.5 0.84375-1.2031 0.84375-2.1094 0-0.91406-0.28125-1.6172-0.84375-2.1094-0.55469-0.48828-1.3398-0.73438-2.3594-0.73438z"/>
                                    </symbol>
                                    <symbol id="m" overflow="visible">
                                    <path d="m2.3594-15.312h4.8906v15.031c0 2.0508-0.49609 3.6172-1.4844 4.7031-0.98047 1.082-2.4062 1.625-4.2812 1.625h-2.4219v-3.2188h0.85938c0.92578 0 1.5625-0.21094 1.9062-0.625 0.35156-0.41797 0.53125-1.2461 0.53125-2.4844zm0-5.9688h4.8906v4h-4.8906z"/>
                                    </symbol>
                                    <symbol id="l" overflow="visible">
                                    <path d="m14.719-14.828v3.9844c-0.65625-0.45703-1.3242-0.79688-2-1.0156-0.66797-0.21875-1.3594-0.32812-2.0781-0.32812-1.3672 0-2.4336 0.40234-3.2031 1.2031-0.76172 0.79297-1.1406 1.9062-1.1406 3.3438 0 1.4297 0.37891 2.543 1.1406 3.3438 0.76953 0.79297 1.8359 1.1875 3.2031 1.1875 0.75781 0 1.4844-0.10938 2.1719-0.32812 0.6875-0.22656 1.3203-0.56641 1.9062-1.0156v4c-0.76172 0.28125-1.5391 0.48828-2.3281 0.625-0.78125 0.14453-1.5742 0.21875-2.375 0.21875-2.7617 0-4.9219-0.70703-6.4844-2.125-1.5547-1.4141-2.3281-3.3828-2.3281-5.9062 0-2.5312 0.77344-4.5039 2.3281-5.9219 1.5625-1.4141 3.7227-2.125 6.4844-2.125 0.80078 0 1.5938 0.074219 2.375 0.21875 0.78125 0.13672 1.5547 0.35156 2.3281 0.64062z"/>
                                    </symbol>
                                    </defs>
                                    <g>
                                    <path d="m507.47 28h-314.95c-8.3477 0-16.352 3.3164-22.254 9.2188-5.9023 5.9023-9.2188 13.906-9.2188 22.254v441c-0.046876 8.3711 3.2422 16.418 9.1445 22.359 5.9023 5.9414 13.926 9.2852 22.301 9.293s16.406-3.3242 22.316-9.2539l135.18-135.35 135.24 135.24c5.9141 5.9297 13.945 9.2578 22.316 9.25 8.375-0.007813 16.398-3.3516 22.301-9.2891 5.9023-5.9414 9.1914-13.988 9.1445-22.363v-440.89c0-8.3555-3.3242-16.371-9.2383-22.273-5.9141-5.9062-13.934-9.2148-22.289-9.1992zm0 472.47-157.47-157.47-157.47 157.47v-441h314.95z"/>
                                    <path d="m263.37 220.92h67.199v67.199c0 4.3594 3.5352 7.8945 7.8984 7.8945h23.633c4.3594 0 7.8945-3.5352 7.8945-7.8945v-67.199h67.199c4.207-0.32812 7.4141-3.9062 7.2812-8.1211v-23.352c0-4.3633-3.5352-7.8984-7.8984-7.8984h-67.199v-67.199c0-4.3594-3.5352-7.8945-7.8945-7.8945h-23.297c-4.3594 0-7.8945 3.5352-7.8945 7.8945v67.199h-67.199c-4.3633 0-7.8984 3.5352-7.8984 7.8984v23.352c-0.0625 2.1797 0.78125 4.293 2.3281 5.832 1.5508 1.5352 3.668 2.3672 5.8477 2.2891z"/>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-3xl pt-8 font-bold w-11/12 lg:w-10/12 mx-auto">{articleDetails.title}</h1>
                        <h2 className='text-2xl pt-1 font-light w-11/12 lg:w-10/12 mx-auto opacity-50'>{articleDetails.subtitle}</h2>

                        <div className='mt-8 w-full mx-auto flex justify-center'>
                            <Image src={articleDetails.thumbnailLink} className="object-contain inline mx-auto mt-24" width={690} height={388} objectFit='cover' /> {/* w:850 h:478 */}
                        </div>

                        <p className='text-lg lg:text-xl leading-8 lg:leading-loose pt-8 w-11/12 lg:w-10/12 mx-auto font-light'>{articleDetails.content}</p>

                        <motion.div initial='hidden' animate='visible' variants={articleActionsVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.0 }} className={'rounded-full flex z-50 p-3  justify-around fixed bottom-20 lg:bottom-10 ml-3 lg:ml-8 border-[1px] border-gray-400 bg-white shadow-xl ' + articleAccentColor.articleBgColor}>
                            <button className='h-full w-16 flex justify-center hover:font-semibold px-2 border-gray-400 border-r-2 text-sm'>
                                <svg version="1.1" className="h-6 w-6 inline-block hover:scale-110" id="Capa_1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 297.221 297.221" xmlSpace="preserve">
                                    <g>
                                        <path d="M283.762,32.835c2.705-1.913,3.346-5.658,1.432-8.363c-1.914-2.705-5.657-3.347-8.363-1.432l-14.984,10.602
                                            c-2.705,1.913-3.346,5.658-1.432,8.363c1.169,1.652,3.022,2.535,4.902,2.535c1.198,0,2.408-0.358,3.461-1.104L283.762,32.835z"/>
                                        <path d="M244.064,29.387c0.695,0.262,1.409,0.386,2.11,0.386c2.428,0,4.713-1.484,5.617-3.891l6.46-17.182
                                            c1.166-3.101-0.403-6.561-3.505-7.727c-3.101-1.167-6.562,0.404-7.728,3.505l-6.46,17.182
                                            C239.393,24.761,240.962,28.221,244.064,29.387z"/>
                                        <path d="M291.223,55.611c-0.041,0-0.082,0-0.124,0l-18.351,0.154c-3.313,0.067-5.944,2.605-5.877,5.918
                                            c0.066,3.271,2.739,5.928,5.997,5.928c0.041,0,0.082,0,0.124,0l18.351-0.313c3.313-0.068,5.944-2.732,5.877-6.045
                                            C297.154,57.982,294.481,55.611,291.223,55.611z"/>
                                        <path d="M254.2,147.154c-3.073-2.433-6.711-4.089-10.557-4.867c0.254-0.46,0.491-0.928,0.715-1.403l2.408-2.408
                                            c9.274-9.275,10.248-23.874,2.264-33.961c-3.769-4.761-9.001-7.925-14.812-9.106c0.415-0.764,0.783-1.545,1.117-2.338
                                            c6.316-9.149,6.213-21.445-0.782-30.283c-3.77-4.764-9.004-7.938-14.818-9.117c4.8-8.826,4.187-19.826-2.225-27.925
                                            c-4.848-6.125-12.109-9.639-19.923-9.639c-6.257,0-12.16,2.236-16.792,6.33c-0.701-3.979-2.363-7.822-5.012-11.169
                                            c-4.849-6.125-12.11-9.638-19.924-9.639l0,0c-6.79,0-13.164,2.635-17.947,7.418l-60.84,60.84l-0.232-8.12
                                            c-0.107-13.83-11.392-25.049-25.247-25.049c-13.604,0-24.729,10.815-25.229,24.298l-12.146,88.306l-9.983,11.604
                                            c-5.983,6.957-5.582,17.481,0.915,23.962L19.987,199.7c-4.574,6.881-3.773,16.266,2.206,22.23l69.667,69.557
                                            c3.329,3.321,7.748,5.148,12.446,5.148c3.857,0,7.668-1.295,10.729-3.645l14.544-11.168c13.991-3.305,29.416-10.813,45.874-22.33
                                            c14.371-10.058,29.962-23.46,46.337-39.836l34.631-34.631c5.107-5.107,7.795-12.188,7.375-19.427
                                            C263.376,158.371,259.879,151.649,254.2,147.154z M188.124,32.009c2.603-2.602,6.032-3.903,9.462-3.903
                                            c3.915,0,7.831,1.695,10.515,5.086c4.256,5.377,3.51,13.18-1.339,18.028l-6.177,6.176c-0.952,0.635-1.879,1.314-2.747,2.083
                                            c-0.701-3.98-2.364-7.823-5.013-11.169c-3.257-4.114-7.604-7.043-12.475-8.527L188.124,32.009z M146.397,17.532
                                            c2.602-2.602,6.032-3.903,9.462-3.903c3.916,0.001,7.831,1.696,10.515,5.087c4.256,5.377,3.51,13.179-1.339,18.027l-70.919,70.186
                                            l-0.233-8.119c-0.061-7.825-3.7-14.812-9.356-19.405L146.397,17.532z M13.624,176.391c-2.082-2.078-2.209-5.41-0.291-7.64
                                            l12.281-14.277c0.006-0.007,0.011-0.017,0.012-0.026l12.72-92.483c0-7.286,5.961-13.247,13.247-13.247
                                            c7.286,0,13.248,5.961,13.248,13.247L65.186,74c-11.988,1.646-21.322,11.733-21.78,24.057l-12.145,88.307l-3.533,4.108
                                            L13.624,176.391z M247.935,176.539l-34.63,34.631c-29.577,29.577-60.494,53.318-87.653,59.237
                                            c-0.825,0.181-1.601,0.528-2.271,1.043l-15.655,12.022c-1.014,0.779-2.219,1.162-3.419,1.162c-1.443,0-2.88-0.555-3.968-1.641
                                            l-69.671-69.56c-2.083-2.077-2.21-5.409-0.291-7.64l12.28-14.276c0.007-0.008,0.011-0.017,0.013-0.026l12.719-92.483
                                            c0-7.286,5.962-13.248,13.248-13.248c7.286,0,13.247,5.962,13.247,13.248l0.626,21.824c0.104,3.626,3.087,5.987,6.191,5.987
                                            c1.514,0,3.058-0.563,4.309-1.813l70.431-70.431c2.603-2.603,6.031-3.903,9.462-3.903c3.915,0,7.831,1.695,10.515,5.086
                                            c4.256,5.377,3.509,13.18-1.34,18.028l-48.518,48.518c-2.519,2.52-2.519,6.603,0,9.121l0,0c1.275,1.275,2.946,1.913,4.617,1.913
                                            s3.343-0.638,4.617-1.913l62.374-62.373c2.602-2.603,6.031-3.903,9.462-3.903c3.915,0.001,7.831,1.696,10.515,5.087
                                            c4.256,5.376,3.509,13.179-1.34,18.027l-62.081,62.081c-2.553,2.554-2.553,6.692,0,9.246c1.258,1.258,2.906,1.887,4.556,1.887
                                            c1.648,0,3.297-0.629,4.555-1.887l48.811-48.81c2.603-2.603,6.032-3.903,9.462-3.903c3.915,0,7.831,1.695,10.515,5.087
                                            c4.256,5.376,3.509,13.179-1.34,18.027l-48.349,48.35c-2.612,2.611-2.612,6.847,0,9.458l0.078,0.079
                                            c1.207,1.207,2.789,1.81,4.37,1.81c1.582,0,3.164-0.603,4.37-1.81l29.974-29.974c2.701-2.701,6.317-4.129,9.921-4.129
                                            c2.867,0,5.726,0.904,8.107,2.789C253.114,161.598,253.508,170.967,247.935,176.539z"/>
                                    </g>
                                </svg>
                            </button>
                            <button className='h-full w-16 flex justify-center hover:font-semibold px-2 text-sm'>
                                <svg version="1.1" id="Layer_1" className="h-6 w-6 inline-block hover:scale-110" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 32 32" enable-background="new 0 0 32 32" xmlSpace="preserve">
                                        <polygon fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="4,7 4,25 13,25 16,28 19,25 28,25 28,7 "/>
                                        <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="9" y1="12" x2="23" y2="12"/>
                                        <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="9" y1="16" x2="23" y2="16"/>
                                        <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="9" y1="20" x2="19" y2="20"/>
                                </svg>
                            </button>
                        </motion.div>

                        <div className={`w-full lg:w-10/12 mx-auto ${articleAccentColor.articleBgColor} mt-16 pt-4 pb-32 lg:pb-28 -z-10`}>
                            <p className='text-md px-5 font-semibold opacity-40 cursor-default'>Related to this</p>

                            {recommendedArticlesMarkup}   
                        </div>                   
                    </div>

                    <div className='hidden h-min lg:block lg:w-4/12 border-l-2 sticky bottom-0'>
                        <div className='pt-4 w-11/12 lg:w-10/12 mx-auto'>
                            <UserInfo articleAccentColor={articleAccentColor} name={articleDetails.author} followers="1.1M" uid={articleDetails.uid} />
                            <Recommended />
                            <div className='my-8 mb-4 w-11/12'>
                                <p className='text-sm opacity-50'>ResearchBook | Massive information network</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <AppBar bgColor={articleAccentColor.articleBgColor} />
    </div>
  )
}

export default Article

export async function getStaticPaths() {

    const articlesSnapshot = await getDocs(collection(db, "articles"))

    let paths = []

    articlesSnapshot?.forEach(article => {
        paths.push({
            params: {
                id: article.id,
            }
        })
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params }) => {

    const docSnap = await getDoc(doc(db, 'articles', params?.id));

    if(!docSnap.exists) return {
        notFound: true
    }

    const article = docSnap.data()

    return {
        props: {
            article,
        }
    }
}