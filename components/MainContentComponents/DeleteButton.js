import { useState } from 'react'
import { Dialog } from '@headlessui/react'

import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase'

export default function DeleteButton({ articleId, articleCardId, active }) {
    let [isOpen, setIsOpen] = useState(true)

    const deleteArticle = async () => {
        await deleteDoc(doc(db, "articleCards", articleCardId));
        await deleteDoc(doc(db, "articles", articleId));
        setIsOpen(false)
    }
  
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center">
                <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="focus:outline-none rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Delete
                </button>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <Dialog.Panel>
                <Dialog.Title>Delete Article</Dialog.Title>
                <Dialog.Description>
                    Permanent deletion
                </Dialog.Description>
        
                <p>
                    Are you sure you want to delete this article? The article
                    will be permanently removed. This action cannot be undone.
                </p>
        
                <button onClick={deleteArticle}>Yes</button>
                <button onClick={() => setIsOpen(false)}>Cancel</button>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
  }