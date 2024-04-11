import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import notecontext from "../context/notes/notecontext";

export default function Navbar() {
    //we have used this to make add active appearance to the navbar buttons
    const location = useLocation();

    //this is to use probs
    const a = useContext(notecontext);

    return (
        <Nav>
            <div>
                <nav
                    className={`navbar  navbar-expand-lg navbar-${a.mode === "light" ? "light" : "dark"
                        }  bg-${a.mode === "light" ? "light" : "dark"}`}
                >
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            iNotebook
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === "/" ? "active" : ""
                                            }`}
                                        aria-current="page"
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === "/about" ? "active" : ""
                                            }`}
                                        to="/about"
                                    >
                                        About
                                    </Link>
                                </li>
                            </ul>
                            <div
                                className="modechanger"
                                onClick={a.toogle}
                                style={{
                                    border:
                                        a.mode === "dark" ? "1px solid white" : "1px solid #212529",
                                }}
                            >
                                <i
                                    className="fa-solid fa-moon"
                                    style={{
                                        transform:
                                            a.mode === "light" ? "rotate(0deg)" : "rotate(360deg)",
                                    }}
                                ></i>
                            </div>
                            <div className="button-quad">
                            <Link class="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link class="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </Nav>
    );
}

const Nav = styled.div`
  .modechanger {
    width: 27px;
    height: 27px;
    border-radius: 50%;
    border: 1px solid black;
    margin-right: 50px;
    margin-top: 4px;
  }
  .modechanger i {
    font-size: 20px;
    margin-left: 6px;
    margin-top: 3px;
    cursor: pointer;
  }
  .btn{
    height: 27px;
    width: 50px;
    font-size: 13px;
    padding: 0;
    padding-top: 2px;
  }
  .button-quad{
    margin-left: -20px;
    margin-right: 20px;
  }
`;
