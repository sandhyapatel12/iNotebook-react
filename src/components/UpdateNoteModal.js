import React, { useState, useContext, useRef } from 'react'
import noteContext from '../context/notes/noteContext'



const UpdateNoteModal = ({ isOpen, ModalClose}) => {
    //use noteContext which created at noteContext.js file  
    const context = useContext(noteContext)

    //destructure notes from context
    const { editNote } = context


    //create state for store user notes details
    const [userNote, setUserNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


     //create useRef -for give any one element to reference
     const ref = useRef(null)

    // update user note
    const updateNote = (currentNote) => {
        ref.current.click()
        setUserNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        console.log("Note updated");

    }
    
    // handle funcions
    const handleAddNote = (e) => {
        e.preventDefault();   //page not reload
        console.log("update user note", userNote)
        editNote(userNote.id, userNote.etitle, userNote.edescription, userNote.etag)
        ModalClose()
    }

    const changeText = (e) => {
        //... is a spread operator -- return a new data or object -- data it returns depends on how it is used.
        setUserNote({ ...userNote, [e.target.name]: e.target.value }) //stay already added note and add other note
    }

   
    if (!isOpen) return null;


    return (
        <>
            {/* update notes modal */}
          <div ref={ref} className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center ">
         

                <div className=' bg-white max-w-xl mx-auto justify-center items-center shadow-lg'  >

                    <div className="justify-between flex py-2 px-5 items-center text-gray-500">
                        <h1 className="text-xl font-semibold">Update Your Note</h1>
                        <i onClick={ModalClose} className="fa-solid fa-xmark text-xl cursor-pointer" ></i>
                    </div>

                    <div className=' border border-b-gray-500 mt-3'></div>

                    <div className='items-center justify-center flex flex-col max-w-xl px-8 py-10 rounded-md mx-auto'>

                        <form ref={ref} className='mt-5 w-full space-y-8 flex flex-col items-center justify-center'>

                            <input onChange={changeText} value={userNote.etitle} id='etitle' name='etitle' type="text" placeholder='Title' className='border border-blue-900 py-3 w-full px-5 shadow-md rounded-sm' />
                            <input onChange={changeText} value={userNote.edescription} id='edescription' name='edescription' type="text" placeholder='Description' className='border border-blue-900 py-3 w-full px-5 shadow-md rounded-sm' />
                            <input onChange={changeText} value={userNote.etag} id='etag' name='etag' type="text" placeholder='Tag' className='border border-blue-900 py-3 w-full px-5 shadow-md rounded-sm' />

                                
                            <button disabled={userNote.etitle.length<5 || userNote.edescription.length<5 || userNote.etag.length<3}  onClick={handleAddNote}  className='bg-blue-900  w-fit text-white px-10 py-3  text-center rounded-full font-bold disabled:bg-blue-500'>Update Note</button>

                        </form>


                    </div>
                </div>
            </div>
    


    

        </>
    )
}

export default UpdateNoteModal
