import React from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useActivities } from "../api.js";

function CalendarPage(props) {
    const { loading, activitiesData, error } = useActivities();

    const localizer = momentLocalizer(moment);

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
            // Convert Strings to Dates (JSON returns Strings)
            activitiesData.activities.forEach((act) => {
                act.timeStart = new Date(act.timeStart);
                act.timeEnd = new Date(act.timeEnd);
            });

            return (
                <div>
                    <Calendar
                        localizer={localizer}
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
