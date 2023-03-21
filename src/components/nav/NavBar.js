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
                    <h1 class="title is-3" className="roamHeader">Roam</h1>
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
                                <Link to="/explore" className="navbar-item">
                                    Expore
                                </Link>
                                <Link to="/calendar" className="navbar-item">
                                    Calendar
                                </Link>
                                <Link to="/packlist" className="navbar-item">
                                    Pack List
                                </Link>
                                <Link to="/connect" className="navbar-item">
                                    Connect
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
                                        className="button is-rounded"
                                        onClick={() => {
                                            setToken("");
                                            navigate("/login");
                                        }}
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <Link to="/register" className="button is-rounded is-link">
                                            Register
                                        </Link>
                                        <Link to="/login" className="button is-rounded is-outlined">
                                            Login
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
