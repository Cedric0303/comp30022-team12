import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { DateTimePicker } from "@material-ui/pickers";
import { useActivities } from "../api.js";
import { postMeeting } from "../api.js";
import "./css/scheduleMeeting.css";

function ScheduleMeeting(props) {
    const getCid = () => {
        if (
            props.location.state === null ||
            props.location.state === undefined
        ) {
            return null;
        } else if (props.location.state.client) {
            return props.location.state.client.email;
        }
    };

    const { loading, activitiesData, error } = useActivities(getCid());

    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [meetingName, setMeetingName] = useState("");
    const localizer = momentLocalizer(moment);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!meetingName.trim().length) {
            alert("Meeting must have a name!");
        } else if (startDateTime >= endDateTime) {
            alert("End time must be after start time");
        } else {
            const meetingBody = {
                cid: props.location.state.client.email,
                start: startDateTime,
                end: endDateTime,
                name: meetingName,
            };
            postMeeting(meetingBody);
        }
    };

    const pageHeading = () => {
        if (
            props.location.state === null ||
            props.location.state === undefined
        ) {
            return (
                <div>
                    <h2 className="scheduleMeetingHeading">
                        No Client Selected
                    </h2>
                    <div>
                        <p>
                            Return to a client's page to schedule a meeting with
                            them.
                        </p>
                    </div>
                </div>
            );
        } else if (props.location.state.client) {
            const client = props.location.state.client;
            return (
                <div>
                    <h2 className="scheduleMeetingHeading">
                        <span className="unbold">Schedule Meeting with </span>
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
                <div>
                    <p>Something went wrong: {error.message}</p>
                </div>
            );
        } else {
            return (
                <div className="scheduleGrid">
                    <div className="scheduleForm">
                        <form method="post" onSubmit={onSubmit}>
                            <div className="inputMeetingName">
                                <label>Meeting name:</label>
                                <input
                                    className="meetingNameField"
                                    required
                                    type="text"
                                    value={meetingName}
                                    onChange={(e) =>
                                        setMeetingName(e.target.value)
                                    }
                                />
                            </div>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <div className="startTime">
                                    <DateTimePicker
                                        label="Pick a start time"
                                        inputVariant="outlined"
                                        value={startDateTime}
                                        onChange={setStartDateTime}
                                    />
                                </div>
                                <DateTimePicker
                                    label="Pick a end time"
                                    inputVariant="outlined"
                                    value={endDateTime}
                                    onChange={setEndDateTime}
                                />
                            </MuiPickersUtilsProvider>
                            <div className="meetingButtons">
                                <NavLink
                                    className="cancelMeeting"
                                    to={
                                        "/clients/" +
                                        props.location.state.client.email
                                    }
                                >
                                    Cancel
                                </NavLink>
                                <button
                                    type="submit"
                                    className="addMeetingButton"
                                    onClick={onSubmit}
                                >
                                    Schedule Meeting
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="scheduleCalendar">
                        <Calendar
                            localizer={localizer}
                            events={activitiesData.activities}
                            startAccessor="timeStart"
                            endAccessor="timeEnd"
                            titleAccessor="type"
                            style={{ height: 500 }}
                        />
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            <Navbar />
            <main id="scheduleMeeting">
                {pageHeading()}
                {pageMain()}
            </main>
        </div>
    );
}

export default ScheduleMeeting;
