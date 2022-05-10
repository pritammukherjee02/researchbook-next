import React from 'react'
import Link from 'next/link'
//import UserInformationCard from './UserInformationComponents/UserInformationCard';
import UserInfoNotLoggedIn from './UserInformationComponents/UserInfoNotLoggedIn'
import SideBarNav from './UserInformationComponents/SideBarNav';

function UserInformation({ page, accentColor={ name: 'Blue', color: 'bg-blue-500 text-white', primary: 'bg-blue-500', hover: 'hover:bg-blue-600', secondary: 'bg-blue-100', secondaryHover: 'hover:bg-blue-200', text: 'text-white', contentText: 'text-black', icon: 'text-blue-500' } }) {
  return (
  <div className='flex flex-col space-2 lg:h-full lg:w-48 lg:fixed lg:pb-20 overflow-y-auto'>
      <UserInfoNotLoggedIn accentColor={accentColor} />

      <div className='my-4 mt-6 hidden lg:block'>
          {/*<p className='text-sm font-semibold opacity-40 cursor-default'>From following</p>
          <div className='my-3 flex flex-col gap-2'>
            {fromFollowingUsersMarkup}
          </div>*/}

          <SideBarNav accentColor={accentColor} page={page} />
      </div>

      <Link href='/create'>
        <div className={'mt-5 hidden lg:flex items-center px-6 py-3 rounded-full cursor-pointer justify-center transition duration-150 ease-in-out ' + accentColor.primary + ' ' + accentColor.hover}>
          <p className={`text-xl font-semibold ${accentColor.text}`}>Create</p>
        </div>
      </Link>
  </div>
  )
}

export default UserInformation
