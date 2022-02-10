import React from 'react';

interface Props {
    name: string,
    fieldOfExpertise: string,
    jobDesignation: string,
    username: string,
    articles: number,
    followers: number,
    following: number
}

function UserInformationCard({ name, fieldOfExpertise, jobDesignation, username, articles, followers, following }:Props) {
  return (
    <div className='p-2 mx-auto w-full border border-0 border-b-2'>
        <p className='pl-2'>{name}</p>
        <div className='flex space-2 pt-3'>
            <div className='border border-blue-500 rounded-full h-10 w-10 mt-2'></div>
            <div className='mx-4'>
                <p className='text-sm'>{fieldOfExpertise}</p>
                <p className='text-sm'>{jobDesignation}</p>
                <p className='text-sm'>{username}</p>
            </div>
        </div>
        <div className='py-4 pl-2 flex justify-around lg:flex-col'>
            <p>{articles} Articles</p>
            <p>{followers} followers</p>
            <p>{following} following</p>
        </div>
        <div className='flex gap-2 p-2'>
            <button className='flex-grow border border-blue-500 rounded-md py-1 px-1 text-sm'>Edit</button>
            <button className='flex-grow border border-blue-500 rounded-md py-1 px-1 text-sm'>Settings</button>
        </div>
    </div>
  )
}

export default UserInformationCard;
