import React, { ReactFragment, useEffect, useRef, useState } from 'react'

import Quill from 'quill'
import "quill/dist/quill.snow.css"

import dynamic from 'next/dynamic'


function EditorComponent() {

  const wrapperRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if(typeof window != undefined){
      const editor = document.createElement('div')
      wrapperRef.current.append(editor)
      new Quill(editor, { theme: 'snow' })
    }
  }, [])

  return (
    <div className='flex flex-col w-full h-full lg:w-8/12 bg-blue-200'>

      <div id="container" ref={wrapperRef}></div>

    </div>
  )
}

export default EditorComponent