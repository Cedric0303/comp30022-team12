import React from "react";
import { NavLink } from "react-router-dom";
import "./css/portal.css";
import { useActivities } from "../api.js";
import MeetingRow from "../Components/MeetingRow.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Pages/css/animation.css";

export default function MeetingPortal(props) {
    const { loading, activitiesData, error } = useActivities(
        props.client.email
    );

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
        } else {
            return (
                <div className="portalContent">
                    {/* Meetings sorted by date (newest first) */}
                    {activitiesData.activities.map((activity) => (
                        <MeetingRow
                            key={activity._id}
                            activity={activity}
                            client={props.client}
                        />
                    ))}
                </div>
            );
        }
    };
    return (
        <div className="clientMeetingsPortal">
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
                    Meetings <FontAwesomeIcon icon="chevron-right" />
                </p>
            </NavLink>
            {portalContent()}
        </div>
    );
}
