import notecontext from "./notes/notecontext";
import React, { useState} from 'react'

const Notestate=(props)=> {
    const host='http://localhost:5000'


    //--------------------------------------------------------------------------
    //for setting up the mode of the website
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

    //--------------------------------------------------------------------------

    //--------------------------------------------------------------------------
    // for fetching a notes
    const getAllNotes=async()=>{
      //api call
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method:"POST", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
      });
      const json=await response.json()
      // console.log(json)
      setNotes(json)

    }

    //--------------------------------------------------------------------------
    // for adding a new note
    const addNotes=async(title,description,tags)=>{
      //api call
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
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
    //--------------------------------------------------------------------------

    //--------------------------------------------------------------------------
    // for deleting a new note
    const deletenote=async(id)=>{
      try{
      //api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method:"DELETE", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
      });
      const json=await response.json()
      showalert('The Note has been deleted successfully',"success")
      console.log(json)
    }
    catch(err){
      showalert('Ooops! Some internal error occured, Try again later',"warning")
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
    //--------------------------------------------------------------------------

    //--------------------------------------------------------------------------
    // for updating a new note
    const editnote=async(id,title,description,tag)=>{
      //api call
      try{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method:"PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
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
      // console.log(notes)
      showalert('The Note has been updated successfully',"success")
    }
    catch(err){
      showalert('Ooops! Some Internal error occured, Try again later',"warning")
      console.log("some error occured",err)
    }
      
    }
    //--------------------------------------------------------------------------
    
    // for alerts
    const [alert,setalert]=useState({message:'',type:''})
    const showalert=(message,type)=>{
      setalert({
        message:message,
        type:type
      }
      )
      setTimeout(()=>{
        setalert(null)
      },3000)
    }


  return (
    <notecontext.Provider value={{mode,toogle,notes,addNotes,deletenote,getAllNotes,editnote,showalert,alert}}>
        {props.children}
    </notecontext.Provider>
  )
}
export default Notestate