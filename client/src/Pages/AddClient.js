import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import validator from "validator";
import Navbar from "../Components/Navbar/Navbar.js";
import { postClient, useStages } from "../api.js";
import "./css/addClient.css";
import Auth from "./Auth.js";

function AddClient(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [clientStage, setClientStage] = useState();
    const [inputError, setInputError] = useState("");

    const { loading, stagesData, error } = useStages();

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

    const onSubmit = (e) => {
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
            postClient(registerBody);
        }
    };

    const stage = () => {
        if (loading) {
            return;
        } else if (error) {
            return (
                <div>
                    <p>Something went wrong: {error.message}</p>
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
                                <input
                                    key={stage.id}
                                    type="radio"
                                    name="stage"
                                    value={stage.name}
                                    onChange={(e) =>
                                        setClientStage(e.target.value)
                                    }
                                />
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
            <Navbar />
            <h2 className="addClientHeading">Add Client</h2>
            <form
                method="post"
                onChange={() => setInputError("")}
                onSubmit={onSubmit}
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
                    <button className="addClientButton" onClick={onSubmit}>
                        Create Client
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

export default AddClient;
