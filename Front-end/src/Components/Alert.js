import React,{useContext} from 'react'
import notecontext from '../context/notes/notecontext'
export default function Alert() {
    const a = useContext(notecontext)
    const capital=(text)=>{
        text=text.slice(0,1).toUpperCase()+text.slice(1)
        return text
    }
    return (
        <div >
            {a.alert && <div className={`alert alert-${a.alert.type} alert-dismissible fade show`} role="alert" style={{height:'40px',marginLeft:"25px",marginRight:"25px",fontSize:"15px",paddingTop:"7px",paddingBottom:"-10px"}}>
                <strong>{`${capital(a.alert.type)}`}</strong> {capital(a.alert.message)}
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
        </div>
    )
}
