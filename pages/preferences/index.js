import React, { useEffect } from 'react'

import Router from 'next/router'
import { getSession } from 'next-auth/react'


function Preferences({ session }) {
    useEffect(() => {
        if (!session) {
            Router.push('/login/preferences')
        } else {
            Router.push('/preferences/appearance')
        }
    }, [])

    return (
        <div className='flex flex-col gap-14'>
            
        </div>
    )
}

export default Preferences

export async function getServerSideProps(context) {
    //GET THE USER
    const session = await getSession(context)
  
    return {
      props: {
        session
      }
    }
  }