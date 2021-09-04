import React from "react";
import "./Navbar.css";
import logo from "./logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar(props) {

    // Render admin tab if logged in user is an admin
    const adminNav = () => {
        if (true/*props.user.isAdmin*/) {
            return <li className="navLeft"><a className="navText" href="/admin">Admin</a></li>
        }
    }
    
    return (
        <div>
            <ul className="nav">
                <li className="navLeft"><a className="navText" id="logoText" href="/home">bobafish CRM</a></li>
                <li className="navLeft"><a href="/home">
                    <img id="logo" src={logo} alt="bobafish logo" />
                </a></li>
                <li className="navLeft"><a className="navText" href="/home">Home</a></li>
                <li className="navLeft"><a className="navText" href="/calendar">Calendar</a></li>
                <li className="navLeft"><a className="navText" href="/clients">Clients</a></li>
                {adminNav()}
                <li className="navRight"><a className="navText" href="/">Sign Out <FontAwesomeIcon icon="sign-out-alt" id="signOut"/></a></li>
            </ul>
        </div>
    );
}

export default Navbar;
