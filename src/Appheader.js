import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [displayUsername, setDisplayUsername] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const publicRoutes = ['/login', '/register'];
        if (publicRoutes.includes(location.pathname)) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
            const username = sessionStorage.getItem('username');
            if (!username) {
                navigate('/login');
            } else {
                setDisplayUsername(username);
            }
        }
    }, [location, navigate]);

    const handleLogout = () => {
        sessionStorage.clear(); // Clear session storage on logout
        navigate('/login');
    };

    return (
        <div>
            {showMenu && (
                <nav className="navbar navbar-expand-lg navbar-light bg-warning shadow-sm">
                    <div className="container">
                        <Link className="navbar-brand" to="/">RBAC</Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto">
                                {/* <li className="nav-item">
                                    <Link className="nav-link btn btn-outline-secondary me-2" to="/">Home</Link>
                                </li> */}
                                {/* User Management Link */}
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle btn btn-outline-secondary"
                                        href="#"
                                        id="userManagementDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Management
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="userManagementDropdown">
                                        <li>
                                            <Link className="dropdown-item text-black bg-outline-primary" to="/usermanagement">
                                                Manage Users
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-black btn -outline-primary" to="/roles">
                                                Manage Roles
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <span className="navbar-text me-3">
                                Welcome, <strong>{displayUsername}</strong>
                            </span>
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>
            )}
        </div>
    );
};

export default Appheader;
