import React, { ReactFragment } from 'react'

import dynamic from 'next/dynamic'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(module => module.Editor),
  {
    ssr: false,
  }
);
//import { Editor } from 'react-draft-wysiwyg'

function EditorComponent() {

  return (
    <div className='flex flex-col w-full h-full lg:w-8/12'>

      <Editor  />
    </div>
  )
}

export default EditorComponent