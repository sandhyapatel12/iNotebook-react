import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(noteContext)
  useEffect(() =>
  {
    a.update()
  },[])
  return (
    <div>
      About {a.state.name}nvnvjj {a.state.age}
    </div>
  )
}

export default About
