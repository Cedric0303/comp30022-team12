import React from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import NotePortal from "../Components/NotePortal.js";
import MeetingPortal from "../Components/MeetingPortal.js";
import LogPortal from "../Components/LogPortal.js";
import OrderPortal from "../Components/OrderPortal.js";
import "./css/specificClient.css";
import { useClient } from "../api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SpecificClient(props) {
    
    const { loading, clientData, error } = useClient(props.match.params.clientID);

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
        } else if (!clientData.client) {
            <div className="specificClientError">
                <p>Something went wrong: No Client Found</p>
            </div>
        } else {
            return (
                <div>
                    <h2 id="clientHeading">
                        {client.firstName} {client.lastName}
                    </h2>
                    <div id="clientInfo">
                        <p>
                            Stage: {client.stage}
                        </p>
                        <p>
                            {client.email} <FontAwesomeIcon className="contactIcon" icon="envelope" />
                        </p>
                        <p>
                            {client.phoneNumber} <FontAwesomeIcon className="contactIcon" icon="phone" />
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
            <main className="specificClient">
                {pageMain()}
            </main>
        </div>
    );
}

export default SpecificClient;
