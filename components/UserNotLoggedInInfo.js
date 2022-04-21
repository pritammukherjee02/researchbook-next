import React from 'react';
//import UserInformationCard from './UserInformationComponents/UserInformationCard';
import UserInfoNotLoggedIn from './UserInformationComponents/UserInfoNotLoggedIn'

function UserInformation() {
  return (
  <div className='flex flex-col space-2 lg:h-screen lg:sticky lg:pb-20 lg:top-10 scrollbar-hide overflow-y-auto'>
      <UserInfoNotLoggedIn />
  </div>
  )
}

export default UserInformation
