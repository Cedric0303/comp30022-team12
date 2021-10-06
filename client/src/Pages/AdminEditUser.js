import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar/Navbar.js";
import "./css/adminEditUser.css";
import { getUser } from "../api.js";
import showPwdImg from "./css/show-password.png";
import hidePwdImg from "./css/hide-password.png";

function AdminEditUser(props) {

    const [loading, setLoading] = useState(true);
    const [userData, setUser] = useState([]);
    const [error, setError] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [hash, setHash] = useState("");
    
    const [isRevealPwd, setIsRevealPwd] = useState(false);


    const getUsername = () => {
        if (props.match.params === null || props.match.params === undefined) {
            return null;
        } else if (props.match.params.userID) {
            return props.match.params.userID;
        }
    };
    

    //const { loading, userData, error } = useUser(getUser())
    // TODO: Get user from db
    //
    //console.log(typeof userData);
    

    useEffect(() => {
        getUser(getUsername())
            .then((userData) => {
                    setUser(userData);
                    setLoading(false);
                    setHash(userData.user.password);

                    // Prepopulate fields
                    setFirstName(userData.user.firstName);
                    setLastName(userData.user.lastName);
                    setUsername(userData.user.username);
                }
            ).catch((e) => {
                console.log(e);
                setError(e);
                setLoading(false);
            });
    }, [userData]);
    
    
    // check if userData==null
    //useEffect(() => {
    //    //console.log("user data:");
    //    //console.log(userData.user.username);
    //    setFirstName(userData.user.firstName);
    //    setLastName(userData.user.lastName);
    //    setUsername(userData.user.username);
    //}, [userData]);
    
    const pageMain = () => {
        if (loading) {
            return (
                <div >
                    <ul>Loading...</ul>
                </div>
            );
        } else if (error) {
            return (
                <div >
                    <ul>Something went wrong: {error.message}</ul>
                </div>
            );
        } else {
            return (
                <div>
                    <h2 className="edit-user-heading">Edit User</h2>
                    <div className="edit-user-container">
                        <div className="edit-user-container-item" id="item-left">
                            <form
                                method="post"
                                onSubmit={handleSubmit}
                                className="edit-user-form"
                            >
                                <div className="field-group" id="name-info">
                                    <div className="field">
                                        <label className="edit-user-label">
                                            First Name:
                                        </label>
                                        <input
                                            className="edit-user-input"
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
                                        <label className="edit-user-label">
                                            Last Name:
                                        </label>
                                        <input
                                            className="edit-user-input"
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
                                        <label className="edit-user-label">
                                            Username:
                                        </label>
                                        <input
                                            className="edit-user-input"
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
                                        <label className="edit-user-label">
                                            New Password:
                                        </label>
                                        <input
                                            className="edit-user-input"
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
                        <div className="edit-user-container-item" id="item-right">
                            <NavLink to="/admin/users" activeClassName="cancel-option">
                                Cancel
                            </NavLink>
                            
                        </div>
                    </div>

                    <div className="edit-user-changes">
                        <button
                            className="edit-user-button"
                            id="confirm-changes"
                            onClick={handleSubmit}
                        >
                            Confirm Changes
                        </button>
                        <NavLink to="/admin/users" activeClassName="delete-option">
                            Delete User
                        </NavLink>
                    </div>               
                </div>
                

            )
        }
    }


    function notEmpty() {
        if (
            firstName === "" ||
            lastName === "" ||
            username === "" ||
            password === ""
        ) {
            return false;
        }
        return true;
    }

    const handleSubmit = () => {

    }

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
            {pageMain()}
            {/*<div>
                    <h2 className="edit-user-heading">Edit User</h2>
                    <div className="edit-user-container">
                        <div className="edit-user-container-item" id="item-left">
                            <form
                                method="post"
                                onSubmit={handleSubmit}
                                className="edit-user-form"
                            >
                                <div className="field-group" id="name-info">
                                    <div className="field">
                                        <label className="edit-user-label">
                                            First Name:
                                        </label>
                                        <input
                                            className="edit-user-input"
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
                                        <label className="edit-user-label">
                                            Last Name:
                                        </label>
                                        <input
                                            className="edit-user-input"
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
                                        <label className="edit-user-label">
                                            Username:
                                        </label>
                                        <input
                                            className="edit-user-input"
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
                                        <label className="edit-user-label">
                                            New Password:
                                        </label>
                                        <input
                                            className="edit-user-input"
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
                        <div className="edit-user-container-item" id="item-right">
                            <NavLink to="/admin/users" activeClassName="cancel-option">
                                Cancel
                            </NavLink>
                            
                        </div>
                    </div>

                    <div className="edit-user-changes">
                        <button
                            className="edit-user-button"
                            id="confirm-changes"
                            onClick={handleSubmit}
                        >
                            Confirm Changes
                        </button>
                        <NavLink to="/admin/users" activeClassName="delete-option">
                            Delete User
                        </NavLink>
                    </div>               
                </div>*/}
        </div>
    );
}

export default AdminEditUser;
