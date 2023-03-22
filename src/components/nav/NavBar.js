import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { slide as Menu } from 'react-burger-menu'
import "./NavBar.css";

export const NavBar = ({ token, setToken }) => {

    const navigate = useNavigate();
    const navbar = useRef();
    
    return (
        <div
            className="navbar"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <h1 class="title" className="roamHeader">Roam</h1>
                </a>

            </div>
            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    {
                        token ?
                            (<>
                                <Link to="/trips" className="navbar-item">
                                    My Trips
                                </Link>
                                <Link to="/favorites" className="navbar-item">
                                    Favorites
                                </Link>
                                {/* <Link to="/calendar" className="navbar-item">
                                    Calendar
                                </Link> */}
                                <Link to="/packlist" className="navbar-item">
                                    Pack List
                                </Link>
                                <Link to="/connect" className="navbar-item">
                                    Connect
                                </Link>
                                <Link to="/travelers" className="navbar-item">
                                    Roamers
                                </Link>
                            </>
                            ) : (
                                ""
                            )
                    }
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {
                                // This ternary statement checks if the current user is logged in
                                // If true, a logout button will appear and will route back to the "/login" path when clicked
                                token ? (
                                    <button
                                        className="button"
                                        onClick={() => {
                                            setToken("");
                                            navigate("/login");
                                        }}
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <Link to="/register" className="button">
                                            Register
                                        </Link>
                                        <Link to="/login" className="button">
                                            Login
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
