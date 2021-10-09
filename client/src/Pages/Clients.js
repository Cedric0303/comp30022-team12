import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.js";
import "./css/clients.css";
import { useClients, useStages, useWindowDimensions } from "../api.js";
import Client from "../Components/Client.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select"

function Clients(props) {
    const { loading, clientsData, error } = useClients();
    const { stagesLoading, stagesData, stagesError } = useStages();
    const { height: winHeight } = useWindowDimensions();

    // make clientsBox fill remaining height
    useEffect(() => {
        let clientsBoxElement = document.getElementsByClassName("clientsBox")[0];
        clientsBoxElement.style.height = winHeight - clientsBoxElement.offsetTop + "px";
    })
    
    const stagesFilter = () => {
        if (stagesLoading) {
            return (
                <div id="stagesFilter">Loading Stages...</div>
            );
        } else if (stagesError) {
            return (
                <div id="stagesFilter">Something went wrong: {error.message}</div>
            );
        } else {
            console.log(stagesData);
            return (
                <div id="stagesFilter">FILTERS HERE WOW</div>
            );
        }
    }

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
                            <tbody
                                key={client.email}
                                className="specificClient"
                            >
                                <Client key={client.email} {...client} />
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
                <div id="clientsActionBar">
                    {stagesFilter()}
                </div>
                {pageMain()}
            </main>
        </div>
    );
}

export default Clients;
