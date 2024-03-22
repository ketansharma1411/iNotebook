import React, { useContext } from 'react'
import notecontext from '../context/notes/notecontext'
import Notesitem from './Notesitem'
import styled from 'styled-components'
import Addnote from './Addnote'

export default function Notes() {
    const a=useContext(notecontext)
    
  return (
    <Main>
    <div className='outer-container'>
      {a.notes.map((value,index,arr)=>{
            return <Notesitem data={value}/>
      })}
      
    </div>
    </Main>
  )
}
const Main=styled.div`

.outer-container{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    padding-bottom: 2rem;
    padding-top: 1rem;
    gap: 1rem;
    
}
`