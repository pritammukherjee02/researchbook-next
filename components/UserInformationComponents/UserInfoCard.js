import React from 'react'
import Link from 'next/link';
import Image from 'next/image'

function UserInfoCard({ name, fieldOfExpertise, jobDesignation, username, uid, pfp='/bruh' }) {
  return (
    <div>
        <div className='p-2 mx-auto w-full hidden lg:block bg-blue-100 rounded-xl'>
            <Link href={'/myprofile'}>
                <div className='cursor-pointer p-1 rounded-lg hover:bg-blue-200'>
                    <p className='pl-2 text-xl font-semibold'>{name}</p>
                    <div className='flex space-2 pt-3'>
                        {/*<div className='border-2 border-blue-500 rounded-full h-10 w-10 mt-2 ml-3 lg:ml-0'></div>*/}
                        <Image src={pfp} className="object-contain border-2 rounded-full h-10 w-10 mt-2 ml-3 lg:ml-0" width={40} height={40} layout='fixed' objectFit='cover' />
                        <div className='mx-4'>
                            <p className='text-sm font-semibold'>{fieldOfExpertise}</p>
                            <p className='text-sm font-semibold'>{jobDesignation}</p>
                            <p className='text-sm font-semibold'>{username}</p>
                        </div>
                    </div>
                </div>
            </Link>
            {/*<div className='py-4 px-2 flex justify-around'>
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
            <div className='flex gap-4 p-3 justify-end'>
                <svg className='h-4 w-4' width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Rounded" transform="translate(-579.000000, -2771.000000)">
                            <g id="Image" transform="translate(100.000000, 2626.000000)">
                                <g id="-Round-/-Image-/-edit" transform="translate(476.000000, 142.000000)">
                                    <g transform="translate(0.000000, 0.000000)">
                                        <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                                        <path d="M3,17.46 L3,20.5 C3,20.78 3.22,21 3.5,21 L6.54,21 C6.67,21 6.8,20.95 6.89,20.85 L17.81,9.94 L14.06,6.19 L3.15,17.1 C3.05,17.2 3,17.32 3,17.46 Z M20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C17.98,2.9 17.35,2.9 16.96,3.29 L15.13,5.12 L18.88,8.87 L20.71,7.04 Z" id="🔹-Icon-Color" fill="#1D1D1D"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>

                <svg className='h-4 w-4' version="1.1" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="info"/><g id="icons"><path d="M22.2,14.4L21,13.7c-1.3-0.8-1.3-2.7,0-3.5l1.2-0.7c1-0.6,1.3-1.8,0.7-2.7l-1-1.7c-0.6-1-1.8-1.3-2.7-0.7   L18,5.1c-1.3,0.8-3-0.2-3-1.7V2c0-1.1-0.9-2-2-2h-2C9.9,0,9,0.9,9,2v1.3c0,1.5-1.7,2.5-3,1.7L4.8,4.4c-1-0.6-2.2-0.2-2.7,0.7   l-1,1.7C0.6,7.8,0.9,9,1.8,9.6L3,10.3C4.3,11,4.3,13,3,13.7l-1.2,0.7c-1,0.6-1.3,1.8-0.7,2.7l1,1.7c0.6,1,1.8,1.3,2.7,0.7L6,18.9   c1.3-0.8,3,0.2,3,1.7V22c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-1.3c0-1.5,1.7-2.5,3-1.7l1.2,0.7c1,0.6,2.2,0.2,2.7-0.7l1-1.7   C23.4,16.2,23.1,15,22.2,14.4z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C16,14.2,14.2,16,12,16z" id="settings"/></g></svg>
            </div>*/}
        </div>

        {/* Mobile View */}
        <div className='p-1 py-5 mx-3 lg:hidden bg-blue-100 rounded-xl'>
            <Link href={'/profile/' + uid}>
                <div className='cursor-pointer p-1 flex items-center space-2 rounded-lg hover:bg-blue-200'>
                    {/*<div className='border-2 border-blue-500 rounded-full h-14 w-14 mt-2 ml-3 lg:ml-0'></div>*/}
                    <div className='w-3'></div>
                    <Image src={pfp} className="object-contain border-2 rounded-full h-14 w-14 mt-2 ml-3 lg:ml-0" width={56} height={56} layout='fixed' objectFit='cover' />
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