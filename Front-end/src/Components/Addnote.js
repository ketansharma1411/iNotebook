import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import notecontext from '../context/notes/notecontext'


export default function Addnote() {
    const a = useContext(notecontext)
    const [note,setNote]=useState({title:"",description:"",tag:""})



    const handle=(event)=>{

        //this is use to prevent auto submission of form
        event.preventDefault()
        a.addNotes(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        

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
                        <div className="mb-2">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="title" onChange={onChange1} minLength={5} required />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange1}  minLength={5} required/>
                        </div>
                        {/* <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" for="exampleCheck1">Check me out</label>
          </div> */}
                        <div className="mb-4">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange1} minLength={5} required/>
                        </div>
                        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handle}>Add Note</button>
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