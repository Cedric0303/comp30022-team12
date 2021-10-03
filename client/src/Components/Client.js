import React from "react";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
import "./css/client.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Format each client
export default function Client(client) {

    const { email, firstName, lastName, stage, updatedAt } = client;

    return (
        <tr className="clientWrapper">
            <td>
                <NavLink to={"/clients/" + email}>
                    <span className="clientFullName">
                        {firstName} {lastName} <FontAwesomeIcon icon="chevron-right" />
                    </span>
                </NavLink>
            </td>
            <td>
                {/* The last time the client's profile was changed in any way */}
                {/* Also includes adding an activity/order */}
                <span className="lastInteracted"> 
                    <Moment format="Do MMM YY">{updatedAt}</Moment>
                </span>
            </td>
            <td>
                <span className="clientStage">{stage}</span>
            </td>
            <td className="actionButtons">
                <NavLink
                    className="meetingAction"
                    activeClassName="activeAction"
                    to={{
                        pathname: "../calendar",
                        state: {
                            client: client,
                            fromClient: true
                        } 
                    }}
                >
                    <FontAwesomeIcon icon="calendar-alt" />
                    <span>Upcoming Meetings</span>
                </NavLink>
                <NavLink
                    className="orderAction"
                    activeClassName="activeAction"
                    to={"/clients/" + email + "/orders"}
                >
                    <FontAwesomeIcon icon="receipt" />
                    <span>Orders</span>
                </NavLink>
            </td>
        </tr>
    );
}
