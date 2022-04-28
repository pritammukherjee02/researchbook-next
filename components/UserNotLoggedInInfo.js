import React from 'react'
import Link from 'next/link'
//import UserInformationCard from './UserInformationComponents/UserInformationCard';
import UserInfoNotLoggedIn from './UserInformationComponents/UserInfoNotLoggedIn'
import SideBarNav from './UserInformationComponents/SideBarNav';

function UserInformation() {
  return (
  <div className='flex flex-col space-2 lg:h-screen lg:sticky lg:pb-20 lg:top-10 scrollbar-hide overflow-y-auto'>
      <UserInfoNotLoggedIn />

      <div className='my-4 mt-6 hidden lg:block'>
          {/*<p className='text-sm font-semibold opacity-40 cursor-default'>From following</p>
          <div className='my-3 flex flex-col gap-2'>
            {fromFollowingUsersMarkup}
          </div>*/}

          <SideBarNav />
      </div>

      <Link href='/create'>
        <div className='mt-5 flex items-center px-6 py-3 rounded-full cursor-pointer justify-center bg-blue-500 hover:bg-blue-600'>
          <p className='text-xl font-semibold text-white'>Create</p>
        </div>
      </Link>
  </div>
  )
}

export default UserInformation
