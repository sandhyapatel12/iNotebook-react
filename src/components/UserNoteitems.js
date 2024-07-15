import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import UpdateNoteModal from './UpdateNoteModal';


const UserNoteitems = (props) => {

    //use noteContext which created at noteContext.js file  
    const context = useContext(noteContext)

    //desctucture
    const { deleteNote } = context

    //destructure
    const { notes } = props;


    //for user updateNOte modal
    //set state
    const [isopenModal, setisopenModal] = useState(false)  //set modal is close

    const ModalOpen = () => {
        setisopenModal(true)
        console.log('modal is open')

    }
    const ModalClose = () => {
        setisopenModal(false)
        console.log('modal is close')

    }

    return (
        <>

            <div className='max-w-5xl mx-auto  '>

                <div className=" rounded overflow-hidden  px-2 py-2 border-2 border-blue-900 h-48 ">

                    <div className="px-2 py-2 flex justify-between items-center space-x-8  ">
                      
                        <p className="font-semibold text-lg w-3/5  ">{notes.title}</p>    {/* this notes created by user (coming from backend -> router->notes) */}

                        <div className="space-x-2 ">

                            {/* delete */}
                            <i className="fa-solid fa-trash cursor-pointer"
                                onClick={() => { deleteNote(notes._id) }
                                }>
                            </i>

                            {/* update */}
                            <i className="fa-solid fa-pen-to-square cursor-pointer"
                                onClick={ModalOpen}
                            />

                        </div>
                    </div>

                    <div className='whitespace-pre-line'>
                        <p className="text-gray-700 text-base px-2 ">{notes.description}</p>
                    </div>

                    <div className='flex  items-center w-fit justify-center bg-blue-700 text-gray-200 py-1 px-2 rounded-md mt-5 '>
                        <i className="fa-solid fa-tag"></i>
                        <p className=" text-sm px-2">{notes.tag}</p>
                    </div>

                </div>
            </div>
            <UpdateNoteModal isOpen={isopenModal} ModalClose={ModalClose} />

        </>
    )
}

export default UserNoteitems
