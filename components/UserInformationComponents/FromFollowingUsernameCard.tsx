import React from 'react';

interface Props {
    name: string
}

function FromFollowingUsernameCard({ name }:Props) {
  return (
    <div className='flex items-center'>
        <div className='border border-blue-500 rounded-full h-8 w-8'></div>
        <p className='mx-4'>{name} *</p>
    </div>
  )
}

export default FromFollowingUsernameCard;
