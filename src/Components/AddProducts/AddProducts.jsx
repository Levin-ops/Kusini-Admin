import React, { useState } from "react";
import "./AddProducts.css";
import fileUpload from "../../Assets/file_upload.png";

function AddProducts() {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    description: "",
    level: "Standard",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    // Automatically set product level based on price
    let price = parseFloat(productDetails.price);
    let level = price >= 4000 ? "Top Shelf" : "Standard";

    // Update product details with determined level
    let product = { ...productDetails, level };

    let formData = new FormData();
    formData.append("product", image);

    let responseData;
    await fetch("https://kusini-backend-1.onrender.com/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      await fetch("https://kusini-backend-1.onrender.com/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Product Added");
            window.location.reload(); // Refresh the page on success
          } else {
            alert("Failed to add product");
          }
        });
    } else {
      alert("Image upload failed");
    }
  };

  return (
    <div className="add_products">
      <div className="add_product_item_fields">
        <p>Product Name</p>
        <input
          type="text"
          value={productDetails.name}
          onChange={changeHandler}
          name="name"
          placeholder="Product Name"
        />
      </div>
      <div className="add_product_price">
        <div className="add_product_item_fields">
          <p>Price</p>
          <input
            type="text"
            value={productDetails.price}
            onChange={changeHandler}
            name="price"
            placeholder="Enter Price"
          />
        </div>
      </div>
      <div className="add_product_item_fields">
        <p>Description</p>
        <input
          type="text"
          value={productDetails.description}
          onChange={changeHandler}
          name="description"
          placeholder="Enter Description"
        />
      </div>
      <div className="add_product_item_fields">
        <p>Drink Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add_product_selection"
        >
          <option value="beer">Beer</option>
          <option value="brandy">Brandy</option>
          <option value="gin">Gin</option>
          <option value="soft-drink">Soft Drink</option>
          <option value="spirits">Spirits</option>
          <option value="vodka">Vodka</option>
          <option value="whisky">Whisky</option>
          <option value="wine">Wine</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="add_product_item_fields">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : fileUpload}
            alt=""
            className="add_product_thumbnail"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          addProduct();
        }}
        className="add_product_btn"
      >
        Add Product
      </button>
    </div>
  );
}

export default AddProducts;
