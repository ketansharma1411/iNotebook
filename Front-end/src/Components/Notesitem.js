import React, { useContext } from 'react'
import styled from 'styled-components'
import notecontext from '../context/notes/notecontext'

export default function Notesitem(props) {
    const a=useContext(notecontext)
    return (
        <Main>
        <div >
            {/* <h4>this is title::{props.data.title}</h4> */}
            
            <div className="card" style={{backgroundColor:a.mode==='light'?'white':'rgb(33 37 41 / 99%)',color:a.mode==='light'?'black':'white',border:a.mode==='light'?'0.5px solid black':'0.5px solid white'}} >
                <div className="card-body">
                    <h5 className="card-title" required>{props.data.title}</h5>
                    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <p className="card-text">{props.data.description}</p>
                    <p className='card-text'>{props.data.tags}</p>
                    <i className="fa-solid fa-trash" onClick={()=>{a.deletenote(props.data._id)}}></i>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>{props.updatenote(props.data)}}></i>
                </div>
            </div>
        </div>
        </Main>
    )
}
const Main=styled.div`

.card{
    max-width: 300px;
    width: auto;
    height: auto;
    border: 0.5px solid white;
}
i{
    margin-right: 10px;
    cursor: pointer;
}
`
