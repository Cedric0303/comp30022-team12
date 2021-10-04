import React from "react";
import { NavLink } from "react-router-dom";
import "./css/portal.css";
import { useOrders } from "../api.js";
import OrderRow from "./OrderRow.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrderPortal(props) {
    const { loading, ordersData, error } = useOrders(props.cid);

    const portalContent = () => {
        if (loading) {
            return (
                <div className="portalContent">
                    <p>Loading...</p>
                </div>
            );
        } else if (error) {
            return (
                <div className="portalContent">
                    <p>Something went wrong: {error.message}</p>
                </div>
            );
        } else {
            return (
                <div className="portalContent">
                    <div className="portalSub">
                        <span className="leftAlign">Order ID</span>
                        <span className="rightAlign">Total</span>
                    </div>
                    {ordersData.orders.map((order) => (
                        <OrderRow key={order._id} {...order} />
                    ))}
                </div>
            );
        }
    };
    return (
        <div className="clientOrdersPortal">
            <NavLink to={"/clients/" + props.cid + "/orders"}>
                <p className="portalHeading">
                    Order History <FontAwesomeIcon icon="chevron-right" />
                </p>
            </NavLink>
            {portalContent()}
        </div>
    );
}
