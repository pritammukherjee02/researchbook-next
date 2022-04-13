import React from 'react';
import FromFollowingUsernameCard from './UserInformationComponents/FromFollowingUsernameCard';
import UserInformationCard from './UserInformationComponents/UserInformationCard';

function UserInformation() {
  return (
  <div className='flex flex-col space-2'>
      <UserInformationCard name='James Anderson' fieldOfExpertise='Comp sci' jobDesignation='Research Fellow' uid={1} username='@janderson11' articles={0} followers={2} following={98} />

      <div className='my-4 hidden lg:block'>
          <p className='text-sm font-semibold opacity-40 cursor-default'>From following:</p>
          <div className='my-3 flex flex-col gap-2'>
            <FromFollowingUsernameCard name='Jamerson' uid={3} />
            <FromFollowingUsernameCard name='ssk414' uid={4} />
            <FromFollowingUsernameCard name='D Maxwell' uid={2} />
          </div>
      </div>
  </div>
  )
}

export default UserInformation;
