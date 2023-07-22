import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Product from "../components/Product";
import { CartContext } from "../App";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const { state, dispatch } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleFilterChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  };

  const addToCart = (productId) => {
    const productToAdd = state.cartItems.find((item) => item.id === productId);
    if (!productToAdd) {
      const product = products.find((item) => item.id === productId);
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

  return (
    <div>
      <h2 className="page-title">Landing Page</h2>
      <div className="filter-container">
        <label htmlFor="category" className="filter">
          Filter by Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={handleFilterChange}
          className="dropdownWrapper"
        >
          <option value="All" className="dropdown-option">
            All
          </option>
          <option value="electronics" className="dropdown-option">
            Electronics
          </option>
          <option value="jewelery" className="dropdown-option">
            Jewelery
          </option>
          <option value="men's clothing" className="dropdown-option">
            Men's Clothing
          </option>
          <option value="women's clothing" className="dropdown-option">
            Women's Clothing
          </option>
        </select>
      </div>
      <div className="products-wrapper">
        <div className="products-container">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
