import React, { ReactFragment } from 'react'

import dynamic from 'next/dynamic'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(() => import("react-draft-wysiwyg").then(module => module.Editor), { ssr: false })
//import { Editor } from 'react-draft-wysiwyg'

function EditorComponent() {

  const toggleEditMode = (event: React.FocusEvent<HTMLIFrameElement>) => {
    //richTextField.document.designMode = 'On'
  }

  const execCmd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const button: HTMLButtonElement = event.currentTarget;
    //execute command using button.name
  }

  return (
    <div className='flex flex-col w-full h-full lg:w-8/12'>
      <Editor
        toolbarClassName='flex sticky top-10 z-50 mx-auto'
        editorClassName='w-full border h-80 p-3 mx-autof'
      />
    </div>
  )
}

export default EditorComponent