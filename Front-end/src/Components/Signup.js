import React, { useState,useContext } from 'react'
import notecontext from '../context/notes/notecontext'
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const a = useContext(notecontext)
    const host='http://localhost:5000'
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})

    const navigate = useNavigate();

    const handle=async(event)=>{
        event.preventDefault()
              //api call
      const {name,email,password}=credentials
      const response = await fetch(`${host}/api/auth/createuser`, {
        method:"POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name,email,password})
      });
      const json=await response.json()
      console.log(json)
      console.log(json.sucess)
      if (json.sucess===true){
        //redirect
        localStorage.setItem('token',json.authToken)
        navigate('/')
        a.showalert('User Created Sucessfully','success')
      }
      else{
        a.showalert('Invalid Credentials','danger')
        
        
      }
    }
    const onchange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }

    return (
        <div className='container my-3'>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputname1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleInputName1" name='name' value={credentials.name} aria-describedby="nameHelp" minLength={5} required onChange={onchange}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" value={credentials.email}className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" minLength={5} required onChange={onchange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" value={credentials.password} className="form-control" id="exampleInputPassword1" minLength={5} required onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" name="cpassword" value={credentials.cpassword} minLength={5} required onChange={onchange} />
                </div>

                <button type="submit" onClick={handle} className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}
