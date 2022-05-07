import React, { useState } from 'react'
import { Switch } from '@headlessui/react'

function ToggleSetting({ settingName, settingDesc, current, setCurrentStateFunction, accentColor }) {
  return (
		<div className='flex items-center justify-between px-5 py-3'>
			<div className='flex flex-col gap-1 w-7/12 cursor-default'>
				<p className='text-lg '>{settingName}</p>
				<p className='text-sm opacity-50'>{settingDesc}</p>
			</div>

			<Switch
			checked={current} onChange={setCurrentStateFunction} className={`${current ? accentColor.color : 'bg-black'} relative inline-flex h-[30px] w-[58px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
				<span className="sr-only">{settingName}</span>
				<span
				aria-hidden="true"
				className={`${current ? 'translate-x-7' : 'translate-x-0'}
					pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</Switch>
		</div>
  )
}

export default ToggleSetting