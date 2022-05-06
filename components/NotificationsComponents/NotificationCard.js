import React from 'react'
import Link from 'next/link'

function NotificationCard({ href, name, description, type }) {
  return (
    <div>
        <Link href={href}>
            <div className='flex items-center p-3 cursor-pointer -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50'>
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                    {type == 'newArticle' && <IconOne aria-hidden="true" />}
                    {type == 'upvote' && <IconTwo aria-hidden="true" />}
                    {type == 'reports' && <IconThree aria-hidden="true" />}
                </div>

                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                        {name}
                    </p>
                    <p className="text-sm text-gray-500">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    </div>
  )
}

function IconOne() {
	return (
	  <svg
		width="48"
		height="48"
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	  >
		<rect width="48" height="48" rx="8" fill="#DBEAFE" />
		<path
		  d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
		  stroke="#3B82F6"
		  strokeWidth="2"
		/>
		<path
		  fillRule="evenodd"
		  clipRule="evenodd"
		  d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
		  stroke="#3B82F6"
		  strokeWidth="2"
		/>
		<path
		  fillRule="evenodd"
		  clipRule="evenodd"
		  d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
		  stroke="#3B82F6"
		  strokeWidth="2"
		/>
	  </svg>
	)
  }
  
function IconTwo() {
	return (
		<svg
		width="48"
		height="48"
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		>
		<rect width="48" height="48" rx="8" fill="#DBEAFE" />
		<path
			d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
			stroke="#3B82F6"
			strokeWidth="2"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
			stroke="#3B82F6"
			strokeWidth="2"
		/>
		</svg>
	)
}

function IconThree() {
	return (
		<svg
		width="48"
		height="48"
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		>
		<rect width="48" height="48" rx="8" fill="#DBEAFE" />
		<rect x="13" y="32" width="2" height="4" fill="#3B82F6" />
		<rect x="17" y="28" width="2" height="8" fill="#3B82F6" />
		<rect x="21" y="24" width="2" height="12" fill="#3B82F6" />
		<rect x="25" y="20" width="2" height="16" fill="#3B82F6" />
		<rect x="29" y="16" width="2" height="20" fill="#3B82F6" />
		<rect x="33" y="12" width="2" height="24" fill="#3B82F6" />
		</svg>
	)
}

export default NotificationCard