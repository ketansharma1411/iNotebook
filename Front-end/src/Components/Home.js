import React, { useContext } from 'react'
import Notes from './Notes'
import styled from 'styled-components'
import Addnote from './Addnote'
import notecontext from '../context/notes/notecontext'

export default function Home() {
  const a = useContext(notecontext)
  return (
    <Main>
      
      
      <Addnote/>

      <div className='container'>
        <h1>Saved Notes</h1>
        <Notes />
      </div>

    </Main>
  )
}

const Main = styled.div`

.container{
  max-width: 40rem;
  margin-left:9rem ;
}


`
