import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.js";
import { Helmet } from "react-helmet";
import { useUsers } from "../api.js";
import User from "../Components/User.js";
import "./css/adminManageUsers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminManageUsers(props) {
    const { loading, usersData, error } = useUsers();

    const pageMain = () => {
        if (loading) {
            return (
                <div className="usersBox">
                    <ul>Loading...</ul>
                </div>
            );
        } else if (error) {
            return (
                <div className="usersBox">
                    <ul>Something went wrong: {error.message}</ul>
                </div>
            );
        } else if (!usersData.users.length) {
            return (
                <div className="usersBox">
                    <ul id="usersList">
                        <li>
                            <NavLink id="addUser" to="users/create">
                                <span>Add New User </span>
                                <FontAwesomeIcon icon="user-plus" />
                            </NavLink>
                        </li>
                        <li>
                            No users found, please reload or add new users.
                        </li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="usersBox">
                    <ul id="usersList">
                        <li>
                            <NavLink id="addUser" to="users/create">
                                <span>Add New User </span>
                                <FontAwesomeIcon icon="user-plus" />
                            </NavLink>
                        </li>
                        <li id="usersListHeading">Name</li>
                        {usersData.users.map((user) => (
                            <div key={user.username} className="specificUser">
                                <User key={user.username} {...user} />
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return (
        <div className="manageUsers">
            <Helmet>
                <style type="text/css">{`
                    html {
                        background-color: #596e80;
                    }
                `}</style>
            </Helmet>
            <Navbar />
            <main className="manageUsersBox">
                <h2 id="usersHeading">Manage Users</h2>
                {pageMain()}
            </main>
        </div>
    );
}

export default AdminManageUsers;
