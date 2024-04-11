import notecontext from "./notes/notecontext";
import React, { useState} from 'react'

const Notestate=(props)=> {
    const host='http://localhost:5000'



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
    let notesinitial=[]
    let [notes,setNotes]=useState(notesinitial)


    const getAllNotes=async()=>{
      //api call
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method:"POST", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmYmQzNDljZjg1NjQ5Y2VjYWQ0NzcwIn0sImlhdCI6MTcxMTAwMjQ5MH0.tvHfgRTBNUv_RfPDeBvtGvijizTg977J6ikW3-S0NFI"
        }
      });
      const json=await response.json()
      // console.log(json)
      setNotes(json)

    }

    const addNotes=async(title,description,tags)=>{
      //api call
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmYmQzNDljZjg1NjQ5Y2VjYWQ0NzcwIn0sImlhdCI6MTcxMTAwMjQ5MH0.tvHfgRTBNUv_RfPDeBvtGvijizTg977J6ikW3-S0NFI"
        },
        body: JSON.stringify({title,description,tags})
      });
      const data=await response.json()
      // console.log(data) 


      //client side logic
        let note={
          title: title,
          description: description,
          tags: tags,
        }
        setNotes(notes.concat(note))
    }

    const deletenote=async(id)=>{
      try{
      //api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method:"DELETE", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmYmQzNDljZjg1NjQ5Y2VjYWQ0NzcwIn0sImlhdCI6MTcxMTAwMjQ5MH0.tvHfgRTBNUv_RfPDeBvtGvijizTg977J6ikW3-S0NFI"
        }
      });
      const json=await response.json()
      console.log(json)
    }
    catch(err){
      console.log("error occured")

    }
  
      //client side logic
      console.log(id)
      const newnote=notes.filter((note_up)=>{
        
        return id!==note_up._id
      })
      // console.log(newnote)
      setNotes(notes=newnote)
      // console.log(notes)
    }

    const editnote=async(id,title,description,tag)=>{
      //api call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method:"PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmYmQzNDljZjg1NjQ5Y2VjYWQ0NzcwIn0sImlhdCI6MTcxMTAwMjQ5MH0.tvHfgRTBNUv_RfPDeBvtGvijizTg977J6ikW3-S0NFI"
        },
        body: JSON.stringify({title,description,tag})

      });

      const json=await response.json()
      console.log(json)




      //for client side
      let newNote=JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNote.length; index++) {
        const element = newNote[index];
        if(element._id==id){
          
          newNote[index].title=title
          newNote[index].description=description
          newNote[index].tags=tag
          break;
        }
      }
      // console.log(newNote)
      setNotes(newNote)
      console.log(notes)
      
    }

    



  return (
    <notecontext.Provider value={{mode,toogle,notes,addNotes,deletenote,getAllNotes,editnote}}>
        {props.children}
    </notecontext.Provider>
  )
}
export default Notestate