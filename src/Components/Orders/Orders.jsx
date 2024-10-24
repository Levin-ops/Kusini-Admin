import React, { useEffect, useState } from "react";
import "./Orders.css";
import { io } from "socket.io-client";

function Orders() {
  const [allOrders, setAllOrders] = useState([]);
  const [newOrderNotification, setNewOrderNotification] = useState(false);

  const fetchOrders = async () => {
    const response = await fetch(
      "https://kusini-backend-1.onrender.com/orders/allorders"
    );
    const data = await response.json();

    // Sort orders by createdAt in descending order (latest first)
    const sortedOrders = data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setAllOrders(sortedOrders);
  };

  useEffect(() => {
    fetchOrders();

    // Initialize socket connection
    const socket = io("https://kusini-backend-1.onrender.com");

    // Listen for 'new-order' event from the server
    socket.on("new-order", (newOrder) => {
      setNewOrderNotification(true);
      setAllOrders((prevOrders) => [newOrder, ...prevOrders]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("new-order");
      socket.disconnect();
    };
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
  };

  return (
    <div className="orders_container">
      <h1>All Orders List</h1>

      {/* Notification for new order */}
      {newOrderNotification && (
        <div className="new-order-notification">
          <p>New order received!</p>
          <button onClick={() => setNewOrderNotification(false)}>
            Dismiss
          </button>
        </div>
      )}

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
          <div key={order._id} className="orders_format">
            <p>{order.customer.phoneNumber}</p>
            <p>
              {order.items.map((item) => (
                <div key={item.productId}>
                  {item.name} (x{item.quantity})
                </div>
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
