import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import notecontext from '../context/notes/notecontext'


export default function Addnote() {
    const a = useContext(notecontext)
    const [note,setNote]=useState({title:'',description:"",tag:""})



    const handle=(event)=>{
        event.preventDefault()
        a.addNotes(note.title,note.description,note.tag)
        

    }
    const onChange1=(event)=>{
        // console.log(event.target.name,event.target.value)
        setNote({...note,[event.target.name]:event.target.value})

    }


    
    return (
        <Main>
            <div>
            <h2 >Add a Note</h2>
                <div className='form' style={{ border: a.mode === 'light' ? '0.5px solid black' : '0.5px solid white' }}>
                    

                    <form>
                        <div class="mb-2">
                            <label htmlfor="title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="title" name='title' aria-describedby="title" onChange={onChange1} />
                        </div>
                        <div class="mb-2">
                            <label htmlfor="description" class="form-label">Description</label>
                            <textarea type="text" class="form-control" id="description" name='description' onChange={onChange1} />
                        </div>
                        {/* <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div> */}
                        <div class="mb-4">
                            <label htmlfor="tag" class="form-label">Tag</label>
                            <input type="text" class="form-control" id="tag" name='tag' onChange={onChange1}/>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={handle}>Add Note</button>
                    </form>
                </div>
            </div>
        </Main>
    )
}

const Main = styled.div`
.form{
  margin-bottom: 1rem;
  max-width: 38rem;
  margin-left: 10rem;
  margin-top: 1rem;
  padding:1rem;
  border-radius: 3px;
  padding-top: 1.5rem;
}

h2{
  margin-left: 10rem;
  margin-top: 1rem;
}

`