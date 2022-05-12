import Link from 'next/link'
import React, { useState } from 'react'

interface Props {
    name: String,
    followers: String,
    uid: Number,
    articleAccentColor: any
}

function UserInfo({ name, followers, uid, articleAccentColor }:Props) {
    const [following, setFollowing] = useState(false)

    const toggleFollowing = () => {
        if(following) setFollowing(false)
        else setFollowing(true)
    }

    return (
        <div className='w-full py-5 flex flex-col'>
            <div className='flex w-10/12 mx-auto h-24'>
                <Link href={'/profile/' + uid}>
                    <div className='ml-2 cursor-pointer border my-auto border-blue-500 rounded-full h-24 w-24'></div>
                </Link>
                <div className='flex flex-col justify-around pl-5'>
                    <Link href={'/profile/' + uid}>
                        <p className='text-lg cursor-pointer'>{name}</p>
                    </Link>
                    <p className='text-sm opacity-70'>{followers} Followers</p>
                    <div className='flex'>
                        <button onClick={toggleFollowing} className={'px-4 py-2 mt-4 text-sm text-white rounded-full ' + (following ? 'bg-gray-700 hover:bg-gray-900' : `${articleAccentColor.articleInteractiveElementAccent} ${articleAccentColor.articleInteractiveElementAccentHover}`)}>{following ? 'Following' : 'Follow'}</button>
                    </div>
                </div>
            </div>

            <div className=' w-10/12 mx-auto mt-5'>
                <p className='text-sm opacity-60'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, saepe repudiandae reprehenderit impedit natus atque.</p>
            </div>
        </div>
    )
}

export default UserInfo