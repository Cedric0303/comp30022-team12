import React from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Helmet } from "react-helmet";
import { useUsers } from "../api.js";
import User from "../Components/User.js";
import "./css/adminManageUsers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminManageUsers(props) {

    const { loading, usersData, error } = useUsers();

    console.log(usersData.users)

    const pageMain = () => {
        if (loading) {
            return (
                <div className="usersBox">
                    <ul>Loading...</ul>
                </div>
            )
        } else if (error) {
            return (
                <div className="usersBox">
                    <ul>Something went wrong: {error.message}</ul>
                </div>
            )
        } else {
            return (
                <div className="usersBox">
                    <ul id="usersList">
                        <li>
                            <a id="addUser" href="admin/users/create">
                                <span>Add New User  </span>
                                <FontAwesomeIcon icon="user-plus" />
                            </a>
                        </li>
                        <li id="usersListHeading">Name</li>
                        {usersData.users.map((user) => (
                            <div key={user._id}  className="specificUser">
                                <User {...user}/>
                            </div>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    return (
        <div className="manageUsers">
            <Helmet>
                <html style="background-color: #596e80;" />
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
