import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import Modal from "react-modal";
import Navbar from "../Components/Navbar/Navbar.js";
import { getUser } from "../api.js";
import { postEditUser, deleteUser } from "../api.js";
import "./css/adminEditUser.css";
import showPwdImg from "./css/show-password.png";
import hidePwdImg from "./css/hide-password.png";

function validate_password(p) {
    var letter = /[a-zA-Z]/;
    var number = /[0-9]/;
    var minLength = 8;
    var maxLength = 20;
    return (letter.test(p) || number.test(p)) && p.length >= minLength && p.length <= maxLength;
}

function AdminEditUser(props) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Open and close the modal
    function toggleModal() {
        setModalIsOpen(!modalIsOpen);
    }
    
    const getUsername = () => {
        if (props.match.params === null || props.match.params === undefined) {
            return null;
        } else if (props.match.params.userID) {
            return props.match.params.userID;
        }
    };

    
    function requireFieldsFilled() {
        if (
            firstName === "" ||
            lastName === "" ||
            username === ""
        ) {
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Show alert if password is comprised of spaces or if password is invalid
        if (
            (password.trim() === "" & password.length > 0) || 
            (password !== "" && !validate_password(password))
        ) {
            alert(
                "Passwords must only be comprised of letters and numbers and be between 8-20 characters." + 
                "Please update your new password to meeting these requirements or leave the field empty."
            );
        } else if (requireFieldsFilled()) {
            const registerBody = {
                username: username,
                password: password,
                isAdmin: false,
                firstName: firstName,
                lastName: lastName,
            };
            postEditUser(registerBody, props.match.params.userID);
        } else {
            alert("First Name, Last Name and Username fields must have a value!");
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        deleteUser(props.match.params.userID);
    }
    

    useEffect(() => {
        function getUsername() {
            if (props.match.params === null || props.match.params === undefined) {
                return null;
            } else if (props.match.params.userID) {
                return props.match.params.userID;
            }
        };

        getUser(getUsername())
            .then((userData) => {
                    setLoading(false);
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
    }, []);
    

    const pageMain = () => {
        if (loading) {
            return (
                <div className="edit-userbox">
                    Loading...
                </div>
            );
        } else if (error) {
            return (
                <div className="edit-userbox">
                    Something went wrong: {error.message}
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
                        <button 
                            className="edit-user-button"
                            id="delete-option" 
                            onClick={() => {setModalIsOpen(true)}}>
                            Delete User
                        </button>
                    </div>       
                </div>
            )
        }
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
            <Modal
                className="delete-user-modal"
                isOpen={modalIsOpen}
                contentLabel={"Confirm Delete User"}
                overlayClassName={"delete-modal-overlay"}
                ariaHideApp={false}
            >
                <div className="delete-user-modal-text">
                    Delete this user for all eternity?
                </div>
                <div className="delete-button-group">
                    <button
                        className="edit-user-button"
                        id="delete-user"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="edit-user-button"
                        id="cancel-delete"
                        onClick={() => {toggleModal()}}
                    >
                        Cancel
                    </button>
                </div>    
            </Modal>      
        </div>
    );
}

export default AdminEditUser;
