import Link from 'next/link';
import React, { useEffect, useState } from 'react';

//components
import MenuDropDown from './HeaderComponents/MenuDropDown'
import NotificationDropDownBetter from './HeaderComponents/NotificationDropDownBetter'

interface Props {
    page: string,
    searchProp: any,
    accentColor: any
}


function Header({ page='', searchProp='', accentColor }:Props) {
    const [searchFieldContent, setSearchFieldContent] = useState('');

    useEffect(() => {
        setSearchFieldContent(searchProp)
    }, [])

    return (
        <header className='flex justify-between p-2 lg:p-4 max-w-7xl mx-auto border-b-2 sticky top-0 z-50 bg-white'>
            <div className="flex items-center space-x-4">
                <Link href='/'>
                    <div>
                        <h1 className="object-contain cursor-pointer text-center font-semibold text-md md:text-xl hidden lg:block lg:text-2xl" >ResearchBook</h1>
                        <h1 className='object-contain cursor-pointer text-center font-semibold text-3xl lg:hidden'>Rb</h1>
                    </div>
                </Link>
                {/* <form onSubmit={search}>
                    <input name='searchField' type="text" placeholder='Search...' onChange={onchangeHandler} value={searchFieldContent} className='hidden md:block outline-none shadow-none px-4 py-2 w-72 border-0 border-b-2 border-blue-500' />
                </form> */}
                <Link href='/search'>
                    <div className='p-3 cursor-pointer transition duration-150 ease-in-out opacity-60 hover:opacity-100 hidden lg:flex gap-2 items-center hover:shadow-md rounded-3xl'>
                        <svg className={ "h-5 w-5 inline-block" } xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" fill="currentColor">
                            <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/>
                        </svg>

                        <p className='px-1'>Search for Authors and Articles</p>
                    </div>
                </Link>
            </div>
            <div className="flex items-center space-x-7">
                <div className='hidden lg:block'>
                    <Link href='/'>
                        <h3 className='flex flex-col items-center cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" className={ "h-7 w-7 " + (page == 'home' ? accentColor.icon : 'text-gray-700') } viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            {/*<p className='text-sm text-blue-500'>Home</p>*/}
                        </h3>
                    </Link>
                </div>
                <div className='hidden lg:block'>
                    <Link href='/readlist'>
                        <h3 className='flex flex-col items-center cursor-pointer'>
                            <svg className={ "h-7 w-7 " + (page == 'readlist' ? accentColor.icon : 'text-gray-700') } fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve">
                                <path id="Bookmark_1_" d="M55.5311928,13.5146999c-1.2568016-1.2578001-2.9980011-1.9794998-4.7783012-1.9794998H16.0770931
                                    c-1.0039005,0-1.8213005-0.8174-1.8213005-1.8389006c0-0.5145998,0.2011995-1,0.5634995-1.3632994
                                    c0.3653002-0.3642001,0.8506002-0.5654001,1.3653011-0.5654001h33.1181145c0.552784,0,1-0.4473,1-1s-0.447216-1-1-1H16.1845932
                                    c-1.0488853,0-2.0352011,0.4081998-2.7793007,1.1514001c-0.7413006,0.7420998-1.1494999,1.7284999-1.1494999,2.7939
                                    c0,2.1073999,1.7139149,3.8223,3.8213005,3.8223h1.9228992v23.654501c0,0.6026993,0.4930992,1.0018997,1.0072002,1.0018997
                                    c0.2456989,0,0.4962006-0.0912018,0.6998997-0.294899l5.5858002-5.5858002
                                    c0.1952-0.1952019,0.4512005-0.2929001,0.7070999-0.2929001s0.5117989,0.0976982,0.7070999,0.2929001l5.5858002,5.5858002
                                    c0.203701,0.2037964,0.4542007,0.294899,0.6998978,0.294899c0.5139999,0,1.0072021-0.3992004,1.0072021-1.0018997v-23.654501
                                    h16.7528992c1.2528992,0,2.4794998,0.5078001,3.3642998,1.3935003c0.8993988,0.8993998,1.394516,2.0948,1.394516,3.3653002
                                    v39.0262985c0,1.25-0.4873161,2.4247971-1.3711166,3.3085976S52.0819931,62,50.8319931,62H13.329092
                                    c-1.2929993,0-2.5087996-0.5028992-3.4228992-1.4160004c-0.9140005-0.9160004-1.4179001-2.1328011-1.4179001-3.4248009V8.1602001
                                    C8.4882927,4.7637,11.2518921,2,14.6483927,2h38.9794998c0.5527,0,1-0.4471999,1-1c0-0.5527-0.4473-1-1-1H14.6483927
                                    c-4.5,0-8.1601,3.6602001-8.1601,8.1602001v48.9990005c0,1.8262024,0.7108998,3.5438995,2.0029001,4.8379021
                                    C9.7841921,63.2891006,11.5018921,64,13.329092,64h37.5028992c1.7851982,0,3.4618988-0.6953011,4.7227135-1.9570007
                                    c1.2616844-1.2607994,1.9570007-2.9375,1.9570007-4.7226982V18.2940006
                                    C57.5117073,16.4892998,56.8085899,14.7919998,55.5311928,13.5146999z M31.9999924,34.7753983l-3.8787003-3.8786983
                                    c-0.5665855-0.5666008-1.3199005-0.8785992-2.1212997-0.8785992c-0.8012848,0-1.5547009,0.3119984-2.1212845,0.8785992
                                    l-3.8787155,3.8786983V13.6037998h12V34.7753983z"/>
                                <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                            </svg>
                            {/*<p className='text-sm text-gray-700'>Readlist</p>*/}
                        </h3>
                    </Link>
                </div>
                <div className=''>
                    <Link href='/notifications'>
                        <h3 className='flex flex-col items-center cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" className={ "h-7 w-7 " + (page == 'notifications' ? accentColor.icon : 'text-gray-700') } viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            {/*<p className='text-sm text-gray-700'>Notifications</p>*/}
                        </h3>
                    </Link>
                </div>
                <MenuDropDown accentColor={accentColor} />
            </div>
        </header>
    )
}

export default Header;
