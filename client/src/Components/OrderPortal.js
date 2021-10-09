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
                    {loading && (
                        <ReactLoading
                            id="loading-anim"
                            type="spin"
                            color="black"
                            height="2%"
                            width="2%"
                        ></ReactLoading>
                    )}
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
