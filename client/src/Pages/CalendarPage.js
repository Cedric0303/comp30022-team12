import React from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useActivities } from "../api.js";

function CalendarPage(props) {
    const getCid = () => {
        if (props.location.state === null || props.location.state === undefined) {
            return null;
        } else if (props.location.state.client) {
            return props.location.state.client.email;
        }
    };

    const { loading, activitiesData, error } = useActivities(getCid());

    const localizer = momentLocalizer(moment);

    const selectedClient = () => {
        if (props.location.state === null || props.location.state === undefined) {
            return;
        } else if (props.location.state.client) {
            return (
                <div>
                    <p>
                        Showing meetings with{" "}
                        {props.location.state.client.firstName}
                    </p>
                </div>
            );
        }
    };

    const fromClient = () => {
        if (props.location.state === null) {
            return "month";
        } else {
            return "agenda";
        }
    };

    const pageMain = () => {
        if (loading) {
            return;
        } else if (error) {
            return (
                <div className="clientsBox">
                    <ul>Something went wrong: {error.message}</ul>
                </div>
            );
        } else {
            // Convert Strings to Dates (JSON returns Strings)
            activitiesData.activities.forEach((act) => {
                act.timeStart = new Date(act.timeStart);
                act.timeEnd = new Date(act.timeEnd);
            });

            return (
                <div>
                    {selectedClient()}
                    <Calendar
                        localizer={localizer}
                        defaultView={fromClient()}
                        events={activitiesData.activities}
                        startAccessor="timeStart"
                        endAccessor="timeEnd"
                        titleAccessor="type"
                        style={{ height: 500 }}
                    />
                </div>
            );
        }
    };

    return (
        <div>
            <Navbar />
            {pageMain()}
        </div>
    );
}

export default CalendarPage;
