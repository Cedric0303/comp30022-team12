import React from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Helmet } from "react-helmet";
import "./css/adminEditUser.css";

function AdminEditUser(props) {
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
            <h2 className="edit-user-heading">Admin Edit User</h2>
        </div>
    );
}

export default AdminEditUser;
