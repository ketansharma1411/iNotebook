
import { useContext } from "react";
import { Link, useLocation  } from "react-router-dom";
import styled from 'styled-components';
import notecontext from "../context/notes/notecontext";

export default function Navbar() {
    const location = useLocation();
    const a=useContext(notecontext)

    return (
        <Nav>
        <div>
            <nav class={`navbar navbar-expand-lg navbar-${a.mode==='light'?'light':'dark'} bg-${a.mode==='light'?'light':'dark'}`}>
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">iNotebook</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <div className="modechanger" onClick={a.toogle} style={{border:a.mode==='dark'?'1px solid white':'1px solid #212529'}}>
                        <i className="fa-solid fa-moon" style={{transform:a.mode==='light'?'rotate(0deg)':'rotate(360deg)'}}></i>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        </Nav>
    )
}

const Nav=styled.div`
.modechanger{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid black;
    margin-right: 50px;
    margin-top: 5px;
    
}
.modechanger i{
    font-size: 22px;
    margin-left: 6px;
    margin-top: 3px;
    cursor: pointer;
}

`