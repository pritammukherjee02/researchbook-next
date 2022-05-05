import Head from 'next/head'
import React, { useEffect } from 'react'

import { signIn, getProviders } from 'next-auth/react';
import { getSession } from 'next-auth/react'
import Router from 'next/router';

import { signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../../firebase'

function Login({ session, providers }) {
    useEffect(() => {
        if(session) Router.push('/')
    }, session)

    const GoogleOAuthSignIn = () => {
        signInWithRedirect(auth, provider);

        getRedirectResult(auth)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log('SIGNED IN WITH TOKEN ', token)

                // The signed-in user info.
                const user = result.user;
                console.log('USER IS ', user)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const signIntoSystem = () => {
        signIn()
        console.log('Attempted sign in successfully')
    }

    return (
        <div className='flex items-center h-screen'>
            <Head>
                <title>ResearchBook | Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex-auto h-screen hidden md:block w-4/12 bg-blue-500'>
                <div className=' h-screen flex flex-col justify-between'>
                    <h1 className='text-9xl text-white font-bold p-5 opacity-90'>Rb</h1>
                    <p className='text-white text-sm font-light p-5 opacity-90'>© 2021, Researchbook LLC</p>
                </div>
            </div>
            <div className='flex-auto h-screen w-8/12 flex justify-center'>
                <div className='p-2 my-auto w-12/12 md:w-9/12'>
                    <h1 className='text-4xl font-bold text-center my-3 mb-10 w-12/12 md:w-6/12 mx-auto'>Never ending stream of <span className='text-indigo-600'>knowledge</span></h1>
                    <p className='w-9/12 md:6/12 font-light mx-auto text-center my-3 mb-10'>Connecting curious minds and article lovers together. Constanly get new things <span className='text-indigo-600'>you love to read about</span> in your feed.</p>
                    <div className='flex flex-col gap-4'>
                        {Object.values(providers).map((provider) => (
                            <div className='flex items-center' key={provider.name}>
                                <button onClick={() => signIn(provider.id)} className='p-4 border-2 mx-auto bg-blue-500 text-white drop-shadow-md hover:border-blue-500 hover:bg-white hover:text-blue-500 rounded-xl w-80'>Sign in with {provider.name}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

export async function getServerSideProps(context) {
    //GET THE USER
    const session = await getSession(context)
    const providers = await getProviders()
  
    return {
      props: {
        session,
        providers
      }
    }
  }
  