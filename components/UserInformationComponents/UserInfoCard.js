import React from 'react'
import Link from 'next/link';

function UserInfoCard({ name, fieldOfExpertise, jobDesignation, username, articles, followers, following, uid }) {
  return (
    <div>
        <div className='p-2 mx-auto w-full hidden lg:block bg-blue-100 rounded-xl'>
            <Link href={'/profile/' + uid}>
                <div className='cursor-pointer p-1 rounded-lg hover:bg-blue-200'>
                    <p className='pl-2 text-xl font-semibold'>{name}</p>
                    <div className='flex space-2 pt-3'>
                        <div className='border-2 border-blue-500 rounded-full h-10 w-10 mt-2 ml-3 lg:ml-0'></div>
                        <div className='mx-4'>
                            <p className='text-sm font-semibold'>{fieldOfExpertise}</p>
                            <p className='text-sm font-semibold'>{jobDesignation}</p>
                            <p className='text-sm font-semibold'>{username}</p>
                        </div>
                    </div>
                </div>
            </Link>
            <div className='py-4 px-2 flex justify-around'>
                <div className='flex flex-col items-center align-middle border-0 border-r-2'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zM7 6v4h4V6H7zm0 6v2h10v-2H7zm0 4v2h10v-2H7zm6-9v2h4V7h-4z" fill="#000"/></svg>
                    </div>
                    <p className='text-sm font-semibold'>{articles}</p>
                </div>
                <div className='flex flex-col items-center align-middle border-r-2'>
                    <div className='text-sm font-light'>Followers</div>
                    <p className='text-sm font-semibold'>{followers}</p>
                </div>
                <div className='flex flex-col items-center align-middle'>
                    <div className='text-sm font-light'>Following</div>
                    <p className='text-sm font-semibold'>{following}</p>
                </div>
            </div>
        </div>

        {/* Mobile View */}
        <div className='p-1 py-5 mx-3 lg:hidden bg-blue-100 rounded-xl'>
            <Link href={'/profile/' + uid}>
                <div className='cursor-pointer p-1 flex items-center space-2 rounded-lg hover:bg-blue-200'>
                    <div className='border-2 border-blue-500 rounded-full h-14 w-14 mt-2 ml-3 lg:ml-0'></div>
                    <div className='mx-4'>
                        <p className='text-xl font-semibold'>{name}</p>
                        <p className='text-md font-semibold'>{username}</p>
                    </div>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default UserInfoCard