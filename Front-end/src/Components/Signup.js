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
      const {name,email,password,cpassword}=credentials
      console.log(cpassword)
      if (password!==cpassword){
        a.showalert('Password not matched',"warning")
      }
      else{
      const response = await fetch(`${host}/api/auth/createuser`, {
        method:"POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name,email,password})
      });
      const json=await response.json()
      
      if (json.sucess===true && password===cpassword){
        //redirect
        localStorage.setItem('token',json.authToken)
        navigate('/')
        a.showalert('User Created Sucessfully','success')
      }
      else{
        a.showalert('Invalid Credentials','danger')
      }
    }
    }
    const onchange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }

    return (
        <div className='container my-3' style={{width:"700px"}}>
            <center><h3 style={{marginBottom:"20px"}}>Create a New Account</h3></center>
            <form onSubmit={handle}>
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
                <div className="mb-3" style={{position:"relative"}}>
                    <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" name="cpassword" value={credentials.cpassword} minLength={5} required onChange={onchange} />
                    { credentials.cpassword && (credentials.cpassword===credentials.password ? <span style={{color:"green",position:"absolute",left:"690px",top:"37px"}}><i class="fa-regular fa-square-check"></i></span>:<span style={{color:"red",position:"absolute",left:"690px",top:"37px"}}><i class="fa-solid fa-square-xmark"></i></span>)}
                </div>

                <button type="submit"  className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}
