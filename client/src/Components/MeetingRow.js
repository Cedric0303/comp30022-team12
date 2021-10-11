import React from "react";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";

// Format each meeting
export default function MeetingRow(props) {
    return (
        <NavLink
            to={{
                pathname: "/calendar/schedule-meeting",
                state: {
                    client: props.client,
                    fromClient: false,
                    activity: props.activity,
                },
            }}
        >
            <div className="meetingRowLink">
                <span className="leftAlign">{props.activity.type}</span>
                <Moment className="rightAlign" format="hh:mm A ddd Do MMM YY">
                    {props.activity.timeStart}
                </Moment>
            </div>
        </NavLink>
    );
}
