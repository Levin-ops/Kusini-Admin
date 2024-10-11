import React, { useEffect, useState } from "react";
import "./ListProducts.css";
import removeIcon from "../../Assets/cart_cross_icon.png";

function ListProducts() {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    const response = await fetch(
      "https://kusini-backend-1.onrender.com/products/allproducts"
    );
    const data = await response.json();
    setAllProducts(data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch(
      "https://kusini-backend-1.onrender.com/products/deleteproduct",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    await fetchInfo();
  };

  const toggleAvailability = async (id) => {
    await fetch(
      "https://kusini-backend-1.onrender.com/products/toggleavailability",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    await fetchInfo();
  };

  return (
    <div className="list_products">
      <h1>All Product List</h1>
      <div className="list_products_format_main">
        <p style={{ textAlign: "center" }}>Product</p>
        <p style={{ textAlign: "center" }}>Name</p>
        <p style={{ textAlign: "center" }}>Price</p>
        <p style={{ textAlign: "center" }}>Status</p>
        <p style={{ textAlign: "center" }}>Availability</p>
        <p style={{ textAlign: "center" }}>Remove</p>
      </div>
      <div className="list_products_all_products">
        <hr />
        {allProducts.map((product, index) => (
          <div
            key={index}
            className="list_products_format_main list_products_format"
          >
            <img className="list_products_icon" src={product.image} alt="" />
            <p style={{ textAlign: "center" }}>{product.name}</p>
            <p style={{ textAlign: "center" }}>KSh.{product.price}</p>

            <p style={{ textAlign: "center" }}>
              {product.available ? "Available" : "Unavailable"}
            </p>
            <button
              className={`list_products_toggle_button ${
                product.available ? "available" : "unavailable"
              }`}
              onClick={() => toggleAvailability(product.id)}
            >
              {product.available ? "In Stock" : "Out of Stock"}
            </button>
            <img
              className="list_products_remove_icon"
              src={removeIcon}
              alt="Remove"
              onClick={() => removeProduct(product.id)}
            />
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
}

export default ListProducts;
