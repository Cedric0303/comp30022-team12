import React from "react";
import { NavLink } from "react-router-dom";
import "./css/client.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Format each client
export default function Client(client) {
    const { _id, firstName, lastName } = client;

    return (
        <li className="clientWrapper">
            <span className="clientFullName">
                {firstName} {lastName}
            </span>
            <NavLink className="clientEdit" to={"/clients/" + _id + "/edit"}>
                <FontAwesomeIcon icon="edit" />
            </NavLink>
        </li>
    );
}