import React from 'react';

//Components
import News from './SideBarComponents/News';
import Trending from './SideBarComponents/Trending';

function SideBar() {
  return (
      <div className='flex w-3/12 flex-col gap-2 fixed hover:overflow-y-scroll'>
            <Trending />

            <News />
      </div>
  )
}

export default SideBar;
