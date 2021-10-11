import React from "react";
import Moment from "react-moment";

// Format each order history row
export default function OrderHistoryRow(order) {
    const { _id, orderTotal, updatedAt } = order;

    return (
        <tr className="orderHistoryWrapper">
            <td>
                <span className="left-Align">
                    {_id}
                </span>
                
            </td>
            <td>
                <span className="lastUpdated">
                    <Moment format="Do MMM YY">{updatedAt}</Moment>
                </span>
            </td>
            <td>
                <span className="total">{orderTotal}</span>
            </td>
        </tr>
    );
}
