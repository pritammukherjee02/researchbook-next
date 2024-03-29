import React from 'react'
import Link from 'next/link';

function UserInfoCard({ accentColor }) {
  return (
    <div>
        <div className={`p-2 mx-auto w-full hidden lg:block ${accentColor.secondary} rounded-xl`}>
            <Link href={'/login'}>
                <div className={`cursor-pointer p-1 rounded-lg ${accentColor.contentText} ${accentColor.secondaryHover}`}>
                    <p className='pl-2 font-semibold text-xl'>Start reading</p>
                </div>
            </Link>
        </div>

        {/* Mobile View */}
        <div className={`p-1 py-3 mx-3 lg:hidden ${accentColor.secondary} rounded-xl`}>
            <Link href={'/login'}>
                <div className={`cursor-pointer p-1 oy-3 flex items-center space-2 rounded-lg ${accentColor.contentText} ${accentColor.secondaryHover}`}>
                    <p className='pl-2 font-semibold text-xl'>Start reading</p>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default UserInfoCard