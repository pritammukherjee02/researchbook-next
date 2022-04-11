import Link from 'next/link';
import React from 'react';

interface Props {
    name: string,
    uid: number
}

function FromFollowingUsernameCard({ name, uid }:Props) {
  return (
    <div className='flex items-center'>
        <div className='border border-blue-500 rounded-full h-8 w-8'></div>
        <Link href={'/profile/' + uid}>
          <p className='mx-4 cursor-pointer'>{name} *</p>
        </Link>
    </div>
  )
}

export default FromFollowingUsernameCard;
