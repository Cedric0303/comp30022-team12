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
import ReactLoading from "react-loading";
import "./css/animation.css";

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

function AdminEditUser(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [inputError, setInputError] = useState("");

    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Open and close the modal
    function toggleModal() {
        setModalIsOpen(!modalIsOpen);
    }

    function requireFieldsFilled() {
        return firstName && lastName && username;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Show alert if password is comprised of spaces or if password is invalid
        if (
            (password.trim() === "") & (password.length > 0) ||
            (password !== "" && !validate_password(password))
        ) {
            setInputError(
                "Passwords must only be comprised of letters and numbers and be between 8-20 characters. " +
                    "Please update your new password or leave the field empty."
            );
        } else if (!requireFieldsFilled()){
            setInputError(
                "First Name, Last Name and Username fields must have a value!"
            );

        } else {
            const registerBody = {
                username: username,
                password: password,
                isAdmin: false,
                firstName: firstName,
                lastName: lastName,
            };
            postEditUser(registerBody, props.match.params.userID);
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteUser(props.match.params.userID);
    };

    useEffect(() => {
        const getUsername = () => {
            if (
                props.match.params === null ||
                props.match.params === undefined
            ) {
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
            })
            .catch((e) => {
                console.log(e);
                setError(e);
                setLoading(false);
            });
    }, [props.match.params]);

    const pageMain = () => {
        if (loading) {
            return (
                <div>
                    <div className="editUserBox">
                        <ul>Loading...</ul>
                    </div>
                    {loading && (
                        <ReactLoading
                            id="loading-anim"
                            type="spin"
                            color="black"
                            height="2%"
                            width="2%"
                        ></ReactLoading>
                    )}
                </div>
            );
        } else if (error) {
            return (
                <div className="editUserBox">
                    Something went wrong: {error.message}
                </div>
            );
        } else {
            return (
                <div>
                    <h2 className="editUserHeading">Edit User</h2>
                    <div className="editUserGrid">
                        <div
                            className="editUserItem"
                            id="item-left"
                        >
                            <form
                                method="post"
                                onSubmit={handleSubmit}
                                className="editUserForm"
                            >
                                <div className="feildGroup" id="name-info">
                                    <div className="field">
                                        <label className="editUserLabel">
                                            First Name:
                                        </label>
                                        <input
                                            className="editUserInput"
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
                                        <label className="editUserLabel">
                                            Last Name:
                                        </label>
                                        <input
                                            className="editUserInput"
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
                                <div className="feildGroup" id="loginInfo">
                                    <div className="field">
                                        <label className="editUserLabel">
                                            Username:
                                        </label>
                                        <input
                                            className="editUserInput"
                                            required
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="field" id="passwordField">
                                        <label className="editUserLabel">
                                            New Password:
                                        </label>
                                        <input
                                            className="editUserInput"
                                            type={
                                                isRevealPwd
                                                    ? "text"
                                                    : "password"
                                            }
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
                                            src={
                                                isRevealPwd
                                                    ? hidePwdImg
                                                    : showPwdImg
                                            }
                                            alt={
                                                isRevealPwd
                                                    ? "Hide Password Icon"
                                                    : "Show Password Icon"
                                            }
                                            onClick={() =>
                                                setIsRevealPwd(!isRevealPwd)
                                            }
                                        />
                                    </div>
                                </div>
                            </form>
                                <button
                                    className="editUserButton"
                                    id="confirmChanges"
                                    onClick={handleSubmit}
                                >
                                    Confirm Changes
                                </button>
                        </div>
                        <div
                            className="editUserItem"
                            id="itemRight"
                        >
                            <NavLink
                                to="/admin/users"
                                activeClassName="cancelOption"
                            >
                                Cancel
                            </NavLink>
                            <button
                                className="deleteOption"
                                onClick={() => {
                                    setModalIsOpen(true);
                                }}
                            >
                                Delete User
                            </button>
                        </div>
                        <p className="editUserInputError">{inputError}</p>
                    </div>
                </div>
            );
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
            </Helmet>
            <Navbar />
            {pageMain()}
            <Modal
                className="deleteConfirmModal"
                isOpen={modalIsOpen}
                contentLabel={"Confirm Delete User"}
                overlayClassName={"deleteModalOverlay"}
                ariaHideApp={false}
            >
                <div className="deleteConfirmModalText">
                    Delete this user for all eternity?
                </div>
                <div className="deleteModalButtonGroup">
                    <button
                        id="modalDeleteBtn"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        id="modalCancelBtn"
                        onClick={() => {
                            toggleModal();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default AdminEditUser;
