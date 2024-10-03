import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import addProduct from "../../Assets/addproduct.png";
import listProduct from "../../Assets/listProduct.png";
import orderPic from "../../Assets/order.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="addproducts" style={{ textDecoration: "none", color: "black" }}>
        <div className="sidebar_item">
          <img src={addProduct} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link
        to="listproducts"
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="sidebar_item">
          <img src={listProduct} alt="" />
          <p>Products List</p>
        </div>
      </Link>
      <Link to="orders" style={{ textDecoration: "none", color: "black" }}>
        <div className="sidebar_item">
          <img src={orderPic} alt="" />
          <p>Orders List</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
