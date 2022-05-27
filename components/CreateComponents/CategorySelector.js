import { useState, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'

const people = [
  { id: 1, name: 'Technology' },
  { id: 2, name: 'Finance' },
  { id: 3, name: 'Lifestyle' },
  { id: 4, name: 'Movies' },
  { id: 5, name: 'Anime' },
]

function Example() {
  const [selected, setSelected] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => 
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 mx-auto w-full">
            <div className="relative mx-auto w-11/12 cursor-default overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                    className="p-2 w-full mx-auto rounded-xl outline-none shadow-none font-light opacity-50 border-2 focus:ring-0"
                    displayValue={(person) => person.name}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
            >
                <Combobox.Options className="absolute mt-1 max-h-60 w-11/12 left-auto overflow-auto rounded-md z-50 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Create "{query}"
                    </div>
                ) : (
                    filteredPeople.map((person) => (
                    <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
                        }`
                        }
                        value={person}
                    >
                        {({ selected, active }) => (
                        <>
                            <span
                            className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                            }`}
                            >
                            {person.name}
                            </span>
                            {selected ? (
                            <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-teal-600'
                                }`}
                            >
                            </span>
                            ) : null}
                        </>
                        )}
                    </Combobox.Option>
                    ))
                )}
                </Combobox.Options>
            </Transition>
        </div>
    </Combobox>
  )
}


export default Example