import React from "react";
import { NavLink } from "react-router-dom";
import { useClients } from "../api.js"
import "./css/recentClient.css"

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
                <table>
                    <thead>
                        <tr className="hide">
                            <th>Name</th>
                            <th id="clientStage">Stage</th>
                        </tr>
                    </thead>
                    {clientsData.clients.map((client) => (
                        <tbody
                            key={client.email}
                            
                        >
                            <tr>
                                <td>
                                    <NavLink to={"/clients/" + client.email}>
                                        <span >
                                            {client.firstName} {client.lastName}
                                        </span>
                                    </NavLink>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>{client.stage}</span>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            );
        }

    }
    
    return (
        <div>
            <div className="recentCliHeading">
                Recent Clients
            </div>
            {clientContent()}

        </div>
    );
}