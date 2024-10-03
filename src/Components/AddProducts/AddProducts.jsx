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
    // console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
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
      // console.log(product);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
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
        <p>Drink Level</p>
        <select
          value={productDetails.level}
          onChange={changeHandler}
          name="level"
          className="add_product_selection"
        >
          <option value="Top Shelf">Top Shelf</option>
          <option value="Standard">Standard</option>
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
