import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import validator from "validator";
import Navbar from "../Components/Navbar/Navbar.js";
import { getClient, useStages } from "../api.js";
import Auth from "./Auth.js";
import "./css/editClient.css";

function EditClient(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [notes, setNotes] = useState([]);
    const [clientStage, setClientStage] = useState();
    const [inputError, setInputError] = useState("");

    const { stagesLoading, stagesData, stagesError } = useStages();

    function notEmpty() {
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            address === "" ||
            phoneNo === ""
        ) {
            return false;
        }
        return true;
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
            //postClient(registerBody);
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        // deleteUser(props.match.params.userID);
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
                
                //console.log("clientData");
                //console.log(clientData);
                setFirstName(clientData.client.firstName);
                setLastName(clientData.client.lastName);
                setEmail(clientData.client.email);
                setAddress(clientData.client.address);
                setPhoneNo(clientData.client.phoneNumber);
                setClientStage(clientData.client.stage);
                setNotes(clientData.client.notes);
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
            console.log("stagesData");
            console.log(stagesData);
            return (
                <div>
                    {stagesData.map((stage) => (
                        <div key={"div" + stage.id}>
                            <label
                                key={"label" + stage.id}
                                className="stageChoice"
                            >
                                {stage.name == clientStage ? (
                                    <input
                                        key={stage.id}
                                        type="radio"
                                        name="stage"
                                        value={stage.name}
                                        onChange={(e) =>
                                            setClientStage(e.target.value)
                                        }
                                        checked="checked"
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

                                <span key={"span" + stage.id}>
                                    {stage.name}
                                </span>
                            </label>
                        </div>
                    ))}
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
            <h2 className="edit-client-heading">Edit Client</h2>
            <form
                method="post"
                onChange={() => setInputError("")}
                onSubmit={handleSubmit}
                className="addClientGrid"
            >
                <div className="addClientForm">
                    <div>
                        <h3 className="clientFormSubheading">
                            Personal Details
                        </h3>
                        <div className="addClientInput">
                            <label className="addClientLabel">
                                First Name:
                            </label>
                            <input
                                className="addClientField"
                                required
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="addClientInput">
                            <label className="addClientLabel">Last Name:</label>
                            <input
                                className="addClientField"
                                required
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="addClientInput">
                            <label className="addClientLabel">Email:</label>
                            <input
                                className="addClientField"
                                id="clientEmailField"
                                required
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="addClientInput">
                            <label className="addClientLabel">
                                Phone Number:
                            </label>
                            <input
                                className="addClientField"
                                id="clientNumberField"
                                required
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>
                        <div className="addClientInput">
                            <label className="addClientLabel">Address:</label>
                            <input
                                className="addClientField"
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
                    <button className="addClientButton" onClick={handleSubmit}>
                        Confirm Changes
                    </button>
                    <span className="inputError">{inputError}</span>
                </div>
                <div className="photoForm">
                    <NavLink to="/clients" className="cancelOption">
                        Cancel
                    </NavLink>
                </div>
            </form>
        </div>
    );
}

export default EditClient;
