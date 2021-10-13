import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import OrderHistoryRow from "../Components/OrderHistoryRow.js";
import ReactLoading from "react-loading";
import { useOrders, postOrder, useClient, useWindowDimensions } from "../api.js";
import Modal from "react-modal";
import "./css/orderHistory.css";
import { Helmet } from "react-helmet";

function OrderHistory(props) {
    
    const cid = props.location.state.cid;
    const { loading, ordersData, error } = useOrders(cid);
    const { loading: clientLoading, clientData, error: clientError } = useClient(cid);
    const { height: winHeight } = useWindowDimensions();

    useEffect(() => {
        let ordersBoxElement = document.getElementById("orderHistoryBox");
        if (ordersBoxElement) {
            ordersBoxElement.style.height = winHeight - ordersBoxElement.offsetTop + "px";
        }
    })

    //hold the details of a new order
    const initialState = {
        orderTotal: 0,
    };
    const [newOrder, setNewOrder] = useState(initialState);
    const resetOrder = () => {
     setNewOrder({ ...initialState });
    };

    Modal.setAppElement(document.getElementById("root") || undefined);

    //handles state of modal's show
    const [addModalIsOpen, setAddIsOpen] = useState(false);
    function openModal() {
        setAddIsOpen(true);
    }
    function closeAndClear() {
        setAddIsOpen(false);
        resetOrder();
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewOrder((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleAdd = (e) => {
        if (newOrder.orderTotal) {
            postOrder(cid, newOrder.orderTotal);
            resetOrder();
        }
        e.preventDefault();
    };

    const clientName = () => {
        if (clientLoading) {
            return;
        } else if (clientError) {
            return;
        } else {
            return (
                <h1 id="clientName">
                    <Helmet>
                        <title>{clientData.client.firstName+" "+clientData.client.lastName} Order History - Bobafish CRM</title>
                    </Helmet>
                    {clientData.client.firstName}&nbsp;{clientData.client.lastName}
                </h1>
            )
        }
    }

    const pageMain = () => {
        if (loading || clientLoading) {
            return (
                <div>
                    <p className="orderAltText">Loading...</p>
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
                    <p className="orderAltText">Something went wrong: {error.message}</p>
                </div>
            );
        } else if (clientError) {
            return (
                <div>
                    <p className="orderAltText">Something went wrong: {clientError.message}</p>
                </div>
            );
        } else {
            return (
                <div id="orderHistoryBox">
                    <table id="orderHistory">
                        <thead>
                            <tr>
                                <th id="orderID">Order ID</th>
                                <th id="lastUpdate">Order Date</th>
                                <th id="amount">Amount</th>
                            </tr>
                        </thead>
                        
                        {ordersData.orders.map((order) => (
                            <tbody
                                key={order._id}
                            >
                                <OrderHistoryRow key={order._id} {...order} />
                            </tbody>
                        ))} 
                    </table>
                </div>
            );
        }
    };
    
    return (
        <div>
            <Helmet>
                <title>Order History - Bobafish CRM</title>
                <meta name="description" content="Order history for client" />
            </Helmet>
            <Navbar />

            <main id="orderBox">
                {clientName()}
                <div id="orderHeader">
                    <h2 id="orderHeading">Order History</h2>
                    <button id="addOrderButton" onClick={openModal}>Add Order</button>
                </div>
                {pageMain()}
                
            </main>

            <Modal
                isOpen={addModalIsOpen}
                className="addOrderModal"
                overlayClassName="addOrderModalOverlay"
                contentLabel="Add New Order"
            >
                <h2 id="modalHeading">Add a new order</h2>
                <form id="addOrderForm" onSubmit={handleAdd}>
                    <label id="orderTotal">
                        Order Total:
                        <input
                            type="number"
                            id="orderTotal"
                            required
                            value={newOrder.orderTotal}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit" id="modalAddOrderButton">
                        Add Order
                    </button>
                    <button
                        id="modalOrderCancelButton"
                        onClick={closeAndClear}
                    >
                        Cancel
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default OrderHistory;
