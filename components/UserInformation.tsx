import React from 'react';
import FromFollowingUsernameCard from './UserInformationComponents/FromFollowingUsernameCard';
import UserInformationCard from './UserInformationComponents/UserInformationCard';
import UserInfoCard from './UserInformationComponents/UserInfoCard'

function UserInformation() {
  const fromFollowingUsers = [
    {name: 'John', uid:3},
    {name: 'ssk414', uid:4},
    {name: 'D Maxwell', uid:2},
  ] //Will be received from the server

  const fromFollowingUsersMarkup = fromFollowingUsers.map((user, index) => {
    return <FromFollowingUsernameCard key={index} name={user.name} uid={user.uid} />
  })

  return (
  <div className='flex flex-col space-2 lg:h-screen lg:sticky lg:pb-20 lg:top-10 scrollbar-hide overflow-y-auto'>
      {/*<UserInformationCard name='James Anderson' fieldOfExpertise='Comp sci' jobDesignation='Research Fellow' uid={1} username='@janderson11' articles={0} followers={2} following={98} />*/}
      <UserInfoCard name='James Anderson' fieldOfExpertise='Comp sci' jobDesignation='Research Fellow' uid={1} username='@janderson11' articles={0} followers={2} following={98} />

      <div className='my-4 hidden lg:block'>
          <p className='text-sm font-semibold opacity-40 cursor-default'>From following</p>
          <div className='my-3 flex flex-col gap-2'>
            {fromFollowingUsersMarkup}
          </div>
      </div>
  </div>
  )
}

export default UserInformation
