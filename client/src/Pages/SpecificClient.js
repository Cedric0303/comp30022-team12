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
import Avatar from "boring-avatars";
import { Helmet } from "react-helmet";

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
                    <Helmet>
                        <title>
                            {client.firstName + " " + client.lastName} -
                            Bobafish CRM
                        </title>
                    </Helmet>
                    <div id="avatar">
                        <Avatar
                            size={240}
                            name={client.firstName + " " + client.lastName}
                            variant="beam"
                            colors={[
                                "#3E6BB0",
                                "#8CBAFF",
                                "#6291D9",
                                "#FFFFF0",
                                "#D9B162",
                            ]}
                        />
                    </div>
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
                        <p>Stage: {client.stage.name}</p>
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
            <Helmet>
                <title>Client - Bobafish CRM</title>
                <meta name="description" content="Edit an existing client" />
            </Helmet>
            <Navbar />
            <main className="specificClient">{pageMain()}</main>
        </div>
    );
}

export default SpecificClient;
