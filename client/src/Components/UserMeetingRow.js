import React from "react";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";

// Format each meeting
export default function UserMeetingRow(props) {

    const formatString = (time) => {
        const now = new Date();

        if (time.getDate() === now.getDate()) {
            return " [Today at] hh:mm a"

        } else if (time.getDate() === now.getDate() + 1) {
            return " [Tomorrow at] hh:mm a"
        } else {
            return " dddd [at] hh:mm a"
        }
    }

    return (
        <NavLink to={{
            pathname: "/calendar/schedule-meeting",
            state: {
                client: props.client,
                fromClient: false,
                activity: props.activity,
            },
        }}>
            <div className="meetingRowLink">
                <span className="leftAlign">
                    {props.activity.type} with <b>{props.client.firstName} {props.client.lastName}</b> 
                </span>
                
                <Moment className="leftAlign" format={formatString(props.activity.timeStart)}>
                    {props.activity.timeStart}
                </Moment>
            </div>
        </NavLink>
    );
}
