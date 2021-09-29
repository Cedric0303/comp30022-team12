import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.js";
import "./css/clients.css";
import { useClients } from "../api.js";
import Client from "../Components/Client.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Clients(props) {
    const { loading, clientsData, error } = useClients();

    const pageMain = () => {
        if (loading) {
            return (
                <div className="clientsBox">
                    <ul>Loading...</ul>
                </div>
            );
        } else if (error) {
            return (
                <div className="clientsBox">
                    <ul>Something went wrong: {error.message}</ul>
                </div>
            );
        } else if (clientsData.clients.length !== 0) {
            return (
                <div className="clientsBox">
                    <table id="clientsList">
                        <thead id="clientsListHeading">
                            <tr>
                                <th>Name</th>
                                <th id="lastInteracted">Last Interacted</th>
                                <th id="clientStage">Stage</th>
                                <th id="clientActions">Quick Actions</th>
                            </tr>
                        </thead>
                        {clientsData.clients.map((client) => (
                            <tbody key={client._id} className="specificClient">
                                <Client {...client} />
                            </tbody>
                        ))}
                    </table>
                </div>
            );
        } else {
            return (
                <div className="clientsBox">
                    <ul>Start adding clients!</ul>
                </div>
            );
        }
    };

    return (
        <div className="clients">
            <Navbar />
            <main className="clientsBox">
                <h2 id="clientsHeading">
                    Clients
                    <NavLink id="addClient" to="clients/create">
                        <span>New Client </span>
                        <FontAwesomeIcon icon="user-plus" />
                    </NavLink>
                </h2>
                {pageMain()}
            </main>
        </div>
    );
}

export default Clients;
