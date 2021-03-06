import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import validator from "validator";
import Navbar from "../Components/Navbar/Navbar.js";
import { postClient, useStages, getStages } from "../api.js";
import "./css/addClient.css";
import "./css/addEditPage.css";
import Auth from "./Auth.js";
import ReactLoading from "react-loading";
import "./css/animation.css";
import { Helmet } from "react-helmet";

// Returns the first stage as an object
function firstStage(stages) {
    stages = stages || [];
    return stages.find((s) => s.position === 0);
}

function AddClient(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [clientStage, setClientStage] = useState("");
    const [inputError, setInputError] = useState("");

    const { loading, stagesData, error } = useStages();

    function notEmpty() {
        return firstName && lastName && email && address && phoneNo;
    }

    useEffect(() => {
        getStages()
            .then((stagesData) => {
                setClientStage(firstStage(stagesData.stages).name);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        // Submit only if the details are entered correctly
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

    // Render the stages section and check stages are available
    const stage = () => {
        if (loading) {
            return (
                <div>
                    <div>
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

    return (
        <div>
            <Helmet>
                <title>Add Client - Bobafish CRM</title>
                <meta name="description" content="Add a new client" />
            </Helmet>
            <Navbar />
            <h2 className="addClientHeading">Add Client</h2>
            <div className="addClientGrid">
                <form
                    method="post"
                    onChange={() => setInputError("")}
                    onSubmit={onSubmit}
                    className="addClientForm"
                >
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
                    <button className="addEditCreateBtn" onClick={onSubmit}>
                        Create Client
                    </button>
                </form>
                <div className="photoForm">
                    <NavLink to="/clients" className="addEditCancelBtn">
                        Cancel
                    </NavLink>
                </div>
                <p className="addEditInputError">{inputError}</p>
            </div>
        </div>
    );
}

export default AddClient;
