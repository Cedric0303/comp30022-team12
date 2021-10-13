import React from "react";
import Avatar from "boring-avatars";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClients } from "../api.js";
import "./css/recentClients.css";

// Obtain the last 3 clients the user has interacted with
// sorted by most recent interaction first
function filterClients(clients) {
    clients = clients || []; // ensures clients is not undefined
    return clients
        .sort((x, y) => {
            if (x.updatedAt > y.updatedAt) {
                return -1;
            } else if (x.updatedAt < y.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        })
        .slice(0, 3);
}

export default function RecentClients(props) {
    const { loading, clientsData, error } = useClients();

    const clientContent = () => {
        if (loading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        } else if (error) {
            return (
                <div>
                    <p>Something went wrong: {error.message}</p>
                </div>
            );
        } else {
            return (
                <table className="recentClientTable">
                    <thead>
                        <tr className="hide">
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Stage</th>
                        </tr>
                    </thead>
                    {filterClients(clientsData).map((client) => (
                        <tbody key={client.email}>
                            <tr className="recentClientRow">
                                <td id="recentClientTd">
                                    <Avatar
                                        size={40}
                                        name={
                                            client.firstName +
                                            " " +
                                            client.lastName
                                        }
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
                                <td id="recentClientTd">
                                    <NavLink to={"/clients/" + client.email}>
                                        <div id="recentCliNameField">
                                            {client.firstName} {client.lastName}
                                            <div id="hide">
                                                <FontAwesomeIcon icon="chevron-right" />
                                            </div>
                                        </div>
                                    </NavLink>
                                </td>
                                <td id="recentClientTd">
                                    <span>{client.stage.name}</span>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            );
        }
    };

    return (
        <div>
            <div className="recentCliHeading">Recent Clients</div>
            {clientContent()}
        </div>
    );
}
