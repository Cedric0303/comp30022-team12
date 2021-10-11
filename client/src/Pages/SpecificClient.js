import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.js";
import NotePortal from "../Components/NotePortal.js";
import UpcomingMeetingPortal from "../Components/UpcomingMeetingPortal.js";
import PastMeetingPortal from "../Components/PastMeetingPortal.js";
import OrderPortal from "../Components/OrderPortal.js";
import "./css/specificClient.css";
import { useClient } from "../api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactLoading from "react-loading";
import "./css/animation.css";

function SpecificClient(props) {
    const { loading, clientData, error } = useClient(
        props.match.params.clientID
    );

    const client = clientData.client;

    const pageMain = () => {
        if (loading) {
            return (
                <div>
                    <div>
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
                                pathname: "/calendar/schedule-meeting",
                                state: {
                                    client: client,
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
                        <UpcomingMeetingPortal client={client} />
                        <PastMeetingPortal client={client} />
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
