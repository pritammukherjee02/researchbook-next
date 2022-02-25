import React from 'react'

function UserInfo() {
  return (
    <div className='w-full py-5 flex flex-col'>
        <div className='flex w-10/12 mx-auto h-24'>
            <div className='ml-2 border my-auto border-blue-500 rounded-full h-24 w-24'></div>
            <div className='flex flex-col justify-around pl-5'>
                <p className='text-lg'>D Maxwell</p>
                <p className='text-sm opacity-70'>1.1M Followers</p>
                <div className='flex'>
                    <button className='px-4 py-2 mt-4 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full'>Follow</button>
                </div>
            </div>
        </div>

        <div className=' w-10/12 mx-auto mt-5'>
            <p className='text-sm opacity-60'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, saepe repudiandae reprehenderit impedit natus atque.</p>
        </div>
    </div>
  )
}

export default UserInfo