import React, {useState} from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import OrderHistoryRow from "../Components/OrderHistoryRow.js";
import ReactLoading from "react-loading";
import {useOrders, postOrder} from "../api.js";
import Modal from "react-modal";
import "./css/orderHistory.css";

function OrderHistory(props) {
    
    const cid = props.location.state.cid;
    const { loading, ordersData, error } = useOrders(cid);
    
    console.log(ordersData.orders);

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
                                <th id="lastUpdate">Last Updated</th>
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
            <Navbar />

            <main className="OrderBox">
                <h2 id="orderHeading">Order History</h2>
                <button onClick={openModal}>Add Order</button>
                {pageMain()}
                
            </main>

            <Modal
                isOpen={addModalIsOpen}
                className="addOrderModal"
                contentLabel="Add New Order"
            >
                <h2>Add a new order</h2>
                <form onSubmit={handleAdd}>
                    <label>
                        Order Amount:
                        <input
                            type="number"
                            id="orderTotal"
                            required
                            value={newOrder.orderTotal}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit" className="addOrderButton">
                        Add Order
                    </button>
                    <button
                        className="orderCancelButton"
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
