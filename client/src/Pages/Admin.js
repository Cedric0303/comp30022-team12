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
                <style type="text/css">{`
                    html {
                        background-color: #596e80;
                    }
                `}</style>
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
                            <FontAwesomeIcon
                                className="AdminIcon"
                                icon="user"
                            />
                            Manage Users
                        </div>
                    </NavLink>
                    <NavLink
                        activeClassName="active"
                        className="navButton"
                        to="/admin/stages"
                    >
                        <div className="squareButton hoverable">
                            <FontAwesomeIcon className="AdminIcon" icon="tag" />
                            Manage Stages
                        </div>
                    </NavLink>
                    <NavLink
                        activeClassName="active"
                        className="navButton"
                        to="/clients"
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
