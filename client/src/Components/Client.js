import React from "react";
import { NavLink } from "react-router-dom";
import "./css/client.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Format each client
export default function Client(client) {
    const { _id, firstName, lastName, stage } = client;

    console.log(client.stage);

    return (
        <tr className="clientWrapper">
            <td>
                <NavLink to={"/clients/" + _id}>
                    <span className="clientFullName">
                        {firstName} {lastName}
                    </span>
                </NavLink>
            </td>
            <td>
                <span className="lastInteracted">Date</span>
            </td>
            <td>
                <span className="clientStage">{stage}</span>
            </td>
            <td className="actionButtons">
                <NavLink
                    className="meetingAction"
                    activeClassName="activeAction"
                    to="clients"
                >
                    <FontAwesomeIcon icon="calendar-alt" />
                    <span>Meetings</span>
                </NavLink>
                <NavLink
                    className="orderAction"
                    activeClassName="activeAction"
                    to={"/clients/" + _id + "/orders"}
                >
                    <FontAwesomeIcon icon="receipt" />
                    <span>Orders</span>
                </NavLink>
            </td>
        </tr>
    );
}
