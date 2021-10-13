import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.js";
import { Helmet } from "react-helmet";
import { useUsers } from "../api.js";
import User from "../Components/User.js";
import "./css/adminManageUsers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactLoading from "react-loading";
import "./css/animation.css";

function AdminManageUsers(props) {
    const { loading, usersData, error } = useUsers();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(usersData);

    function filterUsers(users, query) {
        var pattern = query
            .split("")
            .map((x) => {
                return `(?=.*${x})`;
            })
            .join("");
        var regex = new RegExp(`^${pattern}`, "i");

        if (!query) {
            // no query
            return users;
        } else {
            // yes query
            return users.filter((users) => {
                return regex.test(users.firstName + " " + users.lastName);
            });
        }
    }

    useEffect(() => {
        if (usersData) {
            setFilteredUsers(filterUsers(usersData.users, searchQuery));
        }
    }, [usersData, searchQuery]);

    const pageMain = () => {
        if (loading) {
            return (
                <div>
                    <div className="usersBox">
                        <ul>Loading...</ul>
                    </div>
                    <ReactLoading
                        id="loading-anim"
                        type="spin"
                        color="black"
                        height="2%"
                        width="2%"
                    ></ReactLoading>
                </div>
            );
        } else if (error) {
            return (
                <div className="usersBox">
                    <ul>Something went wrong: {error.message}</ul>
                </div>
            );
        } else if (usersData.users.length !== 0) {
            return (
                <div className="usersBox">
                    <ul id="usersList">
                        <li id="usersListHeading">Name</li>
                        {filteredUsers.map((user) => (
                            <div key={user.username} className="specificUser">
                                <User key={user.username} {...user} />
                            </div>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="usersBox">
                    <ul id="usersList">
                        <li>No users found, please reload or add new users.</li>
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
                <title>Manage Users - Admin Bobafish CRM</title>
                <meta
                    name="description"
                    content="Create new users, edit existing users or delete users."
                />
            </Helmet>
            <Navbar />
            <main className="manageUsersBox">
                <h2 id="usersHeading">Manage Users</h2>
                <div className="usersActionBar">
                    <input
                        id="userSearchBar"
                        value={searchQuery}
                        onInput={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search users"
                    />
                    <NavLink id="addUser" to="users/create">
                        <span>Add New User </span>
                        <FontAwesomeIcon icon="user-plus" />
                    </NavLink>
                </div>
                {pageMain()}
            </main>
        </div>
    );
}

export default AdminManageUsers;
