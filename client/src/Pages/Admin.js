import React from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import "../App.css";
import "./css/admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";

function Admin(props) {
    return (
        <div>
            <Helmet>
                <html style="background-color: #596e80;" />
            </Helmet>
            <Navbar/>
            <main>
                <h2 class="mainHeading">Admin</h2>
                <div id="adminButtons">
                    <a class="squareButton hoverable" href="admin/users">
                        <FontAwesomeIcon class="AdminIcon" icon="user" />
                        Manage Users
                    </a>
                    <a class="squareButton hoverable" href="admin/tags">
                        <FontAwesomeIcon class="AdminIcon" icon="tag" />
                        Manage Tags
                    </a>
                    <a class="squareButton hoverable" href="">
                        <FontAwesomeIcon class="AdminIcon" icon="user-tie" />
                        Manage Clients
                    </a>
                </div>
            </main>
        </div>
        
    );
}

export default Admin;
