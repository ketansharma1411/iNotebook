import notecontext from "./notes/notecontext";

import React, { useState } from 'react'

const Notestate=(props)=> {
    let [mode,setmode]=useState('dark')

    let toogle=()=>{
        if(mode==='light'){
            setmode(mode='dark')
        }
        else{
            setmode(mode='light')
        }

    }

  return (
    <notecontext.Provider value={{mode,toogle}}>
        {props.children}
    </notecontext.Provider>
  )
}
export default Notestate