import React from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useActivities } from "../api.js";

function ScheduleMeeting(props) {

    const getCid = () => {
        console.log(props.location.state)
        if (props.location.state === null || props.location.state === undefined) {
            return null;
        } else if (props.location.state.client) {
            return props.location.state.client.email;
        }
    };

    const { loading, activitiesData, error } = useActivities(getCid());

    const localizer = momentLocalizer(moment);

    const pageHeading = () => {
        if (props.location.state === null || props.location.state === undefined) {
            return (
                <div>
                    <h2 id="clientHeading">
                        No Client Selected
                    </h2>
                    <div className="specificClientError">
                        <p>Return to a client's page to schedule a meeting with them.</p>
                    </div>;
                </div>
            );
        } else if (props.location.state.client) {
            const client = props.location.state.client;
            return (
                <div>
                    <h2 id="clientHeading">
                        Schedule Meeting with{" "}
                        {client.firstName} {client.lastName}
                    </h2>
                </div>
            );
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
            {pageHeading()}
            {pageMain()}
        </div>
    );
}

export default ScheduleMeeting;
