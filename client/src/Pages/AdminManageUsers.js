import React from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Helmet } from "react-helmet";

function AdminManageUsers(props) {
    return (
        <div>
            <Helmet>
                <html style="background-color: #596e80;" />
            </Helmet>
            <Navbar />
            <h2>Admin Manage Users</h2>
        </div>
    );
}

export default AdminManageUsers;
