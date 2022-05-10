import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const accentColors = [
    { name: 'Blue', color: 'bg-blue-500 text-white', primary: 'bg-blue-500', hover: 'hover:bg-blue-600', hoverIcon: 'hover:text-blue-500 focus:text-blue-500', secondary: 'bg-blue-100', secondaryHover: 'hover:bg-blue-200', text: 'text-white', contentText: 'text-black', icon: 'text-blue-500' },
    { name: 'Red', color: 'bg-red-600 text-white', primary: 'bg-red-600', hover: 'hover:bg-red-700', hoverIcon: 'hover:text-red-600 focus:text-red-600', secondary: 'bg-red-300', secondaryHover: 'hover:bg-red-400', text: 'text-white', contentText: 'text-black', icon: 'text-red-600' },
    { name: 'Green', color: 'bg-green-600 text-white', primary: 'bg-green-600', hover: 'hover:bg-green-700', hoverIcon: 'hover:text-green-600 focus:text-green-600', secondary: 'bg-green-100', secondaryHover: 'hover:bg-green-200', text: 'text-white', contentText: 'text-black', icon: 'text-green-600' },
    { name: 'Yellow', color: 'bg-yellow-400 text-black', primary: 'bg-yellow-400', hover: 'hover:bg-yellow-500', hoverIcon: 'hover:text-yellow-400 focus:text-yellow-400', secondary: 'bg-yellow-100', secondaryHover: 'hover:bg-yellow-200', text: 'text-black', contentText: 'text-black', icon: 'text-yellow-400' },
    { name: 'Graphite', color: 'bg-gray-700 text-white', primary: 'bg-gray-700', hover: 'hover:bg-gray-800', hoverIcon: 'hover:text-gray-900 focus:text-gray-900', secondary: 'bg-gray-200', secondaryHover: 'hover:bg-gray-300', text: 'text-white', contentText: 'text-black', icon: 'text-gray-900' },
    { name: 'Dark', color: 'bg-black text-white', primary: 'bg-black', hover: 'hover:bg-white hover:text-black', hoverIcon: 'hover:text-black focus:text-black', secondary: 'bg-gray-900', secondaryHover: 'hover:bg-gray-800', text: 'text-white', contentText: 'text-white', icon: 'text-black' },
  ]

function ColorPickerSetting({ settingName, settingDesc, currentColor, setCurrentColorStateFunction }) {
  return (
        <div className="flex justify-between items-center px-5 py-3">
            <div className='flex flex-col gap-1 w-7/12 cursor-default'>
				<p className='text-lg '>{settingName}</p>
				<p className='text-sm opacity-50'>{settingDesc}</p>
			</div>

            <Listbox value={currentColor} onChange={setCurrentColorStateFunction}>
                <div className="relative w-5/12">
                <Listbox.Button className={"relative w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm " + currentColor.color}>
                    <span className="block truncate">{currentColor.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {accentColors.map((accentColor, accentColorIdx) => (
                        <Listbox.Option
                        key={accentColorIdx}
                        className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? accentColor.color : 'text-gray-900'
                            }`
                        }
                        value={accentColor}
                        >
                        {({ currentColor }) => (
                            <>
                            <span
                                className={`block truncate ${
                                currentColor ? 'font-medium' : 'font-normal'
                                }`}
                            >
                                {accentColor.name}
                            </span>
                            </>
                        )}
                        </Listbox.Option>
                    ))}
                    </Listbox.Options>
                </Transition>
                </div>
            </Listbox>
        </div>
  )
}

export default ColorPickerSetting