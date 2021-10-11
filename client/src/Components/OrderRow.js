import React from "react";
import Moment from "react-moment";

// Format each meeting
export default function OrderRow(order) {
    const { _id, updatedAt, orderTotal } = order;

    return (
        <div className="portalRow">
            <span className="leftAlign">{_id}</span>
            <span className="centerAlign">
                    <Moment format="Do MMM YY">{updatedAt}</Moment>
            </span>
            <span className="rightAlign">{orderTotal}</span>
        </div>
    );
}
