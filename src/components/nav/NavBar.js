import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ token, setToken }) => {

    const navigate = useNavigate();
    const navbar = useRef();
    const hamburger = useRef();

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle("is-active");
        navbar.current.classList.toggle("is-active");
    };

    return (
        <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <h1 className="roamHeader title">Roam</h1>
                </a>
                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="true"
                    data-target="navbarBasicExamplef"
                    onClick={showMobileNavbar}
                    ref={hamburger}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
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
                                <Link to="/calendar" className="navbar-item">
                                    Calendar
                                </Link>
                                {/* <span className="padding">/</span> */}
                                <Link to="/favorites" className="navbar-item">
                                    Favorites
                                </Link>
                                {/* <span className="padding">/</span> */}
                                <Link to="/packlist" className="navbar-item">
                                    Pack List
                                </Link>
                                {/* <span className="padding">/</span> */}
                                <Link to="/connect" className="navbar-item">
                                    Connect
                                </Link>
                                {/* <span className="padding">/</span> */}
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
                    <div className="navbar-item navbar-button">
                        {
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
                                    <div className="registerButton">
                                        <Link to="/register" className="button">
                                            Register
                                        </Link>
                                    </div>
                                    <div className="loginButton">
                                        <Link to="/login" className="button">
                                            Login
                                        </Link>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}
