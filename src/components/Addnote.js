import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom'

const Addnote = () => {

  //use noteContext which created at noteContext.js file  
  const context = useContext(noteContext)

  //destructure addNote function which created at noteState.js file
  const { addNote } = context

  //create state for store user notes details
  const [userNote, setUserNote] = useState({ title: "", description: "", tag: "" })

  //create useNavigate - page redirection
  const navigate = useNavigate();

  //handle funcions
  const handleAddNote = (e) => {
    e.preventDefault();   //page not reload
    addNote(userNote.title, userNote.description, userNote.tag) //store user new notes data
    setUserNote({ title: "", description: "", tag: "" })  //after one time added data note form is blank
    navigate('/usernotes')

  }

  const changeText = (e) => {
    //... is a spread operator -- return a new data or object -- data it returns depends on how it is used.
    setUserNote({ ...userNote, [e.target.name]: e.target.value }) //stay already added note and add other note
  }


  return (
    <>
      <div className='items-center justify-center flex flex-col max-w-5xl px-8 py-10 rounded-md mx-auto mt-20'>   {/*for center inner box*/}

        <h1 className=' w-full  py-3 text-3xl  font-bold '>Create Your Notes</h1>

        <form onSubmit={handleAddNote} className='mt-5 w-full space-y-8 flex flex-col items-center justify-center'>

          <input onChange={changeText} value={userNote.title} id='title' name='title' type="text" placeholder='Title' className='border border-blue-900 py-3 w-full px-5 shadow-md rounded-sm' maxLength={30}  required/>
          <input onChange={changeText} value={userNote.description} id='description' name='description' type="text" placeholder='Description' className='border border-blue-900 py-3 w-full px-5 shadow-md rounded-sm' required />
          <input onChange={changeText} value={userNote.tag} id='tag' name='tag' type="text" placeholder='Tag' className='border border-blue-900 py-3 w-full px-5 shadow-md rounded-sm' maxLength={30} required />

          <button disabled={userNote.title.length < 5 || userNote.description.length < 5 || userNote.tag.length < 3}  className='bg-blue-900  w-fit text-white px-10 py-3  text-center rounded-full font-bold disabled:bg-blue-500'>+ Add Notes</button>

        </form>

      </div>


    </>
  )
}

export default Addnote
