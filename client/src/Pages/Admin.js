import React from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import "../App.css";
import "./css/admin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Admin(props) {
    return (
        <main>
            <h2 class="mainHeading">Admin</h2>
            <div id="adminButtons">
                <div class="squareButton"><FontAwesomeIcon icon="user" /></div>
                <div class="squareButton"><FontAwesomeIcon icon="tag" /></div>
                <div class="squareButton"><FontAwesomeIcon icon="user-tie" /></div>
            </div>
        </main>
    );
}

export default Admin;
