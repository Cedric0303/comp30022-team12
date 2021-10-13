import React from "react";
import { NavLink } from "react-router-dom";
import "./css/portal.css";
import { useOrders } from "../api.js";
import OrderRow from "./OrderRow.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactLoading from "react-loading";
import "../Pages/css/animation.css";

export default function OrderPortal(props) {
    const { loading, ordersData, error } = useOrders(props.cid);

    const portalContent = () => {
        if (loading) {
            return (
                <div>
                    <div className="portalContent">
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
                <div className="portalContent">
                    <p>Something went wrong: {error.message}</p>
                </div>
            );
        } else {
            return (
                <div className="portalContent">
                    <div className="portalOrder">
                        <span>Order ID</span>
                        <span>Order Date</span>
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
            <NavLink
                to={{
                    pathname: "/clients/" + props.cid + "/orders",
                    state: { cid: props.cid },
                }}
            >
                <p className="portalHeading">
                    Order History <FontAwesomeIcon icon="chevron-right" />
                </p>
            </NavLink>
            {portalContent()}
        </div>
    );
}
