import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import validator from "validator";
import Modal from "react-modal";
import Navbar from "../Components/Navbar/Navbar.js";
import { getClient, postEditClient, deleteClient, useStages } from "../api.js";
import Auth from "./Auth.js";
import "./css/editClient.css";
import { Helmet } from "react-helmet";
import ReactLoading from "react-loading";
import "../Pages/css/animation.css";

function EditClient(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [clientStage, setClientStage] = useState("");
    const [inputError, setInputError] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { stagesLoading, stagesData, stagesError } = useStages();

    // Open and close the modal
    function toggleModal() {
        setModalIsOpen(!modalIsOpen);
    }

    function notEmpty() {
        return firstName && lastName && email && address && phoneNo;
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //prevent reload
        if (!notEmpty()) {
            setInputError("All fields must have a value!");
        } else if (!validator.isEmail(email)) {
            setInputError("Please enter a valid email");
        } else if (!validator.isNumeric(phoneNo.replace(/ /g, ""))) {
            setInputError("Phone number should only contain numbers");
        } else {
            const registerBody = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                phoneNumber: phoneNo.replace(/ /g, ""),
                stage: clientStage,
                userReference: Auth.getUsername(),
            };
            postEditClient(registerBody, props.match.params.clientID);
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteClient(props.match.params.clientID);
    };

    useEffect(() => {
        const getUsername = () => {
            if (
                props.match.params === null ||
                props.match.params === undefined
            ) {
                return null;
            } else if (props.match.params.clientID) {
                return props.match.params.clientID;
            }
        };

        getClient(getUsername())
            .then((clientData) => {
                setLoading(false);
                // Prepopulate fields
                setFirstName(clientData.client.firstName);
                setLastName(clientData.client.lastName);
                setEmail(clientData.client.email);
                setAddress(clientData.client.address);
                setPhoneNo(clientData.client.phoneNumber);
                setClientStage(clientData.client.stage.name);
            })
            .catch((e) => {
                console.log(e);
                setError(e);
                setLoading(false);
            });
    }, [props.match.params]);

    const stage = () => {
        if (stagesLoading) {
            return;
        } else if (stagesError) {
            return (
                <div>
                    <p>Something went wrong: {stagesError.message}</p>
                    <p>Reload or contact your administrator.</p>
                </div>
            );
        } else if (!stagesData.length) {
            return (
                <div>
                    <p>
                        No stages available. Please contact your administrator.
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    {stagesData.map((stage) => (
                        <div key={"div" + stage.id}>
                            <label
                                key={"label" + stage.id}
                                className="stageChoice"
                            >
                                {stage.name === clientStage ? (
                                    <input
                                        key={stage.id}
                                        type="radio"
                                        name="stage"
                                        value={stage.name}
                                        onChange={(e) =>
                                            setClientStage(e.target.value)
                                        }
                                        defaultChecked
                                    />
                                ) : (
                                    <input
                                        key={stage.id}
                                        type="radio"
                                        name="stage"
                                        value={stage.name}
                                        onChange={(e) =>
                                            setClientStage(e.target.value)
                                        }
                                    />
                                )}
                                {stage.name === "unassigned" ? (
                                    <span
                                        className="specStage"
                                        key={"span" + stage.id}
                                    >
                                        leave unassigned
                                    </span>
                                ) : (
                                    <span key={"span" + stage.id}>
                                        {stage.name}
                                    </span>
                                )}
                            </label>
                        </div>
                    ))}
                </div>
            );
        }
    };

    const pageMain = () => {
        if (loading) {
            return (
                <div>
                    <div className="editClientbox">Loading...</div>
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
                <div className="edit-userbox">
                    Something went wrong: {error.message}
                </div>
            );
        } else {
            return (
                <div className="editClientGrid">
                    <form
                        method="post"
                        onChange={() => setInputError("")}
                        onSubmit={handleSubmit}
                        className="editClientForm"
                    >
                        <div>
                            <h3 className="clientFormSubheading">
                                Personal Details
                            </h3>
                            <div className="editClientInput">
                                <label className="editClientLabel">
                                    First Name:
                                </label>
                                <input
                                    className="editClientField"
                                    required
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="editClientInput">
                                <label className="editClientLabel">
                                    Last Name:
                                </label>
                                <input
                                    className="editClientField"
                                    required
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="editClientInput">
                                <label className="editClientLabel">
                                    Email:
                                </label>
                                <input
                                    className="editClientField"
                                    id="clientEmailField"
                                    required
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="editClientInput">
                                <label className="editClientLabel">
                                    Phone Number:
                                </label>
                                <input
                                    className="editClientField"
                                    id="clientNumberField"
                                    required
                                    type="text"
                                    placeholder="Phone Number"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                />
                            </div>
                            <div className="editClientInput">
                                <label className="editClientLabel">
                                    Address:
                                </label>
                                <input
                                    className="editClientField"
                                    id="clientAddressField"
                                    required
                                    type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="clientStageChoice">
                            <h3 className="clientFormSubheading">Stage</h3>
                            {stage()}
                        </div>
                        <button
                            className="addEditConfirmChangeBtn"
                            onClick={handleSubmit}
                        >
                            Confirm Changes
                        </button>
                    </form>
                    <div className="photoForm">
                        <NavLink
                            to={"/clients/" + props.match.params.clientID}
                            className="addEditCancelBtn"
                        >
                            Cancel
                        </NavLink>
                        <button
                            className="addEditDeleteBtn"
                            onClick={() => {
                                setModalIsOpen(true);
                            }}
                        >
                            Delete Client
                        </button>
                    </div>
                    <p className="addEditInputError">{inputError}</p>
                </div>
            );
        }
    };

    return (
        <div>
            <Helmet>
                <title>Edit Client - Bobafish CRM</title>
                <meta name="description" content="Edit an existing client" />
            </Helmet>
            <Navbar />
            <h2 className="editClientHeading">Edit Client</h2>
            {pageMain()}
            <Modal
                className="deleteConfirmModal"
                isOpen={modalIsOpen}
                contentLabel={"Confirm Delete Client"}
                overlayClassName={"deleteModalOverlay"}
                ariaHideApp={false}
            >
                <div className="deleteConfirmModalText">
                    Delete this client for all eternity?
                </div>
                <div className="deleteModalButtonGroup">
                    <button id="modalDeleteBtn" onClick={handleDelete}>
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

export default EditClient;
