import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "./logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Auth from "../../Pages/Auth.js";
import SignOut from "../../Pages/SignOut.js";

function Navbar(props) {
    // Render admin tab if logged in user is an admin
    const adminNav = () => {
        if (Auth.getIsAdmin()) {
            return (
                <li className="navLeft">
                    <NavLink
                        activeClassName="active"
                        className="navText"
                        to="/admin"
                    >
                        Admin
                    </NavLink>
                </li>
            );
        }
    };

    return (
        <div>
            <ul className="nav">
                <li className="navLeft">
                    <a href="/home">
                        <img id="logo" src={logo} alt="bobafish logo" />
                    </a>
                </li>
                <li className="navLeft">
                    <NavLink
                        activeClassName="active"
                        className="navText"
                        to="/home"
                    >
                        Home
                    </NavLink>
                </li>
                <li className="navLeft">
                    <NavLink
                        activeClassName="active"
                        className="navText"
                        to="/calendar"
                    >
                        Calendar
                    </NavLink>
                </li>
                <li className="navLeft">
                    <NavLink
                        activeClassName="active"
                        className="navText"
                        to="/clients"
                    >
                        Clients
                    </NavLink>
                </li>
                {adminNav()}
                <li className="navRight">
                    <a className="navText" onClick={SignOut} href="/">
                        Sign Out{" "}
                        <FontAwesomeIcon icon="sign-out-alt" id="signOut" />
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
