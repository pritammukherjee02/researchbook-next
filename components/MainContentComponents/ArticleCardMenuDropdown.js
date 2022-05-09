import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import DeleteBtn from './DeleteBtn'
import DeleteButton from './DeleteButton'

import { doc, deleteDoc, arrayUnion, updateDoc, setDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from '../../firebase'

export default function Example({ selfOwned, articleId, articleCardId, selfUid, title, desc, author, thumbnailLink, session }) {

    const deleteArticle = async () => {
        await deleteDoc(doc(db, "articleCards", articleCardId));
        await deleteDoc(doc(db, "articles", articleId));
        await deleteObject(ref(storage, `thumbnails/${articleId}`));
        alert('Permanently deleted article')
    }

    const addToReadlist = async (e) => {
      try {
        
        await updateDoc(doc(db, 'readlists', selfUid), {
            info: arrayUnion({
              articleId: articleId,
              title: title,
              description: desc,
              author: author,
              thumbnailLink: thumbnailLink
            })
        });

      } catch (error) {
        alert('Something went wrong')
        console.log('ERR: READLISTADD: ', e)
        return
      }
        
	  /*
        await setDoc(doc(db, 'readlists', selfUid), {
          info: [{articleId: articleId,
          title: title,
          description: desc,
          author: author,
          thumbnailLink: thumbnailLink
        }]
        }, { merge: true });
		

        await updateDoc(doc(db, 'readlists', selfUid), {
            info: arrayUnion({
				articleId: articleId,
				title: title,
				description: desc,
				author: author,
				thumbnailLink: thumbnailLink
			})
        });
		*/
    }

    return (
        <div className="w-56 text-right z-10">
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="focus:outline-none p-3">

                    <svg id="Layer_1" className="h-4 text-gray-700 w-4" data-name="Layer 1" fill="currentColor" stroke='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 29.96"><path class="cls-1" d="M0,15A15,15,0,1,1,15,30,15,15,0,0,1,0,15Zm92.93,0a15,15,0,1,1,15,15,15,15,0,0,1-15-15ZM46.46,15a15,15,0,1,1,15,15,15,15,0,0,1-15-15Z"/></svg>

                </Menu.Button>
            </div>
            <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            >
            <Menu.Items className="focus:outline-none absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-1 py-1 ">
                {selfOwned && <Menu.Item>
                    {({ active }) => (
                      <Link href={`/edit/${articleId}`}>
                        <button
                            className={`${
                            active ? 'bg-blue-500 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                            {active ? (
                            <EditActiveIcon
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                            />
                            ) : (
                            <EditInactiveIcon
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                            />
                            )}
                            Edit
                        </button>
                      </Link>
                    )}
                </Menu.Item>}
                </div>
                <div className="px-1 py-1">
                  {session && (
                    <Menu.Item>
                      {({ active }) => (
                      <button
                          className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={addToReadlist}
                      >
                          {active ? (
                          <ArchiveActiveIcon
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                          />
                          ) : (
                          <ArchiveInactiveIcon
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                          />
                          )}
                          Add to Readlist
                      </button>
                      )}
                    </Menu.Item>
                  )}
                <Menu.Item>
                    {({ active }) => (
                    <button
                        className={`${
                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                        {active ? (
                        <MoveActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        ) : (
                        <MoveInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        )}
                        Hide
                    </button>
                    )}
                </Menu.Item>
                </div>
                <div className="px-1 py-1">
                    {selfOwned ? (
                        <Menu.Item>
                        {({ active }) => (
                            /*<DeleteButton articleCardId={articleCardId} articleId={articleId} active={active} />*/
                            <button
                                  className={`${
                                  active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  onClick={deleteArticle}
                              >
                                  {active ? (
                                  <DeleteActiveIcon
                                      className="mr-2 h-5 w-5 text-violet-400"
                                      aria-hidden="true"
                                  />
                                  ) : (
                                  <DeleteInactiveIcon
                                      className="mr-2 h-5 w-5 text-violet-400"
                                      aria-hidden="true"
                                  />
                                  )}
                                  Delete
                              </button>
                        )}
                    </Menu.Item>
                    ) : (
                        <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active ? 'bg-blue-500 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                            {active ? (
                            <DeleteActiveIcon
                                className="mr-2 h-5 w-5 text-violet-400"
                                aria-hidden="true"
                            />
                            ) : (
                            <DeleteInactiveIcon
                                className="mr-2 h-5 w-5 text-violet-400"
                                aria-hidden="true"
                            />
                            )}
                            Report
                        </button>
                        )}
                    </Menu.Item>
                    )}
                </div>
            </Menu.Items>
            </Transition>
        </Menu>
        </div>
    )
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  )
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  )
}

function ArchiveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function ArchiveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function DeleteActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}
