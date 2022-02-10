import React from 'react';

//Components
import News from './SideBarComponents/News';
import Trending from './SideBarComponents/Trending';

function SideBar() {
  return (
      <div className='flex w-full flex-col gap-2'>
            <Trending />

            <News />
      </div>
  )
}

export default SideBar;
