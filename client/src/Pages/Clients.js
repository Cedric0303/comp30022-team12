import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.js";
import "./css/clients.css";
import { useClients, useStages, useWindowDimensions } from "../api.js";
import Client from "../Components/Client.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactLoading from "react-loading";
import "./css/animation.css";
import Select from "react-select";
import { Helmet } from "react-helmet";

function Clients(props) {
    const { loading, clientsData, error } = useClients();
    const { stagesLoading, stagesData, stagesError } = useStages();
    const { height: winHeight } = useWindowDimensions();

    const [stages, setStages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState([]);
    const [filteredClients, setFilteredClients] = useState(clientsData);

    // make clientsBox fill remaining height
    useEffect(() => {
        let clientsBoxElement =
            document.getElementsByClassName("clientsBox")[0];
        if (clientsBoxElement) {
            clientsBoxElement.style.height =
                winHeight - clientsBoxElement.offsetTop + "px";
        }
    });

    useEffect(() => {
        if (stagesData) {
            let tempStages = [];
            for (let i = 0; i < stagesData.length; i++) {
                tempStages.push({
                    value: stagesData[i].id,
                    label: stagesData[i].name,
                });
            }
            setStages(tempStages);
        }
    }, [stagesData]);

    const handleFilterChange = (selectedOptions) => {
        setFilters(selectedOptions);
    };

    function filterClients(clients, query, filter) {
        var pattern = query
            .split("")
            .map((x) => {
                return `(?=.*${x})`;
            })
            .join("");
        var regex = new RegExp(`^${pattern}`, "i");

        if (!query && !filter.length) {
            // no query no filter
            return clients;
        } else if (query && !filter.length) {
            // yes query no filter
            return clients.filter((client) => {
                return regex.test(client.firstName + " " + client.lastName);
            });
        } else if (!query && filter.length) {
            // no query yes filter
            let chosenFilters = filter.map((f) => f.value);
            return clients.filter((client) => {
                return chosenFilters.includes(client.stage.name);
            });
        } else {
            // yes query yes filter
            let tempClients = clients;
            let chosenFilters = filter.map((f) => f.value);
            tempClients = clients.filter((client) => {
                return chosenFilters.includes(client.stage.name);
            });
            tempClients = tempClients.filter((client) => {
                return regex.test(client.firstName + " " + client.lastName);
            });
            return tempClients;
        }
    }

    const stagesFilter = () => {
        if (stagesLoading) {
            return (
                <div id="stagesFilterBox">
                    <div>Filter by stage:</div>
                    <Select
                        isMulti
                        isLoading
                        backspaceRemovesValue
                        options={stages}
                        className="stagesFilterBar"
                    />
                </div>
            );
        } else if (stagesError) {
            return (
                <div id="stagesFilter">
                    Something went wrong: {error.message}
                </div>
            );
        } else {
            return (
                <div id="stagesFilterBox">
                    <div>Filter by stage:</div>
                    <Select
                        isMulti
                        isSearchable
                        backspaceRemovesValue
                        options={stages}
                        onChange={handleFilterChange}
                        className="stagesFilterBar"
                    />
                </div>
            );
        }
    };

    useEffect(() => {
        if (clientsData) {
            setFilteredClients(
                filterClients(clientsData, searchQuery, filters)
            );
        }
    }, [clientsData, searchQuery, filters]);

    const pageMain = () => {
        if (loading) {
            return (
                <div>
                    <div className="clientsBox">
                        <ul>Loading...</ul>
                    </div>
                    <ReactLoading
                        id="loading-anim"
                        type="spin"
                        color="black"
                        height="2%"
                        width="2%"
                    ></ReactLoading>
                </div>
            );
        } else if (error) {
            return (
                <div className="clientsBox">
                    <ul>Something went wrong: {error.message}</ul>
                </div>
            );
        } else if (clientsData.length !== 0) {
            return (
                <div className="clientsBox">
                    <table id="clientsList">
                        <thead id="clientsListHeading">
                            <tr>
                                <th id="clientAvatar"></th>
                                <th>Name</th>
                                <th id="lastInteracted">Last Interacted</th>
                                <th id="clientStage">Stage</th>
                                <th id="clientActions">Quick Actions</th>
                            </tr>
                        </thead>
                        {filteredClients.map((client) => (
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
                    <ul>No clients found! Reload or start adding clients.</ul>
                </div>
            );
        }
    };

    return (
        <div className="clients">
            <Helmet>
                <title>Clients - Bobafish CRM</title>
                <meta
                    name="description"
                    content="View clients, check meetings and orders"
                />
            </Helmet>
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
                    <input
                        id="clientsSearchBar"
                        value={searchQuery}
                        onInput={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search clients"
                    />
                </div>
                {pageMain()}
            </main>
        </div>
    );
}

export default Clients;
