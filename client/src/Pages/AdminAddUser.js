import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar/Navbar.js";
import { postUser } from "../api.js";
import "./css/adminAddUser.css";
import showPwdImg from "./css/show-password.png";
import hidePwdImg from "./css/hide-password.png";

function validate_password(p) {
    const letter = /[a-zA-Z]/;
    const number = /[0-9]/;
    const minLength = 8;
    const maxLength = 20;
    return (
        (letter.test(p) || number.test(p)) &&
        p.length >= minLength &&
        p.length <= maxLength
    );
}

function AdminAddUser(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isRevealPwd, setIsRevealPwd] = useState(false);

    function notEmpty() {
        return firstName && lastName && username && password;
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //prevent reload
        if (notEmpty()) {
            const registerBody = {
                username: username,
                password: password,
                isAdmin: false,
                firstName: firstName,
                lastName: lastName,
            };

            if (validate_password(password)) {
                //validate password
                postUser(registerBody);
            } else {
                alert(
                    "Passwords must only be comprised of letters or numbers and be between 8-20 characters."
                );
            }
        } else {
            alert("All fields must have a value!");
        }
    };

    return (
        <div>
            <Helmet>
                <style type="text/css">{`
                    html {
                        background-color: #596e80;
                    }
                `}</style>
                <title>Add User - Admin Bobafish CRM</title>
                <meta name="description" content="Add a new user" />
            </Helmet>
            <Navbar />
            <h2 className="add-user-heading">Add User</h2>
            <div className="add-user-container">
                <div className="add-user-container-item" id="item-left">
                    <form
                        method="post"
                        onSubmit={handleSubmit}
                        className="add-user-form"
                    >
                        <div className="field-group" id="name-info">
                            <div className="field">
                                <label className="add-user-label">
                                    First Name:
                                </label>
                                <input
                                    className="add-user-input"
                                    required
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="field">
                                <label className="add-user-label">
                                    Last Name:
                                </label>
                                <input
                                    className="add-user-input"
                                    required
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="field-group" id="login-info">
                            <div className="field">
                                <label className="add-user-label">
                                    Username:
                                </label>
                                <input
                                    className="add-user-input"
                                    required
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="field" id="password-field">
                                <label className="add-user-label">
                                    Password:
                                </label>
                                <input
                                    className="add-user-input"
                                    required
                                    type={isRevealPwd ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <img
                                    style={{
                                        height: "40%",
                                        width: "auto",
                                        paddingLeft: "10px",
                                    }}
                                    title={
                                        isRevealPwd
                                            ? "Hide Password"
                                            : "Show Password"
                                    }
                                    src={isRevealPwd ? hidePwdImg : showPwdImg}
                                    alt={
                                        isRevealPwd
                                            ? "Hide Password Icon"
                                            : "Show Password Icon"
                                    }
                                    onClick={() => setIsRevealPwd(!isRevealPwd)}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="add-user-container-item" id="item-right">
                    <NavLink to="/admin/users" activeClassName="cancel-option">
                        Cancel
                    </NavLink>
                </div>
            </div>

            <button
                className="add-user-button"
                id="create-user"
                onClick={handleSubmit}
            >
                Create User
            </button>
        </div>
    );
}

export default AdminAddUser;
