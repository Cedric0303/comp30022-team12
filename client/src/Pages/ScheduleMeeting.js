import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { DateTimePicker } from "@material-ui/pickers";
import Select from "react-select";
import {
    postNewMeeting,
    postEditMeeting,
    useActivities,
    useClients,
    deleteActivity,
} from "../api.js";
import { clientsToOptions } from "../Components/CalendarUtilities.js";
import "./css/scheduleMeeting.css";
import ReactLoading from "react-loading";
import "./css/animation.css";
import { Helmet } from "react-helmet";

// Handles any scheduling- adds and edits meetings depending on the props
function ScheduleMeeting(props) {
    // Check if a client has been passed through
    const givenClientReference = () => {
        if (!props.location.state) {
            return null;
        } else if (props.location.state.client) {
            return props.location.state.client.email;
        } else {
            return null;
        }
    };

    // Set up default form values
    var currentName = "";
    var currentStart = new Date();
    var currentEnd = new Date();

    // Check if an activity has been passed through
    const hasActivity = () => {
        if (!props.location.state) {
            return null;
        } else if (props.location.state.activity) {
            // Update rendered default values if editing the meeting
            currentName = props.location.state.activity.type;
            currentStart = props.location.state.activity.timeStart;
            currentEnd = props.location.state.activity.timeEnd;
            return props.location.state.activity;
        }
    };

    const [clientReference, setClientReference] = useState(
        givenClientReference()
    );
    const activity = hasActivity();

    const { loading, activitiesData, error } = useActivities(clientReference);
    const { cliLoading, clientsData, cliError } = useClients();

    const [startDateTime, setStartDateTime] = useState(currentStart);
    const [endDateTime, setEndDateTime] = useState(currentEnd);
    const [meetingName, setMeetingName] = useState(currentName);
    const [selectedClient, setSelectedClient] = useState();

    const [showConfirm, setShowConfirm] = useState(false);

    const localizer = momentLocalizer(moment);

    // Handle either the addition or edit of a meeting
    const onSubmit = (e) => {
        e.preventDefault();
        if (!clientReference) {
            alert("Select a client!");
        } else if (!meetingName.trim().length) {
            alert("Meeting must have a name!");
        } else if (startDateTime >= endDateTime) {
            alert("End time must be after start time");
        } else {
            const meetingBody = {
                clientReference: clientReference,
                start: startDateTime,
                end: endDateTime,
                name: meetingName,
            };
            if (!activity) {
                postNewMeeting(meetingBody);
            } else {
                postEditMeeting(meetingBody, activity._id);
            }
        }
    };

    // Set a client as the client involved in the meeting
    const handleSelect = (selectedClient) => {
        setSelectedClient(selectedClient);
        setClientReference(selectedClient.value.email);
    };

    // Allows the user to select a client if not already specified
    const selectClient = () => {
        if (givenClientReference()) {
            return;
        } else {
            if (cliLoading) {
                return;
            } else if (cliError) {
                return (
                    <div>
                        <p>Something went wrong: {cliError.message}</p>
                    </div>
                );
            } else if (clientsData.length) {
                var options = clientsToOptions(clientsData);
                if (options) {
                    return (
                        <div>
                            <label>Select a client:</label>
                            <Select
                                className="selectClient"
                                value={selectedClient}
                                onChange={handleSelect}
                                options={options}
                                maxMenuHeight={240}
                            />
                        </div>
                    );
                }
            }
        }
    };

    // Navigate back to the appropriate page
    const cancelRedirect = () => {
        if (!givenClientReference()) {
            return "/calendar";
        } else {
            return "/clients/" + clientReference;
        }
    };

    const onDelete = () => {
        deleteActivity(activity._id, clientReference);
    };

    const deleteMeeting = () => {
        if (!activity) {
            return;
        } else {
            if (showConfirm) {
                return (
                    <div>
                        <span>Are you sure?</span>
                        <button
                            onClick={onDelete}
                            className="deleteMeetingButton"
                        >
                            Yes
                        </button>
                        <span
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="cancelDelete"
                        >
                            No
                        </span>
                    </div>
                );
            } else {
                return (
                    <div>
                        <button
                            type="button"
                            className="deleteMeetingButton"
                            onClick={() => setShowConfirm(!showConfirm)}
                        >
                            Delete Meeting
                        </button>
                    </div>
                );
            }
        }
    };

    const pageHeading = () => {
        if (!clientReference) {
            return (
                <div>
                    <h2 className="scheduleMeetingHeading">
                        <span className="unbold">Schedule Meeting</span>
                    </h2>
                </div>
            );
        } else if (clientReference) {
            var client = null;
            if (selectedClient) {
                client = selectedClient.value;
            } else {
                client = props.location.state.client;
            }
            if (activity) {
                return (
                    <div>
                        <h2 className="scheduleMeetingHeading">
                            <span className="unbold">Meeting with </span>
                            {client.firstName} {client.lastName}
                        </h2>
                        <p>Edit the form below to reschedule the meeting.</p>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h2 className="scheduleMeetingHeading">
                            <span className="unbold">
                                Schedule Meeting with{" "}
                            </span>
                            {client.firstName} {client.lastName}
                        </h2>
                    </div>
                );
            }
        }
    };

    const pageMain = () => {
        if (loading || cliLoading) {
            return (
                <div>
                    <div>
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
                <div>
                    <p>Something went wrong: {error.message}</p>
                </div>
            );
        } else {
            return (
                <div className="scheduleGrid">
                    <div className="scheduleForm">
                        <form method="post" onSubmit={onSubmit}>
                            {selectClient()}
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
                                    <label className="timeLabel">
                                        Start Time:
                                    </label>
                                    <DateTimePicker
                                        className="pickerInput"
                                        inputVariant="outlined"
                                        value={startDateTime}
                                        onChange={setStartDateTime}
                                    />
                                </div>
                                <label className="timeLabel">End Time:</label>
                                <DateTimePicker
                                    className="pickerInput"
                                    inputVariant="outlined"
                                    value={endDateTime}
                                    onChange={setEndDateTime}
                                />
                            </MuiPickersUtilsProvider>
                            <div className="meetingButtons">
                                <NavLink
                                    className="cancelMeeting"
                                    activeClassName=""
                                    to={cancelRedirect}
                                >
                                    Cancel
                                </NavLink>
                                <button
                                    type="submit"
                                    className="saveMeetingButton"
                                    onClick={onSubmit}
                                >
                                    Save Meeting
                                </button>
                                {deleteMeeting()}
                            </div>
                        </form>
                    </div>
                    <div className="scheduleCalendar">
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
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            <Helmet>
                <title>Schedule Meeting - Bobafish CRM</title>
                <meta
                    name="description"
                    content="Schedule a meeting with a client"
                />
            </Helmet>
            <Navbar />
            <main id="scheduleMeeting">
                {pageHeading()}
                {pageMain()}
            </main>
        </div>
    );
}

export default ScheduleMeeting;
