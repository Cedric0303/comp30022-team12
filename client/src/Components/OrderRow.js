import React from "react";

// Format each meeting
export default function OrderRow(order) {

    const { _id, orderTotal } = order;

    return (
        <div className="portalRow">
            <span className="leftAlign">{_id}</span>
            <span className="rightAlign">{orderTotal}</span>
        </div>
    );
}
