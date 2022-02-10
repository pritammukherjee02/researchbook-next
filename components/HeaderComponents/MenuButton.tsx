import React from 'react';

function MenuButton() {
  return (
    <h3 className="border border-gray-400 cursor-pointer flex flex-col items-center px-4 py-1 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 text-gray-700 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </h3>
  )
}

export default MenuButton;
