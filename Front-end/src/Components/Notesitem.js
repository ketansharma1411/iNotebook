import React, { useContext } from 'react'
import styled from 'styled-components'
import notecontext from '../context/notes/notecontext'

export default function Notesitem(props) {
    const a=useContext(notecontext)
    return (
        <Main>
        <div >
            {/* <h4>this is title::{props.data.title}</h4> */}
            
            <div class="card" style={{backgroundColor:a.mode==='light'?'white':'rgb(33 37 41 / 99%)',color:a.mode==='light'?'black':'white',border:a.mode==='light'?'0.5px solid black':'0.5px solid white'}} >
                <div class="card-body">
                    <h5 class="card-title">{props.data.title}</h5>
                    {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <p class="card-text">{props.data.description}</p>
                    <i class="fa-solid fa-trash"></i>
                    <i class="fa-solid fa-pen-to-square"></i>
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
