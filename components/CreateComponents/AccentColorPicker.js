import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const accentColors = [
    { name: 'White', articleCardAccent: 'bg-white', articleContentElementAccent: 'text-black', articleInteractiveElementAccent: 'bg-blue-500 text-white', articleInteractiveElementAccentHover: 'hover:bg-blue-600 focus:bg-blue-600', articleBgColor: 'bg-white' },
    { name: 'Blue', articleCardAccent: 'bg-blue-500', articleContentElementAccent: 'text-blue-600', articleInteractiveElementAccent: 'bg-blue-500 text-white', articleInteractiveElementAccentHover: 'hover:bg-blue-600 focus:bg-blue-600', articleBgColor: 'bg-blue-200' },
    { name: 'Pink', articleCardAccent: 'bg-pink-300', articleContentElementAccent: 'text-pink-600', articleInteractiveElementAccent: 'bg-pink-200 text-black', articleInteractiveElementAccentHover: 'hover:bg-pink-600 focus:bg-pink-600', articleBgColor: 'bg-pink-200' },
    { name: 'Violet', articleCardAccent: 'bg-violet-300', articleContentElementAccent: 'text-violet-600', articleInteractiveElementAccent: 'bg-violet-500 text-white', articleInteractiveElementAccentHover: 'hover:bg-violet-600 focus:bg-violet-600', articleBgColor: 'bg-violet-200' },
  ]

function AccentColorPicker({ currentColor, setCurrentColorStateFunction }) {
  return (
        <div className="flex justify-between items-center px-5 py-3">
            <div className='flex flex-col gap-1 w-6/12 cursor-default'>
				<p className='text-lg '>Pick a theme</p>
				<p className='text-sm opacity-50'>A theme sets the mood for the readers to read your style of writing</p>
			</div>

            <Listbox value={currentColor} onChange={setCurrentColorStateFunction}>
                <div className="relative w-5/12">
                <Listbox.Button className={"relative w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm " + currentColor.articleInteractiveElementAccent}>
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
                            active ? accentColor.articleInteractiveElementAccent : 'text-gray-900'
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

export default AccentColorPicker