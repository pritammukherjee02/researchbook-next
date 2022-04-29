import React from 'react'
import Link from 'next/link'
//import UserInformationCard from './UserInformationComponents/UserInformationCard';
import UserInfoCard from './UserInformationComponents/UserInfoCard'
import SideBarNav from './UserInformationComponents/SideBarNav';

function UserInformation(props) {
  const userInfo = props.userInfo
  const session = props.session
  const page = props.page

  return (
  <div className='flex flex-col space-2 lg:h-full lg:fixed scrollbar-hide overflow-y-auto'>
      {/*<UserInformationCard name='James Anderson' fieldOfExpertise='Comp sci' jobDesignation='Research Fellow' uid={1} username='@janderson11' articles={0} followers={2} following={98} />*/}
      <UserInfoCard name={session ? session.user.name : userInfo.name} fieldOfExpertise={userInfo.fieldOfExpertise} jobDesignation={userInfo.jobDesignation} uid={userInfo.uid} username={userInfo.username} pfp={session.user.image} articles={userInfo.articles} followers={userInfo.followers} following={userInfo.following} />

      <div className='my-4 mt-6 hidden lg:block'>
          {/*<p className='text-sm font-semibold opacity-40 cursor-default'>From following</p>
          <div className='my-3 flex flex-col gap-2'>
            {fromFollowingUsersMarkup}
          </div>*/}

          <SideBarNav page={page} />
      </div>

      <Link href='/create'>
        <div className='mt-5 hidden lg:flex items-center px-6 py-3 rounded-full cursor-pointer justify-center bg-blue-500 hover:bg-blue-600'>
          <p className='text-xl font-semibold text-white'>Create</p>
        </div>
      </Link>
  </div>
  )
}

export default UserInformation
