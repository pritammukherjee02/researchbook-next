import React from 'react';
import FromFollowingUsernameCard from './UserInformationComponents/FromFollowingUsernameCard';
import UserInformationCard from './UserInformationComponents/UserInformationCard';

function UserInformation() {
  return (
  <div className='flex flex-col space-2'>
      <UserInformationCard name='James Anderson' fieldOfExpertise='Comp sci' jobDesignation='Research Fellow' username='@janderson11' articles={0} followers={2} following={98} />

      <div className='my-4 hidden lg:block'>
          <p className='text-sm'>From following:</p>
          <div className='my-3 flex flex-col gap-2'>
            <FromFollowingUsernameCard name='Jamerson' />
            <FromFollowingUsernameCard name='ssk414' />
            <FromFollowingUsernameCard name='D Maxwell' />
          </div>
      </div>
  </div>
  )
}

export default UserInformation;
