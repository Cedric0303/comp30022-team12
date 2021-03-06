import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useActivities } from "../api.js";
import UserMeetingPortal from "../Components/UserMeetingPortal.js";
import RecentClients from "../Components/RecentClients.js";
import Navbar from "../Components/Navbar/Navbar.js";
import "./css/home.css";
import { Helmet } from "react-helmet";
import ReactLoading from "react-loading";
import "../Pages/css/animation.css";

function Home(props) {
    const localizer = momentLocalizer(moment);

    const { loading, activitiesData, error } = useActivities();

    const calendarContent = () => {
        if (loading) {
            return (
                <div>
                    <p>Loading...</p>
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
                <div>
                    <p>Something went wrong: {error.message}</p>
                </div>
            );
        } else {
            return (
                <div className="homeActualCal">
                    <Calendar
                        localizer={localizer}
                        views={["day"]}
                        defaultView="day"
                        events={activitiesData.activities}
                        startAccessor="timeStart"
                        endAccessor="timeEnd"
                        titleAccessor="type"
                    />
                </div>
            );
        }
    };

    return (
        <div>
            <Helmet>
                <title>Home - Bobafish CRM</title>
                <meta
                    name="description"
                    content="Main dashboard for Bobafish CRM"
                />
            </Helmet>
            <Navbar />
            <div className="homeGrid">
                <div className="homePortals">
                    <UserMeetingPortal />
                </div>
                <div className="calGroup">
                    {calendarContent()}
                    <NavLink
                        to={{
                            pathname: "../calendar",
                        }}
                        className="homeViewCal"
                    >
                        View Full Calendar
                    </NavLink>
                </div>
                <RecentClients />

                <div className="homeButtonGroup">
                    <NavLink className="homeAddClient" to="clients/create">
                        <div className="homeImageContainer">
                            <FontAwesomeIcon icon="plus" />
                            <p id="homeButtonText">Add a New Client</p>
                        </div>
                    </NavLink>
                    <NavLink className="homeViewClient" to="clients">
                        <div className="homeImageContainer">
                            <FontAwesomeIcon icon="users" />
                            <p id="homeButtonText">View All Clients</p>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Home;
