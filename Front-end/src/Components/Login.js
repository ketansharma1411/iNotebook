import React, { useContext,useState } from 'react'
import notecontext from '../context/notes/notecontext'
import { useNavigate } from "react-router-dom";
export default function Login() {
    const a = useContext(notecontext)
    const host='http://localhost:5000'
    const [credentials,setCredentials]=useState({email:"",password:""})

    const navigate = useNavigate();

    const handle=async(event)=>{
        event.preventDefault()
              //api call
        const {email,password}=credentials
      const response = await fetch(`${host}/api/auth/login`, {
        method:"POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email,password})

      });
      const json=await response.json()
      console.log(json)
      console.log(json.sucess)
      if (json.sucess===true){
        //redirect
        localStorage.setItem('token',json.authToken)
        a.showalert('Logged in Sucessfully','success')
        navigate('/')
      }
      else{
        a.showalert('Invalid Credentials','warning')
        
      }
    }
    const onchange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }


    return (
        <div className='container my-3 ' style={{width:"700px"}}>
          <center><h3 style={{marginBottom:"20px"}}>Login to use iNotebook</h3></center>
        <form >
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name='email' value={credentials.email} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name='password' value={credentials.password} onChange={onchange} className="form-control" id="exampleInputPassword1"/>
            </div>
            
            <button type="submit" onClick={handle} className="btn btn-primary">Login</button>
        </form>
        </div>
    )
}
