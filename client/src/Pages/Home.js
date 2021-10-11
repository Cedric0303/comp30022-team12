import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useActivities } from "../api.js";
import UserMeetingPortal from "../Components/UserMeetingPortal.js";
import RecentClients from "../Components/RecentClients.js";
import Navbar from "../Components/Navbar/Navbar.js";
import "./css/home.css"

function Home(props) {

    const localizer = momentLocalizer(moment);

    const { loading, activitiesData, error } = useActivities();

    const calendarContent = () => {
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
                <Calendar
                    localizer={localizer}
                    views={["month"]}
                    events={activitiesData.activities}
                    startAccessor="timeStart"
                    endAccessor="timeEnd"
                    titleAccessor="type"
                    style={{height: "90%"}}
                />
            );
        }
    }

    return (
        <div>
            <Navbar />
            <div className="homeGrid">
                <div className ="homePortals">
                    <UserMeetingPortal/>
                </div>
                <div className="calGroup">
                    {calendarContent()}
                    <NavLink
                        to={{
                            pathname: "../calendar",
                            state: {
                                client: props.client,
                                fromClient: true,
                            },
                        }}
                        className="homeViewCal">
                        View Calendar
                    </NavLink>
                </div>
                <RecentClients/>

                <div className="homeButtonGroup">
                    <NavLink className="homeAddClient" to="clients/create">
                        <div className="homeImageContainer">
                            <FontAwesomeIcon icon="plus" />
                        </div>
                    </NavLink>
                    <NavLink className="homeViewClient" to="clients">
                        <div className="homeImageContainer">
                            <FontAwesomeIcon icon="user-plus" />
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Home;
