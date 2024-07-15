//imports
import { useState } from "react";
import NoteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesinitial = []

  //create usestate for store user notes
  const [inotes, setiNotes] = useState(notesinitial)

  //add note
  const getNote = async () => {
    //fetch api

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers:
      {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setiNotes(json)   //set  fetched user notes in setiNotes

  }

  //add note
  const addNote = async (title, description, tag) => {
    //fetch api

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers:
      {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    const notes = await response.json();
    setiNotes(inotes.concat(notes))   // stay inotes(which added already) and add notes(news note)
    console.log("adding a note")
  }

  //delete note
  const deleteNote = async (id) => {
    //fetch api

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers:
      {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      }

    });
  
    const newNote = inotes.filter((notes) => {
      return notes._id !== id
    })
    setiNotes(newNote)
    console.log("delete ...   " + id)

  }

  //edit note
  const editNote = async (id, title, description, tag) => {
    //fetch api

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers:
      {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });

    let updatedNotes = JSON.parse(JSON.stringify(inotes))

    //logic to edit user notes
    for (let index = 0; index < updatedNotes.length; index++) {
      const element = updatedNotes[index];

      if (element._id === id) {
        updatedNotes[index].title = title
        updatedNotes[index].description = description
        updatedNotes[index].tag = tag
        break;

      }

    }
    setiNotes(updatedNotes)
    console.log("edit a note")
  }

  return (
    <NoteContext.Provider value={{ inotes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;