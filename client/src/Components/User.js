import React from "react";
import "./user.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Format each user
export default function User(user) {
    const { _id, firstName, lastName } = user;

    return (
        <li className="userWrapper">
            <span className="userFullName">
                {firstName} {lastName}
            </span>
            <a className="userEdit" href={"/admin/users/" + _id + "/edit"}>
                <FontAwesomeIcon icon="edit" />
            </a>
        </li>
    );
}
