import React from 'react';

//Components
import News from './SideBarComponents/News';
import Trending from './SideBarComponents/Trending';

function SideBar() {
  return (
      <div className='flex w-full flex-col gap-2 h-screen sticky top-10 bottom-full hover:overflow-y-scroll'>
            <Trending />

            <News />
      </div>
  )
}

export default SideBar;
