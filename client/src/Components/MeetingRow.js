import React from "react";
import Moment from "react-moment";

// Format each meeting
export default function MeetingRow(activity) {
    const { type, timeStart } = activity;

    return (
        <div className="portalRow">
            <span className="leftAlign">{type}</span>
            <Moment className="rightAlign" format="hh:mm A ddd Do MMM YY">
                {timeStart}
            </Moment>
        </div>
    );
}
