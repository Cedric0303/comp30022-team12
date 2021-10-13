import React from "react";
import Avatar from "boring-avatars";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
import "./css/client.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Format each client
export default function Client(client) {
    const { email, firstName, lastName, stage, updatedAt } = client;
    return (
        <tr className="clientWrapper">
            <td className="clientsAvatar">
                <Avatar
                    size={30}
                    name={firstName + " " + lastName}
                    variant="beam"
                    colors={[
                        "#3E6BB0",
                        "#8CBAFF",
                        "#6291D9",
                        "#FFFFF0",
                        "#D9B162",
                    ]}
                />
            </td>
            <td>
                <NavLink to={"/clients/" + email}>
                    <span className="clientFullName">
                        {" "}
                        {firstName} {lastName}{" "}
                        <FontAwesomeIcon icon="chevron-right" />
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
                <span className="clientStage">{stage.name}</span>
            </td>
            <td className="actionButtons">
                <NavLink
                    to={{
                        pathname: "/calendar/schedule-meeting",
                        state: {
                            client: client,
                        },
                    }}
                    className="meetingAction"
                    activeClassName="activeAction"
                >
                    <FontAwesomeIcon icon="calendar-alt" />
                    <span>Schedule Meeting</span>
                </NavLink>
                <NavLink
                    className="orderAction"
                    activeClassName="activeAction"
                    to={{
                        pathname: "/clients/" + email + "/orders",
                        state: { cid: email },
                    }}
                >
                    <FontAwesomeIcon icon="receipt" />
                    <span>Orders</span>
                </NavLink>
            </td>
        </tr>
    );
}
