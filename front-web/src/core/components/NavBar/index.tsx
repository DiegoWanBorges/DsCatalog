import react from 'react'
import './styles.scss'

const NavBar = () => (
    <nav className="row bg-primary main-nav">
        <div className="col-2">
            <a href="/" className="nav-logo-text">
                <h4>DS Catalog</h4>
            </a>
        </div>
        <div className="col-6 offset-2">
            <ul className="main-menu">
                <li >
                    <a href="/" className="active">
                        HOME
                    </a>
                </li>
                <li>
                    <a href="/">
                        CATÁLOGO
                    </a>
                </li>
                <li>
                    <a href="/">
                        ADMIN
                    </a>
                </li>
            </ul>
        </div>
    </nav>
);
export default NavBar 