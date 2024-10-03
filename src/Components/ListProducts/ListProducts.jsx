import React, { useEffect, useState } from "react";
import "./ListProducts.css";
import removeIcon from "../../Assets/cart_cross_icon.png";

function ListProducts() {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allproducts");
    const data = await response.json();
    setAllProducts(data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/deleteproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    await fetchInfo();
  };

  const toggleAvailability = async (id) => {
    await fetch("http://localhost:4000/toggleavailability", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    await fetchInfo();
  };

  return (
    <div className="list_products">
      <h1>All Product List</h1>
      <div className="list_products_format_main">
        <p>Product</p>
        <p>Name</p>
        <p>Price</p>
        <p>Category</p>
        <p>Status</p>
        <p>Remove</p>
        <p>Toggle Availability</p>
      </div>
      <div className="list_products_all_products">
        <hr />
        {allProducts.map((product, index) => (
          <div
            key={index}
            className="list_products_format_main list_products_format"
          >
            <img className="list_products_icon" src={product.image} alt="" />
            <p>{product.name}</p>
            <p>KSh.{product.price}</p>
            <p>{product.category}</p>
            <p>{product.available ? "Available" : "Unavailable"}</p>
            <img
              className="list_products_remove_icon"
              src={removeIcon}
              alt="Remove"
              onClick={() => removeProduct(product.id)}
            />
            <button
              className={`list_products_toggle_button ${
                product.available ? "available" : "unavailable"
              }`}
              onClick={() => toggleAvailability(product.id)}
            >
              {product.available ? "In Stock" : "Out of Stock"}
            </button>
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
}

export default ListProducts;
