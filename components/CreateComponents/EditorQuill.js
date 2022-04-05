import React, { ReactFragment, useEffect, useRef, useState } from 'react'

import dynamic from 'next/dynamic'

const Quill = dynamic(
	() => {
		return import('quill');
	},
	{ ssr: false }
);


function EditorComponent() {

    const [value, setValue] = useState("");
    const quillRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        console.log(quillRef.current);
    }, [quillRef]);
  
    return (
        <div className='flex flex-col w-full h-full lg:w-8/12 bg-blue-200'>

            <Quill ref={quillRef} theme="snow" value={value} onChange={setValue}></Quill>

        </div>
    )
}

export default EditorComponent