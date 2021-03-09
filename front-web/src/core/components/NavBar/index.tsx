import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import menu from 'core/assets/images/menu.svg';
import './styles.scss';

const NavBar = () => {
    const [drawerActive, setDrawerActive] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();
    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        logout();
    }

    useEffect(() => {
        const currenUserData = getAccessTokenDecoded();
        setCurrentUser(currenUserData.user_name);
    }, [location])

    return (
        <nav className="bg-primary main-nav">

            <Link to="/" className="nav-logo-text">
                <h4>DS Catalog</h4>
            </Link>

            <button
                className="menu-mobile-btn"
                type="button"
                onClick={() => setDrawerActive(!drawerActive)}
            >
                <img src={menu} alt="mobile menu" />
            </button>

            <div className={drawerActive ? "menu-mobile-container" : "menu-container"}>
                <ul className="main-menu">
                    <li >
                        <NavLink className="nav-link" to="/" exact onClick={() =>setDrawerActive(!drawerActive)}>
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/products" onClick={() =>setDrawerActive(!drawerActive)}>
                            CATÁLOGO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/admin" onClick={() =>setDrawerActive(!drawerActive)} >
                            ADMIN
                        </NavLink>
                    </li>
                    {drawerActive && (
                        <li>
                            {
                                currentUser && (
                                    <a href="#logout" className="nav-link active d-inline" onClick={() =>setDrawerActive(!drawerActive)}>
                                        {`LOGOUT - ${currentUser}`}
                                    </a>
                                )
                            }
                        </li>
                    )
                    }

                    {drawerActive && (
                        <>
                            {!currentUser && (
                                <li>
                                    <Link
                                        className="nav-link active" 
                                        to="/auth/login"
                                        onClick={() =>setDrawerActive(!drawerActive)}
                                        >
                                        LOGIN
                                    </Link>
                                </li>

                            )}
                        </>
                    )}
                </ul>
            </div>
            <div className="user-info-dnone text-right">
                {currentUser && (
                    <>
                        {currentUser}
                        <a
                            href="RRR"
                            className="nav-link active d-inline"
                            onClick={
                                (e) => {
                                    handleLogout(e);
                                    setDrawerActive(!drawerActive)
                                }
                            }
                        >
                            LOGOUT
                        </a>
                    </>
                )}
                {!currentUser && (
                    <Link
                        className="nav-link active" to="/auth/login" onClick={() =>setDrawerActive(!drawerActive)}>
                        LOGIN
                    </Link>
                )}
            </div>
        </nav>
    )
}
export default NavBar