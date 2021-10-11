import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import ReactLoading from "react-loading";
import "./css/animation.css";
import { useActivities, useWindowDimensions } from "../api.js";

function CalendarPage(props) {
    const { height: winHeight } = useWindowDimensions();

    // make calendar fill remaining height
    useEffect(() => {
        let calendarElement =
            document.getElementsByClassName("calendarElement")[0];
        if (calendarElement) {
            calendarElement.style.height =
                winHeight - calendarElement.offsetTop + "px";
        }
    });

    const getCid = () => {
        if (!props.location.state) {
            return null;
        } else if (props.location.state.client) {
            return props.location.state.client.email;
        }
    };

    const { loading, activitiesData, error } = useActivities(getCid());

    const localizer = momentLocalizer(moment);

    const selectedClient = () => {
        if (
            props.location.state === null ||
            props.location.state === undefined
        ) {
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
        if (
            props.location.state === null ||
            props.location.state === undefined
        ) {
            return "month";
        } else {
            return "agenda";
        }
    };

    const pageMain = () => {
        if (loading) {
            return (
                <div>
                    <div>
                        <ul>Loading...</ul>
                    </div>
                    {loading && (
                        <ReactLoading
                            id="loading-anim"
                            type="spin"
                            color="black"
                            height="2%"
                            width="2%"
                        ></ReactLoading>
                    )}
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
                <div>
                    {selectedClient()}
                    <Calendar
                        localizer={localizer}
                        defaultView={fromClient()}
                        events={activitiesData.activities}
                        startAccessor="timeStart"
                        endAccessor="timeEnd"
                        titleAccessor="type"
                        className="calendarElement"
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
