import React from "react";
import { NavLink } from "react-router-dom";
import "./css/portal.css";
import { useActivities } from "../api.js";
import MeetingRow from "./MeetingRow.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Pages/css/animation.css";

export default function UpcomingMeetingPortal(props) {
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
            var upcomingActs = [];
            activitiesData.activities.forEach((act) => {
                if (act.timeEnd >= new Date()) {
                    upcomingActs.unshift(act); // Soonest meetings first
                }
            });
            if (!upcomingActs.length) {
                return (
                    <div className="portalContent">
                        <p>No upcoming meetings!</p>
                    </div>
                );
            } else {
                return (
                    <div className="portalContent">
                        {/* Meetings sorted by date (newest first) */}
                        {upcomingActs.map((activity) => (
                            <MeetingRow
                                key={activity._id}
                                activity={activity}
                                client={props.client}
                            />
                        ))}
                    </div>
                );
            }
        }
    };
    return (
        <div className="clientUpcomingMeetingPortal">
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
    );
}
