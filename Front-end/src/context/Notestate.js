import notecontext from "./notes/notecontext";
import React, { useState } from 'react'

const Notestate=(props)=> {

    //for seting up the mode of the website
    let [mode,setmode]=useState('dark')
    let toogle=()=>{
        if(mode==='light'){
            setmode(mode='dark')
        }
        else{
            setmode(mode='light')
        }
    }

    //for displaying the notes from api
    const notesinitaial=[
        {
            "_id": "65fbd6a3374b80060b829e41",
            "user": "65fbd349cf85649cecad4770",
            "title": "Note from raghav",
            "description": "this is a description of the note made by raghav",
            "tags": "Personal",
            "date": "2024-03-21T06:41:39.089Z",
            "__v": 0
          },
          {
            "_id": "65fbd6a3374b80060b829e41",
            "user": "65fbd349cf85649cecad4770",
            "title": "Note from raghav",
            "description": "this is a description of the note made by raghav",
            "tags": "Personal",
            "date": "2024-03-21T06:41:39.089Z",
            "__v": 0
          },
          {
            "_id": "65fbd6a3374b80060b829e41",
            "user": "65fbd349cf85649cecad4770",
            "title": "Note from raghav",
            "description": "this is a description of the note made by raghav",
            "tags": "Personal",
            "date": "2024-03-21T06:41:39.089Z",
            "__v": 0
          },
          {
            "_id": "65fbd6a3374b80060b829e41",
            "user": "65fbd349cf85649cecad4770",
            "title": "Note from raghav",
            "description": "this is a description of the note made by raghav",
            "tags": "Personal",
            "date": "2024-03-21T06:41:39.089Z",
            "__v": 0
          }
        ]
    const [notes,setNotes]=useState(notesinitaial)

    const addNotes=(title,description,tag)=>{
        const note={
          "_id": "65fbd6a3374b80060b829e41",
          "user": "65fbd349cf85649cecad4770",
          "title": title,
          "description": description,
          "tags": tag,
          "date": "2024-03-21T06:41:39.089Z",
          "__v": 0
        }
        setNotes(notes.concat(note))
    }



  return (
    <notecontext.Provider value={{mode,toogle,notes,addNotes}}>
        {props.children}
    </notecontext.Provider>
  )
}
export default Notestate