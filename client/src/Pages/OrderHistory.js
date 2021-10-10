import React from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import OrderRow from "../Components/OrderRow.js";
import ReactLoading from "react-loading";
import {useOrders} from "../api.js";

function OrderHistory(props) {
    const { loading, ordersData, error } = useOrders(props.location.state);
    console.log(ordersData);

    const pageMain = () => {
        if (loading) {
            return (
                <div>
                    <ul>Loading...</ul>
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
                <div>
                    <ul>Something went wrong: {error.message}</ul>
                </div>
            );
        } else {
            return (
                <div>
                    <table>
                        <thead id="orderHistoryHeading">
                            <tr>
                                <th id="orderID">Order ID</th>
                                <th id="date">Date</th>
                                <th id="amount">Amount</th>
                            </tr>
                        </thead>
                        
                        {ordersData.orders.map((order) => (
                            <tbody
                                key={order._id}
                            >
                                <OrderRow key={order._id} {...order} />
                            </tbody>
                        ))} 
                    </table>
                </div>
            );
        }
    };
    
    
    return (
        <div>
            <Navbar />
            <h2>Order History</h2>
            <main>{pageMain()}</main>
        </div>
    );
}

export default OrderHistory;
