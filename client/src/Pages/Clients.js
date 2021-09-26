import React from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import "./css/clients.css";
import { useClients } from "../api.js";
import Client from "../Components/Client.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Clients(props) {

    const { loading, clientsData, error } = useClients();
    console.log(clientsData.clients)

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
        } else {
            return (
                <div className="clientsBox">
                    <ul id="clientsList">
                        <li>
                            <a id="addClient" href="clients/create">
                                <span>Add New Client </span>
                                <FontAwesomeIcon icon="user-plus" />
                            </a>
                        </li>
                        <li id="clientsListHeading">Name</li>
                        {clientsData.clients.map((client) => (
                            <div key={client._id} className="specificclient">
                                <Client {...client} />
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return (
        <div className="clients">
            <Navbar />
            <main className="clientsBox">
                <h2 id="clientsHeading">Clients</h2>
                {pageMain()}
            </main>
            
        </div>
    );
}

export default Clients;
