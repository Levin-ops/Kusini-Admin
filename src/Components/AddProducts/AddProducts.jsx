import React, { useState } from "react";
import "./AddProducts.css";
import fileUpload from "../../Assets/file_upload.png";

function AddProducts() {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    code: "",
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
    let price = parseFloat(productDetails.price);
    let level = price >= 4000 ? "Top Shelf" : "Standard";

    // Prepare form data to send product details and image
    let formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("price", productDetails.price);
    formData.append("category", productDetails.category);
    formData.append("description", productDetails.description);
    formData.append("description", productDetails.code);
    formData.append("level", level);
    formData.append("product", image);

    // Send product details along with the image to the /addproduct endpoint
    await fetch("https://kusini-backend-1.onrender.com/products/addproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Product Added");
          window.location.reload();
        } else {
          alert("Failed to add product");
        }
      });
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
        <div className="add_product_item_fields">
          <p>Code</p>
          <input
            type="text"
            value={productDetails.code}
            onChange={changeHandler}
            name="code"
            placeholder="Enter Code"
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
