import Link from 'next/link';
import React from 'react';

//components
import MenuButton from './HeaderComponents/MenuButton';

interface Props {
    home: Boolean
}

//Helper functions
function search(e: React.SyntheticEvent){
    e.preventDefault()

    const target = e.target as typeof e.target & {
        searchField: { value: string };
    };
    const searchField = target.searchField.value;

    alert(searchField)
}

function Header({ home }:Props) {
  return (
    <header className='flex justify-between p-3 lg:p-5 max-w-7xl mx-auto border-b-2 sticky top-0 z-50 bg-white'>
        <div className="flex items-center space-x-5">
            <Link href='/'>
                <h1 className="object-contain cursor-pointer text-center font-semibold text-md md:text-xl lg:text-2xl" >ResearchBook</h1>
            </Link>
            <form onSubmit={search}>
                <input name='searchField' type="text" placeholder='Search...' className='hidden md:block px-4 py-2 rounded-lg w-72 border-0 border-b-2 border-blue-500' />
            </form>
        </div>
        <div className="flex items-center space-x-5">
            <Link href='/'>
                <h3 className='flex flex-col items-center cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" className={ "h-7 w-7 text-blue-500" } viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <p className='text-sm text-blue-500'>Home</p>
                </h3>
            </Link>
            <h3 className='flex flex-col items-center cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 text-gray-700 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <p className="text-sm text-gray-700">Notifications</p>
            </h3>
            <MenuButton />
        </div>
    </header>
  )
}

export default Header;
