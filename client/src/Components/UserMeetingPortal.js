import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClients, useActivities } from "../api.js";
import UserMeetingRow from "./UserMeetingRow.js";
import "./css/portal.css";

export default function UserMeetingPortal(props) {

    const { cliLoading, clientsData, cliError } = useClients();
    const { loading, activitiesData, error } = useActivities();

    const findClient = (cid) => {
        if (cliLoading) {
        } else if (cliError) {
        } else if (clientsData !== undefined) {
            return clientsData.clients.find((c) => c.email === cid)
        } else {
        }
    }; 

    const portalContent = () => {
        if (loading) {
            return (
                <div className="portalContent">
                    <p>Loading...</p>
                </div>
            );
        } else if (error) {
            return (
                <div className="portalContent">
                    <p>Something went wrong: {error.message}</p>
                </div>
            );
        } else if (activitiesData.activities.length !== 0) {
            const now = new Date();
            let future = new Date();
            future.setDate(now.getDate() + 7);

            return (
                <div className="portalContent">
                    {/* Display future meetings in the next 7 dats sorted by Meeting time in ascending order */}
                    {
                        activitiesData.activities
                        .filter((a) => (a.timeStart >= now && a.timeStart <= future))
                        .map((a) => (
                            <UserMeetingRow 
                                key={a._id}
                                activity={a}
                                client={findClient(a.clientReference)}
                            />
                        ))
                    }

                </div>
            )
        } else {
            <div className="portalContent">
                <p>{clientsData.message}</p>
            </div>
        }
    }

    return (
        <div>
            <NavLink
                to={{
                    pathname: "../calendar",
                    state: {
                        client: props.client,
                        fromClient: true,
                    },
                }}
            >
                <p className="portalHeading">
                    Upcoming Meetings <FontAwesomeIcon icon="chevron-right" />
                </p>
            </NavLink>
            {portalContent()}
        </div>
    )

}