import React from 'react'
import Link from 'next/link'

function SideBar() {
  return (
    <div className='mt-10 lg:mt-0 flex flex-col gap-2 lg:h-full lg:fixed scrollbar-hide overflow-y-auto'>
        
        <Link href='/preferences/appearance'>
          <div className='pl-3 pr-10 mt-3 mx-auto lg:mx-0 py-3 flex'>
              <p className='text-md opacity-50 font-semibold uppercase transition duration-100 ease-in-out hover:opacity-80 cursor-pointer'>Appearance</p>
          </div>
        </Link>
        <Link href='/preferences/account'>
          <div className='pl-3 pr-10 mx-auto lg:mx-0 py-3'>
              <p className='text-md opacity-50 font-semibold uppercase transition duration-100 ease-in-out hover:opacity-80 cursor-pointer'>Account</p>
          </div>
        </Link>

    </div>
  )
}

export default SideBar