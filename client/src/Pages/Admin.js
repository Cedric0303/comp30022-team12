import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.js";
import "../App.css";
import "./css/admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";

function Admin(props) {
    return (
        <div>
            <Helmet>
                <html style={{ "background-color": "#596e80" }} />
            </Helmet>
            <Navbar />
            <main>
                <h2 className="mainHeading">Admin</h2>
                <div id="adminButtons">
                    <NavLink
                        activeClassName="active"
                        className="navButton"
                        to="/admin/users"
                    >
                        <div className="squareButton hoverable">
                            <FontAwesomeIcon className="AdminIcon" icon="user" />
                            Manage Users
                        </div>
                    </NavLink>
                    <NavLink
                        activeClassName="active"
                        className="navButton"
                        to="/admin/tags"
                    >
                        <div className="squareButton hoverable">
                            <FontAwesomeIcon className="AdminIcon" icon="tag" />
                            Manage Tags
                        </div>
                    </NavLink>
                    <NavLink
                        activeClassName="active"
                        className="navButton"
                        to="/admin/users"
                    >
                        <div className="squareButton hoverable">
                            <FontAwesomeIcon
                                className="AdminIcon"
                                icon="user-tie"
                            />
                            Manage Clients
                        </div>
                    </NavLink>
                </div>
            </main>
        </div>
    );
}

export default Admin;
