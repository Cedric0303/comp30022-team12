import React from "react";
import Moment from "react-moment";

// Format each meeting
export default function OrderRow(order) {
    const { _id, updatedAt, orderTotal } = order;

    return (
        <div className="portalRow portalOrderRow">
            <span>{_id}</span>
            <span>
                    <Moment format="Do MMM YY">{updatedAt}</Moment>
            </span>
            <span className="rightAlign">{orderTotal}</span>
        </div>
    );
}
