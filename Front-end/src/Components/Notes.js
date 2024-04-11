import React, { useContext, useEffect,useState,useRef } from 'react'
import notecontext from '../context/notes/notecontext'
import Notesitem from './Notesitem'
import styled from 'styled-components'


export default function Notes() {
  const a = useContext(notecontext)
  useEffect(() => {
    a.getAllNotes()
  }, [a])

  
  const [note,setNote]=useState({id:'',etitle:"",edescription:"",etags:""})

  const refclose=useRef(null)
  const handle=()=>{
    
    refclose.current.click()
    console.log('updating the note')
    
    console.log(note)
    a.editnote(note.id,note.etitle,note.edescription,note.etags)
    
    

}
const onChange1=(event)=>{
    // console.log(event.target.name,event.target.value)
    setNote({...note,[event.target.name]:event.target.value})

}

const refcont=useRef(null)
    const updatenote=async(currentnote)=>{
    
    refcont.current.click()
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etags:currentnote.tags})
    console.log(currentnote)
    }

  return (
    <Main>
      
      <button type="button"  ref={refcont} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>


      <div  className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1000" aria-labelledby="staticBackdropLabel" aria-hidden="false" >
        <div className="modal-dialog" >
          <div className="modal-content" style={{backgroundColor:a.mode==='light'?'white':'rgb(33 37 41 / 99%)',color:a.mode==='light'?'black':'white' }}>
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Update Note</h5>
              {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>
            <div className="modal-body" >
            {/*--------------------------------------------------------------*/}
            <div className='form' >
                    <form>
                        <div className="mb-2">
                            <label htmlFor="title" className="form-label" >Title</label>
                            <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="title" onChange={onChange1} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange1}  />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="etags" name='etags' value={note.etags} onChange={onChange1}/>
                        </div>
                        
                    </form>
                </div>
              {/*------------------------------------------------------------*/}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refclose}>Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handle}  className="btn btn-primary">Update</button>
            </div>
          </div>
        </div>
      </div>
      <div className='outer-container'>
        
        {a.notes.length===0 && 'NO Saved Notes'}
        
        {a.notes.map((value,key) => {
          
          return <Notesitem key={value._id} data={value} updatenote={updatenote}/>
        })}

      </div>
    </Main>
  )
}
const Main = styled.div`

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