import React from "react";
import { NavLink } from "react-router-dom";
import "./css/user.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Format each user
export default function User(user) {
    const { _id, firstName, lastName } = user;

    return (
        <li className="userWrapper">
            <span className="userFullName">
                {firstName} {lastName}
            </span>
            <NavLink className="userEdit" to={"/admin/users/" + _id + "/edit"}>
                <FontAwesomeIcon icon="edit" />
            </NavLink>
        </li>
    );
}
