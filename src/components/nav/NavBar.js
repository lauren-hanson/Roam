import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ token, setToken }) => {
    const navigate = useNavigate()

    return (
        <div
            className="navbar"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    {/* <img src={Logo} height="3rem" alt="Roam Logo" />{" "} */}
                    <h1 className="roamHeader">Roam</h1>
                </a>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    {
                        token ?
                            (<>
                                <Link to="explore" className="navbar-item">
                                    Expore
                                </Link>
                                <Link to="/calendar" className="navbar-item">
                                    Calendar
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
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
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
    )
}

