import React, { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {
  const [allOrders, setAllOrders] = useState([]);
  const [prevOrders, setPrevOrders] = useState([]);
  const [newOrderIDs, setNewOrderIDs] = useState([]);

  const fetchOrders = async () => {
    const response = await fetch(
      "https://kusini-backend-1.onrender.com/orders/allorders"
    );
    const data = await response.json();

    // Sort orders by createdAt in descending order (latest first)
    const sortedOrders = data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Identify newly fetched orders by filtering out previous orders
    const newOrders = sortedOrders.filter(
      (order) => !prevOrders.some((prevOrder) => prevOrder._id === order._id)
    );

    // Update newOrderIDs without adding orders already delivered
    setNewOrderIDs((prevIDs) => [
      ...prevIDs,
      ...newOrders
        .map((order) => order._id)
        .filter(
          (id) =>
            !prevIDs.includes(id) &&
            sortedOrders.find((order) => order._id === id).status !==
              "Delivered"
        ),
    ]);

    setPrevOrders(sortedOrders);
    setAllOrders(sortedOrders);
  };

  useEffect(() => {
    fetchOrders();

    const intervalID = setInterval(() => {
      fetchOrders();
    }, 300);
    return () => clearInterval(intervalID); // clear the interval when component unmounts
  }, []);

  const removeOrder = async (orderId) => {
    await fetch("https://kusini-backend-1.onrender.com/orders/deleteorder", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });
    await fetchOrders();
  };

  const updateOrderStatus = async (orderId, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Delivered" : "Pending";

    await fetch(
      "https://kusini-backend-1.onrender.com/orders/updateOrderStatus",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, newStatus }),
      }
    );

    await fetchOrders();

    // If the new status is "Delivered", remove it from newOrderIDs
    if (newStatus === "Delivered") {
      setNewOrderIDs((prevIDs) => prevIDs.filter((id) => id !== orderId));
    }
  };

  return (
    <div className="orders_container">
      <h1>All Orders List</h1>

      <div className="orders_format_main">
        <p style={{ textAlign: "center" }}>Phone No.</p>
        <p style={{ textAlign: "center" }}>Products</p>
        <p style={{ textAlign: "center" }}>Date</p>
        <p style={{ textAlign: "center" }}>Location</p>
        <p style={{ textAlign: "center" }}>Total</p>
        <p style={{ textAlign: "center" }}>Payment</p>
        <p style={{ textAlign: "center" }}>Status</p>
      </div>
      <div className="orders_all_items">
        <hr />
        {allOrders.map((order) => (
          <div
            key={order._id}
            className={`orders_format ${
              newOrderIDs.includes(order._id) ? "new-order" : ""
            }`}
          >
            <p>{order.customer.phoneNumber}</p>
            <p>
              {order.items.map((item) => (
                <span key={item.productId}>
                  {item.name} (x{item.quantity})
                </span>
              ))}
            </p>
            <p style={{ textAlign: "center" }}>
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p style={{ textAlign: "center" }}>{order.location}</p>
            <p style={{ textAlign: "center" }}>KSh.{order.totalAmount}</p>
            <p style={{ textAlign: "center" }}>{order.paymentStatus}</p>
            <button
              className={
                order.status === "Pending"
                  ? "pending-button"
                  : "delivered-button"
              }
              onClick={() => updateOrderStatus(order._id, order.status)}
            >
              {order.status}
            </button>
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
}

export default Orders;
