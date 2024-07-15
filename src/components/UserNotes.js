import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import UserNoteitems from './UserNoteitems'
import { useNavigate } from 'react-router-dom'
import UpArrow from './UpArrow'

const UserNotes = () => {


  //use noteContext which created at noteContext.js file  
  const context = useContext(noteContext)

  //destructure notes from context
  const { inotes, getNote } = context

  //useNavigate hook for redirection
  const navigate = useNavigate();


  //fetch all notes
  useEffect(() => {
    //if token is not null then display notes other wise redirect on login page
    if (localStorage.getItem('token')) {
      getNote();
     }
    else {
      navigate('/login')
    }
  }, [])


  return (
    <>


      {/* get user notes */}
      <div className='max-w-6xl mx-auto  mt-20 px-5 pb-10 '>
        <h1 className='text-2xl font-bold'>Your Notes</h1>
        <div className='grid gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-10  '>

          {/* fetch user notes */}
          {inotes.length === 0 && 'not yet notes added'}

          {inotes.map((notes) => {

            // div for single note 
            return <div className=''>
              <UserNoteitems key={notes._id} notes={notes} />     {/* this notes created by user (coming from userNotesitems) */}
            </div>
          })
          }

        </div>
      </div>
      <UpArrow />

    </>
  )
}


export default UserNotes
