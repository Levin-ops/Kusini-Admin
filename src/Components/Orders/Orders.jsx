import React, { useEffect, useState } from "react";
import "./Orders.css";
import removeIcon from "../../Assets/cart_cross_icon.png";

function Orders() {
  const [allOrders, setAllOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await fetch("http://localhost:4000/allorders");
    const data = await response.json();
    setAllOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const removeOrder = async (orderId) => {
    await fetch("http://localhost:4000/deleteorder", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });
    await fetchOrders(); // Refresh the order list
  };

  const updateOrderStatus = async (orderId, currentStatus) => {
    const newStatus =
      currentStatus === "Pending"
        ? "Delivered"
        : currentStatus === "Delivered"
        ? "Cancelled"
        : "Pending";

    await fetch("http://localhost:4000/updateOrderStatus", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, newStatus }),
    });

    await fetchOrders(); // Refresh the order list
  };

  return (
    <div className="orders_container">
      <h1>All Orders List</h1>
      <div className="orders_format_main">
        <p>Customer</p>
        <p>Products</p>
        <p>Date</p>
        <p>Status</p>
        <p>Total Price</p>
        <p>Actions</p>
        <p>Delete</p>
      </div>
      <div className="orders_all_items">
        <hr />
        {allOrders.map((order) => (
          <div key={order._id} className="orders_format">
            <p>{order.customer.firstName}</p>
            <p>
              {order.items.map((item) => (
                <div key={item.productId}>
                  {item.name} (x{item.quantity})
                </div>
              ))}
            </p>
            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            <p>{order.status}</p>
            <p>KSh.{order.totalAmount}</p>
            <button onClick={() => updateOrderStatus(order._id, order.status)}>
              Toggle Status
            </button>
            <img
              className="orders_remove_icon"
              src={removeIcon}
              alt="Remove"
              onClick={() => removeOrder(order._id)}
            />
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
}

export default Orders;
