import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.js";
import NotePortal from "../Components/NotePortal.js";
import MeetingPortal from "../Components/MeetingPortal.js";
import LogPortal from "../Components/LogPortal.js";
import OrderPortal from "../Components/OrderPortal.js";
import "./css/specificClient.css";
import { useClient } from "../api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SpecificClient(props) {
    const { loading, clientData, error } = useClient(
        props.match.params.clientID
    );

    const client = clientData.client;

    const pageMain = () => {
        if (loading) {
            return;
        } else if (error) {
            return (
                <div className="specificClientError">
                    <p>Something went wrong: {error.message}</p>
                </div>
            );
        } else if (!client) {
            <div className="specificClientError">
                <p>Something went wrong: No Client Found</p>
            </div>;
        } else {
            return (
                <div>
                    <div id="clientHeader">
                        <h2 id="clientHeading">
                            {client.firstName} {client.lastName}
                        </h2>
                        <NavLink
                            to={"/clients/" + client.email + "/edit"}
                            className="clientHeaderActions"
                        >
                            <div className="headerActionBox">
                                <FontAwesomeIcon
                                    className="headerActionIcon"
                                    icon="edit"
                                    size="2x"
                                />
                            </div>
                            <p>Edit Client</p>
                        </NavLink>
                        <NavLink
                            to={{
                                pathname: "/calendar/scheduleMeeting",
                                state: {
                                    client: client,
                                    fromClient: true,
                                },
                            }}
                            className="clientHeaderActions"
                        >
                            <div
                                className="headerActionBox"
                                id="scheduleMeetingButton"
                            >
                                <FontAwesomeIcon
                                    className="headerActionIcon"
                                    icon="calendar-plus"
                                    size="2x"
                                />
                            </div>
                            <p>Schedule Meeting</p>
                        </NavLink>
                    </div>
                    <div id="clientInfo">
                        <p>Stage: {client.stage}</p>
                        <p>
                            {client.email}{" "}
                            <FontAwesomeIcon
                                className="contactIcon"
                                icon="envelope"
                            />
                        </p>
                        <p>
                            {client.phoneNumber}{" "}
                            <FontAwesomeIcon
                                className="contactIcon"
                                icon="phone"
                            />
                        </p>
                    </div>
                    <div className="clientGrid">
                        <MeetingPortal client={client} />
                        <LogPortal cid={client.email} />
                        <OrderPortal cid={client.email} />
                        <NotePortal client={client} />
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            <Navbar />
            <main className="specificClient">{pageMain()}</main>
        </div>
    );
}

export default SpecificClient;