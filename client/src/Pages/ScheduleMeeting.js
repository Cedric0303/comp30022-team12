import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { DateTimePicker } from "@material-ui/pickers";
import { alpha } from "@material-ui/core/styles";
import Select from 'react-select';
import { useActivities, useClients } from "../api.js";
import { postMeeting } from "../api.js";
import "./css/scheduleMeeting.css";

function ScheduleMeeting(props) {
    
    const givenClient = () => {
        if (
            props.location.state === null ||
            props.location.state === undefined
        ) {
            return false;
        } else {
            return true;
        }
    }

    const getCid = () => {
        if (!givenClient()) {
            return null;
        } else if (props.location.state.client) {
            return props.location.state.client.email;
        }
    };

    const [client, setClient] = useState(getCid());

    const { loading, activitiesData, error } = useActivities(getCid());
    const { cliLoading, clientsData, cliError } = useClients();

    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [meetingName, setMeetingName] = useState("");
    const [selectedClient, setSelectedClient] = useState();

    const localizer = momentLocalizer(moment);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!client) {
            alert("Select a client!");
        } else if (!meetingName.trim().length) {
            alert("Meeting must have a name!");
        } else if (startDateTime >= endDateTime) {
            alert("End time must be after start time");
        } else {
            const meetingBody = {
                cid: client,
                start: startDateTime,
                end: endDateTime,
                name: meetingName,
            };
            postMeeting(meetingBody);
        }
    };

    const handleSelect = (selectedClient) => {
        setSelectedClient(selectedClient);
        setClient(selectedClient.value)
    }

    const clientsToOptions = () => {
        var clientOptions = [];
        if (clientsData.clients) {
            clientsData.clients.map((client) => (
                clientOptions.push({
                    value: client.email,
                    label: client.firstName + " " + client.lastName,
                })
            ))
            return clientOptions;
        }
    }

    const selectClient = () => {
        if (givenClient()) {
            return;
        } else {
            if (cliLoading) {
                return;
            } else if (cliError) {
                return (
                    <div>
                        <p>Something went wrong: {cliError.message}</p>
                    </div>
                )
            } else {
                const options = clientsToOptions();
                return (
                    <div>
                        <label>
                            Select a client:
                        </label>
                        <Select 
                            className="selectClient"
                            value={selectedClient}
                            onChange={handleSelect}
                            options={options}
                            maxMenuHeight={240}
                        />
                    </div>
                )
            }
        }
    }

    const cancelRedirect = () => {
        if (!givenClient()) {
            return "/calendar";
        } else {
            return "/clients/" + props.location.state.client.email;
        }
    }

    const pageHeading = () => {
        if (!givenClient()) {
            return (
                <div>
                    <h2 className="scheduleMeetingHeading">
                        <span className="unbold">Schedule Meeting</span>
                    </h2>
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
                                    <label className="timeLabel">Start Time:</label>
                                    <DateTimePicker
                                        inputVariant="outlined"
                                        value={startDateTime}
                                        onChange={setStartDateTime}
                                    />
                                </div>
                                <label className="timeLabel">End Time:</label>
                                <DateTimePicker
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
